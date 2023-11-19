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

const loginFormSubmit = document.getElementById("loginForm");

loginFormSubmit.addEventListener("submit", function (event) {
  event.preventDefault();

  const correo = document.getElementById("mail").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(firebaseAuth, correo, password)
    .then((result) => {
      const { displayName, email, uid } = result.user;

      console.log(displayName);

      sessionStorage.setItem('displayName', displayName);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('uid', uid);

      window.location.href = "../views/login_view.html";
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorMessage);
    });
});