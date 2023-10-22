let producName = document.getElementById("productName");
let producprice = document.getElementById("productPrice");
let productcategory = document.getElementById("productCategory");
let producdese = document.getElementById("producrdescrotion");
let btnAdd = document.getElementById("addData");
let updateBtn=document.getElementById('updateBtn')
let indexItem=0;
let productlist = [];
if(localStorage.getItem('product')!==null){
    productlist= JSON.parse(localStorage.getItem('product'))
    displayData(productlist)
}

function addData() {
  let products = {
    name: producName.value,
    price: producprice.value,
    cates: productcategory.value,
    desc: producdese.value,
  };

  productlist.push(products);
  localStorage.setItem('product',JSON.stringify(productlist))
  displayData(productlist);
  
}
function displayData(arr) {
  let cartona = "";
  for (let i = 0;i<arr.length; i++) {

    cartona += `<tr>
            <td>${i}</td>
            <td>${arr[i].newName?arr[i].newName:arr[i].name}</td>
            <td>${arr[i].price}</td>
            <td>${arr[i].cates}</td>
            <td>${arr[i].desc}</td>
            <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning px-2 " ">Update</button></td>
            <td><button class="btn btn-outline-danger px-2 "onclick="deleteProduct(${i})">Remove</button></td>
            </tr> `;
            
  }
  document.getElementById("crudAdding").innerHTML = cartona;
}

function clearForm(){
    producName.value=''
    producprice.value=''
    producdese.value=''
    productcategory.value=''
}

function deleteProduct(el){
    productlist.splice(el,1)
    localStorage.setItem('product',JSON.stringify(productlist))
    displayData(productlist)
   
}

function searchProducts(term){
let searchProduct=[]
for(let i=0;i<productlist.length;i++){
    
if(productlist[i].name.toLowerCase().includes(term.toLowerCase())){
    productlist[i].newName=productlist[i].name.toLowerCase().replace(term.toLowerCase(),`<span class='textsearch'>${term}</span>`)
    searchProduct.push(productlist[i])

}
}
displayData(searchProduct) 
}

function updateProduct(index){
indexItem=index;
producName.value=productlist[indexItem].name
producprice.value=productlist[indexItem].price
producdese.value=productlist[indexItem].desc
productcategory.value=productlist[indexItem].cates
btnAdd.classList.replace('d-block','d-none')
updateBtn.classList.replace('d-none','d-block')

}
function saveproducts(){
   console.log(indexItem);
    productlist[indexItem].namev = producName.value
    productlist[indexItem].price = producprice.value
    productlist[indexItem].desc = producdese.value
    productlist[indexItem].cates = productcategory.value
    console.log(productlist);
    localStorage.setItem('product',JSON.stringify(productlist))
    displayData(productlist);
    btnAdd.classList.replace('d-none','d-block')
    updateBtn.classList.replace('d-block','d-none')

}

updateBtn.addEventListener('click',function(){
    saveproducts()
    clearForm()
})

btnAdd.addEventListener("click", () => {
  addData();
  clearForm()
});
