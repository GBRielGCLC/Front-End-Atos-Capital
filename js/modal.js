// Get the modal
var modalCreate = document.getElementById("modalCreate");
var modalUpdate = document.getElementById("modalUpdate");

// Get the button that opens the modal
var btnRecord = document.getElementById("newRecord");
var btnEdit = document.getElementsByClassName("edit");

// Get the <span> element that closes the modal
var backCreate = document.getElementById("backCreate");
var backUpdate = document.getElementById("backUpdate");

// When the user clicks on the button, open the modal
btnRecord.onclick = function() {
  modalCreate.style.display = "block";
}
btnEdit.onclick = function() {
  modalUpdate.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
backCreate.onclick = function() {
  modalCreate.style.display = "none";
  modalUpdate.style.display = "none";
}
backUpdate.onclick = function() {
  modalCreate.style.display = "none";
  modalUpdate.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalCreate || event.target == modalUpdate) {
    modalCreate.style.display = "none";
    modalUpdate.style.display = "none";
  }
}