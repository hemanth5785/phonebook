$(document).ready(function(){
	
	$('ul li a').click(function(){          //for active menu
	    $('li a').removeClass("active");
	    $(this).addClass("active");
	});

	$(".home").click(function(){
		$("#home").show();
		$("#insert").hide();
		$("#view").hide();
		$("#result_search").hide();
		$("#search_bar").hide();
	});  

	$(".insert").click(function(){
		$("#insert").show();
		$("#home").hide();
		$("#view").hide();
		$("#result_search").hide();
		$("#search_bar").hide();
	});
	
	$(".view").click(function(){
		$("#home").hide();
		$("#insert").hide();	
		$("#result_search").hide();
		$("#search_bar").show();
		view();
	});

	$("#name").focusin(function(){
		$("#result1").hide();
	});

	$("#number").focusin(function(){
		$("#result1").hide();
	});

		
	$("#input_button").click(function(){
		var flag=true;
		var name=$("#name").val();
		var number=$("#number").val();
		var pat=/^[7|8|9]\d{9}$/;
		if(name=="")
		{
			$("#name_error").show();
			$("#name_error").html("please enter the name");
			flag=false;
		}

		else if(number=="")
		{
			$("#name_error").hide();
			$("#number_error").html("please enter the number");
			flag=false;
		}
		else if(name.length>20)
		{
			$("#number_error").hide();
			$("#name_error").html("max. 20 charectors allowed");
			flag=false;
		}

		else if(!number.match(pat))
		{
			$("#name_error").hide();
			$("#number_error").show();
			$("#number_error").html("enter correct phone number");
			flag=false;
		}
		if(flag)
		{
			$("#name_error").hide();
			$("#number_error").hide();
			$("#insert").show();
			$.ajax({
				type:'post',
				data:{name:name , number:number},
				url:'insert.php',
				async: 'false',
				success: function(result){
					if(result==1)
					{
					    $("#insert").hide();
					    view();
					    $('li a').removeClass("active");
					    $(".view").addClass("active");
					    $("#search_bar").show();
				    }
					else if(result==0)
					{
						$("#result1").show();
						$("#result1").html("phone number aleady exists, try with different number");
					}
				}
			}); 		    
		}
	});  
	
	$("#search").keyup(function(){
		
		var name=$('#search').val();				
		search(name);
	}); 
});

function search(name)
{
	var contact = [];				
	var regexp=new RegExp(name,'i');
	for(var i=0;i<person.length;i++)
	{
		if(person[i].name.search(regexp)==0)
		{
			contact.push({id:person[i].id, name:person[i].name, phone_num:person[i].phone_num});
		}
	}  
	print(contact);
}

function view()
{
	$("#view").show();
	$.ajax({
		type:'post',
		url:'display.php',
		success: function(result){
			person = $.parseJSON(result);
			print(person);	
		}
	}); 	
}

function print(person)
{	
	var s = '<table border="3" width="50%" ><tr align="center"> <th width="40%" > name </th>  <th width="40%"> number </th> <th width="10%">edit</th > <th width="20%">delete</th> </tr>' ;
	for(var i=0; i<person.length; i++)
	{
		s+='<tr><td align="center">'+person[i].name+'</td><td align="center">'+person[i].phone_num+'</td>';
		s+='<td align="center"><button class="edit" val='+i+'>edit</button></td> <td align="center"><button id='+i+' class="delete" >delete</button></td></tr>' ;
	}
	s+='</table>';
	$('#view').html(s);
	
	$(".delete").click(function(){
		var $row = $(this).attr('id').split(' ')[0] ;
		var i=$row;
		del(i);	
	});	
	
	$(".edit").click(function(){
		var $row = $(this).attr('val').split(' ')[0] ;
		var i=$row;
		edit(i);
	});   	
}

function del(i)
{
	alert("Confirm delete-"+person[i].name);
	$.ajax({
		type:'post',
		data:{id:person[i].id},
		url:'delete.php',
		async: 'false',
		success: function(result){	
		}
	});
	person.splice(i,1);	
	print(person);
}

function edit(i)
{
	Prompt.render(i);	
}

