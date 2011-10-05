var Navigation = function(){
	
	this.build = function(){
		
		var loc = this;
		
		$( '#shareTab').click( function(){
			loc.showShare();
		});

		$( '#htmlCodeTab' ).click( function(){
			$( this ).parent().find( 'a' ).removeClass( 'active' );
			$( this ).addClass( 'active' );
			
			$( '#htmlEditor').show();
			$( '#cssEditor').hide();

			return false;
		});
		
		$( '#cssCodeTab' ).click( function(){
			$( this ).parent().find( 'a' ).removeClass( 'active' );
			$( this ).addClass( 'active' );
			$( '#htmlEditor').hide();
			$( '#cssEditor').show();

			return false;
		});
		
		
		$( '#cssCodeTab').addClass('active');
		$( '#htmlVisualTab').hide();
		
		$('#htmlVisualTab').click( function(){
			Callbacks.fireCallback('update_html_view', null);
			return false;
		});
		
	}
	
	
	
	
	
	this.showShare = function(){
		
		$( '#modal' ).topZIndex().show().click( function(){
			$( this ).hide();
			$( '#linkHolder' ).slideUp( 200 );
		});
		$( '#linkHolder' ).topZIndex().slideDown( 130 );
	}
	
	this.build();
}

