<!-- THE NAVIGATION TABS AT TOP OF PAGE -->
<div id="cssTabs" class="cssizer_tabs">
	<a href="#" id="htmlCodeTab" class="buttonLink">HTML &lt;&nbsp;&gt;</a>
	<a href="#" id="cssCodeTab" class="buttonLink">CSS {&nbsp;}</a>
	<a href="#" id="htmlVisualTab" class="unsaved buttonLink">Save Changes</a>	
	
	<!-- VALIDATE AND SHARE LINKS -->
	<? if( $build[ 'default' ] != TRUE and $build[ 'mode' ] == 'edit' ): ?>
		<a href="http://validator.w3.org/check?uri=http%3A%2F%2F<?= PRODUCTION_DOMAIN ?>%2Fbuild%2Fpreview%2F<?=$build['view_key']?>" target="_blank" id="htmlValidateTab"  class="buttonLink">W3C Validate</a>
		<a href="#" id="shareTab" class="buttonLink">Share</a>
	<? endif ?>
	
	<!-- TWITTER BUILDS IF LOGGED IN / LOGIN LINK IF NOT -->
	<div id="twitterBox">
  	<? if( !isset($twitter_profile_image_url) ): ?>
  	  <!-- NOT LOGGED INTO TWITTER -->
  	  <a href="/twitter/login" id="twitterLink" class="buttonLink twitterLink">Login With Twitter</a>
  	<? else: ?>
  	  <!-- IS LOGGED INTO TWITTER -->
  	  <img class="twitterIcon" src="<?= $twitter_profile_image_url ?>" />
  	  <a href="#" id="twitterLink" class="showBuilds buttonLink twitterLink">@<?= $twitter_screen_name ?>&#x27;s builds</a>
	  <? endif ?>
	</div>
	
	<!-- CSSIZER VERSION NUMBER -->
	<div id="versionNum">v<?= VERSION; ?></div>
</div>