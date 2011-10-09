var Navigation = function(){

	this.build = function(){

		var loc = this;

		$( '#shareTab').click( $.proxy(this,'showShare') );
		$( '#twitterLink.showBuilds').click( $.proxy(this,'showTwitterBuilds') );
		$( '#crawlLink').click( $.proxy(this,'showCrawl') );

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
	
	this.showCrawl = function(){

		$('#crawler').show();
		$('#shareLinks,#twitterLinks').hide();

		this.showModal();
		return false;
	}


	this.showTwitterBuilds = function(){

		$('#twitterLinks').show();
		$('#shareLinks').hide();

		this.showModal();
		return false;
	}

	this.showModal = function(){
		// have to toggle the overflow css setting to allow to show the close button.
		$( '#modal,#closeOverlay' ).topZIndex().show().click( $.proxy(this,'hideModal'));
		$( '#linkHolder' ).topZIndex().css('overflow','hidden').slideDown( 130, function(){ $(this).css('overflow','visible'); } );
	}

	this.hideModal=function(){
		$( '#modal' ).hide();
		$( '#linkHolder' ).css('overflow','hidden').slideUp( 200 );
	}

	this.showShare = function(){

		$('#twitterLinks').hide();
		$('#shareLinks').show();

		this.showModal();
		return false;
	}

	this.build();
}

