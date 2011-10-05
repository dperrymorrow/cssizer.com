# Auto
Very simple library, but yet it alleviates the need to ever load a model, library, spark, or helper again.

## Features Overview

- can access your CI instances from anywhere in your app using the _Auto::inst()_ static method
- no need to use the loader class manually when this spark is installed
- will never load anything more than once. 
- if the instance exists, its returned, if not it's loaded, instantiated as a CI var and returned. 

## Controller Usage
( x.x indicates the version you have installed on your build )
    
	// from some controller 
	
	function __construct()
	{
		$this->load->spark( 'auto/x.x' );
	}
	
	function get_users()
	{
		$this->auto->your_model->some_method();
		//notice that I never loaded "your_model"?
	}

## From anywhere 
	
	function some_method()
	{
		/*
		* you have reference to CI instances from anywhere, 
		* if it does not exist its created on the fly for you.
		*/
		$msg = Auto::inst()->lang->line( 'language_key' );
		// much less verbose to do something like using models within other models 
	}
	
## Loading Helpers on demand
The below example is from a view, but could be anywhere.

The \_helper suffix is not needed in all cases, but if you are in site controller, and trying to load site\_helper dynamically, then you would need the suffix to prevent collision, thus it's better to get in the habit of using **Form\_helper::form\_open\_();** instead of **Form::form_open();**

    /*
	* load helpers only when each method is used
 	* the classname tells Auto which helper file to load, 
    * in this case url_helper would be Url::desired_method()
    */

	echo Url_helper::anchor( 'http://www.google.com', 'Go to google' ); 
	echo Text_helper::character_limiter( 'Lorem ipsum dolor sit amet, consectetur adipisicing', 10 );
	
	// can call libraries ( instantiated or not ) from views as well.
	$data = array( array('Name', 'Color', 'Size') );
	echo Auto::inst()->table->generate( $data );
	// or if in CI scope...
	echo $this->auto->table->generate( $data );
	
## Loading sparks on demand
the highest version folder in the spark folder will be loaded.

    // if the spark is a library you can method chain such as
    Auto::inst()->example_spark->some_lib_method();

	/*
	* but, if its just helpers, you will have to call those as you normally would, 
	* so you dont gain a whole lot in this case vs loading manually, only havig to know the version #
	*/
	Auto::inst()->example_spark;
	some_spark_helper_method();
	

- [Log Issues or Suggestions](https://github.com/dperrymorrow/auto/issues)
- [Follow me on Twitter](http://twitter.com/dperrymorrow)


	


