document.addEventListener("DOMContentLoaded", addContentToMyTeam, false);

function addContentToMyTeam(){
	document.getElementById("deletePlayer").addEventListener("click", deletePlayer, false);
	document.getElementById("back").addEventListener("click", function(){location.href ='home.html' }
		, "false");

	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "getMyTeam.php", true);
	xmlHttp.addEventListener("load", addMyTeam, false);
	xmlHttp.send(null);
}

function addMyTeam(event){
	var jsonData = JSON.parse(event.target.responseText);

	var players = jsonData.myPlayers;
	var ids = jsonData.pIds;


	var list = document.getElementById("myTeamList");

	for(var i =0; i < players.length; i++){
		var radio = document.createElement("input");
		radio.setAttribute("type", "radio");
		radio.setAttribute("id", ids[i]);
		radio.setAttribute("name", "radio");
		var a = document.createElement("span");
		a.innerHTML=players[i];

	
		document.getElementById("myTeamList").appendChild(radio);
		document.getElementById("myTeamList").appendChild(a);
		document.getElementById("myTeamList").appendChild(document.createElement("br"));
	
	}

	var title =document.getElementById("title");
	title.innerHTML = "My Team";
	title.style.textDecoration="underline";
	title.style.textAlign="center";
	
}


function deletePlayer(){
	
	var children = document.getElementById("myTeamList").childNodes;

	var checked = "none";
	
	for(var i =0; i < children.length; i++){
		if(children[i].tagName == "INPUT"){
			if(children[i].checked){
				checked = children[i].getAttribute("id");
				break;
			}
		}
	}


	if(checked == "none"){
	
	}else{

		var xmlHttp = new XMLHttpRequest();
   		xmlHttp.open("POST", "deleteFromTeam.php", true); 
    	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    	xmlHttp.send("pID="+checked);
   
      	xmlHttp.addEventListener("load", deleteFromTeam, false);
	}
}

function deleteFromTeam(event){
	  var jsonData = JSON.parse(event.target.responseText);
	  alert(jsonData.delete_message);
	  var pID = jsonData.pID;

	  var children = document.getElementById("myTeamList").childNodes;
	  for(var i =0; i < children.length; i++){
	  	if(children[i].tagName == "INPUT"){
			if(children[i].getAttribute("id")==pID){
				 document.getElementById("myTeamList").removeChild(children[i]);
				 document.getElementById("myTeamList").removeChild(children[i]);
				  document.getElementById("myTeamList").removeChild(children[i]);
				  break;
			}
		}
	  }

	
	 
}



