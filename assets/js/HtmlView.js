var HtmlView = {};
HtmlView.iframe      = null;
HtmlView.htmlDirty   = false;
HtmlView.cssDirty    = false;
HtmlView.cssCode     = '';
HtmlView.htmlCode    = '';
HtmlView.saveTab     = null;
HtmlView.highlighter = null;

HtmlView.build = function(){

	this.iframe = $( '#htmlPreview');
	Callbacks.addCallback( 'update_html_view', this, 'update' );

	this.saveTab = $( '#htmlVisualTab' );

	$( '#docType' ).change( function(){
		HtmlView.unsaved = true;
		HtmlView.codeChange( null );
		HtmlView.saveTab.html( 'Save Changes' ).addClass( 'unsaved' );
	});
};

HtmlView.codeChange = function( obj ){
	var styles = Base.css_editor.getValue();
	var html = Base.html_editor.getValue();

	if( this.cssCode === '' ){
		this.cssCode = styles;
	}

	if( this.htmlCode === '') {
		this.htmlCode = html;
	}

	if( styles !== this.cssCode ) {
		this.cssDirty = true;
		//console.log( 'dirty')
	}else{
		//console.log('clean')
		this.cssDirty = false;
	}


	if( html != this.htmlCode ){
		this.htmlDirty = true;
	}else{
		this.htmlDirty = false;
	}

	if( $( '#htmlVisualContainer' ).is( ':visible' ) ){
		this.iframe.contents().find( '#cssizerStyles' ).html( styles );
		this.iframe.contents().find('body').html( html );
	}

	if( this.htmlDirty || this.cssDirty || this.unsaved ){
		$( '#cssValidateTab,#shareTab,#htmlValidateTab' ).hide( 100 );
		this.saveTab.show( 200 );
	}else{
		$( '#cssValidateTab,#shareTab,#htmlValidateTab' ).show( 100 );
		this.saveTab.hide( 200 );
	}
};

HtmlView.update = function( obj ){

	$( '#cssValidateTab,#htmlValidateTab,#shareTab' ).show( 100 );

	if( this.htmlDirty || this.cssDirty || this.unsaved ){

		this.htmlDirty = false;
		this.cssDirty = false;

		Base.showLoading();

		var loc = this;

		var styles = Base.css_editor.getValue();
		var html = Base.html_editor.getValue();

		if( Base.editKey !== '' ){

			$.ajax({
				type: 'POST',
				url: '/build/update',

				data: {
					css: styles,
					csrf_token_name: $("input[name=CSSIZER]").val(),
					html: html,
					doctype: $( '#docType' ).val(),
					edit_key: Base.editKey
				},

				success: function( data ){
					loc.saveTab.hide( 200 );
					loc.unsaved = false;
					Base.hideLoading();
					loc.iframe.attr( "src", loc.iframe.attr("src"));

					var json = jQuery.parseJSON( data );

					loc.htmlCode = json.html;
					loc.htmlCode = json.html;
					loc.cssCode = json.css;

					Base.css_editor.setValue( json.css );
				},
			});

		} else {

			$.ajax({
				type: 'POST',
				url: '/build/insert',
				data: {
					csrf_token_name: $("input[name=CSSIZER]").val(),
					doctype: $( '#docType' ).val(),
					css: styles,
					html: html
				},
				success: function( key ){
					window.location.href = "/" + key;
				}
			});
		}
	}
};
