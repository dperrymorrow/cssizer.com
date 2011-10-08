<!-- css code and preview -->
<div id="modal"></div>
  <div id="linkHolder">
    <div id="shareLinks">
      <h2>Share Your Build</h2>
      <? if( $build[ 'default' ] != TRUE ): ?>
      	<? if( $build[ 'mode' ] == 'edit' ): ?>

      	<label>Read/Write Url:</label>
      	<input type="text" name="some_name" class="roundedAll" value="<?= site_url( $build[ 'edit_key']) ?>" />
      	<br/>
      	<label>Read Only Url:</label>
      	<input type="text" name="some_name" class="roundedAll" value="<?= site_url( $build[ 'view_key']) ?>" />
      	<br/>
      	<label>Full Preview Url:</label>
      	<input type="text" name="some_name" class="roundedAll" value="<?= site_url( 'build/preview/'.$build[ 'view_key']) ?>"/>

      	<? endif ?>
      <? else: ?>

      Make some changes then save. Then you will have your own version of this build and you can share your creation. 

      <? endif; ?>
    </div>
    <div id="twitterBuilds">
        <h2>Builds Linked to @<?=$twitter_screen_name ?></h2>
    <? 
    if ( isset($twitter_screen_name )):
    foreach ($users_builds as $u_build ):
    ?>
    <div class="twitterBuild">
      <a href="/<?= $u_build['edit_key'] ?>"><?= $u_build['edit_key'] ?></a>
    </div>
    <?
    endforeach;
    endif;
    ?>
    </div>
  </div>
</div>