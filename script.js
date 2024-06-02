// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))
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