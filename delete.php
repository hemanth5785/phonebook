<?php
//$id=128;
$id=$_POST['id'];
$conn = mysqli_connect("localhost", "root", "","mysql");
if (!$conn)
{
    die("Connection failed: " . mysqli_connect_error());
}
$sql = "delete from phonebook where id= ?";
$stmt=$conn->prepare($sql);
$stmt->bind_param("i",$id);
$result=$stmt->execute();
echo $result;


?>