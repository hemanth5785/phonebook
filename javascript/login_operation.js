$(document).ready(function(){
	$("#login").click(function(){
		var flag=true;
		var username=$("#username").val();
		var password=$("#password").val();
		if(username=="")
		{
			$("#username_error").show();
			$("#username_error").html("please enter username");
			flag=false;
		}
		else if(username.length>20)
		{
			$("#username_error").html("max. 20 charectors allowed");
			flag=false;
		}

		else if(password=="")
		{
			$("#username_error").hide();
			$("#password_error").show();
			$("#password_error").html("please enter the password");
			flag=false;
		}
		if(flag)
		{
			$("#username_error").hide();
			$("#password_error").hide();
			$.ajax({
				type:'post',
				data:{username:username , password:password},
				url:'login.php',
				async: 'false',
				success: function(result){
					if(result==1)
						{
					      window.location = "mainPage.php";
						}
					else 
						{
						  $("#login_error").html("Login error...! enter correct username and password ");
						}    
						
				}
				
			}); 
		}
	});   
});