var Prompt = new CustomPrompt();
function CustomPrompt()
{
	this.render = function(i)
	{
		var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
		dialogbox.style.left = (winW/2) - (550 * .5)+"px";
	    dialogbox.style.top = "100px";
	    dialogbox.style.display = "block";
	    
		$('#dialogboxhead').html("Update the details");
		$('#dialogboxbody').html('<br>name:<input value='+person[i].name+' id="prompt_name" style="color: black;margin-left : 22px; black;margin-bottom : 10px;">'+'<br>number:<input value='+person[i].phone_num+' id="prompt_number" style="color: black; margin-left : 10px;">');
		$('#dialogboxfoot').html('<button id="okay">OK</button> <button onclick="Prompt.cancel()">Cancel</button>');
		$("#okay").click(function(){
			Prompt.ok(i)
			});	
	}
	this.cancel = function()
	{
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
	this.ok = function(i)
	{
		var name = $('#prompt_name').val();
		var number = $('#prompt_number').val();
		var id = person[i].id;
		
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";		
		 $.ajax({
				type:'post',
				data:{id:id, name:name, number:number},
				url:'update.php',
				async: 'false',
				success: function(result)
				{					
					person[i].name=name;
					person[i].phone_num=number;
					print(person);
				}
			});		 
	}
}


/*function CustomAlert(){
	this.render = function(dialog){
		var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
		dialogbox.style.left = (winW/2) - (550 * .5)+"px";
	    dialogbox.style.top = "100px";
	    dialogbox.style.display = "block";
		document.getElementById('dialogboxhead').innerHTML = "Acknowledge This Message";
	    document.getElementById('dialogboxbody').innerHTML = dialog;
		document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Alert.ok()">OK</button>';
	}
	this.ok = function(){
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
}
var Alert = new CustomAlert();
function CustomConfirm(){
	this.render = function(dialog,op,id){
		var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
		dialogbox.style.left = (winW/2) - (550 * .5)+"px";
	    dialogbox.style.top = "100px";
	    dialogbox.style.display = "block";

		document.getElementById('dialogboxhead').innerHTML = "Confirm that action";
	    document.getElementById('dialogboxbody').innerHTML = dialog;
		document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Confirm.yes(\''+op+'\',\''+id+'\')">Yes</button> <button onclick="Confirm.no()">No</button>';
	}
	this.no = function(){
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
	this.yes = function(op,id){
		if(op == "delete_post"){
			deletePost(id);
		}
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
}
var Confirm = new CustomConfirm();

  
  $.ajax({
			type:'post',
			data:{id:id, name:name, number:number},
			url:'Edit_name',
			async: 'false',
			success: function(result){
		    view();
			}
		});
		
	function print(person)
	{
		var s = '<table border="3" width="50%" ><tr align="center"> <th width="40%" > name </th>  <th width="40%"> number </th> <th width="10%">edit</th > <th width="20%">delete</th> </tr>' ;
		for(var i=0; i<person.length; i++)
		{
			//alert(person[i].name);
			s+='<tr><td align="center">'+person[i].name+'</td><td align="center">'+person[i].number+'</td>';
			s+='<td align="center"><button id='+person[i].id+' class="edit">edit</button></td> <td align="center"><button id='+person[i].id+' class="del" >delete</button></td></tr>' ;
		}
		s+='</table>';
		document.getElementById('view').innerHTML = s;

		$(".del").click(function(){
			$("#result_search").hide();
			$("result1").hide();

			var $IdOfBtn = $(this).attr('id').split(' ')[0] ;
			var id=$OfBtn;
			del(id);
			view();
		});

		$(".edit").click(function(){

			$("result1").hide();

			var $classOfBtn = $(this).attr('id').split(' ')[0] ;
			var id=$classOfBtn;
			Prompt.render('',id);
		}); 
		
		
	}
	 
	 
	 /*$(".del").click(function(){
		$("#result_search").hide();
		$("result1").hide();

		var $IdOfBtn = $(this).attr('id').split(' ')[0] ;
		var id=$OfBtn;
		del(id);
		view();
	});  

	$(".edit").click(function(){

		$("result1").hide();

		var $classOfBtn = $(this).attr('id').split(' ')[0] ;
		var id=$classOfBtn;
		Prompt.render('',id);
	}); 	
	
	document.getElementById('dialogboxhead').innerHTML = "Update the details";
		document.getElementById('dialogboxbody').innerHTML = '<br>name:<input value='+person[i].name+' id="prompt_name" style="color: black;margin-left : 22px; black;margin-bottom : 10px;">'+'<br>number:<input value='+person[i].number+' id="prompt_number" style="color: black; margin-left : 10px;">';
		document.getElementById('dialogboxfoot').innerHTML = '<button id="okay">OK</button> <button onclick="Prompt.cancel()">Cancel</button>';
	
	//search
	$("#search").keyup(function(){
		var name=$('#search').val();
		$.ajax({
			type:'post',
			data:{name:name},
			url:'search.php',
			async: 'false',
			success: function(result)
			{
				var person = $.parseJSON(result);
				print(person);
			}
		});
	}); 
	
	
	*/
		 
		 








