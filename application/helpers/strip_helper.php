<?php



function strip_only_tags($str, $tags, $stripContent=false) 
{
  $str = str_replace( "\t", "  ", $str );

  $str = str_replace( "</ script >", "</script>", $str );
  $str = str_replace( "</ script>", "</script>", $str );
  $str = str_replace( "</script >", "</script>", $str );

  $str = str_replace( "</  script  >", "</script>", $str );
  $str = str_replace( "</  script>", "</script>", $str );
  $str = str_replace( "</script  >", "</script>", $str );

  $str = str_replace( "<script", "<!--  // SCRIPTS ARE NOT CURRENTLY SUPPORTED ON CSSIZER.COM //\n<script", $str );
  $str = str_replace( "</script>", "</script>\n-->", $str );

  $content = '';
  if(!is_array($tags)) 
  {
    $tags = (strpos($str, '>') !== false ? explode('>', str_replace('<', '', $tags)) : array($tags));
    if(end($tags) == '') array_pop($tags);
  }
  foreach($tags as $tag) 
  {
    if ($stripContent)
    {
      $content = '(.+</'.$tag.'(>|\s[^>]*>)|)';
    }
    $str = preg_replace('#</?'.$tag.'(>|\s[^>]*>)'.$content.'#is', "", $str);
  }
  return $str;
}


function crawl_url($url)
{

  $data = array();
  $data['css'] = "";
  
  $html = file_get_contents(prep_url($url));

  $html = str_replace('src="/', 'src="'.prep_url($url )."/", $html );
  $html = str_replace("src=/", "src='".prep_url($url )."/", $html );

  $html = str_replace('src="./', 'src="'.prep_url($url )."/", $html );
  $html = str_replace("src=./", "src='".prep_url($url )."/", $html );

  $html = str_replace('src="./', 'src="'.prep_url($url )."/", $html );
  $html = str_replace("src=./", "src='".prep_url($url )."/", $html );

  
  
  $arr = explode('<link', $html );
  
 
  
  foreach ($arr as $link )
  {
    $link = str_replace("'", '"', $link );
    
    if( strpos($link,'rel="stylesheet"' ) !== FALSE  )
    {
      
      $sub_arr = explode('href="',$link);
      $split = explode( '"', $sub_arr[1] );
    
      $sheet = $split[0];
    
      $sheet = str_replace('../', "", $sheet);
      $sheet = str_replace('./', "", $sheet);
      
      
      if( strpos( $sheet, 'http' ) === FALSE )
      {
        $data['css'] .= "/*\n stylesheet loaded from ".prep_url($url).$sheet."\n*/";
        $data['css'] .= file_get_contents( prep_url($url) . "/$sheet" );
      }
    }  
  }
  

  $data['html'] = $html;
  $data['name'] = $url;

  return $data;
}