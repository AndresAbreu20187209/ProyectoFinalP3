document.addEventListener("DOMContentLoaded", function() {
    // Cargar los productos desde un archivo JSON.
    fetch('productos.json')
        .then(response => response.json())
        .then(productos => {
            const productosDiv = document.getElementById('productos');
            
            productos.forEach(producto => {
                // Crear un div para cada producto.
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('producto');

                // Crear el elemento de imagen.
                const imgElement = document.createElement('img');
                imgElement.src = `img/${producto.imagen}`;
                imgElement.alt = producto.nombre;

                // Crear el elemento de título (nombre del producto).
                const nombreElement = document.createElement('h3');
                nombreElement.textContent = producto.nombre;

                // Crear el elemento de descripción.
                const descripcionElement = document.createElement('p');
                descripcionElement.textContent = producto.descripcion;

                // Crear el elemento de precio.
                const precioElement = document.createElement('p');
                precioElement.textContent = producto.precio.toFixed(2);  // Mostrar el precio con dos decimales
                precioElement.classList.add('precio');  // Aplicar la clase para estilo

  

                // Crear el campo de cantidad.
                const cantidadElement = document.createElement('input');
                cantidadElement.type = 'number';
                cantidadElement.min = 1;
                cantidadElement.value = 1; // Valor por defecto
                cantidadElement.classList.add('cantidad');

                // Crear el botón de "Agregar al carrito".
                const botonElement = document.createElement('button');
                botonElement.textContent = 'Agregar al carrito';
                botonElement.classList.add('btn-agregar');
                
                // Añadir evento al botón para manejar la lógica de agregar al carrito.
                botonElement.addEventListener('click', () => {
                    const cantidad = parseInt(cantidadElement.value);
                    agregarAlCarrito(producto, cantidad);
                });

                // Añadir la imagen, nombre, descripción, campo de cantidad y botón al div del producto.
                productoDiv.appendChild(imgElement);
                productoDiv.appendChild(nombreElement);
                productoDiv.appendChild(descripcionElement);
                productoDiv.appendChild(cantidadElement);
                productoDiv.appendChild(precioElement);
                productoDiv.appendChild(botonElement);

                // Añadir el div del producto al contenedor en el HTML.
                productosDiv.appendChild(productoDiv);
            });
        })
        .catch(error => console.error('Error al cargar el catálogo:', error));
});

// Función para agregar productos al carrito.
function agregarAlCarrito(producto, cantidad) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoExistente = carrito.find(p => p.nombre === producto.nombre);
    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad,
            imagen: `img/${producto.imagen}`
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`Agregaste ${cantidad} ${producto.nombre}(s) al carrito.`);
}

