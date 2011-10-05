var Iframe = function(){
	
	
	this.build = function(){
		var head = $( 'head' );
		if( head.length == 0 ){
			$( 'html' ).prepend( '<head><title>CssIser.com</title></head>' ); 
			head = $( 'head' );
		}
		head.append( $('#cssizerStyles') );
	}
	
	this.build();
}


$( document ).ready( function(){
	new Iframe();
});