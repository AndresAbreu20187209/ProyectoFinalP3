document.addEventListener("DOMContentLoaded", function() {
    
    fetch('productos.json')
        .then(response => response.json())
        .then(productos => {
            const productosDiv = document.getElementById('productos');
            
            productos.forEach(producto => {
    
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('producto');

    
                const imgElement = document.createElement('img');
                imgElement.src = `img/${producto.imagen}`;
                imgElement.alt = producto.nombre;

    
                const nombreElement = document.createElement('h3');
                nombreElement.textContent = producto.nombre;

    
                const descripcionElement = document.createElement('p');
                descripcionElement.textContent = producto.descripcion;

    
                const precioElement = document.createElement('p');
                precioElement.textContent = producto.precio.toFixed(2);  
                precioElement.classList.add('precio');  

  

                
                const cantidadElement = document.createElement('input');
                cantidadElement.type = 'number';
                cantidadElement.min = 1;
                cantidadElement.value = 1;
                cantidadElement.classList.add('cantidad');

                
                const botonElement = document.createElement('button');
                botonElement.textContent = 'Agregar al carrito';
                botonElement.classList.add('btn-agregar');
                
                
                botonElement.addEventListener('click', () => {
                    const cantidad = parseInt(cantidadElement.value);
                    agregarAlCarrito(producto, cantidad);
                });

                
                productoDiv.appendChild(imgElement);
                productoDiv.appendChild(nombreElement);
                productoDiv.appendChild(descripcionElement);
                productoDiv.appendChild(cantidadElement);
                productoDiv.appendChild(precioElement);
                productoDiv.appendChild(botonElement);

                
                productosDiv.appendChild(productoDiv);
            });
        })
        .catch(error => console.error('Error al cargar el catálogo:', error));
});


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

