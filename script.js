let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})
/*
let products = [
    {
        id: 1,
        name: 'RENDER',
        image: '1.PNG',
        price: 40000
    },
    {
        id: 2,
        name: 'AXONOMETRIA',
        image: '2.PNG',
        price: 60000
    },
    {
        id: 3,
        name: 'ANIMACION',
        image: '3.PNG',
        price: 220000
    },
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Agregar al carrito</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
*/

let listCards  = [];

//const url = './data.json';

fetch('./products.json')
.then(resp => resp.json())
.then(products => initApp(products))

function initApp(products){
    //console.log("EN LA FUNCION");
    //console.log(products);
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button id="btn-${value.id}">Agregar al carrito</button>`;
        list.appendChild(newDiv);

        const btn = document.getElementById(`btn-${value.id}`)
        btn.addEventListener("click", () => addToCard(key,products))
})

}

function addToCard(key,products){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    localStorage.setItem('carrito', JSON.stringify(listCards));
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button id="btn2-${value.id}">-</button>
                    <div class="count">${value.quantity}</div>
                    <button id="btn3-${value.id}">+</button>
                </div>`;
                listCard.appendChild(newDiv);

                const btn2 = document.getElementById(`btn-${value.id}`)
                btn2.addEventListener("click", () => changeQuantity(key, value.quantity - 1))
                const btn3 = document.getElementById(`btn-${value.id}`)
                btn3.addEventListener("click", () => changeQuantity(key, value.quantity + 1))
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity, products){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}