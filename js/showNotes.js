import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js"

const uid = sessionStorage.getItem('uid');

const firebaseConfig = {
    apiKey: "AIzaSyDdzu88Yc2hFkOBK0BrcvSGX-4yDbAs8R0",
    authDomain: "sd-notebooks-6e2a8.firebaseapp.com",
    projectId: "sd-notebooks-6e2a8",
    storageBucket: "sd-notebooks-6e2a8.appspot.com",
    messagingSenderId: "58677219226",
    appId: "1:58677219226:web:457132eb82f664bfa63423"
};

const app = initializeApp(firebaseConfig);
export const FirebaseDB = getFirestore(app);

const loadNotes = async (uid = '') => {

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const notes = [];
    docs.forEach(doc => {
        notes.push({ id: doc.id, ...doc.data() });
    });

    return notes

};

const notes = await loadNotes(uid);

notes.forEach(note => {

    const noteItem = document.createElement("li")
    noteItem.className = "notes-list-item"

    const noteIcon = document.createElement("i")
    noteIcon.className = "fa-regular fa-bookmark"

    const noteTitle = document.createElement("h4")
    noteTitle.textContent = note.title;

    const noteBody = document.createElement("p")
    noteBody.textContent = note.body

    noteItem.appendChild(noteIcon)
    noteItem.appendChild(noteTitle)
    noteItem.appendChild(noteBody)

    document.getElementById("notesList").appendChild(noteItem);
});

/*notes.forEach(note => {

    const listItem = document.createElement("li");
    listItem.className = "notes-list-item";

    // Crea elementos HTML para el título y el cuerpo de la nota
    const titleElement = document.createElement("h4");
    titleElement.textContent = note.title;

    const bodyElement = document.createElement("p");
    bodyElement.textContent = note.body;

    // Agrega los elementos al <li> y luego agrega el <li> a la lista
    listItem.appendChild(titleElement);
    listItem.appendChild(bodyElement);

    // Agrega el <li> a la lista
    document.querySelector(".notes-list").appendChild(listItem);
});*/