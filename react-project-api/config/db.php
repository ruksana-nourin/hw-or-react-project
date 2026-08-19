<?php
    //local
    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_PASS', '');
    define('DB_NAME', 'ecom');


    //Hosting
    // define('DB_HOST', 'localhost');
    // define('DB_USER', 'root');
    // define('DB_PASS', '');
    // define('DB_NAME', 'ecom');

    $db= new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if($db->connect_error){
        die("Connection Failed".$db->connect_error);
    }
    // else{
    //     echo "Connected Succesfully";
    // }


?>