<?php

function trace_viewdata( $exit=FALSE ){
	$CI = &get_instance();
	trace( $CI->load->_ci_cached_vars, $exit );
}

function trace( $val, $exit=FALSE ){
	
	$CI = &get_instance();
	$prefs = $CI->config->item('tracer');
	
	if( $prefs[ 'enabled' ] ){
		
		$trace = debug_backtrace();
		$trace = $trace[ 0 ];
		$file = $trace[ 'file' ];
		$line = $trace[ 'line' ];
		
		$data = str_replace( "\n\n", "\n", print_r( $val, TRUE ));
		
		$method =  $prefs[ 'function' ];
		if( !empty($method) ){
			$data = $method( $data );
		}

		$msg = "<div class=\"sparkTracerDebugBacktrace\"><strong>File:</strong>&nbsp;$file<br/><strong>Line:</strong>&nbsp;$line</div>\n";
		$msg .= $data;
		
		$msg = str_replace( '[', '[<em>', $msg );
		$msg = str_replace( ']', '</em>]', $msg );
		
		$highlight = array( 'SELECT', 'DISTINCT', 'FROM', 'WHERE', 'AND', 'LEFT&nbsp;JOIN', 'ORDER&nbsp;BY', 'GROUP&nbsp;BY', 'LIMIT', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'OR&nbsp;', 'HAVING', 'OFFSET', 'NOT&nbsp;IN', 'IN', 'LIKE', 'NOT&nbsp;LIKE', 'COUNT', 'MAX', 'MIN', 'ON', 'AS', 'AVG', 'SUM', '(', ')' );
		
		if( $prefs[ 'show_queries' ] ){
			
			if( isset( $CI->db )){
				foreach ( $CI->db->queries as $key => $val ){
					$time = number_format( $CI->db->query_times[$key], 4 );

					foreach ( $highlight as $bold ){
						$val = str_replace( $bold, '<em>'.$bold.'</em>', $val );
					}

					$msg .= "<div class=\"sparkTracerQuery\"><strong>$time Secs</strong><br/>$val</div>";
				}
				
			}else{
				$msg .= 'Your Database has not been initialized at the time of this trace.';
			}
		}
		
		if( $prefs[ 'show_benchmarks' ] ){
			$profile = array();
			foreach ($CI->benchmark->marker as $key => $val){
				if ( preg_match("/(.+?)_end/i", $key, $match )){
					if ( isset( $CI->benchmark->marker[$match[1].'_end'] ) AND isset( $CI->benchmark->marker[$match[1].'_start'] )){
						$profile[$match[1]] = $CI->benchmark->elapsed_time( $match[1].'_start', $key );
					}
				}
			}
			
			foreach ($profile as $key => $value) {
				$msg .= "<div class=\"sparkTracerBenchmark\"><strong>$value Secs</strong><br/>$key</div>";
			}
		}
		

		$template = file_get_contents( 'sparks/tracer/' . $prefs[ 'version' ] . '/views/tracer_template.html' );
		$final_trace = str_replace( '{msg}', $msg, $template );
		
		if( !defined( 'TRACER_FIRED' )){
			define( 'TRACER_FIRED', TRUE );
			$file = 'sparks/tracer/' . $prefs[ 'version' ] . '/views/tracer_styles.html';
			echo file_get_contents( $file );
		}
		
		echo $final_trace;

		if( $exit ){
			exit();
		}
	}
}

