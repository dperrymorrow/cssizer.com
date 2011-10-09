<?php

if (! defined('BASEPATH')) exit('No direct script access');

class Build extends MY_Controller {



	public $build = array();

	//php 5 constructor
	function __construct() 
	{
		parent::__construct();
		$this->load->model( 'build_model' );
		$this->load->helper( array( 'url', 'form', 'doctype', 'strip', 'security', 'date', 'build' ));
		$this->load->library( array( 'security','docbuilder' ) );

	}
  

	function router()
	{

		$key = $this->uri->segment( 1 );

		if( !empty( $key ))
		{
			$this->build = $this->build_model->find_by_key( $key);
			if( empty($this->build) )
			{
				redirect( '' );
			}
			else
			{
				$data[ 'build' ] = $this->build;
				$data = $this->_get_twitter_info($data);
				$this->build_model->update_views( $data[ 'build' ] );
				$this->load->view( 'cssizer.php', $data );
			}
		}
		else
		{
			$this->index();
		}
	}

	function index()
	{

		$data[ 'build' ] = $this->build_model->get_by_field_value( 'default', TRUE );
		$data[ 'build' ][ 'mode' ] = 'view';
    $data = $this->_get_twitter_info($data);
		//	trace( $data, true  );

		$this->load->view( 'cssizer', $data );
	}

  
  function update_name()
  {
    $success = $this->build_model->update_name($_POST);
    echo json_encode(array('success'=>$success));
    exit;
  }


	function insert()
	{
		$this->build_model->insert( $_POST );
		$new_build = $this->build_model->data;
		// shouldnt i just redirect?
		$this->output->set_output( $new_build[ 'edit_key' ] );
	}

	function iframe( $id=NULL )
	{
		// were gonna do curl w3 validation here...
		$build = $this->build_model->get_by_id( $id );

		if( empty( $build ))
		{
			redirect( '' );
		}
		else
		{
			$this->render_html( $build );
		}
	}


	function render_html( $build )
	{

		$build[ 'html' ] = $this->docbuilder->build_document( $build );
		$data[ 'build' ] = $build;
		$this->load->view( 'iframe', $data );
	}



	function clean( $edit_key )
	{

		$build = $this->build_model->find_by_key( $edit_key );	

		if ( extension_loaded('tidy') )
		{

			$config = array(
				'indent'         	=> true,
				'output-xhtml'  	=> doc_is_xml( $build[ 'doctype' ] ),
				'wrap'           	=> 0,
				'tab-size'			=> 30,
				'char-encoding'		=> 'utf8',
				//'show-body-only' 	=> true, 
			'doctype'			=> tidy_doctype( $build[ 'doctype' ] )

				);


			$build[ 'html' ] = $this->build_document( $build );
			// Tidy
			$tidy = new tidy;
			$tidy->diagnose( $build[ 'html' ], $config, 'utf8');
			//		$tidy->cleanRepair();

			echo '<h1>Errors</h1>';
			echo tidy_doctype( $build[ 'doctype' ])."\n";
			echo htmlentities($tidy->errorBuffer);
			echo "\n-------------------------\n";
			echo $build[ 'html' ];
		}

	}

	function update()
	{
		$_POST[ 'id' ] = $this->build_model->get_id_from_key( $_POST[ 'edit_key' ] );
		$this->build_model->update( $_POST );
		$this->output->set_output( json_encode( $this->build_model->data ) );
	}


	function preview( $view_key )
	{
		$build = $this->build_model->get_by_field_value( 'view_key', $view_key );

		if( empty( $build ))
		{
			redirect( '' );
		}
		else
		{
			$this->render_html( $build );
		}
	}
	
	function crawl()
	{
	  if( !empty($_POST['url']))
	  {
	    
	    $data = crawl_url($_POST['url']);
	    
	    $this->build_model->insert( $data );
		  $new_build = $this->build_model->data;
		  redirect("/".$new_build['edit_key']);
	  }
	}
	
	
	protected function _get_twitter_info($obj)
	{
	  if ( $this->tweet->logged_in() )
      {
        $tokens = $this->tweet->get_tokens();
        $user = $this->tweet->call('get', 'account/verify_credentials');
        
        $q = $this->db->where( 'twitter_id_str', $user->id_str )->order_by('modified','DESC')->get( 'builds' );
        $obj['users_builds'] = $q->result_array();
        
        $obj['twitter_screen_name'] = $user->screen_name;
        $obj['twitter_id_str'] = $user->id_str;
        $obj['twitter_profile_image_url'] = $user->profile_image_url;
        return $obj;
      }
      else
      {
        return $obj;
      }
	}

}
