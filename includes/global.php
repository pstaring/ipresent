<?php
/*
 * Function used when a (fatal) error occured
 * @author Twan van der Poel <twanvanderpoel@gmail.com>
 * @param string $reason Error message (checkout ERROR_LIST.txt for solutions)
 * @return void
 */
function stop($reason) {
	if (!headers_sent()) {
		header('Content-type: text/plain');
	}
	print "System stopped because of error:\n";
	print $reason;
	print "\n\n";
	print_r(debug_backtrace());
	exit;
}

/*
 * Function which handles PHP errors
 * @author Twan van der Poel <twanvanderpoel@gmail.com>
 * @param int $error_number The level of the error
 * @param string $error_message Description of the error
 * @param string $file The filename where the error was triggered
 * @param int $line The actual linenumber where the error was triggered
 * @return void
 */
function validate_php_error($error_level, $error_message, $file, $line) {
	if (in_array($error_level, array(2))) {
		return true;
	}
	stop(sprintf('PHP error detected (level: %s, message: %s, location: %s:%d', $error_level, $error_message, $file, $line));
}
?>