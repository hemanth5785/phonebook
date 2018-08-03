<?php
$name=$_POST['name'];
$number=$_POST['number'];  

$conn = mysqli_connect("localhost", "root", "","mysql");
if (!$conn)
{
   die("Connection failed: " . mysqli_connect_error());
}

$sql = "insert into phonebook (name,phone_num) values(?,?)";
$stmt=$conn->prepare($sql);
$stmt->bind_param("si",$name,$number);
$result=$stmt->execute();
if($result==1)
{
    echo(1);
}
else
{
    echo(0);
}
?>
