let email=document.getElementById("email");
let password=document.getElementById("password");
let error=document.getElementById("error");
let success=document.getElementById("success");
email.value="";
password.value="";
error.style.color="#FF0000";
success.style.color="#219F35";
function generateToken(){
    return (Math.random()*10**16).toFixed(0);
}
document.getElementById('loginbtn').addEventListener('click',(event)=>{
   event.preventDefault();
if(email.value=="" || password.value==""){
    //errror
    error.textContent="Please enter all the required fields!";
}else{
    let usersdata=JSON.parse(localStorage.getItem('usersdata')??"[]");
    if(usersdata.length>0){
       let user= usersdata.filter((user)=>user.email==email.value);
        if (user.length>0) {
            let obj=user[0];
            if (obj.password==password.value) {
                //login success
                localStorage.setItem('currentuser',JSON.stringify({
                    ...obj,
                    token:generateToken()
                }));
              window.location.href="../profile/profile.html";
            }else{
                error.textContent="Incorrect Password!!";
            }
        }else{
            // email.value="";
            password.value="";
            error.textContent="No records.Please Signup!!";
                }
    }else{
       // email.value="";
        password.value="";
        error.textContent="No records.Please Signup!!";
    }
}
});

//navbar responsive
document.querySelector('#navbtn').addEventListener('click',()=>{
    document.querySelector('nav').classList.toggle('responsivenav');
      });