<?php
$name=$_POST['name'];
$name=$name.'%';
//echo $name;
$conn = mysqli_connect("localhost", "root", "","mysql");
if (!$conn)
{
    die("Connection failed: " . mysqli_connect_error());
}
$sql = "select id,name,phone_num from phonebook where name like ?";
$stmt=$conn->prepare($sql);
$stmt->bind_param("s",$name);
$stmt->execute();
$stmt->bind_result($id,$name,$phone_num);
$contacts=array();
while($stmt->fetch())
{
    $contacts[]=array("id"=>$id,"name"=>$name,"phone_num"=>$phone_num);
}
//print_r($contacts);
echo json_encode($contacts);



/*
 *if($stmt->fetch())
{
    echo $id." ".$name." ".$phone_num;
}

$result = mysqli_query($conn, $sql);
$contacts=array();
while($row = mysqli_fetch_assoc($result))
{
    $contacts[]=$row;
}
print_r($contacts);
//echo json_encode($contacts); */ 
?>