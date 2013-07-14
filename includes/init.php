<?php
# set error reporting to maximum
error_reporting(E_ALL);
ini_set('display_errors', 'On');

# Define the base-path
define('BASE_PATH', realpath(dirname(__file__).'/../').'/');

# Necessary includes
require(BASE_PATH.'configuration.php');
require(BASE_PATH.'includes/global.php');
require(BASE_PATH.'externals/smarty/Smarty.class.php');
require(BASE_PATH.'includes/class.database.php');

# Set our own default error handler
set_error_handler('validate_php_error');

# Set-up MySQL connection
$database = new Database;
$database->connect(MYSQL_HOSTNAME, MYSQL_USERNAME, MYSQL_PASSWORD);
$database->select(MYSQL_DATABASE);

# Create a new Smarty instance
$app = new Smarty;

# Define Smarty's compile, tmp and template directories
$app->setCompileDir(SMARTY_COMPILE_DIR);
$app->setTemplateDir(BASE_PATH.'templates/');
?>
