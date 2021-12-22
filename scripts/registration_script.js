//When a user attempts to register, the information provided is sent to register.php to check the database and attempt to register the user

document.addEventListener("DOMContentLoaded", setUpRegistrationListeners, false);

function setUpRegistrationListeners(){
    document.getElementsByClassName("button reg")[0].addEventListener("click", register ,false); 
}


function register() {
    var username = document.getElementsByName("username_input")[0].value;  //username that was submitted
    var password = document.getElementsByName("password_input")[0].value;  //password that was submitted  
  
   
  
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "register.php", true); 
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send("username="+username+"&password="+password);
   
      
    xmlHttp.addEventListener("load", callBackRegister, false);
}


function callBackRegister(event){
    var jsonData = JSON.parse(event.target.responseText);
    alert(jsonData.register_message);
    document.getElementsByName("username_input")[0].value="";
    document.getElementsByName("password_input")[0].value="";
    if (jsonData.register_success==true) {
        location.href='index.html'
    }
 
}