<!DOCTYPE HTML>
<html lang=en>
<head>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8">
	<title>Cssizer.com | Real Time CSS Editing</title>

	<meta name="keywords" content="CSS Editor, HTML validation, CSS Validaton, Cloud CSS Editor, CSS debugger">

	<link rel="stylesheet" href="/assets/css/reset.css" type="text/css" media="screen" title="no title" charset="utf-8">
	<link rel="stylesheet" href="/assets/css/framework.css" type="text/css" media="screen" title="no title" charset="utf-8">
	<link rel="stylesheet" href="/assets/components/CodeMirror-2.0/lib/codemirror.css">
	<link rel="stylesheet" href="/assets/components/CodeMirror-2.0/mode/css/css.css">
	<link rel="stylesheet" href="/assets/components/CodeMirror-2.0/mode/xml/xml.css">
	<link rel="stylesheet" href="/assets/css/app.css" type="text/css" media="screen" title="no title" charset="utf-8">
  
  
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	<script src="/assets/js/lib/LazyLoad.js" type="text/javascript" charset="utf-8"></script>
	<script src="/assets/js/Base.js" type="text/javascript" charset="utf-8"></script>


	<script type="text/javascript">
	<? if( ENVIRONMENT != 'development' ):?>
	var _gaq = _gaq || []; _gaq.push(['_setAccount', 'UA-22564934-1']); _gaq.push(['_trackPageview']); (function() { var ga = document.createElement('script'); 	ga.type = 'text/javascript'; ga.async = true; ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); })();
	<? endif; ?>
	</script>

</head>
<body>
  <a href="https://github.com/dperrymorrow/cssizer.com" class="github" target="new"></a>
	<div id="resizeHandle"><img src="/assets/img/dragger.gif" id="dragIcon" width="10" height="30" alt="Dragger"></div>
	<div id="preloader" class="roundedAll">Saving...</div>
	<!-- css code and preview -->
<? 
$this->load->view( '_links' ); 
$this->load->view( '_nav' ); 
?>





<div id="htmlEditor">
	<!-- html code and preview -->
	<div id="docSelect">
	<?= form_dropdown('doctype', doctype_labels(), $build['doctype'], 'id="docType"' ) ?>
	</div>
	
	<textarea id="htmlCode"><?= $build['html'] ?></textarea>
	
</div>

<div id="cssEditor">
	<textarea id="cssCode"><?= $build['css'] ?></textarea>
</div>

<div id="htmlVisualContainer">
	<div id="iframeCover"></div>
	<div id="selectorContainer"></div>
	<iframe id="htmlPreview" src="/build/iframe/<?= $build['id'] ?>"></iframe>
</div>

<script type="text/javascript" charset="utf-8">
<? if( $build[ 'mode' ] == 'edit' ): ?>
Base.init( "<?= $build[ 'edit_key'] ?>", "<?= $build[ 'view_key'] ?>", "<?= $build[ 'default' ] ?>", "<?= ENVIRONMENT ?>" )	
<? else: ?>
Base.init( "", "<?= $build[ 'view_key'] ?>", <?= $build[ 'default' ] ?>, "<?= ENVIRONMENT ?>" )	
<? endif; ?>
</script>

</body>
</html>