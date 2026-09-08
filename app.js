import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged

import { listarServicos } from "./catalog.js";
    
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import { auth } from "./auth.js";


const loginScreen = document.getElementById("loginScreen");
const registerScreen = document.getElementById("registerScreen");
const appScreen = document.getElementById("appScreen");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");

const loginMessage = document.getElementById("loginMessage");
const registerMessage = document.getElementById("registerMessage");

const userEmail = document.getElementById("userEmail");


document.getElementById("btnLogin").addEventListener("click", async () => {

    loginMessage.textContent = "";

    try {

        await signInWithEmailAndPassword(
            auth,
            loginEmail.value.trim(),
            loginPassword.value
        );

    } catch (error) {

        loginMessage.textContent = "E-mail ou senha inválidos.";

        console.error(error);

    }

});


document.getElementById("btnCadastro").addEventListener("click", async () => {

    registerMessage.textContent = "";

    try {

        await createUserWithEmailAndPassword(
            auth,
            registerEmail.value.trim(),
            registerPassword.value
        );

    } catch (error) {

        registerMessage.textContent = error.message;

        console.error(error);

    }

});


document.getElementById("btnMostrarCadastro").addEventListener("click", () => {

    loginScreen.classList.add("hidden");
    registerScreen.classList.remove("hidden");

});


document.getElementById("btnVoltarLogin").addEventListener("click", () => {

    registerScreen.classList.add("hidden");
    loginScreen.classList.remove("hidden");

});


document.getElementById("btnLogout").addEventListener("click", async () => {

    await signOut(auth);

});


onAuthStateChanged(auth, (user) => {

    if (user) {

        loginScreen.classList.add("hidden");
        registerScreen.classList.add("hidden");
        appScreen.classList.remove("hidden");

        userEmail.textContent = user.email;
        carregarCatalogo();

    } else {

        appScreen.classList.add("hidden");
        registerScreen.classList.add("hidden");
        loginScreen.classList.remove("hidden");

        userEmail.textContent = "";

    }

});
