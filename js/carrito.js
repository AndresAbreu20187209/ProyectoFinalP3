// carrito.js

document.addEventListener("DOMContentLoaded", function() {
    const carritoDiv = document.getElementById('carrito');
    const agregarRecetaBtn = document.getElementById('agregar-receta');
    const recetaInput = document.getElementById('receta-input');
    const recetaContainer = document.getElementById('receta-container');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        carritoDiv.innerHTML = '<p>Tu carrito está vacío.</p>';
        finalizarCompraBtn.style.display = 'none'; // Ocultar el botón si el carrito está vacío
        return;
    }

    carrito.forEach(item => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');

        const imgElement = document.createElement('img');
        imgElement.src = item.imagen;
        imgElement.alt = item.nombre;

        const nombreElement = document.createElement('h3');
        nombreElement.textContent = item.nombre;

        const precioElement = document.createElement('p');
        precioElement.textContent = `$${item.precio.toFixed(2)}`;
        precioElement.classList.add('precio');

        const cantidadElement = document.createElement('p');
        cantidadElement.textContent = `Cantidad: ${item.cantidad}`;

        productoDiv.appendChild(imgElement);
        productoDiv.appendChild(nombreElement);
        productoDiv.appendChild(precioElement);
        productoDiv.appendChild(cantidadElement);

        carritoDiv.appendChild(productoDiv);
    });

    // Manejar la subida de la receta
    agregarRecetaBtn.addEventListener('click', function() {
        recetaInput.click(); // Simula el clic en el input de archivo
    });

    recetaInput.addEventListener('change', function() {
        const file = recetaInput.files[0];
        if (file) {
            const fileType = file.type;
            const fileReader = new FileReader();

            fileReader.onload = function(e) {
                recetaContainer.innerHTML = ''; // Limpiar contenedor
                if (fileType.includes('image')) {
                    const imgElement = document.createElement('img');
                    imgElement.src = e.target.result;
                    recetaContainer.appendChild(imgElement);
                } else if (fileType.includes('pdf')) {
                    const pdfElement = document.createElement('iframe');
                    pdfElement.src = e.target.result;
                    pdfElement.width = '100%';
                    pdfElement.height = '600px';
                    recetaContainer.appendChild(pdfElement);
                }
            };

            fileReader.readAsDataURL(file); // Leer el archivo como URL de datos
        }
    });

    // Manejar el clic en el botón "Finalizar Compra"
    finalizarCompraBtn.addEventListener('click', function() {
        alert('¡Compra finalizada con éxito! Gracias por tu compra.');
        
        // Limpiar el carrito y receta
        localStorage.removeItem('carrito');
        carritoDiv.innerHTML = '<p>Tu carrito está vacío.</p>';
        recetaContainer.innerHTML = ''; // Limpiar contenedor de la receta
        finalizarCompraBtn.style.display = 'none'; // Ocultar el botón
    });
});
