// Leer el archivo JSON con los usuarios
let users = [];
fetch('users.json')
    .then(response => response.json())
    .then(data => {
        users = data;
        initializeForms();
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });

// Inicializar los formularios y eventos
function initializeForms() {
    const loginForm = document.getElementById('loginForm');
    const createUserForm = document.getElementById('createUserForm');
    const errorMessage = document.getElementById('error-message');
    const registerMessage = document.getElementById('register-message');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const loginContainer = document.getElementById('login-container');
    const loginFormDiv = document.getElementById('login-form');
    const registerFormDiv = document.getElementById('register-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            alert('¡Inicio de sesión exitoso!');
            window.location.href = 'index.html'; // Redirige a la página principal
        } else {
            errorMessage.textContent = 'Usuario o contraseña incorrectos.';
        }
    });

    createUserForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newUsername = document.getElementById('new-username').value;
        const newPassword = document.getElementById('new-password').value;

        // Validar si el usuario ya existe
        if (users.some(user => user.username === newUsername)) {
            registerMessage.textContent = 'El usuario ya existe.';
        } else {
            // Añadir nuevo usuario
            users.push({ username: newUsername, password: newPassword });

            // Actualizar archivo JSON (esto requiere un servidor backend, aquí solo simulamos el registro)
            console.log('Nuevo usuario registrado:', { username: newUsername, password: newPassword });

            alert('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
            loginFormDiv.style.display = 'block';
            registerFormDiv.style.display = 'none';
        }
    });

    showRegister.addEventListener('click', function(event) {
        event.preventDefault();
        loginFormDiv.style.display = 'none';
        registerFormDiv.style.display = 'block';
    });

    showLogin.addEventListener('click', function(event) {
        event.preventDefault();
        loginFormDiv.style.display = 'block';
        registerFormDiv.style.display = 'none';
    });
}
