var Base={};

Base.htmlLine = 0;
Base.cssLine = 0;

Base.html = '';
Base.editKey = '';
Base.viewKey = '';
Base.isDefault = '';
Base.environment = '';

Base.headerOffset = 36;
Base.minWidth = 100;

Base.selector = {};
Base.css = '';
Base.rawHtml = '';
Base.formattedHtml = '';
Base.css_editor = null;
Base.html_editor = null;

Base.requiredJs = [	
					'/assets/js/lib/jquery-ui-1.8.11.custom.min.js',
					'/assets/js/lib/topZIndex.js',
					'/assets/js/lib/Callbacks.js',
					'/assets/js/HtmlView.js',
					'/assets/js/Iframe.js',
					'/assets/js/Selector.js',
					'/assets/js/Navigation.js',
					'/assets/components/CodeMirror-2.0/lib/codemirror.js',
				   '/assets/components/CodeMirror-2.0/mode/css/css.js',
					'/assets/components/CodeMirror-2.0/mode/xml/xml.js'
					];


Base.init = function( editKey, viewKey, isDefault, environment ){
	
	this.editKey = editKey;
	this.viewKey = viewKey;
	this.isDefault = isDefault;
	this.environment = environment;
	
	// load the needed js files.
	
	document.getElementsByTagName('body')[0].style.display = 'none';
	
	LazyLoad.js( this.requiredJs, function () {
	  Base.run();
	});
}

Base.run = function(){
	
	$( 'body' ).show();
	
	var loc = this;
	this.cssInput = $( '#cssCode' );
	this.htmlInput = $( '#htmlCode' );
	
	$( window ).resize( function(){
			var handle = $( '#resizeHandle' );
			var pos = handle.position();
			
			// set the two editors width
			$( '#htmlEditor,#cssEditor' ).width( pos.left );
			// set the preview width
			$( '#htmlVisualContainer,#selectorContainer' ).width( $( window ).width() - pos.left - handle.width() );
			// set the height
			$( '.CodeMirror,#htmlEditor,#cssEditor,#htmlVisualContainer,#htmlPreview' ).height( $( window ).height() - loc.headerOffset  );
			// offset the preview to the left
			$( '#htmlVisualContainer').css( 'left', pos.left + handle.width() +  'px');
			
	});
	
	
	
	$( 'input', '#linkHolder').click( function(){
		this.select();
	});
	
	$( '#resizeHandle' ).draggable({ 	axis:'x', 
										containment:'body', 
										start:function( evetn, ui ){
											$( '#iframeCover' ).show();
											$('#selectorContainer').hide();
										},
										drag: function(event, ui){ 
											$( window ).resize();
										},
										stop: function(){
											$( window ).resize();
											$( '#iframeCover' ).hide();
										}
									});
	
	HtmlView.build();
	
	this.selector = new Selector();
	this.nav = new Navigation();
	this.setupCodeBlocks();
		
	$( '#cssEditor').topZIndex();

	$( window ).resize();
}

Base.showLoading = function(){
	$( '#preloader' ).show( 'fast' );
}

Base.hideLoading = function(){
	$( '#preloader' ).delay( 200 ).fadeOut( 300 );
}

Base.setupCodeBlocks = function(){
	
	var loc = this;
	
	this.css_editor = CodeMirror.fromTextArea(document.getElementById("cssCode"), {
		lineNumbers: true,
		electricChars:true,
		matchBrackets:true,
		indentUnit:1,
		mode:'css',
		
		onCursorActivity:function(){
			Base.css_editor.setLineClass( Base.cssLine, null);
		    Base.cssLine = Base.css_editor.setLineClass(Base.css_editor.getCursor().line, "activeline");
			Callbacks.fireCallback( 'lineChange', null );
			HtmlView.codeChange();
		}
	});

	this.html_editor = CodeMirror.fromTextArea(document.getElementById("htmlCode"), {
		lineNumbers: true,
		electricChars:true,
		matchBrackets:true,
		htmlMode:true,
		indentUnit:1,
		mode:'xml',	
		
		onCursorActivity:function(){
			Base.html_editor.setLineClass( Base.htmlLine, null);
			Base.htmlLine = Base.html_editor.setLineClass( Base.html_editor.getCursor().line, "activeline");
			HtmlView.codeChange();
		}
	});
	
	this.cssLine = this.css_editor.setLineClass(0, "activeline");
	this.htmlLine = this.html_editor.setLineClass(0, "activeline");
}