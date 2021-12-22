document.addEventListener("DOMContentLoaded", setUpOtherTeamPage, false);

function setUpOtherTeamPage(){
	
	document.getElementById("back").addEventListener("click", function(){location.href ='home.html' }
		, "false");

	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "getOtherTeams.php", true);
	xmlHttp.addEventListener("load", addOtherTeams, false);
	xmlHttp.send(null);
}

function addOtherTeams(event){
	var jsonData = JSON.parse(event.target.responseText);

	if(jsonData.otherSuccess){
		var users = jsonData.users;

		var s = document.createElement("select");
		s.setAttribute("id", "usersSelect");

		for(var i = 0; i < users.length; i++){
			var o = document.createElement("option");
			o.setAttribute("value", users[i]);
			o.innerHTML = users[i];
			s.appendChild(o);
		}

		document.getElementsByTagName("body")[0].appendChild(s);
		s.style.position="absolute";
		s.style.left="20%";
		s.style.top="5%";

		var button = document.createElement("input");
		button.setAttribute("type", "button");
		button.setAttribute("value", "View Team");
		button.setAttribute("id", "viewTeam");
		button.style.position="absolute";
		button.style.left="13%";
		button.style.top="5%";
		button.addEventListener("click", showTeam, false);
		document.getElementsByTagName("body")[0].appendChild(button);

	}
}

function showTeam(){
	document.getElementById("commentList").innerHTML="";
	var users = document.getElementById("usersSelect");

	var index = document.getElementById("usersSelect").selectedIndex;

	var user = document.getElementById("usersSelect").childNodes[index].value;

	 var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "getOtherTeamPlayers.php", true); 
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send("user="+user);
   
    xmlHttp.addEventListener("load", propOtherTeam, false);




}

function propOtherTeam(event){
	document.getElementById("commentList").innerHTML="";
	var jsonData = JSON.parse(event.target.responseText);
	var players = jsonData.players;
   
	var comments = jsonData.comments;
	var usersCommented =jsonData.usersCommented;

	for(var i =0; i < comments.length; i++){
		var item =document.createElement("li");
		item.innerHTML= comments[i];

		var uText =document.createElement("span");
		uText.innerHTML = "- " +usersCommented[i];
		uText.style.color = "white";
 		item.appendChild(uText);
 			document.getElementById("commentList").appendChild(item);
		document.getElementById("commentArea").style.border="2px solid black";
		document.getElementById("commentsTitle").innerHTML="Comments";
		document.getElementById("commentsTitle").style.textDecoration="underline";
		document.getElementById("commentsTitle").style.textAlign="center";
	}



   document.getElementById("title").innerHTML = "";
	document.getElementById("commentBox").innerHTML="";
	document.getElementById("commentButton").innerHTML="";
	var list = document.getElementById("teamList");
	list.innerHTML="";
	for(var i =0; i < players.length; i++){
		var item = document.createElement("li");
		item.innerHTML=players[i];

	
		list.appendChild(item);
		
	
	}

	var title =document.getElementById("title");
	title.setAttribute("class", jsonData.user);
	title.innerHTML = jsonData.user+"'s Team";
	title.style.textDecoration="underline";
	title.style.textAlign="center";

    //if(jsonData.session_user != jsonData.user){

    	var textBox = document.createElement("input");
    	var comButton =document.createElement("input");
    	comButton.addEventListener("click", comment, false);
    	document.getElementById("commentBox").appendChild(textBox);
    	document.getElementById("commentButton").appendChild(comButton);
    	
    	textBox.setAttribute("type", "text");
    	textBox.setAttribute("id", "commentText");
    	
    	

    	comButton.setAttribute("type", "button");
    	comButton.setAttribute("value", "Comment");
    	comButton.setAttribute("id", "commentButton");


    //}	
}

function comment(){
	var comment = document.getElementById("commentText").value;
	var user = document.getElementById("title").getAttribute("class");

	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "comment.php", true); 
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send("user="+user+"&comment="+comment);
   
    xmlHttp.addEventListener("load", propComment, false);


}

function propComment(event){
	var jsonData = JSON.parse(event.target.responseText);
	var userCommented = jsonData.userCommented;
	var comment = jsonData.comment;

	var item =document.createElement("li");
	item.innerHTML= comment;

	var uText =document.createElement("span");
	uText.innerHTML = "- " +userCommented;
	uText.style.color = "white";
 	item.appendChild(uText);
	document.getElementById("commentList").appendChild(item);
	document.getElementById("commentArea").style.border="2px solid black";
	document.getElementById("commentsTitle").innerHTML="Comments";
	document.getElementById("commentsTitle").style.textDecoration="underline";
	document.getElementById("commentsTitle").style.textAlign="center";
}








