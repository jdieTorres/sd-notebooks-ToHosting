import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, updateProfile } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdzu88Yc2hFkOBK0BrcvSGX-4yDbAs8R0",
  authDomain: "sd-notebooks-6e2a8.firebaseapp.com",
  projectId: "sd-notebooks-6e2a8",
  storageBucket: "sd-notebooks-6e2a8.appspot.com",
  messagingSenderId: "58677219226",
  appId: "1:58677219226:web:457132eb82f664bfa63423"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);



// Login with Google
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("googleLogin");

googleLogin.addEventListener("click", function () {

  signInWithPopup(firebaseAuth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const { displayName, email, photoURL, uid } = result.user;

      sessionStorage.setItem('displayName', displayName);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('photoURL', photoURL);
      sessionStorage.setItem('uid', uid);

      window.location.href = "../views/login_view.html";

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      return {
        errorMessage
      }

    });
})


// Login with Facebook
const FacebookLogin = document.getElementById("FacebookLogin");
FacebookLogin.addEventListener("click", function(){

  const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const { displayName, email, photoURL, uid } = result.user;

    sessionStorage.setItem('displayName', displayName);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('photoURL', photoURL);
    sessionStorage.setItem('uid', uid);

    window.location.href = "../views/login_view.html";
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      errorMessage
    }

  });
});

const signFormSubmit = document.getElementById("signForm");

signFormSubmit.addEventListener("submit", function (event) {
  event.preventDefault();

  while (erroresList.firstChild) {
    erroresList.removeChild(erroresList.firstChild);
  }

  const correo = document.getElementById("mail").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("contrasena").value;
  const password_v = document.getElementById("contrasena_again").value;

  if (correo.includes('@')) {

    if (username.length >= 5) {

      if (password.length >= 8) {

        if (password == password_v) {

          createUserWithEmailAndPassword(firebaseAuth, correo, password)
            .then((result) => {

            }).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;

              console.log(errorMessage);

            });

            updateProfile(firebaseAuth.currentUser, {
              displayName: username
            }).then(() => {

              const {displayName, email, uid } = firebaseAuth.currentUser;

              sessionStorage.setItem('displayName', displayName);
              sessionStorage.setItem('email', email);
              sessionStorage.setItem('uid', uid);

              window.location.href = "../views/login_view.html";

              console.log(displayName, email, uid)

            }).catch((error) => {
              const errorMessage = error.message;

              console.log(errorMessage);
            });

        } else {

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