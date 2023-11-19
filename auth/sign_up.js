
// Configuración Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

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

// Configuración Provider de Google

const Gprovider = new GoogleAuthProvider();

// Referencia al botón de Google

const googleLogin = document.getElementById("googleLogin");

googleLogin.addEventListener("click", function () {

  // Registro con PopUp de Google en Firebase

  signInWithPopup(firebaseAuth, Gprovider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const { displayName, email, uid } = result.user;

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

      return {
        errorMessage
      }

    });
});

/***************************************************************************************************/

// Referencia al formulario de Registro

const signFormSubmit = document.getElementById("signForm");

signFormSubmit.addEventListener("submit", function (event) {
  event.preventDefault();

  // Reseteo para errores

  while (erroresList.firstChild) {
    erroresList.removeChild(erroresList.firstChild);
  }

  // Obtención de los datos del form

  const correo = document.getElementById("mail").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("contrasena").value;
  const password_v = document.getElementById("contrasena_again").value;

  // Verificación de Datos y Obtención de Errores

  if (correo.includes('@')) {

    if (username.length >= 5) {

      if (password.length >= 8) {

        if (password == password_v) {

          // Creación del usuario con correo en Firebase

          createUserWithEmailAndPassword(firebaseAuth, correo, password)
            .then((result) => {

              console.log(result);

            }).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;

              console.log(errorMessage);

            });

          // Inclusión del username de usuario

          updateProfile(firebaseAuth.currentUser, {
            displayName: username
          }).then(() => {

            const { displayName, email, uid } = firebaseAuth.currentUser;

            console.log(displayName, email, uid)

            // Redirección hacia el Login

            window.location.href = "../views/register_view.html";

          }).catch((error) => {
            const errorMessage = error.message;

            console.log(errorMessage);
          });

        } else {

          // Creación de elementos HTML cargados con errores

          const ErrorPass = document.createElement("li")
          ErrorPass.className = "error"

          const ErrorIcon = document.createElement("i")
          ErrorIcon.className = "fa-solid fa-xmark"

          const ErrorText = document.createElement("span")
          ErrorText.textContent = " Las contraseñas no coinciden";

          ErrorPass.appendChild(ErrorIcon);
          ErrorPass.appendChild(ErrorText);

          document.getElementById("erroresList").appendChild(ErrorPass);

          document.getElementById("contrasena").value = "";
          document.getElementById("contrasena_again").value = "";

        }

      } else {

        // Creación de elementos HTML cargados con errores

        const ErrorPass = document.createElement("li")
        ErrorPass.className = "error"

        const ErrorIcon = document.createElement("i")
        ErrorIcon.className = "fa-solid fa-xmark"

        const ErrorText = document.createElement("span")
        ErrorText.textContent = " La contraseña debe tener mínimo 8 carácteres";

        ErrorPass.appendChild(ErrorIcon);
        ErrorPass.appendChild(ErrorText);

        document.getElementById("erroresList").appendChild(ErrorPass);

        document.getElementById("contrasena").value = "";
        document.getElementById("contrasena_again").value = "";

      }

    } else {

      // Creación de elementos HTML cargados con errores

      const ErrorName = document.createElement("li")
      ErrorName.className = "error"

      const ErrorIcon = document.createElement("i")
      ErrorIcon.className = "fa-solid fa-xmark"

      const ErrorText = document.createElement("span")
      ErrorText.textContent = " El nombre de usuario debe tener mínimo 5 carácteres";

      ErrorName.appendChild(ErrorIcon);
      ErrorName.appendChild(ErrorText);

      document.getElementById("erroresList").appendChild(ErrorName);

      document.getElementById("username").value = "";

    }

  } else {

    // Creación de elementos HTML cargados con errores

    const ErrorMail = document.createElement("li")
    ErrorMail.className = "error"

    const ErrorIcon = document.createElement("i")
    ErrorIcon.className = "fa-solid fa-xmark"

    const ErrorText = document.createElement("span")
    ErrorText.textContent = " El correo debe contener un '@'";

    ErrorMail.appendChild(ErrorIcon);
    ErrorMail.appendChild(ErrorText);

    document.getElementById("erroresList").appendChild(ErrorMail);

    document.getElementById("mail").value = "";

  }

});