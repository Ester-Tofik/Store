
class Store {
    constructor() {
        this.products = [new Product("water", "1111", "c", 6, 5), new Product("soda", "2222", "c", 11, 0)];
        this.manager = new Manager("avi");
    }
};

let newStore = new Store();

function getAllProducts() {
    productsList(newStore.products);
}
function productsList(list) {
    list.forEach((element) => {
        drowProduct(element);
    });
}
function drowProduct(product) {
    debugger
    var elmnt = document.getElementById("temp-card");
    var cln = elmnt.content.cloneNode(true);
    cln.querySelector("h1").innerText = product.name;
    cln.querySelector(".price").innerText = product.price+ ' $';
    cln.querySelector(".code").innerText ='קוד מוצר:'+ product.code;
    cln.querySelector(".category").innerText ='קטגוריה:'+ product.category;
    cln.querySelector(".outOfStock").innerText = 'במלאי:'+product.unitsInStock;
    cln.querySelector(".delete").addEventListener("click", p => {
        deleteProductFronArray(product);
    })
    cln.querySelector(".edit").addEventListener("click", p => {
        editProductFronArray(product);
    })    
    document.getElementById("PoductList").appendChild(cln);
    }

// }
function deleteProductFronArray(element) {
    let access = checkPermision();
    if (access) {
        let p = newStore.products;
        let indexToDelete = p.indexOf(element);
        p.splice(indexToDelete, 1);
        drawAfterChanges(p);
        newStore.products = p;
    }
}

function editProductFronArray(element) {
    let access = checkPermision();
    if (access) {
        document.getElementById("productToEdit").style.display = 'block';
        document.getElementById("nameEdit").value = element.name;
        document.getElementById("codeEdit").value = element.code;
        document.getElementById("categoryEdit").value = element.category;
        document.getElementById("priceEdit").value = element.price;
        document.getElementById("unitsInStockEdit").value = element.unitsInStock;
        document.getElementById("saveChanges").addEventListener("click", p => {
            saveChanges(element);
        });
    }
}
function saveChanges(element) {
    debugger
    const name = document.getElementById("nameEdit").value;
    const code = document.getElementById("codeEdit").value;
    const category = document.getElementById("categoryEdit").value;
    const price = document.getElementById("priceEdit").value;
    const unitsInStock = document.getElementById("unitsInStockEdit").value;
    const update = new Product(name, code, category, price, unitsInStock);
    let p = newStore.products;
    let indexToUpdate = p.indexOf(element);
    p[indexToUpdate] = update;
    drawAfterChanges(p);
    document.getElementById("productToEdit").style.display = 'none';
    newStore.products = p;
}
function drawAfterChanges(p) {
    debugger
    let listDiv = document.getElementById("list");
    let list = document.getElementById("PoductList");
    list.remove();
     let productDiv = document.createElement("div");
     productDiv.setAttribute("id", "PoductList");
     listDiv.appendChild(productDiv);
    productsList(p);
}
function searchByName() {
    let p = newStore.products;
    let input = document.getElementById('myInput');
    let filter = input.value.toUpperCase();
    let temp = [];
    for (i = 0; i < p.length; i++) {
        a = p[i].name;
        txtValue = a.textContent || a;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            temp.push(p[i]);
        }
    }
    drawAfterChanges(temp);
}
function searchByPrice() {
    let p = newStore.products;
    let min = document.getElementById('searchByPriceMin').value;
    let max = document.getElementById('searchByPriceMax').value;
    let temp = [];
    for (i = 0; i < p.length; i++) {
        a = p[i].price;
        if (a >= min && a <= max)
            temp = [...temp, p[i]];
    }
    drawAfterChanges(temp);
}
function searchByCategory() {
    let p = newStore.products;
    let category = document.getElementById('searchByCategory').value;
    p = p.filter((element) => element.category === category);
    drawAfterChanges(p);
}
function outOfStock() {
    let p = newStore.products;
    p = p.filter((element) => element.unitsInStock === 0);
    drawAfterChanges(p);
}
function checkPermision() {
    if (sessionStorage.getItem('user') != 'manager') {
        alert("Permission to access the administrator only!")
        return false;
    }
    else
        return true;
}
function addNewProdect() {
    let access = checkPermision();
    if (access) {
        document.getElementById("AddProduct").style.display = "block";
    }
}
function saveNewProduct() {
    debugger
    const name = document.getElementById("name").value;
    const code = document.getElementById("code").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const unitsInStock = document.getElementById("unitsInStock").value;
    const newProduct = new Product(name, code, category, price, unitsInStock);
    newProduct.show();
    let p = newStore.products;
    p = [...p, newProduct];
    drowProduct(newProduct);
    newStore.products = p;
    document.getElementById("AddProduct").style.display = "none";
}
