<?php
    $servername = "localhost";
    $username = "root"; 
    $password = ""; 
    $dbname = "edudb";
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        
       $name = $_POST['name'];
       $email = $_POST['email'];
       $msg = $_POST['msg'];

        $sql = "INSERT INTO edutable(name,email,msg) VALUES ('$name','$email','$msg')";
        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
    $conn->close();
?>