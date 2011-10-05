<?php

class MY_Model extends CI_Model {
	protected $_table = null;
	public $data = array();
	public $strip_tags = TRUE;
	public $xss_clean = TRUE;

	function __construct(){
		parent::__construct();

//		$this->load->helper( 'model' );
		$this->load->database();

		if( $this->_table == null ){
			$arr = explode( '_', strtolower(get_class($this))  );
			$this->load->helper( 'inflector' );
			$this->_table = plural( $arr[ 0 ] );
		}

		// only set your rules if the controller maps to your class name
		if( $this->router->fetch_class() == singular( $this->_table )){
			$this->set_validation();
		}
	}

	function get_all( $order=null ){

		if( $order != null ){
			$this->db->order_by( $order );
		}

		$q = $this->db->get( $this->_table );
		return $q->result_array();


	}

	function change_table( $table ){
		$this->_table = $table;
	}


	function get_by_id( $id ){
		$q = $this->db->where( 'id', $id )->limit( 1 )->get( $this->_table );
		return $q->row_array();
	}

	function get_by_field_value( $field, $value, $single=TRUE ){

		$this->db->where( $field, $value );
		if( $single ){
			$this->db->limit( 1 );
		}

		$q = $this->db->get( $this->_table );

		if( $single ){
			return $q->row_array();
		}else{
			return $q->result_array();
		}
	}

	function delete( $id ){
		if( method_exists( $this, 'before_delete' )){
			$this->before_delete( $id );
		}

		$this->db->where( 'id', $id )->delete( $this->_table );
	}

	function insert( $data ){

		if( method_exists( $this, 'before_insert' )){
			$data = $this->before_insert( $data );
		}

		$data = $this->prep_data( $data );
		$this->db->insert( $this->_table, $data );

		$data['id'] =  $this->db->insert_id();


		if( method_exists( $this, 'after_insert' )){
			$data = $this->after_insert( $data );
		}

		$this->data = $data;

		return $data['id'];
	}

	function update( $data ){
		//		trace( $data, true );

		if( method_exists( $this, 'before_update' )){
			$data = $this->before_update( $data );
		}

		$data = $this->prep_data( $data );
		if( !isset( $data[ 'id' ] )){
			show_error('you cannot update a row without an id', 500 );
		}
		$id = $data[ 'id' ];
		unset( $data[ 'id' ] );
		$this->db->where( 'id', $id )->update( $this->_table, $data );

		$data[ 'id' ] = $id;

		if( method_exists( $this, 'after_update' )){
			$data = $this->after_update( $data );
		}

		$this->data = $data;

		return $data;

	}

	function prep_data( $data ){

		$item = array();
		//	$CI->db->start_cache();
		$fields = $this->db->list_fields( $this->_table );
		//	$CI->db->stop_cache();

		foreach ($fields as $field){

			if( isset( $data[ $field ] )){
				$val = $data[ $field ];

				if( $this->strip_tags ){ 
					$val = strip_tags( $val ); 
				}

				$item[ $field ] = $val;
			}
		}

		return $item;
	}


function set_validation(){


	$method = $this->router->fetch_method();
	$function = $method.'_validation';

	if( method_exists( $this, $function ) ){
		$this->$function();
	}

}

}