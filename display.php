<?php
$conn = mysqli_connect("localhost", "root", "","mysql");
if (!$conn)
{
    die("Connection failed: " . mysqli_connect_error());
}
$sql = "select * from phonebook";
$result = mysqli_query($conn, $sql);
$contacts=array();
while($row = mysqli_fetch_assoc($result))
{
    $contacts[]=$row;
}

echo json_encode($contacts);
 
?>
