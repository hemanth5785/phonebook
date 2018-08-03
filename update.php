<?php
$id=$_POST['id'];
$name=$_POST['name'];
$number=$_POST['number'];  

$conn = mysqli_connect("localhost", "root", "","mysql");
if (!$conn)
{
    die("Connection failed: " . mysqli_connect_error());
}
$sql = "update phonebook set name=?,phone_num=? where id=?";
$stmt=$conn->prepare($sql);
$stmt->bind_param("sii",$name,$number,$id);
$result=$stmt->execute();
echo $result;
?>