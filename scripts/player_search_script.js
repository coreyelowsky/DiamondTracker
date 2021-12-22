document.addEventListener("DOMContentLoaded", setUpSearchListeners, false);

function setUpSearchListeners(){
    document.getElementById("lastname_search").addEventListener("click",searchForPlayers ,false); 
}

function searchForPlayers(){
	var name = document.getElementById("last_name").value;
	 
  	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "player_search.php", true); 
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send("lastname="+name);
   
    xmlHttp.addEventListener("load", searchCallBack, false);
} 

function searchCallBack(event){ 
	var jsonData = JSON.parse(event.target.responseText);

	if(jsonData.search_success){
	
		var players = jsonData.players;
		var ids = jsonData.playerID;
		var select = document.getElementById("players_by_last_name");
		select.innerHTML = "";

		if(players.length == 0){
			alert("We could not find a player with that last name.");
		}
		for(var i = 0; i < players.length; i++){
			var option = document.createElement("option");
			option.setAttribute("id",ids[i]);
			option.innerHTML = players[i];
			select.appendChild(option); 
		}


	}else{
		alert(jsonData.search_message);
	}
}