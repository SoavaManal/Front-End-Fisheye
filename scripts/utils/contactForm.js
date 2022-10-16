function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// le formulaire de contacte
const prenom = document.querySelector("#prenom");
const nom = document.querySelector("#nom");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

const form_submit = document.querySelector(".contact_form");
form_submit.addEventListener("submit", (event) => {
  event.preventDefault();
  const contact = {
    nom: nom.value,
    prenom: prenom.value,
    email: email.value,
    message: message.value,
  };
  console.log(contact);
  form_submit.reset();
});
