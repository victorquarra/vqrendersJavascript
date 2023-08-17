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

let listCards  = [];

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
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Agregaste el producto al carrito',
        showConfirmButton: false,
        timer: 1500
    })
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    localStorage.setItem('carrito', JSON.stringify(listCards));
    reloadCard(products);
}
function reloadCard(products){
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

                const btn2 = document.getElementById(`btn2-${value.id}`)
                btn2.addEventListener("click", () => changeQuantity(key, value.quantity - 1,products))
                const btn3 = document.getElementById(`btn3-${value.id}`)
                btn3.addEventListener("click", () => changeQuantity(key, value.quantity + 1,products))
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity, products){
    if(quantity == 0){
        delete listCards[key];
    }else{
        if (products && products[key]){
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
}
    reloadCard(products);
}