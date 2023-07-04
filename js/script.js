//Calcular costo total de productos y/o servicios seleccionados por el usuario.
//En pagina de una empresa que hace renders 3D, elegir si quiero comprar un render fijo, una axonometria, o una animacion.

//Declaro las variables a utilizar
const render = 40000;
const axonometria = 60000;
const animacion = 200000;
let carrito = "";
let nuevaCompra = false;
let producto = prompt("¿Que desea comprar?: render, axonometria, animacion");
let cantidad = parseInt(prompt(`¿Cuantos desea comprar?`));

//Declaro las funcion 1

function compraTotal(producto, cantidad) {
  do {
    seleccionarProducto(producto, cantidad);
    nuevaCompra = confirm("¿Desea comprar algo mas?");
    if (nuevaCompra) {
      producto = prompt("¿Que desea comprar?: render, axonometria, animacion");
      cantidad = parseInt(prompt(`¿Cuantos desea comprar?`));
    }
  } while (nuevaCompra);
}
//Declaro las funcion 2
function seleccionarProducto(producto, cantidad) {
  if (producto.toLowerCase() == "render") {
    resultado = (cantidad * render);
    carrito = `Del producto ${producto} compraste ${cantidad}. Da un total de ${resultado} pesos`;
  } else if (producto.toLowerCase() == "axonometria") {
    resultado = (cantidad * axonometria);
    carrito = `Del producto ${producto} compraste ${cantidad}. Da un total de ${resultado} pesos`;
  } else if (producto.toLowerCase() == "animacion"){
    resultado = (cantidad * animacion);
    carrito = `Del producto ${producto} compraste ${cantidad}. Da un total de ${resultado} pesos`;
  } else {
    alert("No vendemos ese producto")
  }
  document.write(`${carrito}<br>`);
}
//Llamo a la funcion
compraTotal(producto, cantidad);

