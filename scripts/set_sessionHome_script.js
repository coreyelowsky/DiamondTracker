document.addEventListener("DOMContentLoaded", setUpSessionListeners, false);

function setUpSessionListeners(){
    
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "setSessionHome.php", true);
	xmlHttp.addEventListener("load", setSessionCallBack, false);
	xmlHttp.send(null);

}

function setSessionCallBack(){
	var jsonData = JSON.parse(event.target.responseText);
   var title = document.getElementById("userTitle");	
  
   title.innerHTML = "Welcome " + jsonData.session;
	title.style.color = "white";
	title.style.position = "absolute";
	title.style.left = "150px";
   title.style.top = "10px";

   if(jsonData.session != "guest"){
   
   		var myTeamForm = document.createElement("form");
   		var myTeamButton = document.createElement("input");
         var otherTeamsButton = document.createElement("input");
   		myTeamButton.setAttribute("type", "button");
   		myTeamButton.setAttribute("value", "My Team");
   		myTeamButton.setAttribute("id", "myTeam");
         otherTeamsButton.setAttribute("type", "button");
         otherTeamsButton.setAttribute("value", "View Other Teams");
         otherTeamsButton.setAttribute("id", "otherTeams");

   		myTeamForm.appendChild(myTeamButton);
         myTeamForm.appendChild(otherTeamsButton);
   		myTeamButton.style.position = "absolute";
   		myTeamButton.style.left= "40%";
   		myTeamButton.style.top= "15%";
         otherTeamsButton.style.position = "absolute";
         otherTeamsButton.style.left= "45%";
         otherTeamsButton.style.top= "15%";

   		myTeamButton.addEventListener("click", function(){location.href='myTeam.html'} ,false);
         otherTeamsButton.addEventListener("click", function(){location.href='otherTeams.html'} ,false);

   		document.getElementsByTagName("body")[0].appendChild(myTeamForm);
   }
}