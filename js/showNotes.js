
// Configuración Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js"

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

const uid = sessionStorage.getItem('uid');

// Carga de función para obtener las notas de la DB

const loadNotes = async (uid = '') => {

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    // Respuesta con la colección de notas del usuario

    console.log(docs)

    // Carga de las notas y sus atributos al arreglo notes

    const notes = [];

    docs.forEach(doc => {

        notes.push({ id: doc.id, ...doc.data() });

    });

    console.log(notes)

    return notes

};

const notes = await loadNotes(uid);

// Carga de función para eliminar las notas de la DB

const deleteNote = async (uid, noteId) => {
    await deleteDoc(doc(collection(FirebaseDB, `${uid}/journal/notes`), noteId));
    const updatedNotes = await loadNotes(uid);
    updateNotesList(updatedNotes);
};

const activeNote = async (note) => {

    sessionStorage.setItem('Note_title', note.title);
    sessionStorage.setItem('Note_body', note.body);
    sessionStorage.setItem('Note_date', note.date);

};

// Carga de función para actualizar las notas de la DB

const updateNote = async (uid, noteId, updatedData) => {
    await updateDoc(doc(collection(FirebaseDB, `${uid}/journal/notes`), noteId), updatedData);
    const updatedNotes = await loadNotes(uid);
    updateNotesList(updatedNotes);
};

const renderNotes = (notes) => {

    document.getElementById("notesList").innerHTML = "";

    // Recorrido con ciclo ForEach del arreglo de notas

    notes.forEach(note => {

        // Creación elemento <li> que almacena cada nota

        const noteItem = document.createElement("li");
        noteItem.className = "notes-list-item";

        const noteIcon = document.createElement("i");
        noteIcon.className = "notes-list-item-icon fa-solid fa-bookmark";

        const noteTitle = document.createElement("h4");
        noteTitle.textContent = note.title;

        const noteBody = document.createElement("p");
        noteBody.textContent = note.body;

        const noteChars = document.createElement("div");
        noteChars.className = "chars-grid";
        noteChars.appendChild(noteTitle);
        noteChars.appendChild(noteBody);

        const noteDate = document.createElement("p");
        noteDate.textContent = note.date;

        const deleteButton = document.createElement("i");
        deleteButton.className = "delete-buttom fa-regular fa-trash-can fa-2xl";

        const updateButton = document.createElement("i");
        updateButton.className = "update-buttom fa-regular fa-pen-to-square fa-2xl";

        noteChars.addEventListener("click", () => {

            const modal = document.getElementById("activeModal");

            modal.style.display = "block";

            activeNote(note);
        });

        // Referencia al botón (Delete) para ejecutar su función

        deleteButton.addEventListener("click", () => {

            deleteNote(uid, note.id);
        });


        // Referencia al botón (Update) para ejecutar su función

        updateButton.addEventListener("click", () => {

            // Referencia al modal (PopUp) para abrir el formlulario de actualización

            const modal = document.getElementById("updateModal");
            const updatedTitleInput = document.getElementById("updatedTitle");
            const updatedBodyInput = document.getElementById("updatedBody");

            // Obtención de los datos del form

            updatedTitleInput.value = note.title;
            updatedBodyInput.value = note.body;

            // Mostrar el bloque

            modal.style.display = "block";

            // Referencia al botón de save para actualizar la nota

            const saveChangesButton = document.getElementById("saveChanges");

            saveChangesButton.addEventListener("click", () => {

                const updatedTitle = document.getElementById("updatedTitle").value;
                const updatedBody = document.getElementById("updatedBody").value;

                // Verificación de datos del formulario

                if (updatedTitle.trim() !== "" && updatedBody.trim() !== "") {
                    updateNote(uid, note.id, { title: updatedTitle, body: updatedBody });
                    const modal = document.getElementById("updateModal");
                    modal.style.display = "none";
                } else {
                    alert("Por favor, complete todos los campos.");
                }

            });
        });

        // Inclusión de todos los elementos al item <li>

        noteItem.appendChild(noteIcon);
        noteItem.appendChild(noteChars);
        noteItem.appendChild(noteDate);
        noteItem.appendChild(deleteButton);
        noteItem.appendChild(updateButton);

        // Despliege del item <li> dentro de la vista HTML

        document.getElementById("notesList").appendChild(noteItem);

    });
};

// Carga de la función para re-recargar las notas

const updateNotesList = (updatedNotes) => {
    renderNotes(updatedNotes);
};

renderNotes(notes);

// Refencia al boton "X"

const closeModalUpdate = document.getElementById("closeModalUpdate");
const closeModalActive = document.getElementById("closeModalActive");

// Carga de funciónes para cerrar el Popup Update

closeModalUpdate.addEventListener("click", () => {

    const modal = document.getElementById("updateModal");
    modal.style.display = "none";

});

window.addEventListener("click", (event) => {

    const modal = document.getElementById("updateModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }

});

// Carga de funciónes para cerrar el Popup Active

closeModalActive.addEventListener("click", () => {

    const modal = document.getElementById("activeModal");
    modal.style.display = "none";

});

window.addEventListener("click", (event) => {

    const modal = document.getElementById("activeModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }

});
