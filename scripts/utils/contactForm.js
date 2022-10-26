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
// fonction pour ouvrir la modal
const btn_contact = document.querySelector(".contact_button");
btn_contact.addEventListener("click", () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  document.querySelector("#main").classList.add("effet_flou");
  // empecher les AT de lire le contenu en arriére plan
  document.querySelector("#main").setAttribute("aria-hidden", "true");
  modal.focus();
});

// recuperer les valeurs du champs formulaire
const prenom = document.querySelector("#prenom");
const nom = document.querySelector("#nom");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

const form_submit = document.querySelector(".contact_form");
form_submit.addEventListener("submit", (event) => {
  event.preventDefault();

  //message d'erreur
  if (!prenom.value || !nom.value || !email.value || !message.value) {
    if (!prenom.value) {
      document.querySelector(".prenom-erreur").innerText =
        "Veuillez entrer un prenom";
    }
    if (!nom.value) {
      document.querySelector(".nom-erreur").innerText =
        "Veuillez entrer un nom";
    }
    if (!email.value) {
      document.querySelector(".email-erreur").innerText =
        "Veuillez entrer un email valide";
    }
    if (!message.value) {
      document.querySelector(".message-erreur").innerText =
        "Veuillez entrer un message";
    }
  } else {
    const contact = {
      nom: nom.value,
      prenom: prenom.value,
      email: email.value,
      message: message.value,
    };
    // afficher le contact a la console
    console.log(contact);
    // mettre a jour du formulaire
    document.querySelector(".prenom-erreur").innerText = "";
    document.querySelector(".nom-erreur").innerText = "";
    document.querySelector(".email-erreur").innerText = "";
    document.querySelector(".message-erreur").innerHTML = "";
    form_submit.reset();
  }
});
