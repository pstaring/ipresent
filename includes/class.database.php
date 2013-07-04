<?php
class Database {

	/**
	* Variable which contains the current handle of the MySQL connection
	* @var resource
	*/
	private $handle;

	/*
	 * Function to connect to a MySQL database
	 * @author Twan van der Poel <twanvanderpoel@gmail.com>
	 * @param string $hostname MySQL hostname / IP adress to connect to
	 * @param string $username MySQL username
	 * @param string $password MySQL password
	 * @return void
	 */
	public function connect($hostname, $username, $password) {
		if (!$this->handle = mysql_connect($hostname, $username, $password)) {
			stop('Unable to connect to database.');
		}
	}

	/*
	 * Function to select a MySQL database
	 * @author Twan van der Poel <twanvanderpoel@gmail.com>
	 * @param string $database MySQL database to select
	 * @return void
	 */
	public function select($database) {
		if (!mysql_select_db($database, $this->handle)) {
			stop('Unable to select database.');
		}
	}

}
?>