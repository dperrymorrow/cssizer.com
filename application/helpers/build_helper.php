<?php



function is_current_build($edit_key)
{
  
  $CI = &get_instance();
  
  if( $CI->uri->segment(0) == $edit_key )
  {
    return "active";
  }
  else
  {
    return "";
  }
  
}

?>