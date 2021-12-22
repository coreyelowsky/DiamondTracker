document.addEventListener("DOMContentLoaded", setUpSignInListeners, false);


function setUpSignInListeners(){
	document.getElementsByClassName("button login")[0].addEventListener("click", function(){location.href='login.html'} ,false); 
}