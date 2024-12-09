let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("submit");
let divprice=document.querySelectorAll(".price");
let tbody = document.getElementById("tbody");


let mood= "create";
let tmp;
// get totatal
divprice.forEach((input) => {
    input.addEventListener("keyup", getTotal);
});
function getTotal(){
    if(price.value != "" ){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green";
    }else{
        total.innerHTML = "";
        total.style.backgroundColor = "rgb(21, 96, 99)";
    }  }             

// creat products
let data;
if(localStorage.getItem("products") != null){
    data = JSON.parse(localStorage.getItem("products"));
}
else{
    data = [];
}

create.addEventListener("click", (e) => {   
    e.preventDefault();
    if(title.value != "" ){
        let product = {
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value.toLowerCase(),
        }
        if  (mood === "create"){
                if(product.count > 1){
                    for(let i = 0; i < product.count; i++){  
                        data.push(product);
                    }
                

                    }else{
                        data.push(product);
                    }
        }else{
            console.log("kkk");
        
            data[tmp] = product;
    
            mood = "create";
            create.innerHTML = "create";
            count.style.display = "block";
            }
        localStorage.setItem("products",JSON.stringify(data));
        clearData();
        showdata();


       
       
    }else{
        alert("please enter details");
    }
    
});
// clear input
function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";    
}   

// read local storage
function showdata(){
    getTotal();
    let table = "";
   
    for(let i = 0; i < data.length; i++){
        table += `
        <tr>  
            <td>${i+1}</td>  
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;}
    tbody.innerHTML = table; 
    let btnDelete = document.getElementById("deleteAll");
  
    if  (data.length > 0){
       btnDelete.innerHTML = `<button onclick="deleteAll()" >deleteAll(${data.length})</button>`;
    }else{
        btnDelete.innerHTML = "";
    }
    
}
   
    
 
showdata();
// delete product
function deleteData(i){
    data.splice(i, 1);
    localStorage.setItem("products",JSON.stringify(data));
    showdata();
}

// delete all   
function deleteAll(){
    localStorage.clear();
    data.splice(0);
    showdata();
}
// update product

function updateData(i){
    
    title.value = data[i].title;
    price.value = data[i].price;
    taxes.value = data[i].taxes;
    ads.value = data[i].ads;
    category.value = data[i].category;
    discount.value = data[i].discount;
    getTotal();
    count.style.display = "none";
    create.innerHTML = "update";
    mood = "update";
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
    
    


}
// search product
let searchMood = "title";
let search = document.getElementById("search");
function gitsearchMood(id){
    if(id == "searchTitle"){
        searchMood = "title";
        
    }else{
        searchMood = "category";
       
    }
    search.placeholder = "search by " + searchMood;
    search.focus();

    search.addEventListener("keyup", (e) => {
        let searchValue = e.target.value.toLowerCase();
        let table = "";
        for(let i = 0; i < data.length; i++){
            if(searchMood == "title"){
                if(data[i].title.toLowerCase().includes(searchValue)){
                    table += `
                    <tr>  
                        <td>${i}</td>  
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].discount}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                    `;
                }
            }else{
                if(data[i].category.toLowerCase().includes(searchValue)){
                    table += `
                    <tr>  
                        <td>${i}</td>  
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].discount}</td> 
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                    `;
                }
            }
        }
        tbody.innerHTML = table;
       
    });
    // clear input
    search.addEventListener("focus", () => {
        
        search.value = "";
        showdata();

    });
    
   
    
}



                    
