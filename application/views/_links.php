<!-- css code and preview -->
<div id="modal"></div>
  <div id="linkHolder">

    <!-- LINKS TO SHARE THE BUILD -->
    <div id="shareLinks">
      <h2>Share Your Build</h2>

      <!-- CHECK TO SEE IF HAVE RIGHTS TO SHARE THE BUILD -->
      <? if( $build[ 'default' ] != TRUE and $build[ 'mode' ] == 'edit' ): ?>
      	<label>Read/Write Url:</label>
      	<input type="text" name="some_name" class="roundedAll" value="<?= site_url( $build[ 'edit_key']) ?>" />
      	<br/>
      	<label>Read Only Url:</label>
      	<input type="text" name="some_name" class="roundedAll" value="<?= site_url( $build[ 'view_key']) ?>" />
      	<br/>
      	<label>Full Preview Url:</label>
      	<input type="text" name="some_name" class="roundedAll" value="<?= site_url( 'build/preview/'.$build[ 'view_key']) ?>"/>
    	<? else: ?>
        <!-- THEY DONT HAVE THE RIGHTS TO SHARE THE BUILD, ITS DEFAULT, OR NOT THIERS -->
        Make some changes then save. Then you will have your own version of this build and you can share your creation.
      <? endif ?>
    </div>

    <!-- BUILDS ASSOCIATED WITH THE CURRENT LOGGED TWITTER ACCOUNT -->
    <div id="twitterLinks">

      <? if ( isset($twitter_screen_name )): ?>
        <img class="twitterIcon" src="<?= $twitter_profile_image_url ?>" />
      <? endif ?>
      <h2>Builds Linked to @<?=$twitter_screen_name ?></h2>
      <div id="twitterBuilds">
        <? if ( isset($twitter_screen_name )): ?>
          <? foreach ($users_builds as $u_build ): ?>
            <div class="twitterBuild" class="<?= is_current_build($u_build['edit_key'])?>">
              <div class="per15">
                <a href="/<?= $u_build['edit_key'] ?>"><?= $u_build['edit_key'] ?></a>
              </div>
              <div class="per15">
                <?= $u_build['views']?> views
              </div>
              <div class="per15">
                <?= $u_build['edits']?> edits
              </div>

              <div class="per25">
                <?= unix_to_human($u_build['modified']) ?>
              </div>

              <div class="per25">
                <div class="status">Saving...</div>
                <input class="buildNameInput" type="text" name="name" data-id="<?=$u_build['id']?>" value="<?= htmlentities($u_build['name']) ?>" />
              </div>

            </div>
          <? endforeach ?>
        <? endif ?>
      </div>
      <a href="/twitter/logout" class="buttonLink twitterLink" id="logout">Logout of Twitter</a>
    </div>

    <!-- THE CRAWLER -->
    <!-- <div id="crawler">
      <h2>Create a Build from URL <em>(Experimental)</em></h2>
      <?= form_open("build/crawl") ?>
        <label>http://</label>
        <input type="text" name="url" value="" />
        <input type="submit" name="submit" value="Crawl Url" />
      </form>
    </div> -->
    <!-- THE CLOSE WINDOW BUTTON -->
    <div id="closeOverlay">x</div>
  </div>
</div>


