import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdzu88Yc2hFkOBK0BrcvSGX-4yDbAs8R0",
  authDomain: "sd-notebooks-6e2a8.firebaseapp.com",
  projectId: "sd-notebooks-6e2a8",
  storageBucket: "sd-notebooks-6e2a8.appspot.com",
  messagingSenderId: "58677219226",
  appId: "1:58677219226:web:457132eb82f664bfa63423"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';

const provider = new GoogleAuthProvider();

// Login with Google
const googleLogin = document.getElementById("googleLogin");

googleLogin.addEventListener("click", function () {

  signInWithPopup(auth, provider)
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




