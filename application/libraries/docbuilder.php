<?php


class Docbuilder{


  public $meta = '';

  public function __construct()
  {


  }


  function build_document( $build )
  {

    $meta = '<meta http-equiv="Content-type" content="text/html;charset=UTF-8"/>';
    $styles = '<style type="text/css" media="screen" id="cssizerStyles">'."\n".$build[ 'css' ]."\n</style>";
    $head_content = "\n$meta\n$styles\n";
    $doc_type = get_doctype( $build[ 'doctype' ] );

    // make sure they dont have a space
    $build[ 'html' ] = str_replace( '</ ', '</', $build[ 'html' ] );

    if( strpos( $build[ 'html' ], '</body>' ) === FALSE )
    {

      if( strpos( $build[ 'html' ], '</head>' ) === FALSE )
      {
        $build[ 'html' ] = "<body>\n".$build['html']."\n</body>";
      }
      else
      {
        $build[ 'html' ] = str_replace( '</head>', "</head>\n<body>", $build['html'] );
        $build['html'] .= "\n</body>";
      }
    }

    if( strpos( $build['html'], 'head>' ) === FALSE )
    {
      $build[ 'html' ] = "\n<head>$head_content</head>\n".$build[ 'html' ];
    }
    else
    {
      $build[ 'html' ] = str_replace( '</head>', "$head_content\n</head>", $build[ 'html' ] );
    }

    if( doc_is_xml( $build[ 'doctype' ] ))
    {
      $open = "\n".'<html xmlns="http://www.w3.org/1999/xhtml">'."\n";
    }
    else
    {
      $open = "\n<html>\n";
    }

    return $doc_type.$open.$build[ 'html' ]."\n</html>";
  }



}