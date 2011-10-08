<?php

	class Twitter extends CI_Controller {
		
		function __construct()
		{
			parent::__construct();
			// Enabling debug will show you any errors in the calls you're making, e.g:
			$this->tweet->enable_debug(TRUE);
			
			if ( !$this->tweet->logged_in() )
			{
				$this->tweet->set_callback(site_url('twitter/auth'));
				$this->tweet->login();
			}
			else
			{
				// You can get the tokens for the active logged in user:
				$tokens = $this->tweet->get_tokens();
				//$user = $this->tweet->call('get', 'account/verify_credentials');
			}
			
      // redirect('/');
		}

    function index()
    {
      
    }
		
		function auth()
		{
			$tokens = $this->tweet->get_tokens();
			//$user = $this->tweet->call('get', 'account/verify_credentials');
			redirect('/');
		}
	}