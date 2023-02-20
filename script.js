const beginLink = document.getElementById("beginLink");
const beginCircle = document.getElementById("beginCircle");
const nameContainer = document.getElementById("nameContainer");
const nameInput = document.getElementById("nameInput");
const startLink = document.getElementById("startLink");

let NAME = nameInput.value;

beginLink.addEventListener("click", ()=>{
    beginLink.classList.add("hidden");
    beginCircle.style.borderRadius = 0;
    nameContainer.classList.remove("hidden");
});

//LABYRINTH