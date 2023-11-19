
// Configuración Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdzu88Yc2hFkOBK0BrcvSGX-4yDbAs8R0",
  authDomain: "sd-notebooks-6e2a8.firebaseapp.com",
  projectId: "sd-notebooks-6e2a8",
  storageBucket: "sd-notebooks-6e2a8.appspot.com",
  messagingSenderId: "58677219226",
  appId: "1:58677219226:web:457132eb82f664bfa63423"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

// Referencia al formulario de login

const loginFormSubmit = document.getElementById("loginForm");

loginFormSubmit.addEventListener("submit", function (event) {
  event.preventDefault();

  // Obtención de los datos del form

  const correo = document.getElementById("mail").value;
  const password = document.getElementById("password").value;

  // Autentificación de datos con firebase

  signInWithEmailAndPassword(firebaseAuth, correo, password)
    .then((result) => {
      const { displayName, email, uid } = result.user;

      console.log(displayName);

      // Inserción de datos en sessionStorage

      sessionStorage.setItem('displayName', displayName);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('uid', uid);

      // Redirección hacia Notes View

      window.location.href = "../views/login_view.html";

    }).catch((error) => {

      // Control de Errores

      const errorCode = error.code;
      const errorMessage = error.message;

      // Reseteo para errores

      while (erroresList.firstChild) {
        erroresList.removeChild(erroresList.firstChild);
      }

      const ErrorPass = document.createElement("li")
      ErrorPass.className = "error"

      const ErrorIcon = document.createElement("i")
      ErrorIcon.className = "fa-solid fa-xmark"

      const ErrorText = document.createElement("span")
      if (errorMessage == "Firebase: Error (auth/invalid-email).") {

        ErrorText.textContent = " El correo no se encuentra registrado";

        document.getElementById("mail").value = "";
        document.getElementById("password").value = "";

      } else if (errorMessage == "Firebase: Error (auth/invalid-login-credentials).") {

        ErrorText.textContent = " Contraseña Incorrecta";

        document.getElementById("password").value = "";

      } else {

        ErrorText.textContent = " Error Desconocido";

      }

      ErrorPass.appendChild(ErrorIcon);
      ErrorPass.appendChild(ErrorText);

      document.getElementById("erroresList").appendChild(ErrorPass);

      console.log(errorMessage);
    });
});