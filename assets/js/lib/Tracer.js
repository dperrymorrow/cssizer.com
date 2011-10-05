var Tracer = {}; 

Tracer.isFullscreen = false; 
Tracer.isBuilt = false; 
Tracer.enabled = true; 
Tracer.globalEnable = true; 

Tracer.styles = '<style type="text/css" media="screen">' + 
'#tracer{display:none;border:10px solid #333;color:black;width:200px;position:fixed;background-color:#d6d2b4;height:auto;overflow:hidden;top:0px;right:0px;padding:8px;z-index: 900000000;}'+ 
'#tracer #tracer_Kill, #tracer #tracer_Toggle, #tracer #tracer_Close,#tracer #tracer_Clear{width:49%;display:inline-block;float:left;color:white;padding:4px 0 4px 0;text-align:center;height:auto;font-family:Monaco,sans-serif;font-size:12px;font-weight:normal;background-color:#d87721;margin:0 1px 1px 0;cursor:pointer;}' + 
'#tracer #tracer_Kill{background-color:#d83721;}' +  
'#tracer #tracer_Clear{background-color:#61b3c5;}' + 
'#tracer #tracer_Toggle{background-color:#7baf77;}' +  
'#tracer textarea{' + 
'width:180px;height:150px;font-size:13px;font-weight:normal;color:#7ad066;padding:10px;background-color:black;border:none;font-family:Monaco,sans-serif;}</style>'; 

Tracer.module = '<div id="tracer"><textarea id="tracer_Output" class="wmd-ignore"></textarea><div id="tracer_Clear">Clear</div><div id="tracer_Close">Close</div><div id="tracer_Kill">Kill</div><div id="tracer_Toggle">Fullscreen</div></div>'; 


Tracer.build = function(){ 

	Tracer.isBuilt = true; 
	
	$( window ).resize( function(){ 
		if( Tracer.isFullscreen ){ 
			Tracer.fullscreen(); 
		} 
	}); 

	$( 'body' ).append( this.styles ); 
	$( 'body' ).append( this.module ); 

	var loc = this; 

	$( '#tracer_Clear' ).click( function(){  
		$( '#tracer_Output' ).val( '' );  
		return false; 
	}); 

	$( '#tracer_Toggle' ).click( function(){  
		if ( loc.isFullscreen == false ){ 
			loc.fullscreen(); 
		}else{ 
			loc.normal(); 
		} 
		return false; 
	}); 

	$( '#tracer_Close' ).bind( 'click', function(){  
		$( '#tracer' ).hide( 100 );  
		return false; 
	}); 

	$( '#tracer_Kill' ).bind( 'click', function(){  
		$( '#tracer' ).hide( 100 );  
		loc.enabled = false; 
		return false; 
	}); 
} 

Tracer.fullscreen = function(){ 

	// Tracer.trace( this ) 

	Tracer.trace( 'fullscreen called') 

	Tracer.isFullscreen = true; 

	Tracer.trace( $( '#tracer' ).length ) 

	$( '#tracer' ).width( $( window ).width() - 35 ).height( 'auto' ); 
	$( '#tracer_Output' ).width( $( window ).width() - 55 ).height( $( window ).height() - 105 ); 
	Tracer.scrollToEnd(); 

} 

Tracer.normal = function(){ 
	Tracer.isFullscreen = false; 
	$( '#tracer_Output' ).height( 150 ).width( 180 ); 
	$( '#tracer' ).width( 200 ).height( 'auto' ); 

	Tracer.scrollToEnd(); 
} 

Tracer.scrollToEnd = function(){ 
	$( '#tracer_Output' ).attr({ scrollTop: $( '#tracer_Output' ).attr( 'scrollHeight' ) }); 
} 

Tracer.trace = function( str ){ 
	
	try{
		if( ENV != 'development' ){
			this.globalEnable = false;
		}
	}catch(err){

	}


	if( this.enabled == true && this.globalEnable == true ){ 

		if( this.isBuilt == false ){ 
			this.build(); 
		}  

		if( typeof( str ) == 'object' ){ 
			str = Tracer.traceObj( str ); 
		} 

		str += "\n--------------\n"; 

		$( '#tracer' ).show( 200 ); 
		$( '#tracer_Output' ).val( $( '#tracer_Output' ).val() + str ); 
		this.scrollToEnd(); 
	} 
} 

Tracer.traceObj = function(obj){ 
	var returnStr = '[Object]{' + "\n"; 
	for (var key in obj ){ 

		if( typeof( obj[ key ] ) == 'object' ){ 
			var val = Tracer.traceObj( obj[ key ] ); 
		}else{ 
			val = obj[ key ]; 
		} 

		returnStr += ( '    ' + key + " = " + val + "\n" ); // "User john is #234" 
	}  
	returnStr += '}'; 
	return returnStr; 
}