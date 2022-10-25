//---close---
// fonction pour fermer la modal
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  document.querySelector("#main").classList.remove("effet_flou");
  document.querySelector("#main").setAttribute("aria-hidden", "false");
  modal.focus();
}

// en utilisant le clavier
const btn_close = document.querySelector(".contact_close");
btn_close.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    closeModal();
  }
});

// en utilisant la sourie
btn_close.addEventListener("click", () => {
  closeModal();
});

//---open---
// on click
const btn_contact = document.querySelector(".contact_button");
btn_contact.addEventListener("click", () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  document.querySelector("#main").classList.add("effet_flou");
  // empecher les AT de lire le contenu caché
  document.querySelector("#main").setAttribute("aria-hidden", "true");
  //rendre modal focalisable par le clavier
  modal.focus();
});

// le formulaire de contacte
const prenom = document.querySelector("#prenom");
const nom = document.querySelector("#nom");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

const form_submit = document.querySelector(".contact_form");
form_submit.addEventListener("submit", (event) => {
  event.preventDefault();
  //message d'erreur
  if (!prenom.value || !nom.value || !email.value || !message.value) {
    // if (!prenom.value) {
    //   document.querySelector(".prenom-erreur").innerText =
    //     "Veuillez entrer un prenom";
    // } else {
    //   document.querySelector(".prenom-erreur").innerText = "";
    // }
    // if (!nom.value) {
    //   document.querySelector(".nom-erreur").innerText =
    //     "Veuillez entrer un nom";
    // } else {
    //   document.querySelector(".nom-erreur").innerText = "";
    // }
    // if (!email.value) {
    //   document.querySelector(".email-erreur").innerText =
    //     "Veuillez entrer un email valide";
    // } else {
    //   document.querySelector(".email-erreur").innerText = "";
    // }
    // if (!message.value) {
    //   document.querySelector(".prenom-erreur").innerText =
    //     "Veuillez entrer un message";
    // } else {
    //   document.querySelector(".prenom-erreur").innerText = "";
    // }
    console.log("il manque des champs");
  } else {
    const contact = {
      nom: nom.value,
      prenom: prenom.value,
      email: email.value,
      message: message.value,
    };
    console.log(contact);
    form_submit.reset();
  }
});
