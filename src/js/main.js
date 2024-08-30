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
    