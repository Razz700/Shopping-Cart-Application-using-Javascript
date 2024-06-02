
let currentuser=JSON.parse(localStorage.getItem('currentuser'));
let colors=["red","blue","black","green","white"];
let sizes=["S","M","L","XL"];
if (currentuser) {//curr user is there!!!
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
//products in local storage
  if(localStorage.getItem('products')){
    renderelements('all');
    
  }else{
    fetch('https://fakestoreapi.com/products').then((res)=>{
      return res.json();
      }).then((data)=>{
        let newdata=data.map((item)=>{
      item.colors=colors.slice(Math.floor(Math.random()*5));
      item.sizes=sizes.slice(Math.floor(Math.random()*4));
      return item;
        });
        localStorage.setItem('products',JSON.stringify(newdata));
        renderelements("all");
      });
  }
  
}else{
  window.location.href="../login/login.html";
}


/// Render elements and filter category function
function renderelements(check){
  //set all input to false/null 
  document.getElementById('red').checked=false;
  document.getElementById('blue').checked=false;
  document.getElementById('black').checked=false;
  document.getElementById('green').checked=false;
  document.getElementById('white').checked=false;
  document.getElementById('s').checked=false;
  document.getElementById('m').checked=false;
  document.getElementById('l').checked=false;
  document.getElementById('xl').checked=false;
  document.getElementById('range').value=0;
  document.getElementById('0-25').checked=false;
  document.getElementById('25-50').checked=false;
  document.getElementById('50-100').checked=false;
  document.getElementById('100on').checked=false;
  //
 
  let category=document.getElementsByClassName('filter');
 category=[...category];
 document.querySelector('main-content>input').value="";
 let menshtml=document.querySelector('#mens-section-items');
 let  womenshtml=document.querySelector('#womens-section-items');
 let jewelleryhtml=document.querySelector('#jewellery-section-items');
 let electronicshtml=document.querySelector('#electronics-section-items');
 let products=JSON.parse(localStorage.getItem('products'));
 
     if (check=="all") {
      rendernow(0);
     }
 category.forEach((element,i )=> {
    element.addEventListener('click',()=>{
     rendernow(i);
    });
  });
  document.getElementById('search').style.cssText="display:none;";
  document.getElementById('filterResult').style.cssText="display:none;";
  //render now func start
  function rendernow(i){
    if (i==1 || i==0) {
      let mens=products.filter((item)=>item.category=="men's clothing");
      let section=document.querySelectorAll('main-content>section');
      section.forEach((sect)=>{
        sect.style.cssText="display:block;" });
        let undo_css=document.querySelectorAll('main-content>section>.items');
        undo_css.forEach((elem)=>{
  elem.style.cssText="display:flex; flex-wrap:nowrap;"});

      if(i==1){ 
        let section=document.querySelectorAll('main-content>section');
        section.forEach((sect,j)=>{
               if(j!=0){sect.style.cssText="display:none;"} });

     let classActive= document.querySelector('main-content>.filters>.active').classList;
     classActive.toggle('active');
     document.querySelectorAll('main-content>.filters>.filter')[1].classList.toggle('active');
    menshtml.style.cssText="display:flex; flex-wrap:wrap; overflow:auto;";
  }else{ let classActive= document.querySelector('main-content>.filters>.active').classList;
  classActive.toggle('active');
  document.querySelectorAll('main-content>.filters>.filter')[0].classList.toggle('active'); }
  menshtml.innerHTML=``;
  mens.forEach((prod,i)=>{
      menshtml.innerHTML+=`<div  class="item">
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
      <button id="b1${i}" onclick="addtocart(${prod.id},b1${i})">Add to Cart</button>
    </div>`;
    });
    coloraccordingly(mens,1);
    }
    if(i==2 || i==0){
      let womens=products.filter((item)=>item.category=="women's clothing");
        let section=document.querySelectorAll('main-content>section');
        section.forEach((sect)=>{
          sect.style.cssText="display:block;" });
          let undo_css=document.querySelectorAll('main-content>section>.items');
          undo_css.forEach((elem)=>{
    elem.style.cssText="display:flex; flex-wrap:nowrap;"
          });
      
      if(i==2){ 
        let section=document.querySelectorAll('main-content>section');
        section.forEach((sect,j)=>{
          if(j!=1){sect.style.cssText="display:none;"} });
      let classActive= document.querySelector('main-content>.filters>.active').classList;
      classActive.toggle('active');
      document.querySelectorAll('main-content>.filters>.filter')[2].classList.toggle('active');
    womenshtml.style.cssText="display:flex; flex-wrap:wrap; overflow:auto;";
  }else{ let classActive= document.querySelector('main-content>.filters>.active').classList;
  classActive.toggle('active');
  document.querySelectorAll('main-content>.filters>.filter')[0].classList.toggle('active'); 
}  
womenshtml.innerHTML=``;
  womens.forEach((prod,i)=>{
      womenshtml.innerHTML+=`<div  class="item">
      <img src="${prod.image}" alt="Item" />
      <div class="info">
        <div class="row">
          <div class="price">$${prod.price}</div>
          <div class="sized">${prod.sizes}</div>
        </div>
        <div class="colors">
          Colors:
          <div class="row" id="colorchange2${i}">
            <div class="circle" style="background-color: #000"></div>
            <div class="circle" style="background-color: #4938af"></div>
            <div class="circle" style="background-color: #203d3e"></div>
          </div>
        </div>
        <div class="row">Rating:<b>${prod.rating.rate}</b> count:${prod.rating.count}</div>
      </div>
      <button id="b2${i}" onclick="addtocart(${prod.id},b2${i})">Add to Cart</button>
    </div>`;
    });
    coloraccordingly(womens,2);
    }
    if(i==3 || i==0){
      let jewellery=products.filter((item)=>item.category=="jewelery");
        let section=document.querySelectorAll('main-content>section');
          section.forEach((sect)=>{
          sect.style.cssText="display:block;" });
          let undo_css=document.querySelectorAll('main-content>section>.items');
          undo_css.forEach((elem)=>{
          elem.style.cssText="display:flex; flex-wrap:nowrap;"
          });
      if(i==3){ 
        let section=document.querySelectorAll('main-content>section');
        section.forEach((sect,j)=>{
               if(j!=2){sect.style.cssText="display:none;"} });
      let classActive= document.querySelector('main-content>.filters>.active').classList;
      classActive.toggle('active');
      document.querySelectorAll('main-content>.filters>.filter')[3].classList.toggle('active');
   jewelleryhtml.style.cssText="display:flex; flex-wrap:wrap; overflow:auto;";
  }else{ let classActive= document.querySelector('main-content>.filters>.active').classList;
  classActive.toggle('active');
  document.querySelectorAll('main-content>.filters>.filter')[0].classList.toggle('active'); 
}

jewelleryhtml.innerHTML=``;
      jewellery.forEach((prod,i)=>{
        jewelleryhtml.innerHTML+=`<div  class="item">
        <img src="${prod.image}" alt="Item" />
        <div class="info">
          <div class="row">
            <div class="price">$${prod.price}</div>
            <div class="sized">${prod.sizes}</div>
          </div>
          <div class="colors">
            Colors:
            <div class="row" id="colorchange3${i}">
              <div class="circle" style="background-color: #000"></div>
              <div class="circle" style="background-color: #4938af"></div>
              <div class="circle" style="background-color: #203d3e"></div>
            </div>
          </div>
          <div class="row">Rating:<b>${prod.rating.rate}</b> count:${prod.rating.count}</div>
        </div>
        <button id="b3${i}" onclick="addtocart(${prod.id},b3${i})">Add to Cart</button>
      </div>`;
      });
      coloraccordingly(jewellery,3);
    }
    if(i==4 || i==0){
      let electronics=products.filter((item)=>item.category=="electronics");
        let section=document.querySelectorAll('main-content>section');
        section.forEach((sect)=>{
          sect.style.cssText="display:block;" });
          let undo_css=document.querySelectorAll('main-content>section>.items');
          undo_css.forEach((elem)=>{
      elem.style.cssText="display:flex; flex-wrap:nowrap;"
          });
     
      if(i==4){ 
      let section=document.querySelectorAll('main-content>section');
      section.forEach((sect,j)=>{
             if(j!=3){sect.style.cssText="display:none;"} });
    
    let classActive= document.querySelector('main-content>.filters>.active').classList;
    classActive.toggle('active');
    document.querySelectorAll('main-content>.filters>.filter')[4].classList.toggle('active');
  electronicshtml.style.cssText="display:flex; flex-wrap:wrap; overflow:auto;";
}else{ let classActive= document.querySelector('main-content>.filters>.active').classList;
  classActive.toggle('active');
  document.querySelectorAll('main-content>.filters>.filter')[0].classList.toggle('active'); 
}                  
      
  electronicshtml.innerHTML=``;
  electronics.forEach((prod,i)=>{
        electronicshtml.innerHTML+=`<div  class="item">
        <img src="${prod.image}" alt="Item" />
        <div class="info">
          <div class="row">
            <div class="price">$${prod.price}</div>
            <div class="sized">${prod.sizes}</div>
          </div>
          <div class="colors">
            Colors:
            <div class="row" id="colorchange4${i}">
              <div class="circle" style="background-color: #000"></div>
              <div class="circle" style="background-color: #4938af"></div>
              <div class="circle" style="background-color: #203d3e"></div>
            </div>
          </div>
          <div class="row">Rating:<b>${prod.rating.rate}</b> count:${prod.rating.count}</div>
        </div>
        <button id="b4${i}" onclick="addtocart(${prod.id},b4${i})">Add to Cart</button>
      </div>`;
      });
      coloraccordingly(electronics,4);
      
    }}
    //render now func ends
}
//render elements func ends

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

