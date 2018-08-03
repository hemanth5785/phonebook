
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>login page</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <link rel="stylesheet" type="text/css" href="stylesheet/style.css">
<script src="javascript/login_operation.js" type="text/javascript"></script>  

</head>
<body>
<div class="loginBox" align="center">
<input type="text" name="username" id="username" style="margin-left : 4px;" placeholder="Userame... "><br><span id="username_error" style="color: red";></span><br>
<input type="password" name="password" id="password" placeholder="Password... "><br><span id="password_error" style="color: red";></span>
  <br><button id="login" >Login</button> <br>
  <!--  <span hidden="hidden" id="login_error" style="color:red;">Login error...! enter correct username and password </span> -->
  <span id="login_error" style="color: red";></span>
  </div>

</body>
</html>