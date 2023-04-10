function handleValueChange(){
    var emailInput = document.getElementById("email1")
    var validemail =  (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value))
    
    if(validemail){
        emailInput.style.color = "black";
    }else{
        emailInput.style.color = "red";
    }
    handleEqual()
}

function handleEqual(){
    var email = document.getElementById("email1")
    var email2 = document.getElementById("email2")
    if(email.value != email2.value){
        email2.style.color = "red";
        return false;
    }
    else{
        email2.style.color = "black";
        return true;
    }
}

function validateForm(){
    var emailId = document.getElementById("email1").value;
    var cemailId = document.getElementById("email2").value;
    var pswd = document.getElementById("password").value;
    var username = document.getElementById("username").value;
    var failed = false;

   if(emailId ==  ""){
    alert("Email Id is required");
    failed = true;
    }

   if(cemailId == ""){
    alert("Please re renter the email");
    failed = true;
   }else{
     var val = handleEqual()
        if(val == false){
            alert("The emailids are not equal");
            failed = true;
        }
    }

    if(pswd == ""){
        alert("password is required");
        failed = true;
    }

    if(username == ""){
        alert("username is required");
        failed = true;
    }

    if(failed == false){
        alert("successfully registered user");
    }
}