//search function starts
let search=document.querySelector('main-content>input');
//////////////////////////////////////////////////////
search.addEventListener('input',()=>{
    let val=search.value.toLowerCase().trim();
   let productsall=JSON.parse(localStorage.getItem('products'));
let searchprod=[];
if(val!=""){
productsall.forEach((prod)=>{
if (prod.title.toLowerCase().includes(val) || prod.description.toLowerCase().includes(val) || prod.category.toLowerCase().includes(val)) {
  searchprod.push(prod);}
});

  if (searchprod.length>0) {
           document.querySelectorAll('main-content>section').forEach((elem,k)=>{
              elem.style.cssText="display:none;"; });
                document.querySelector('#search').style.cssText="display:block;";
                let searchhtml=document.getElementById('search-section-items');
    searchhtml.style.cssText="display:flex; flex-wrap:wrap; overflow:auto;";
document.querySelector('main-content>.filters>.active').classList.toggle('active');
  document.querySelectorAll('main-content>.filters>.filter')[0].classList.toggle('active'); 
   searchhtml.innerHTML="";
  searchprod.forEach((prod,i)=>{
      searchhtml.innerHTML+=`<div  class="item">
      <img src="${prod.image}" alt="Item" />
      <div class="info">
        <div class="row">
          <div class="price">$${prod.price}</div>
          <div class="sized">${prod.sizes}</div>
        </div>
        <div class="colors">
          Colors:
          <div class="row" id="colorchange0${i}">
            <div class="circle" style="background-color: #000"></div>
            <div class="circle" style="background-color: #4938af"></div>
            <div class="circle" style="background-color: #203d3e"></div>
          </div>
        </div>
        <div class="row">Rating:<b>${prod.rating.rate}</b> count:${prod.rating.count}</div>
      </div>
      <button id="b0${i}" onclick="addtocart(${prod.id},b0${i})">Add to Cart</button>
    </div>`;
    });
    coloraccordingly(searchprod,0);
  }else{
    document.querySelectorAll('main-content>section').forEach((elem,k)=>{
      elem.style.cssText="display:none;"; });
    document.querySelector('#search').style.cssText="display:block;";
    let searchhtml=document.getElementById('search-section-items');
    searchhtml.innerHTML="";
    searchhtml.style.cssText="display:flex; flex-wrap:wrap; overflow:auto;";
    let text=document.createElement('p');
    text.textContent="Product not found!!";
    text.style.cssText="font-weight:600;";
   searchhtml.appendChild(text);
  }
}else{
  renderelements("all");
}

});
//search ends

