var Selector = function(){
	
	this.iframe = {};
	this.curSelector = '';
	this.container = {};
	this.highlightDiv = '<div class="cssizerHighlight"></div>';
	
	this.build = function(){
		this.iframe = $( '#htmlPreview');
		this.container = $('#selectorContainer');
		Callbacks.addCallback( 'lineChange', this, 'highlight' );
		this.container.topZIndex();
		
		this.container.hide();
	}
	
	this.highlight = function(obj){
		

		if( !$( '#htmlVisualContainer' ).is( ':visible' ) ){
			return;
		}

		var lineNum = Base.css_editor.getCursor().line; 
		var curLineVal = Base.css_editor.getLine( lineNum );
		var lines = $( '#cssEditor pre');

		if( curLineVal.indexOf('{') == -1 ){

			for (var i=lineNum; i > -1; i--) {
				var curLine = Base.css_editor.getLine( i ).trim();

				if( curLine.indexOf('{') != -1 ){
					this.focusSelector( this.cleanLine( curLine ) );
					break;
				}
			};
		}else{
			this.focusSelector( this.cleanLine( curLineVal )  );
		}
	}

	this.focusSelector = function( selector ){

		if( this.selector != selector ){
			this.container.show().html('');
			var loc = this;
			
			var frameBody = this.iframe.contents().find('body');
			
			var offsetLeft =  parseInt(frameBody.css('margin-left'));
			var offsetTop = parseInt(frameBody.css('margin-top')) ;
			
			this.iframe.contents().find(selector).each( function(index){
				
	
				var pos = $( this ).offset();
				var highlight = $( loc.highlightDiv );
				
				var left = pos.left ;
				var top = pos.top;
				
				if( selector == 'body' ){
					top += offsetTop;
					left += offsetLeft;
				}
				
				var height = $(this).height() + 
							parseInt($(this).css('padding-top')) + 
							parseInt($(this).css('padding-bottom'));
							
				var width = $(this).width() + parseInt($(this).css('padding-right')) + parseInt($(this).css('padding-left'));
				
				
				loc.container.append( highlight );
				highlight.css( 'left', left + 'px' ).css( 'top', top + 'px' ).width( width ).height( height );
				highlight.append( '<div class="selectorName">' + selector + '</div>' );
				
				highlight.delay( 600 ).fadeOut( 1200 );
			
			});
			
			
			this.selector = selector;
		}
	}

	this.cleanLine = function( str ){

		var val = str.replace( '{', '' );
		val = val.trim();
		return val;
	}
	
	this.build();

	
}