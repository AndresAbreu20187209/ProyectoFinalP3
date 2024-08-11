// Leer el archivo JSON con los usuarios
fetch('users.json')
    .then(response => response.json())
    .then(users => {
        const loginForm = document.getElementById('loginForm');
        const errorMessage = document.getElementById('error-message');

        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Buscar al usuario en el archivo JSON
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                // Login exitoso
                alert('¡Inicio de sesión exitoso!');
                window.location.href = 'index.html'; // Redirige a la página principal
            } else {
                // Error en el login
                errorMessage.textContent = 'Usuario o contraseña incorrectos.';
            }
        });
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });
