// on click
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  document.querySelector("#main").classList.add("effet_flou");
  // empecher les AT de lire le contenu caché
  document.querySelector("#main").setAttribute("aria-hidden", "true");
  //rendre modal focalisable par le clavier
  modal.focus();
}

// close
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  document.querySelector("#main").classList.remove("effet_flou");
  document.querySelector("#main").setAttribute("aria-hidden", "false");
  modal.focus();
}

// le formulaire de contacte
const prenom = document.querySelector("#prenom");
const nom = document.querySelector("#nom");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

const form_submit = document.querySelector(".contact_form");
form_submit.addEventListener("submit", (event) => {
  // message d'erreur
  if (!prenom.value) {
    document.querySelector(".prenom-erreur").innerText =
      "Veuillez entrer un prenom";
  }
  if (!nom.value) {
    document.querySelector(".nom-erreur").innerText = "Veuillez entrer un nom";
  }
  if (!email.value) {
    document.querySelector(".email-erreur").innerText =
      "Veuillez entrer un email valide";
  }
  if (!message.value) {
    document.querySelector(".prenom-erreur").innerText =
      "Veuillez entrer un message";
  }
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
