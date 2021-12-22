bStatsHead=["Yr", "Tm","Lg","G", "AB","R","H","2B","3B","HR","RBI", 
			"SB", "CS","BB","SO","AVG","OBP","SLG","IBB","HBP","SH","SF","GIDP"];

pStatsHead=["Yr", "Tm","Lg","W", "L","ERA","G","GS","GF","CG","SHO", 
			"SV", "IP","H","R","ER","HR","BB","IBB","SO", "HBP"];
var sarray;

$(document).ready(function() {
         $('.propogate').click(function() {
             get_stats(this.id);
         });

    });

function get_stats(button_id){
	var selectedIndex = document.getElementById("players_by_last_name").selectedIndex;

	if(selectedIndex != -1){
		var side;
		var pID = document.getElementById("players_by_last_name").options[selectedIndex].id;

		if(button_id == 'left_but'){
			side = 'left';
		}else{
			side = 'right';
		}

		var xmlHttp = new XMLHttpRequest();
    	xmlHttp.open("POST", "get_stats.php", true); 
    	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    	xmlHttp.send("pID="+pID+"&side="+side);
   		xmlHttp.addEventListener("load", get_stats_callBack, false);   
	}
}

function get_stats_callBack(event){

	/* get data from back end */
	var jsonData = JSON.parse(event.target.responseText);
	var bstats = jsonData.bstats;
	var pstats = jsonData.pstats;
	var side = jsonData.side;
	var pID = jsonData.pid;
	
	var button = document.createElement("input");
	button.setAttribute("type", "button");
	button.setAttribute("value", "Add To Team!");
	button.setAttribute("id", pID);
	
	button.addEventListener("click",function(){
		
		var xmlHttp = new XMLHttpRequest();
   	 	xmlHttp.open("POST", "addToTeam.php", true); 
    	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    	xmlHttp.send("pID="+pID);
   		xmlHttp.addEventListener("load", function(event){

   			var jsonData = JSON.parse(event.target.responseText);
	
	  		if(jsonData.add_success){
	  			alert(jsonData.add_message);
	  		}else{
	  			alert(jsonData.add_message);
	  		}

   		}, false)

	},false);
	

	var content_box;

	if(side == "left"){
		content_box = document.getElementsByClassName("content_left")[0];
		button.setAttribute("class", "left_button");
	}else{
		content_box = document.getElementsByClassName("content_right")[0];
		button.setAttribute("class", "right_button");
	}


	/* clear content box */
	content_box.innerHTML="";

	content_box.appendChild(button);
	


	var name= document.getElementById("players_by_last_name").value;
	var header = document.createElement("h1");
	header.innerHTML=name;
	//header.setAttribute("class", pID);
	content_box.appendChild(header);
	
	if(pstats.length > 0){
		var table = document.createElement("table");
		table.setAttribute("border", "1");

		var pitching = document.createElement("h3");
		pitching.innerHTML="Pitching";
		pitching.style.textDecoration = "underline";
		content_box.appendChild(pitching);

		content_box.appendChild(table);

		var rpitchingHead = document.createElement("tr");
		table.appendChild(rpitchingHead);
		for(var i=0; i < pstats[0].length; i++){
			var data = document.createElement("th");
			data.innerHTML = pStatsHead[i];
			data.setAttribute("class", "pTable");
			rpitchingHead.appendChild(data);
		}

		for(var i = 0; i < pstats.length; i++){
			var row = document.createElement("tr");
			table.appendChild(row);
			for(var j = 0; j < pstats[0].length; j++){
				var data = document.createElement("td");
				if(j==5){
					data.innerHTML = Number(pstats[i][j]).toFixed(2);
				}else{
					data.innerHTML = pstats[i][j];
				}
				
			
				data.setAttribute("class", "pTable");
				row.appendChild(data);
			}
		}
	}


	if(bstats.length > 0){
		//avg
		var avg;
		for(var i =0; i < bstats.length; i++){
			avg = Number(Math.round(1000*bstats[i][6]/bstats[i][4])/1000).toFixed(3);
			bstats[i].splice(15,0,avg);
		}

		//obp
		var obp;
		for(var i =0; i < bstats.length; i++){
			obp = Number(Math.round(1000*(bstats[i][6]+bstats[i][13]  + bstats[i][17])/
							(bstats[i][4] + bstats[i][13] + bstats[i][17]+bstats[i][19]))/1000).toFixed(3);
			bstats[i].splice(16,0,obp);
		}	

		//slg
		var slug;
		for(var i =0; i < bstats.length; i++){
			var singles = bstats[i][6] - (bstats[i][7] + bstats[i][8] + bstats[i][9]);


			slug = Number(Math.round(1000*(singles + bstats[i][7]*2 + bstats[i][8]*3+bstats[i][9]*4)/
							(bstats[i][4]))/1000).toFixed(3);
			bstats[i].splice(17,0,slug);
		}	


		var table = document.createElement("table");
		table.setAttribute("border", "1");
		
		var idTable = side+"table";
		table.setAttribute("id", idTable);
		
		var batting = document.createElement("h3");
		batting.innerHTML="Batting";
		batting.style.textDecoration = "underline";
		content_box.appendChild(batting);

		content_box.appendChild(table);

		var rbattingHead = document.createElement("tr");
		table.appendChild(rbattingHead);
		for(var i=0; i < bstats[0].length; i++){
			var data = document.createElement("th");
			data.innerHTML = bStatsHead[i];
			data.setAttribute("class", "bTable");
			rbattingHead.appendChild(data);
		}

		for(var i = 0; i < bstats.length; i++){
			var row = document.createElement("tr");
			table.appendChild(row);
			for(var j = 0; j < bstats[0].length; j++){
				var data = document.createElement("td");
				data.innerHTML = bstats[i][j];
				data.setAttribute("class","bTable");
				row.appendChild(data);
			}
		}

		for(var i = 3; i < bstats[0].length; i ++){
			var maxIndex = 0;
			for(var j = 0; j < bstats.length; j++){
		
				if(bstats[j][i] > bstats[maxIndex][i]){
					maxIndex = j;
				}
			}
			
			//document.getElementById(idTable).childNodes[maxIndex+1].childNodes[i].style.backgroundColor = "black";
			document.getElementById(idTable).childNodes[maxIndex+1].childNodes[i].style.color = "white";
		}
	}

	addStoryButton.addEventListener("click", function(){
		var titleField;
		var linkField;
		var storyButton;

		for(var i =0; i < content_box.children.length; i++ ){
			var node = content_box.children[i];
			if(node.getAttribute("id") == "addStoryButton"){
				storyButton = node;
			}else if(node.getAttribute("id") == "linkField"){
				linkField = node;
			}else if(node.getAttribute("id") == "titleField"){
				titleField = node;
			}
		}

		var playerID = storyButton.getAttribute("class");
	
		var xmlHttp = new XMLHttpRequest();
   	 	xmlHttp.open("POST", "addStory.php", true); 
    	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    	xmlHttp.send("pID="+playerID + "&title="+titleField.value+"&link="+linkField.value);
   		xmlHttp.addEventListener("load", function(event){
   			var jsonData = JSON.parse(event.target.responseText);
   			if(jsonData.add_success){
   				var item = document.createElement("li");
   					item.setAttribute("id", jsonData.id);
				var a = document.createElement("a");
				a.setAttribute("href", jsonData.link);
				a.setAttribute("target","_blank");
				a.innerHTML = jsonData.title;
			  	var t = document.createElement("p");
			  	t.innerHTML=" - "+ jsonData.user;
			  	item.appendChild(a);
			  	item.appendChild(t);
				
			  	if(jsonData.user == jsonData.user){
	  				var p = document.createElement("p");
	  				p.innerHTML="delete";
	  			
	  				var sID = jsonData.id;
	  				p.addEventListener("click", function(){
	  					
	  					var xmlHttp = new XMLHttpRequest();
   	 					xmlHttp.open("POST", "deleteStory.php", true); 
    					xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    					xmlHttp.send("sID="+sID);
   						xmlHttp.addEventListener("load", function(event){
   							var jsonData = JSON.parse(event.target.responseText);
   							alert("deleted story ");
   							storyList.removeChild(item);
   						}, false);
	  				

	  				}, false);
	  			item.appendChild(p);

	  			}

				storyList.appendChild(item);
   			}else{
   				alert(jsonData.add_message);
   			}
   			

   		}, false)
	}, false);

		
	storyList.setAttribute("id", side+"_stories");

	var storyTitle = document.createElement("h3");
	storyTitle.innerHTML="Stories";
	storyTitle.style.textDecoration="underline";
	storyTitle.style.textAlign="center";
	storyBox.appendChild(storyTitle);
	storyBox.appendChild(storyList);

	storyBox.style.border = "2px solid";
	storyBox.style.paddingTop = "10 px";
	

	 var sID;
	for(var i =0; i < titles.length; i++){
		
		var item = document.createElement("li");

		var a = document.createElement("a");
		a.setAttribute("href", links[i]);
		a.setAttribute("target","_blank");
		a.innerHTML = titles[i];
	  	var t = document.createElement("p");
	  	t.innerHTML=" - "+ users[i];
	  

		var ids = jsonData.ids;
	  	item.appendChild(a);
	  	item.appendChild(t);
	  	item.setAttribute("id", ids[i]);
	
	  	if(users[i] == jsonData.user){
	  			var p = document.createElement("p");
	  			p.innerHTML="delete";
	  			
	  			 sID = ids[i];
	  			

	  			p.addEventListener("click", function(){
	  					var xmlHttp = new XMLHttpRequest();
   	 					xmlHttp.open("POST", "deleteStory.php", true); 
    					xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    					xmlHttp.send("sID="+sID);
   						xmlHttp.addEventListener("load", function(event){
   							var jsonData1 = JSON.parse(event.target.responseText);
   							alert("deleted story");
   							
   						
   							storyList.removeChild(document.getElementById(jsonData1.sid));

   						}, false);
	  			}, false);
	  			item.appendChild(p);

	  	}

		storyList.appendChild(item);
		
	}

	content_box.appendChild(document.createElement("hr"));
	content_box.appendChild(storyBox);

}








