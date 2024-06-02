let currentuser=JSON.parse(localStorage.getItem('currentuser'));
if(currentuser){
  // HI! user
let hi=document.querySelectorAll('.hiUser');
hi.forEach(elem=>{
  elem.innerHTML=`Hi! <b style='padding-left:5px;'>${currentuser.fname}</b>`;
  if (currentuser.profilepic) {
      elem.innerHTML=`Hi! <b style='padding-left:5px;'>${currentuser.fname}</b>
     <img src="${currentuser.profilepic}">`; 
  }
});
// HI! user ends
//order placed
if (JSON.parse(localStorage.getItem('order'))) {
  localStorage.removeItem('order');
  document.querySelector('main>aside').style.cssText="display:none;";
  let carthtml=document.getElementById('cart-section-items');
  carthtml.innerHTML=`<h2>Your order has been placed!!</h2>`;
}else if (localStorage.getItem('addtocart')) {
        rendercart();
    }else{
        //empty cart
        let carthtml=document.getElementById('cart-section-items');
        document.querySelector('main>aside').style.cssText="display:none;";
        carthtml.innerHTML=`<h2>Your cart is empty!!</h2>`;
    }
}else{
    //redirect to login page
    window.location.href="../login/login.html";
}

//render cart starts
function rendercart(){
    if (JSON.parse(localStorage.getItem('addtocart')).length>0) {
        // render cart func
        let products=JSON.parse(localStorage.getItem('products'));
        let cartids=JSON.parse(localStorage.getItem('addtocart'));
        let cartitems=[];
    cartids.forEach((id)=>{
            products.forEach((prod)=>{
                if (id==prod.id) {
    cartitems.push(prod);
                }
            });
        });
        document.querySelector('main>aside').style.cssText="display:block;";
            // console.log(cartitems,"cartiems");
           let carthtml=document.getElementById('cart-section-items');
           carthtml.innerHTML=``;
           cartitems.forEach((prod,i)=>{
               carthtml.innerHTML+=`<div id="b1${i}" class="item">
                   <img src="${prod.image}" alt="Item" />
                   <div class="info">
                     <div class="row">
                       <div class="price">$${prod.price}</div>
                       <div class="sized">${prod.sizes}</div>
                     </div>
                     <div class="colors">
                       Colors:
                       <div class="row" id="colorchange1${i}">
                         <div class="circle" style="background-color: #000"></div>
                         <div class="circle" style="background-color: #4938af"></div>
                         <div class="circle" style="background-color: #203d3e"></div>
                       </div>
                     </div>
                     <div class="row">Rating:<b>${prod.rating.rate}</b> count:${prod.rating.count}</div>
                   </div>
                   <button  onclick="removefromcart(${prod.id},b1${i})">Remove From Cart</button>
                 </div>`;
           });   
    coloraccordingly(cartitems,1);
    let checkout=document.querySelector('main>aside');
    checkout.innerHTML=`<p><b>checkout List</b></p>`;
    let table=document.createElement('table');
    let total=0;
    table.innerHTML=``;
    cartitems.forEach((item,i)=>{
    table.innerHTML+=`<tr><td>${i+1}.${item.title}</td><td><b>$${item.price}</b></td></tr>`;
    total+=item.price;
    });
    total=total.toFixed(2);
    checkout.appendChild(table);
    let totalbtn=document.createElement('div');
    totalbtn.innerHTML=`<p><b>Total</b></p><p><b>$${total}</b></p>`
    checkout.appendChild(totalbtn);
    let pay=document.createElement('button');
    pay.setAttribute('id','checkout');
    pay.textContent='Click To Checkout';
    checkout.appendChild(pay);
  //checkout
let checkoutpay=document.getElementById('checkout');

checkoutpay.addEventListener('click',()=>{
localStorage.setItem('amount',JSON.stringify(total));
window.location.href="../razorpay/index.html";
});   
    }else{
        //empty cart
        document.querySelector('main>aside').style.cssText="display:none;";
        let carthtml=document.getElementById('cart-section-items');
        carthtml.innerHTML=`<h2>Your cart is empty!!</h2>`;
    }
}
//render cart ends

//remove from cart starts
function removefromcart(id,item){
    let cartids=JSON.parse(localStorage.getItem('addtocart'));
    for (let i = 0; i < cartids.length; i++) {
        if (cartids[i]==id) {
            delete cartids[i];
            break;
        }   
    }
let arr=[];
cartids.forEach((elem)=>{
    if (item!=null) {
        arr.push(elem);
    }
});
localStorage.setItem('addtocart',JSON.stringify(arr));
item.remove();
rendercart();
}
//remove from cart ends

    //navbar responsive
document.querySelector('#navbtn').addEventListener('click',()=>{
    document.querySelector('nav').classList.toggle('responsivenav');
      });

      //logout function navbtn
 document.getElementById('logoutnav').addEventListener('click',(event)=>{
  localStorage.removeItem('currentuser');
event.preventDefault();
      window.location.href="../index.html";
  });

  
// color change func starts
function coloraccordingly(itemsNow,num){
  itemsNow.forEach((prod,i)=>{
    let colorchange=document.getElementById(`colorchange${num}${i}`);
  colorchange.innerHTML=``;
    let itemcolors=prod.colors;
    itemcolors.forEach((item1)=>{
      let color1=document.createElement('div');
  color1.setAttribute('class',"circle");
      if(item1=="white"){
        color1.style.backgroundColor="white";
        colorchange.appendChild(color1);
      }else if(item1=="blue"){
          color1.style.backgroundColor="blue";
          colorchange.appendChild(color1);
        }else if(item1=="green"){
          color1.style.backgroundColor="green";
          colorchange.appendChild(color1);
        }else if(item1=="black"){
          color1.style.backgroundColor="black";
          colorchange.appendChild(color1);
        }else if(item1=="red"){
          color1.style.backgroundColor="red";
          colorchange.appendChild(color1);
          }
    });});}
  //color change func ends

