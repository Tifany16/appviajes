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