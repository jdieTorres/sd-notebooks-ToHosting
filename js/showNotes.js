import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js"

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

const deleteNote = async (uid, noteId) => {
    await deleteDoc(doc(collection(FirebaseDB, `${uid}/journal/notes`), noteId));
    const updatedNotes = await loadNotes(uid);
    updateNotesList(updatedNotes);
};

const updateNote = async (uid, noteId, updatedData) => {
    await updateDoc(doc(collection(FirebaseDB, `${uid}/journal/notes`), noteId), updatedData);
    const updatedNotes = await loadNotes(uid);
    updateNotesList(updatedNotes);
};

const renderNotes = (notes) => {

    document.getElementById("notesList").innerHTML = "";
    notes.forEach(note => {

        const noteItem = document.createElement("li");
        noteItem.className = "notes-list-item";

        const noteIcon = document.createElement("i");
        noteIcon.className = "notes-list-item-icon fa-regular fa-bookmark";

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

        deleteButton.addEventListener("click", () => {
            deleteNote(uid, note.id);
        });

        const updateButton = document.createElement("i");
        updateButton.className = "update-buttom fa-regular fa-pen-to-square fa-2xl";

        updateButton.addEventListener("click", () => {
            const modal = document.getElementById("updateModal");
            const updatedTitleInput = document.getElementById("updatedTitle");
            const updatedBodyInput = document.getElementById("updatedBody");

            updatedTitleInput.value = note.title;
            updatedBodyInput.value = note.body;

            modal.style.display = "block";

            const saveChangesButton = document.getElementById("saveChanges");
            saveChangesButton.addEventListener("click", () => {
                const updatedTitle = document.getElementById("updatedTitle").value;
                const updatedBody = document.getElementById("updatedBody").value;

                if (updatedTitle.trim() !== "" && updatedBody.trim() !== "") {
                    updateNote(uid, note.id, { title: updatedTitle, body: updatedBody });
                    const modal = document.getElementById("updateModal");
                    modal.style.display = "none";
                } else {
                    alert("Por favor, complete todos los campos.");
                }
            });
        });


        noteItem.appendChild(noteIcon);
        noteItem.appendChild(noteChars);
        noteItem.appendChild(noteDate);
        noteItem.appendChild(deleteButton);
        noteItem.appendChild(updateButton);

        document.getElementById("notesList").appendChild(noteItem);
    });
};

const updateNotesList = (updatedNotes) => {
    renderNotes(updatedNotes);
};

renderNotes(notes);

const closeModalButton = document.getElementById("closeModal");

closeModalButton.addEventListener("click", () => {
    const modal = document.getElementById("updateModal");
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    const modal = document.getElementById("updateModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});