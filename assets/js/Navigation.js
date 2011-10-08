var Navigation = function(){

	this.build = function(){

		var loc = this;

		$( '#shareTab').click( $.proxy(this,'showShare') );
		$( '#twitterLink.showBuilds').click( $.proxy(this,'showTwitterBuilds') );

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


	this.showTwitterBuilds = function(){

		$('#twitterBuilds').show();
		$('#shareLinks').hide();

		this.showModal();
		return false;
	}

	this.showModal = function(){
		$( '#modal' ).topZIndex().show().click( function(){
			$( this ).hide();
			$( '#linkHolder' ).slideUp( 200 );
		});
		$( '#linkHolder' ).topZIndex().slideDown( 130 );
	}

	this.showShare = function(){

		$('#twitterBuilds').hide();
		$('#shareLinks').show();

		this.showModal();
		return false;
	}

	this.build();
}

