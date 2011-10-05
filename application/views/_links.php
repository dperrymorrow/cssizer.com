<!-- css code and preview -->
<div id="modal"></div>
  <div id="linkHolder">
  <? if( $build[ 'default' ] != TRUE ): ?>
  	<? if( $build[ 'mode' ] == 'edit' ): ?>

  	<label>Read/Write Url:</label>
  	<input type="text" name="some_name" class="roundedAll" value="<?= site_url( $build[ 'edit_key']) ?>" >
  	<br/>
  	<label>Read Only Url:</label>
  	<input type="text" name="some_name" class="roundedAll" value="<?= site_url( $build[ 'view_key']) ?>" >
  	<br/>
  	<label>Full Preview Url:</label>
  	<input type="text" name="some_name" class="roundedAll" value="<?= site_url( 'build/preview/'.$build[ 'view_key']) ?>" >

  	<? endif ?>
  <? else: ?>

  Make some changes, save, and then you can share your creation. 

  <? endif; ?>

</div>