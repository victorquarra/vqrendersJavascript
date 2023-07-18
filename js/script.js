//Calcular costo total de productos y/o servicios seleccionados por el usuario.
//En pagina de una empresa que hace renders 3D, elegir si quiero comprar un render fijo, una axonometria, o una animacion y cuantos quiere.

//Declaro las variables a utilizar

const productos = [
  {
    id : 1,
    tipoProducto : "render",
    valor : 40000,
  },
  {
    id : 2,
    tipoProducto : "axonometria",
    valor : 60000,
  },
  {
    id : 3,
    tipoProducto : "animacion",
    valor : 200000,
  }
];

let sumadorDeCompras = [];

function productoDelListado() {
  let elegido = prompt("¿Que desea comprar?: render, axonometria, animacion");
  producto = productos.find((p) => p.tipoProducto.toLowerCase() === elegido.toLowerCase());
}

function sumarProducto() {
  if (producto) {
    let cantidad = parseInt(prompt(`¿Cuantos desea comprar?`));
    sumadorDeCompras.push({
      producto: producto.tipoProducto,
      cantidad: cantidad,
      subtotal: producto.valor * cantidad
    });
  } else {
    alert("Error. Intente de nuevo");
  }
}

function confirmarCompra() {
  while (true) {
    productoDelListado();
    sumarProducto();

    if (!confirm("¿Desea comprar algo mas?")) {
      break;
    }
  }
}

function compraTotal() {
  console.log("Acumulado:");
  sumadorDeCompras.forEach((item) => {
    console.log(`- ${item.cantidad} ${item.producto}: ${item.subtotal}`);
  });

  let total = sumadorDeCompras.reduce((sum, item) => sum + item.subtotal, 0);
  console.log(`Total: ${total}`);
}


confirmarCompra();

compraTotal();
