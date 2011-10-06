# Cssizer.com
## A real-time online CSS editing tool built in CodeIgniter

### Installation

- you need to setup a config/database.php file, there is an example there...
- you need to run the latest sql file located in config/mysql
- you need to add your localhost env to the develop switch in index.php

i think you will need to run as root, so setup a vhost alias with MAMP or whatever you prefer
    
    switch ( $_SERVER[ 'HTTP_HOST' ] ) {
	    case 'cssizer.local:8888':
		    define('ENVIRONMENT', 'development');
		  break;
	
	    default:
		    define('ENVIRONMENT', 'production');
		  break;
    }