//When the register button on the home page is clicked, the user is sent to a seperate register.html page

document.addEventListener("DOMContentLoaded", setUpRegisterListeners, false);


function setUpRegisterListeners(){
   
    document.getElementsByClassName("button reg")[0].addEventListener("click", function(){location.href='register.html'} ,false); 
}