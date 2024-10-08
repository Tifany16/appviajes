document.addEventListener("DOMContentLoaded", function () {
    // Objeto que contiene referencias a todas las vistas
    const views = {
        splash: document.getElementById("splash"),
        loginForm: document.getElementById("login-form"),
        registerForm: document.getElementById("register-form"),
        mainView: document.getElementById("main-view"),
        main2View: document.getElementById("main2-view"),
        perfilView: document.getElementById("perfil-view"),
        restaurantesView: document.getElementById("restaurantes-view"),
        restaurantes2View: document.getElementById("restaurantes2-view"),
        misrutasView: document.getElementById("misrutas-view"),
        passwordRecoveryView: document.getElementById("password-recovery-view"),
    };

    // Orden de las vistas principales
    const viewOrder = ["mainView", "main2View"];
    let currentViewIndex = 0;

    // Función para mostrar una vista específica y ocultar las demás
    function showView(viewToShow) {
    Object.values(views).forEach((view) => {
        if (view) {
            view.style.display = "none";
        }
    });
    if (views[viewToShow]) {
        views[viewToShow].style.display = "block";
    }

    // Asegurarse de que la navegación esté visible en todas las vistas
    document.querySelectorAll('nav').forEach(nav => {
        nav.style.display = 'block';
    });
    }

    // Función para actualizar la vista principal
    function updateMainView() {
        showView(viewOrder[currentViewIndex]);
    }

    // Manejo de rutas del usuario
    let userRoute = JSON.parse(localStorage.getItem("userRoute")) || [];

    // Botón "Agregar" en Pueblito Paisa
    const agregarBtnPueblito = document.getElementById("agregar-btn-pueblito");
    if (agregarBtnPueblito) {
        agregarBtnPueblito.addEventListener("click", function () {
            addToRoute("Pueblito Paisa");
        });
    }
    // Botón "Agregar" en Comuna 13
    const agregarBtnComuna13 = document.getElementById("agregar-btn-comuna13");
    if (agregarBtnComuna13) {
        agregarBtnComuna13.addEventListener("click", function () {
            addToRoute("Comuna 13");
        });
    }
    
    // Navegación a la vista de Mis Rutas
    const misrutasBtn = document.querySelector('nav ul li a[href="#misrutas"]');
    if (misrutasBtn) {
        misrutasBtn.addEventListener("click", function (event) {
            event.preventDefault();
            showView("misrutasView");
            updateRouteView();
        });
    }

    // Navegación entre vistas principales
    document.querySelectorAll(".arrow-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
            if (this.id === "prev-arrow" && currentViewIndex > 0) {
                currentViewIndex--;
            } else if (this.id === "next-arrow" && currentViewIndex < viewOrder.length - 1) {
                currentViewIndex++;
            }
            updateMainView();
        });
    });

    // Mostrar pantalla splash y luego el formulario de inicio de sesión
    setTimeout(() => {
        showView("loginForm");
    }, 2000);

    // Cambiar a formulario de registro
    document.getElementById("create-account").addEventListener("click", function (event) {
        event.preventDefault();
        showView("registerForm");
    });

    // Volver al formulario de inicio de sesión desde el registro
    document.getElementById("login-link").addEventListener("click", function (event) {
        event.preventDefault();
        showView("loginForm");
    });


    // Manejar el registro
    document.getElementById("registerForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const pin = document.getElementById("pin").value;

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        if (pin.length !== 4 || !/^\d+$/.test(pin)) {
            alert("El PIN debe ser de 4 dígitos numéricos");
            return;
        }

        localStorage.setItem("nombre", nombre);
        localStorage.setItem("apellido", apellido);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("pin", pin);

        alert("Registro exitoso");
        showView("loginForm");
    });

    // Añadir enlace para recuperar contraseña en el formulario de inicio de sesión
    const forgotPasswordLink = document.getElementById("forgot-password-link");
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", function(event) {
            event.preventDefault();
            showView("passwordRecoveryView");
        });
    }

    // Volver al inicio de sesión desde la recuperación de contraseña
     const backToLoginLink = document.getElementById("back-to-login");
     if (backToLoginLink) {
         backToLoginLink.addEventListener("click", function(event) {
             event.preventDefault();
             showView("loginForm");
         });
    }

    // Manejar la recuperación de contraseña
    const passwordRecoveryForm = document.getElementById("passwordRecoveryForm");
    if (passwordRecoveryForm) {
        passwordRecoveryForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = document.getElementById("recovery-email").value;
            const pin = document.getElementById("recovery-pin").value;
            const newPassword = document.getElementById("new-password").value;
            const confirmNewPassword = document.getElementById("confirm-new-password").value;

            // Verificar que el email existe
            const storedEmail = localStorage.getItem("email");
            if (email !== storedEmail) {
                alert("El correo electrónico no está registrado.");
                return;
            }

            // Verificar que el PIN es correcto
            const storedPin = localStorage.getItem("pin");
            if (pin !== storedPin) {
                alert("El PIN es incorrecto.");
                return;
            }

            // Verificar que las nuevas contraseñas coinciden
            if (newPassword !== confirmNewPassword) {
                alert("Las nuevas contraseñas no coinciden.");
                return;
            }

            // Actualizar la contraseña
            localStorage.setItem("password", newPassword);
            alert("Contraseña actualizada con éxito.");
            showView("loginForm");
        });
    }

    // Navegación general mediante la barra de navegación
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            if (targetId === "misrutas") {
                showView("misrutasView");
                updateRouteView();
            } else {
                showView(targetId + "View");
            }
        });
    });

    // Navegación a la vista de Restaurantes desde Pueblito Paisa
    const restaurantesButton = document.getElementById("restaurantes-btn");
    if (restaurantesButton) {
        restaurantesButton.addEventListener("click", function () {
            showView("restaurantesView");
        });
    }

    // Navegación a la vista de Restaurantes2 desde Comuna 13
    const restaurantes2Button = document.getElementById("restaurantes2-btn");
    if (restaurantes2Button) {
        restaurantes2Button.addEventListener("click", function () {
            showView("restaurantes2View");
        });
    }

    // Función para mostrar la ventana emergente de validación
    function showValidationPopup() {
        const popup = document.getElementById("validacion-popup");
        const lista = document.getElementById("validacion-lista");
        lista.innerHTML = "";

        userRoute.forEach(lugar => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${lugar}</span>
                <input type="checkbox" class="lugar-checkbox">
            `;
            lista.appendChild(li);
        });

        popup.style.display = "flex";
    }

    // Función para cerrar la ventana emergente de validación
    function closeValidationPopup() {
        const popup = document.getElementById("validacion-popup");
        popup.style.display = "none";
    }

    // Event listener para el botón de validar
    const validarBtn = document.getElementById("validar-btn");
    if (validarBtn) {
        validarBtn.addEventListener("click", showValidationPopup);
    }

    // Event listener para el botón de cerrar la ventana emergente
    const cerrarPopupBtn = document.getElementById("cerrar-popup");
    if (cerrarPopupBtn) {
        cerrarPopupBtn.addEventListener("click", closeValidationPopup);
    }

    // Event listener para el botón de confirmar validación
    const confirmarValidacionBtn = document.getElementById("confirmar-validacion");
    if (confirmarValidacionBtn) {
        confirmarValidacionBtn.addEventListener("click", function() {
            alert("¡Felicidades! Has ganado una estrella por completar tu ruta.");
            closeValidationPopup();
            showView("misrutasView");
            updateRouteView();
        });
    }

    // Manejo de rutas del usuario
    function getUserRoute() {
        const email = localStorage.getItem("currentUser");
        if (email) {
            return JSON.parse(localStorage.getItem(`route_${email}`)) || [];
        }
        return [];
    }

    function saveUserRoute(route) {
        const email = localStorage.getItem("currentUser");
        if (email) {
            localStorage.setItem(`route_${email}`, JSON.stringify(route));
        }
    }

    // Función para actualizar la vista de la ruta del usuario
    function updateRouteView() {
        const rutaContainer = document.getElementById("rutas-container");
        if (rutaContainer) {
            rutaContainer.innerHTML = ""; // Limpiar el contenedor

            userRoute.forEach((lugar, index) => {
                const lugarElement = document.createElement("div");
                lugarElement.classList.add("lugar-ruta");

                const nombreLugar = document.createElement("p");
                nombreLugar.textContent = lugar;

                lugarElement.appendChild(nombreLugar);
                rutaContainer.appendChild(lugarElement);

                // Agregar línea de tiempo si no es el último elemento
                if (index < userRoute.length - 1) {
                    const line = document.createElement("div");
                    line.classList.add("linea-tiempo");
                    const marker = document.createElement("div");
                    marker.classList.add("marcador");
                    line.appendChild(marker);
                    rutaContainer.appendChild(line);
                }
            });
        }
    }

    // Manejar el inicio de sesión
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");

        if (email === storedEmail && password === storedPassword) {
            localStorage.setItem("currentUser", email);
            userRoute = getUserRoute(); // Cargar la ruta del usuario actual
            alert("Inicio de sesión exitoso");
            showView("mainView");
        } else {
            alert("Correo o contraseña incorrectos");
        }
    });

    // Cerrar sesión
    const logoutButton = document.querySelector(".logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("currentUser");
            userRoute = []; // Limpiar la ruta en memoria
            showView("loginForm");
        });
    }
    
    // Navegación a la vista de Perfil y mostrar datos del perfil
    const perfilBtn = document.querySelector('nav ul li a[href="#perfil"]');
    if (perfilBtn) {
        perfilBtn.addEventListener("click", function(event) {
            event.preventDefault();
            showView("perfilView");
            // Mostrar datos del perfil
            document.getElementById("profile-name").textContent = localStorage.getItem("nombre") + " " + localStorage.getItem("apellido");
            document.getElementById("profile-email").textContent = "Correo: " + localStorage.getItem("email");
        });
    }

    const lugaresImagenes = {
        "Pueblito Paisa": "images/pueblitoPaisa-1.jpg",
        "Comuna 13": "images/comuna13.png",
        // Añade más lugares e imágenes según sea necesario
    };

    // Función para añadir un lugar a la ruta del usuario
    function addToRoute(lugar) {
        if (!userRoute.includes(lugar)) {
            userRoute.push(lugar);
            saveUserRoute(userRoute);
            alert(`${lugar} ha sido añadido a tu ruta.`);
            updateRouteView();
        } else {
            alert(`${lugar} ya está en tu ruta.`);
        }
    }
});