// carrito.js

document.addEventListener('DOMContentLoaded', cargarCarrito);

// Función para cargar los productos en el carrito desde el almacenamiento local
function cargarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let listaCarrito = document.getElementById('lista-carrito');
    let totalCarrito = 0;

    // Limpiar la lista antes de agregar los productos
    listaCarrito.innerHTML = '';

    carrito.forEach(producto => {
        let divProducto = document.createElement('div');
        divProducto.classList.add('producto-carrito');

        divProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p>Cantidad: ${producto.cantidad}</p>
            <p>Precio: $${producto.precio}</p>
            <p>Subtotal: $${producto.precio * producto.cantidad}</p>
        `;

        listaCarrito.appendChild(divProducto);

        totalCarrito += producto.precio * producto.cantidad;
    });

    document.getElementById('total').textContent = totalCarrito.toFixed(2);
}

// Función para finalizar la compra
document.getElementById('finalizar-compra').addEventListener('click', () => {
    alert('¡Gracias por su compra!');
    localStorage.removeItem('carrito');
    cargarCarrito();  // Limpiar el carrito después de la compra
});

