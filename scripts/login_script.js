document.addEventListener("DOMContentLoaded", setUpLoginListeners, false);

function setUpLoginListeners(){
    document.getElementsByClassName("button login")[0].addEventListener("click", login ,false); 
}


function login() {
   
    var user = document.getElementsByName("username_input")[0].value;  //username that was submitted
    var pass = document.getElementsByName("password_input")[0].value;  //password that was submitted  
  
   
  
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "login.php", true); 
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send("username="+user+"&password="+pass);
   
      
    xmlHttp.addEventListener("load", callBackLogin, false);
    
}


function callBackLogin(event){
   
    var jsonData = JSON.parse(event.target.responseText);
   
    alert(jsonData.login_message);
     
    document.getElementsByName("username_input")[0].value=""; 
    document.getElementsByName("password_input")[0].value="";
    
    if (jsonData.login_success==true) {
        location.href='home.html'
    }
 
}