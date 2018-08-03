<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>**PHONEBOOK**</title>

<meta charset="utf-8">

<link rel="stylesheet" type="text/css" href="stylesheet/style.css">
<script	src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="javascript/operation.js" type="text/javascript"></script>
</head>
<body>
<?php  
session_start();
if(!isset($_SESSION['username']))
{
    header('location:index.php');
    exit;
}  
    
?>  
	  
	<div id="dialogoverlay"></div>
	<div id="dialogbox">
		<div>
			<div id="dialogboxhead"></div>
			<div id="dialogboxbody"></div>
			<div id="dialogboxfoot"></div>
		</div>
	</div>

	
<ul>
  <li><a class="home active" href="#home">HOME</a></li>
  <li><a class="insert" href="#insert">INSERT</a></li>
  <li><a class="view" >VIEW</a></li>
  <li class="log"> <a class="logout" href="logout.php">Logout</a></li>
</ul>

<p id="welcome"><?php
echo "welcome... ".$_SESSION['username'];
?> </p>  

	<div class="container" id="home">	
		<h2	style="color: blue; font-family: times-new-roman; text-align: center">
			<b>Phone Book</b>
		</h2>
	</div>

	<div id="insert" hidden="hidden" align="center">
		
		<h4 style="color: blue;">Enter details</h4>
	    <input type="text" name="name" id="name" style="margin-left : 4px;" placeholder="Name..."> <br>
		<span id="name_error" style="color: red";></span><br> 
		<input type="text" name="phone" id="number" pattern="[7|8|9]\d{9}" Placeholder="Contact Number..."><br>
		<span id="number_error" style="color: red";></span> <br> 
		<input type="button" value="Submit" id="input_button"> <br>
		<span id="result1" style="color: red";></span>
	</div>

     <div align="center" id="search_bar" hidden="hidden">
    <input id="search" type="text" name="search" placeholder="Search..."> 
     </div> 
	<div id="view" hidden="hidden" align="center"></div>

</body>
</html>

 
