const changeButton = document.getElementById("changeViews");
const noNote = document.getElementById("noNote");
const newNote = document.getElementById("newNote");

changeButton.addEventListener("click", function () {
  if (noNote.style.display === "none" || noNote.style.display === "") {

    noNote.style.display = "block";
    newNote.style.display = "none";
  } else {

    noNote.style.display = "none";
    newNote.style.display = "block";
  }
});
