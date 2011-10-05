<?php


function get_doctype( $key ){
	
	$doctypes =  array( 	'<!DOCTYPE HTML>', 
							'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">', 
							'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
							'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">',
							'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
							'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">' );
	
	return $doctypes[ $key ];
	
}

function doctype_labels(){
	return  array( 	'Html 5', 
						'HTML 4.01 Strict', 
						'HTML 4.01',
						'XHTML 1.0 Strict',
						'XHTML 1.0',
						'XHTML 1.1'
						);
		
}

function doc_is_xml( $key ){
	
	$doctypes =  array( 	false, 
							false, 
							false,
							true,
							true,
							true );
							
	return $doctypes[ $key ];
	
}


function tidy_doctype( $key ){
	
	
	$doctypes =  array( 	'-//W3C//DTD HTML 5.0//EN', 
							'-//W3C//DTD HTML 4.01//EN>', 
							'-//W3C//DTD HTML 4.01 Transitional//EN',
							'-//W3C//DTD XHTML 1.0 Strict//EN',
							'-//W3C//DTD XHTML 1.0 Transitional//EN',
							'-//W3C//DTD XHTML 1.1//EN' );
							
	return $doctypes[ $key ];
	
}