//responsive aside design
document.querySelector('main>aside>a').addEventListener('click',()=>{
  let listcl=document.querySelector('main>aside').classList;
  listcl.toggle('responsive');
  });
  document.querySelector('main>main-content').addEventListener('click',()=>{
  document.querySelector('main>aside').className="";  
    });
    
    //logout function navbtn
 document.getElementById('logoutnav').addEventListener('click',(event)=>{
  localStorage.removeItem('currentuser');
event.preventDefault();
      window.location.href="../index.html";
  });

    //filters category responsive
  document.querySelector('.filtercategory').addEventListener('click',()=>{
document.querySelector('.filters').classList.toggle('responsivefilter');
  });

  //navbar responsive
document.querySelector('#navbtn').addEventListener('click',()=>{
      document.querySelector('nav').classList.toggle('responsivenav');
        });

//add to cart func starts
function addtocart(id,btn){
if (localStorage.getItem('addtocart')) {
 let arr= JSON.parse(localStorage.getItem('addtocart'))
arr.push(id);
localStorage.setItem("addtocart",JSON.stringify(arr))
}else{
  localStorage.setItem('addtocart',JSON.stringify([id]));
}

btn.textContent='Added succesfully';
btn.style.backgroundColor="#22c247";
setTimeout(()=>{
  btn.textContent='Add to cart';
  btn.style.backgroundColor="black";
  btn.style.cssText=":hover{background-color:rgba(0,0,0,0.8)}"
},600);
}
//add to cart ends

