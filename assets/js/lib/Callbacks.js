
var Callbacks = {};
Callbacks.triggers = {};

Callbacks.addCallback = function( trigger, instance, method ){

	if( this.triggers[ trigger ] == undefined ){
		this.triggers[ trigger ] = Array( { obj:instance, action:method } );
	}else{
		this.triggers[ trigger ].push( { obj:instance, action:method } );
	};
};

Callbacks.fireCallback = function( trigger, param ){
	
	if( this.triggers[ trigger ] == undefined ){
	//	Tracer.trace( 'no callbacks for trigger ' + trigger );
		return;
	};
	
	for (var i=0; i < this.triggers[ trigger ].length; i++) {
		var listener = this.triggers[ trigger ][ i ];
		
		if( listener.action != undefined ){
			listener.obj[ listener.action ]( param );
		}
	};
	
	
};