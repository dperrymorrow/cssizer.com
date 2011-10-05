<?php

// this will run on the values you are tracing out, default htmlspecialchars
$config[ 'tracer' ][ 'function' ] = 'htmlspecialchars';
// the version of the spark, this must be correct for pathing, should be the folder name inside of sparks/tracer
$config[ 'tracer' ][ 'version' ] = '0.5';
// if you would like to show the last 
$config[ 'tracer' ][ 'show_queries' ] = TRUE;
// if you would like to show all benchmarks 
$config[ 'tracer' ][ 'show_benchmarks' ] = TRUE;
// determines if the tracer runs or not, 
$config[ 'tracer' ][ 'enabled' ] = TRUE;

/*
its probally best to environment switch,
This will keep traces from showing up on your stage or production.

// example environment switching...

if( strpos( $_SERVER['SERVER_NAME'], 'localhost') !== FALSE) { 
	$config[ 'tracer_enabled' ] = TRUE;
} else if( 
	strpos( $_SERVER['SERVER_NAME'], 'stagingdomain' ) !== FALSE 
	$config[ 'tracer_enabled' ] = FALSE;
} else{
	// DEFAULT TO OFF INCASE YOU ARE IN PRODUCTION MODE
	$config[ 'tracer_enabled' ] = FALSE;
}
*/