//filter products aside func starts
//colors checkbox
document.querySelector('#red').addEventListener('click',()=>{
  filtereverything();
});
document.querySelector('#blue').addEventListener('click',()=>{
  filtereverything();
});
document.querySelector('#green').addEventListener('click',()=>{
  filtereverything();
});
document.querySelector('#black').addEventListener('click',()=>{
  filtereverything();
});
document.querySelector('#white').addEventListener('click',()=>{
  filtereverything();
});
//sizes checkbox
document.querySelector('#s').addEventListener('click',()=>{
  filtereverything();
});
document.querySelector('#m').addEventListener('click',()=>{
  filtereverything();
});
document.querySelector('#l').addEventListener('click',()=>{
  filtereverything();
});
document.querySelector('#xl').addEventListener('click',()=>{
  filtereverything();
});
//ratings type range
document.getElementById('range').addEventListener('input',()=>{
  filtereverything();
});
//prince checkbox
document.getElementById('0-25').addEventListener('click',()=>{
  filtereverything();
});
document.getElementById('25-50').addEventListener('click',()=>{
  filtereverything();
});
document.getElementById('50-100').addEventListener('click',()=>{
  filtereverything();
});
document.getElementById('100on').addEventListener('click',()=>{
  filtereverything();
});


//filters func starts filtereveything();
// 
function filtereverything(){
  let products=JSON.parse(localStorage.getItem('products'));
  let arrayitems=[];
  let itemids=[];
  const red=document.getElementById('red');
  const blue=document.getElementById('blue');
  const black=document.getElementById('black');
  const green=document.getElementById('green');
  const white=document.getElementById('white');
  const s=document.getElementById('s');
  const m=document.getElementById('m');
  const l=document.getElementById('l');
  const xl=document.getElementById('xl');
  const rating=document.getElementById('range');
  const upto25=document.getElementById('0-25');
  const upto50=document.getElementById('25-50');
  const upto100=document.getElementById('50-100');
  const more100=document.getElementById('100on');
  
  if(red.checked || blue.checked || black.checked || green.checked || white.checked || s.checked || m.checked || l.checked || xl.checked || rating.value!=0 || upto25.checked || upto50.checked || upto100.checked || more100.checked) {
    products.forEach((prod)=>{
      //colors
    if (red.checked && prod.colors.filter((item)=>item=="red")[0]=="red") {
      itemids.push(prod.id);
    }
    if (blue.checked && prod.colors.filter(item=>item=="blue")[0]=="blue") {
      itemids.push(prod.id);
    }
    if (black.checked && prod.colors.filter((item)=>item=="black")[0]=="black") {
      itemids.push(prod.id);
    }
    if (green.checked && prod.colors.filter((item)=>item=="green")[0]=="green") {
      itemids.push(prod.id);
    }
    if (white.checked && prod.colors.filter((item)=>item=="white")[0]=="white") {
      itemids.push(prod.id);
    }
// sizes
if (s.checked && prod.sizes.filter((item)=>item=="S")[0]=="S") {
  itemids.push(prod.id);
}
if (m.checked && prod.sizes.filter((item)=>item=="M")[0]=="M") {
  itemids.push(prod.id);
}
if (l.checked && prod.sizes.filter((item)=>item=="L")[0]=="L") {
  itemids.push(prod.id);
}
if (xl.checked && prod.sizes.filter((item)=>item=="XL")[0]=="XL") {
  itemids.push(prod.id);
}
//range rating
if (parseInt(prod.rating.rate)>=parseInt(rating.value) && parseInt(rating.value)!=0) {
  itemids.push(prod.id);
}
//price range
if (upto25.checked && parseInt(prod.price)<=25) {
  itemids.push(prod.id);
}
if (upto25.checked && parseInt(prod.price)<=25) {
  itemids.push(prod.id);
}
if (upto50.checked && parseInt(prod.price)>=25 && parseInt(prod.price)<=50 ) {
  itemids.push(prod.id);
}
if (upto100.checked && parseInt(prod.price)>=50 && parseInt(prod.price)<=100) {
  itemids.push(prod.id);
}
if (more100.checked && parseInt(prod.price)>=100) {
  itemids.push(prod.id);
}
    });
    // now rendering products
    let uniqueids=itemids.filter((item,i,arr)=>{
      return arr.indexOf(item)==i;});

      products.filter((prod)=>{
        uniqueids.forEach((id)=>{
if (prod.id==id) {
  arrayitems.push(prod);
}
        });
      });
      
    // actual 
  if (arrayitems.length>0) {
    //found elems after filter
    let filterhtml=document.getElementById('filter-section-items');
    document.querySelectorAll('main-content>section').forEach((elem,k)=>{
      elem.style.cssText="display:none;"; });
  document.querySelector('#filterResult').style.cssText="display:block;";
      
filterhtml.style.cssText="display:flex; flex-wrap:wrap; overflow:auto;";
document.querySelector('main-content>.filters>.active').classList.toggle('active');
document.querySelectorAll('main-content>.filters>.filter')[0].classList.toggle('active'); 
filterhtml.innerHTML=``;
arrayitems.forEach((prod,i)=>{
filterhtml.innerHTML+=`<div  class="item">
<img src="${prod.image}" alt="Item" />
<div class="info">
<div class="row">
<div class="price">$${prod.price}</div>
<div class="sized">${prod.sizes}</div>
</div>
<div class="colors">
Colors:
<div class="row" id="colorchange5${i}">
  <div class="circle" style="background-color: #000"></div>
  <div class="circle" style="background-color: #4938af"></div>
  <div class="circle" style="background-color: #203d3e"></div>
</div>
</div>
<div class="row">Rating:<b>${prod.rating.rate}</b> count:${prod.rating.count}</div>
</div>
<button id="b5${i}" onclick="addtocart(${prod.id},b5${i})">Add to Cart</button>
</div>`;
});
coloraccordingly(arrayitems,5); 
  }else{
    //not found elems after filter
    document.querySelectorAll('main-content>section').forEach((elem,k)=>{
      elem.style.cssText="display:none;"; });
      document.querySelector('#filterResult').style.cssText="display:block;";
    let filterhtml=document.getElementById('filter-section-items');
    filterhtml.style.cssText="display:flex; flex-wrap:wrap; overflow:auto;";
    filterhtml.innerHTML="";
    let text=document.createElement('p');
    text.textContent="Product not found!!";
    text.style.cssText="font-weight:600;";
   filterhtml.appendChild(text);
  }
      
  }else{
    renderelements('all');
  }
}
//clear all applied filters
document.getElementById('clearfilters').addEventListener('click',()=>{
 //set all input to false/null 
 document.getElementById('red').checked=false;
 document.getElementById('blue').checked=false;
 document.getElementById('black').checked=false;
 document.getElementById('green').checked=false;
 document.getElementById('white').checked=false;
 document.getElementById('s').checked=false;
 document.getElementById('m').checked=false;
 document.getElementById('l').checked=false;
 document.getElementById('xl').checked=false;
 document.getElementById('range').value=0;
 document.getElementById('0-25').checked=false;
 document.getElementById('25-50').checked=false;
 document.getElementById('50-100').checked=false;
 document.getElementById('100on').checked=false;
 renderelements('all');
});
//filter products aside func ends
//


