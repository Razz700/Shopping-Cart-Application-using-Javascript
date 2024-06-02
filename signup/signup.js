let fname=document.getElementById('fname');
let lname=document.getElementById('lname');
let email=document.getElementById("email");
let password=document.getElementById("password");
let confirmPassword=document.getElementById("confirmpassword");
let error=document.getElementById("error");
let success=document.getElementById("success");
let a=false,b=false;
fname.value="";
lname.value="";
email.value="";
password.value="";
confirmPassword.value="";
error.style.color="#FF0000";
success.style.color="#219F35";

document.getElementById("signupbtn").addEventListener('click',(event)=>{
event.preventDefault();
    if (fname.value=="" || lname.value=="" || email.value=="" || password.value=="" || confirmPassword.value=="") {
        success.textContent="";
        error.textContent="Please enter all the required fields!";
}else if (password.value==confirmPassword.value) {
   // event.preventDefault();
    let usersdata=JSON.parse(localStorage.getItem('usersdata')??"[]");
    let filteruser=usersdata.filter((user)=>
        email.value==user.email);
    if (filteruser.length>0) {
        error.textContent="User already exists!!";
        success.textContent="Please login!!!";
    }else{
        usersdata.push({
        email:email.value,
        fname:fname.value,
        lname:lname.value,
        password:password.value,
        createdAt: new Date(), 
        });
        localStorage.setItem('usersdata',JSON.stringify(usersdata));
        error.textContent="";
        success.textContent="Signup Successful!!";
        fname.value="";
        lname.value="";
        email.value="";
        password.value="";
        confirmPassword.value="";
    }
}else{
    success.textContent="";
    error.textContent="Please make sure password and confirm password are equal!!";
}
});
let errorEmail=document.getElementById('erroremail');
let errorPassword=document.getElementById('errorpassword');
errorEmail.style.color="#FF0000";
errorPassword.style.color="#FF0000";
email.addEventListener('input',()=>{
    if (/^[a-zA-Z0-9_]+@[a-zA-Z0-9]+[.][a-zA-Z0-9]+$/.test(email.value)) {
                erroremail.innerHTML=``;
                a=true;
                if(a==true && b==true && email.value!="" && password.value!="" && fname.value!="" && lname.value!="" && confirmPassword.value!="" && password.value==confirmPassword.value){
                    success.innerHTML=`All good to go!`;
                    error.textContent="";
                }
            }
            else{
              erroremail.innerHTML=`Make sure email is more than 3 characters and has @ and a .`;
        success.innerHTML="";
        a=false;
            }
});
password.addEventListener('input',()=>{
    if (/^.{8,}$/.test(password.value)) {
                errorPassword.innerHTML=``;
                b=true;
                if(a==true && b==true && email.value!="" && password.value!="" && fname.value!="" && lname.value!="" && confirmPassword.value!="" && password.value==confirmPassword.value){
                   success.innerHTML=`All good to go!`;
                   error.textContent="";
                }
            }
            else{b=false;
                errorPassword.innerHTML=`Make sure password is more than 8 characters.`;
                success.innerHTML="";
            }
});
confirmPassword.addEventListener('input',()=>{
if (a==true && b==true && email.value!="" && password.value!="" && fname.value!="" && lname.value!="" && confirmPassword.value!="" && password.value==confirmPassword.value) {
    error.textContent="";
    success.innerHTML=`All good to go!`; 
}else{
    error.textContent="Please make sure password and confirm password are equal!";
    success.innerHTML=``;  
}
});


//navbar responsive
document.querySelector('#navbtn').addEventListener('click',()=>{
    document.querySelector('nav').classList.toggle('responsivenav');
      });
