// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))
///redirecting if currentuser is present///
if(localStorage.getItem('currentuser')){
  let currentuser=JSON.parse(localStorage.getItem('currentuser'));
  const userdata=JSON.parse(localStorage.getItem('usersdata'));
  const check=userdata.filter(item=>item.email==currentuser.email && item.password==currentuser.password);
  if(check.length>0){
    window.location.href="./profile/profile.html";
  }
}
////redirecting code ends
let signup=document.getElementById('signup');
signup.addEventListener('click',()=>{
window.location.href="signup/signup.html";
});
document.getElementById('login').addEventListener('click',()=>{
window.location.href="login/login.html";
});

//navbar responsive
document.querySelector('#navbtn').addEventListener('click',()=>{
    document.querySelector('nav').classList.toggle('responsivenav');
      });
