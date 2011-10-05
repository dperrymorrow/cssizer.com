# Tracer Helper Spark
This is a very simple yet useful helper for tracing out data while you are working. Will trace out strings and arrays recursively.

## Features Overview

- You choose to exit PHP after the trace or not
- Trace all queries called and benchmark of each one
- Can trace entire set of vars passed to the view via Loader class
- Can trace out all benchmarks set 
- File name and line number included as a backtrace from where the trace was called
- Easily setup environment switching to keep traces off your staging and production boxes
- Easily style the traces with the externalized styles and view template in the views folder

![Table Torch](http://dl.dropbox.com/u/9683877/spark_imgs/tracer.png "Tracer Example")

## Example Usage: ( x.x indicates the version you have installed on your build )
    
    // from a controller 
	
	function index(){
		$this->load->spark( 'tracer/x.x' );
		// keep on rendering page if false ( default )
		trace( $_SERVER, FALSE );
		// exit php and rendering if true
		trace( $_SERVER, TRUE );
	}
	
	
## To Trace Out All View Vars
You can also trace out everything that was passed to your view. This must be called after you load view and pass data via 
$this->load->view( 'viewname', $data ); See  http://codeigniter.com/user_guide/libraries/loader.html for more information on views and data.

    trace_viewdata( TRUE ); // will exit if true, no if false

Thats it!!

- [Log Issues or Suggestions](https://github.com/dperrymorrow/CodeIgniter-Tracer-Helper/issues)
- [Follow me on Twitter](http://twitter.com/dperrymorrow)


	


    