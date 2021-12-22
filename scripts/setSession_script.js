document.addEventListener("DOMContentLoaded", setUpSessionListeners, false);

function setUpSessionListeners(){
    
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "setSession.php", true);
	xmlHttp.addEventListener("load", setSessionCallBack, false);
	xmlHttp.send(null);

}

function setSessionCallBack(){
	  var jsonData = JSON.parse(event.target.responseText);
   		//alert(jsonData.session);
   
}