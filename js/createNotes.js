import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js"

const newNoteContent = {
    title: '',
    body: '',
    date: new Date().getTime(),
}

const uid = sessionStorage.getItem('uid');

const noteFormSubmit = document.getElementById("newNoteForm");

noteFormSubmit.addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = document.getElementById("title").value;
    const note = document.getElementById("content").value;

    newNoteContent.title = titulo;
    newNoteContent.body = note;

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))

    const setDocResp = setDoc(newDoc, newNoteContent)
        .then((result) => {

            console.log(newDoc);
            console.log(setDocResp);

            location.reload();

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorMessage)

        });

});

const firebaseConfig = {
    apiKey: "AIzaSyDdzu88Yc2hFkOBK0BrcvSGX-4yDbAs8R0",
    authDomain: "sd-notebooks-6e2a8.firebaseapp.com",
    projectId: "sd-notebooks-6e2a8",
    storageBucket: "sd-notebooks-6e2a8.appspot.com",
    messagingSenderId: "58677219226",
    appId: "1:58677219226:web:457132eb82f664bfa63423"
};

const app = initializeApp(firebaseConfig);
const FirebaseDB = getFirestore(app);