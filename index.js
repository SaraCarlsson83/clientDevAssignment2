let addItemdiv = $("#addItems");
const itemFile = "https://webacademy.se/fakestore/";
let allItems = "";
let counter = 0;

$(document).ready(run)

$(document).on('click', '.addToCartBtn', saveInLocalStorage);


function run() {
    $.getJSON(itemFile, function(response) {
        addItems(response);
        allItems = response;
        sessionStorage.setItem("allItems", JSON.stringify(allItems));
    })

    counter = localStorage.getItem("counter") || 0; 
}

function getAllItems(){ 
    return JSON.parse(sessionStorage.getItem("allItems"))
}

function getProduct(btnId){ 
    let product = "";
    getAllItems().forEach((e)=> {
        if(e.id=== btnId){
            product = e;
            
        }
    })
    return product;
}

function saveInLocalStorage() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    console.log(cartItems)
    getAllItems().forEach((e) => {if(e.id==this.id){
        if(cartItems===null){
            
            cartItems=[];
            cartItems.push({
            "id": e.id,
            "title": e.title,
            "price": e.price,
            "image": e.image,
            "qty": 1
            });
        }
        else{   

            let isFound = false;
            cartItems.forEach((f)=> {
                if(f.id==e.id){
                    f.qty +=1;
                    isFound = true;
                }
            })

            if(!isFound){
                cartItems.push({
                    "id": e.id,
                    "title": e.title,
                    "price": e.price,
                    "image": e.image,
                    "qty": 1
                    });
            }
                
    }}})
        console.log("ur if-satsen")
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    //localStorage.setItem(`id${++counter}`, JSON.stringify(e))
    localStorage.setItem(`counter`, counter)
}
    


function addItems(json) {
    console.log(typeof(json));

    let output = "";
    json.forEach((e)=>(output +=`
            <div  class="col text-center" >
                <div class="p-3 border border-2" id = "itemCard">
                    <div id = "title"><h5 class="text-wrap">${e.title}</h5></div>
                    <img src=${e.image} alt=Placeholder image class="m-3 item-card-pic">
                    <h5> ${e.price}kr</h5>
                    <p id = "p-height" data-toggle="tooltip" title = "${e.description}"> ${e.description}</p>
                    <button type="button" class = "btn btn-outline-dark addToCartBtn" id = "${e.id}">Lägg i varukorgen</button>
                </div>
             </div>`));

    addItemdiv.html(output);
}