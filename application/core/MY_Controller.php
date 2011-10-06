<?php

if (! defined('BASEPATH')) exit('No direct script access');

class MY_Controller extends CI_Controller {

	//php 5 constructor
	function __construct() 
	{
		parent::__construct();
		$this->load->spark( 'tracer/0.5' );
		
		
	}
	


}