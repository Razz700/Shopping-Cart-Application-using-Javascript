// Write your script here
let fname=document.getElementById('fname');
let lname=document.getElementById('lname');
let oldpassword=document.getElementById("oldpassword");
let newpassword=document.getElementById("newpassword");
let confirmnewpassword=document.getElementById("confirmnewpassword");
let error=document.getElementById('error');
let success=document.getElementById('success');
error.style.color="#FF0000";
success.style.color="#219F35";
let error1=document.getElementById('error1');
let success1=document.getElementById('success1');
error1.style.color="#FF0000";
success1.style.color="#219F35";
fname.value="";
lname.value="";
oldpassword.value="";
confirmnewpassword.value="";
newpassword.value="";
let currentuser=JSON.parse(localStorage.getItem('currentuser'));
console.log(currentuser);
if (currentuser) {
 
    fname.placeholder=`First Name is "${currentuser.fname}"`;
    lname.placeholder=`Last Name is "${currentuser.lname}"`;
    document.getElementById('saveinfo').addEventListener('click',()=>{
        if (fname.value!="" && lname.value!="") {
            currentuser.fname=fname.value;
            currentuser.lname=lname.value;
            localStorage.setItem('currentuser',JSON.stringify(currentuser));
            let usersdata=JSON.parse(localStorage.getItem('usersdata'));
            usersdata.forEach((user)=>{
            if(currentuser.email==user.email){
                user.fname=fname.value;
                user.lname=lname.value;
                localStorage.setItem('usersdata',JSON.stringify(usersdata));
            }});
            fname.placeholder=`First Name is "${fname.value}"`;
            lname.placeholder=`Last Name is "${lname.value}"`;
                fname.value="";
                lname.value="";
                error.textContent="";
             success.textContent="First Name and Last Name successfully changed!!";
            console.log(currentuser);
        }else{
         error.textContent="Please enter all fields to Edit !";
         success.textContent="";
         error1.textContent="";
         success1.textContent="";
        }

    });
    document.getElementById('changepassword').addEventListener("click",()=>{
        if (oldpassword.value!="" && newpassword.value!="" && confirmnewpassword.value!="") {
if (currentuser.password==oldpassword.value) {
    let usersdata=JSON.parse(localStorage.getItem('usersdata'));
    if(newpassword.value==confirmnewpassword.value){
        usersdata.forEach((user)=>{
          if (user.email==currentuser.email) {
          user.password=newpassword.value;
          currentuser.password=newpassword.value;
          localStorage.setItem('currentuser',JSON.stringify(currentuser));
          localStorage.setItem('usersdata',JSON.stringify(usersdata));
            }
        });
        oldpassword.value="";
        confirmnewpassword.value="";
        newpassword.value="";
            error.textContent="";
            success.textContent="";
            error1.textContent="";
         success1.textContent="Password successfully changed!!"; 

    }else{
        error1.textContent="New password and Confirm New password should be equal!";       
    }     
}else{error1.textContent="Incorrect password!!";}
           
}else{     error.textContent="";
    success.textContent="";
         error1.textContent="Please enter all fields to Edit !";
         success1.textContent="";
        }
    });
    //new password validation
    let a=false;
    newpassword.addEventListener('input',()=>{
        if (/^.{8,}$/.test(newpassword.value)) {
                    error1.innerHTML=``;
                    a=true;
                    if(a && oldpassword.value==currentuser.password && newpassword.value==confirmnewpassword.value){
                       success1.innerHTML=`All good to go!`;
                       error1.textContent="";
                    }
                }
                else{a=false;
                    error1.innerHTML=`Make sure password is minimum 8 characters.`;
                    success1.innerHTML="";
                }
    });

    confirmnewpassword.addEventListener('input',()=>{
        if (newpassword.value==confirmnewpassword.value && a) {
            error1.textContent="";
            success1.textContent="";
        }else{
            error1.textContent="New password and Confirm New password should be equal!";
            success1.textContent="";
        }
        if (newpassword.value==confirmnewpassword.value && a && oldpassword.value==currentuser.password) {
            error1.textContent="";
            success1.innerHTML=`All good to go!`;  
        }
        });
    //logout function
document.getElementById('logout').addEventListener('click',()=>{
localStorage.removeItem('currentuser');
    window.location.href="../index.html";
});

 //logout function navbtn
 document.getElementById('logoutnav').addEventListener('click',(event)=>{
    localStorage.removeItem('currentuser');
event.preventDefault();
        window.location.href="../index.html";
    });

// HI! user
let hi=document.querySelectorAll('.hiUser');
hi.forEach(elem=>{
    elem.innerHTML=`Hi! <b style='padding-left:5px;'>${currentuser.fname}</b>`;
    if (currentuser.profilepic) {
        elem.innerHTML=`Hi! <b style='padding-left:5px;'>${currentuser.fname}</b>
       <img src="${currentuser.profilepic}">`; 
        let img=document.createElement('img');
        img.src=currentuser.profilepic;
        img.title="profile pic";
        document.getElementById('picture').innerHTML="";
        document.getElementById('picture').appendChild(img);
    }
});

    //profile pic
let file=document.getElementById('size');
file.value="";
let profileErr=document.getElementById('profileError');
profileErr.innerHTML=``;
profileErr.style.color="#FF0000";
let profilesuccess=document.getElementById('profilemsg');
profilesuccess.style.color="#219F35";
profilesuccess.innerHTML="";

let upload=document.getElementById('upload');
let remove=document.getElementById('remove');

upload.addEventListener('click',()=>{
    if (file.value!="") {
        if (file.files[0].size>30000) {
            profileErr.innerHTML=`File size should be less than 30KB!`;
            profilesuccess.innerHTML="";
        }else{
            let filestore=new FileReader();
            filestore.readAsDataURL(file.files[0]);
            filestore.addEventListener('load',()=>{
    let url=filestore.result;
    let img=document.createElement('img');
    img.src=url;
    img.title="profile pic";
    document.getElementById('picture').innerHTML="";
    document.getElementById('picture').appendChild(img);
    let currentuser=JSON.parse(localStorage.getItem('currentuser'));
    currentuser.profilepic=url;
    localStorage.setItem('currentuser',JSON.stringify(currentuser));
    profilesuccess.innerHTML=`Profile pic uploaded successfully!!`;
    profileErr.innerHTML='';
    let usersdata=JSON.parse(localStorage.getItem('usersdata'));
    usersdata.forEach((user)=>{
    if (user.email==currentuser.email) {
        user.profilepic=url;
        localStorage.setItem('usersdata',JSON.stringify(usersdata));
    }
    });
    let hi=document.querySelectorAll('.hiUser');
    hi.forEach(elem=>{
        if (currentuser.profilepic) {
            elem.innerHTML=`Hi! <b style='padding-left:5px'>${currentuser.fname}</b> 
            <img src="${currentuser.profilepic}">`; 
        }});
    });  //load event ends
        }  
    }else{
        profileErr.innerHTML=`File cannot be empty!`;
        profilesuccess.innerHTML="";
    }  
}); //click event ends


//remove profile pic
remove.addEventListener('click',()=>{
    profilesuccess.innerHTML=`Profile pic removed successfully!!`;
    profileErr.innerHTML='';
   let currentuser=JSON.parse(localStorage.getItem('currentuser'));
   delete currentuser.profilepic;
   localStorage.setItem('currentuser',JSON.stringify(currentuser));
   let usersdata=JSON.parse(localStorage.getItem('usersdata'));
   usersdata.forEach((user)=>{
if (user.email==currentuser.email) {
    delete user.profilepic;
}}); 
localStorage.setItem('usersdata',JSON.stringify(usersdata));
   let hi=document.querySelectorAll('.hiUser');
    hi.forEach(elem=>{
        elem.innerHTML=`Hi! <b style='padding-left:5px'>${currentuser.fname}</b>`;
        if (currentuser.profilepic) {
            elem.innerHTML=`Hi! <b style='padding-left:5px'>${currentuser.fname}</b> <img src="${currentuser.profilepic}" width='20px' heigth='20px' style="display:block; margin-left:4px; border-radius:50%; object-fit:cover;" >`; 
        }});
        document.getElementById('picture').innerHTML="";
});
}else{
    window.location.href="../login/login.html";
}

//navbar responsive
document.querySelector('#navbtn').addEventListener('click',()=>{
    document.querySelector('nav').classList.toggle('responsivenav');
      });
