
// Configuración Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyDdzu88Yc2hFkOBK0BrcvSGX-4yDbAs8R0",
    authDomain: "sd-notebooks-6e2a8.firebaseapp.com",
    projectId: "sd-notebooks-6e2a8",
    storageBucket: "sd-notebooks-6e2a8.appspot.com",
    messagingSenderId: "58677219226",
    appId: "1:58677219226:web:457132eb82f664bfa63423"
};

const app = initializeApp(firebaseConfig);

// Apunte hacia la Base de Datos de Firebase 

const FirebaseDB = getFirestore(app);

const uid = sessionStorage.getItem('uid');

// Configuración del formato dd-mm-aa de la fecha actual 

const new_date = new Date();
const mes= new_date.getMonth() + 1;
const dia = new_date.getDate();
const date = dia + ' - ' + mes + ' - ' + new_date.getFullYear();

// Creación objeto de nota (vacío)

const newNoteContent = {
    title: '',
    body: '',
    date: date
}

// Referencia al botón de nueva nota

const noteFormSubmit = document.getElementById("newNoteForm");

noteFormSubmit.addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtención de los datos del form

    const titulo = document.getElementById("title").value;
    const note = document.getElementById("content").value;

    // Carga del objeto (newNoteContent) con los datos del form

    newNoteContent.title = titulo;
    newNoteContent.body = note;

    // Creación del documento (nota) en la base de datos de Firebase

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))

    const setDocResp = setDoc(newDoc, newNoteContent)
        .then((result) => {

            console.log(result);
            console.log(setDocResp);

            location.reload();

        }).catch((error) => {

            // Manejo de errores

            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorMessage)

        });

});