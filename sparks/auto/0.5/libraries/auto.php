<?php 



class Auto{

	public static $CI;
	public static $instance;

	////////// INSTANCE METHODS //////////

	public function __construct(){
		self::$CI = &get_instance();
		self::$instance = $this;
		self::$CI->load->helper( array('file', 'inflector') );
		
		spl_autoload_register('Auto::load_helper_class'); // As of PHP 5.3.0
	}
	
	
	public static function load_helper_class( $class )
	{

		$helper_name = underscore( humanize( $class ) );
		
		if( strpos( $class, 'helper' ) === FALSE )
		{
			$helper_name = $helper_name . '_helper';
		}

		if( file_exists( 'system/helpers/'.$helper_name.'.php' ) or file_exists( APPPATH.'helpers/'.$helper_name.'.php' ))
		{
			self::load_helper( $helper_name );
			class_alias('Auto', $class );
		}
	}

	public function __get( $varname ){

		$varname = strtolower( $varname );

		if( isset( self::$CI->$varname ) ){
			return self::$CI->$varname;
		}

		if( file_exists( 'sparks/'.$varname )){

			$list = get_dir_file_info( 'sparks/' . $varname );
			$key = key( array_reverse($list) ); 
			self::$CI->load->spark( $varname.'/'.$key );

			}else if( strpos( $varname, '_model' ) !== FALSE ){
				self::$CI->load->model( $varname );
			}else{
				self::$CI->load->library( $varname );
			}
			
			if( isset(self::$CI->$varname) ){
				return self::$CI->$varname;
			}else{
				return self::$CI;
			}


		}

		//////// STATIC METHODS ///////////

		public static function inst(){
			$CI = &get_instance();
			return $CI->auto;
		}

		public static function load_helper( $helper_name ){
			self::$CI->load->helper( $helper_name );
		}
		
		public static function __callStatic( $method, $params=null ){
		
			$len = count( $params );

			switch ($len) {
				case 0:
				return $method(); 
				break;
				case 1:
				return $method( $params[ 0 ] ); 
				break;
				case 2:
				return $method( $params[ 0 ], $params[ 1 ] );
				break;
				case 3:
				return $method( $params[ 0 ], $params[ 1 ], $params[ 2 ] );
				break;
				case 4:
				return $method( $params[ 0 ], $params[ 1 ], $params[ 2 ], $params[ 3 ] );
				break;
				case 5:
				return $method( $params[ 0 ], $params[ 1 ], $params[ 2 ], $params[ 3 ], $params[ 4 ] );
				break;
			}
		}



}
