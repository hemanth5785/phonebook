<?php
    
if(isset($_POST['username']))
{
   $username = $_POST['username'];
   $password = $_POST['password'];
   $conn = mysqli_connect("localhost", "root", "","mysql"); 
   if (!$conn) 
   {
      die("Connection failed: " . mysqli_connect_error());
   }
   $sql = "select password from phonebook_login where username=?";
   $stmt = $conn->prepare($sql);
   $stmt->bind_param("s",$username);
   $stmt->execute();
   $stmt->bind_result($pass);
   $stmt->fetch();
   
   if(strcmp($pass,$password)==0)
   {
       session_start();
       $_SESSION["username"] = $username;
       echo(1);
   }
   else
       echo(0);
}
else
{
    header('location:index.php');
    exit;
}
   
?>