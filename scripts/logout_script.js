document.addEventListener("DOMContentLoaded", setUpLogOutListeners, false);

function setUpLogOutListeners(){
    document.getElementsByClassName("button logout")[0].addEventListener("click", function(){location.href='index.html'} ,false); 
}