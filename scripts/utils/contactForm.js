// varriables
const main = document.querySelector("#main");
const modal = document.getElementById("contact_modal");
// piéger le focus  l'interieur du modal
// les elements focusable dans la modal contact
const focusableElement = '[tabindex="0"], input, textarea, button';
// premier element focusable
const firstFocusableElement = modal.querySelectorAll(focusableElement)[0];
const focusContent = modal.querySelectorAll(focusableElement);
// derniere element focusable
const lastFocusableElement = focusContent[focusContent.length - 1];

document.addEventListener("keydown", (e) => {
  let isTab = e.key == "Tab";
  if (!isTab) {
    return;
  }
  if (e.shiftKey) {
    // si la key shift est pressé pour un shift+tab "revenir en arriére"
    if (document.activeElement == firstFocusableElement) {
      // si le focus est sur le premier element
      lastFocusableElement.focus(); // en revient vers le derniere element focusable
      e.preventDefault();
    }
  } else {
    if (document.activeElement == lastFocusableElement) {
      // si le focus est sur le dernier element
      firstFocusableElement.focus(); // en revient vers le premier element focusable
      e.preventDefault();
    }
  }
});

//---close---
// fonction pour fermer la modal
function closeModal() {
  modal.style.display = "none";
  main.classList.remove("effet_flou");
  main.setAttribute("aria-hidden", "false");
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
  modal.style.display = "block";
  main.classList.add("effet_flou");
  // empecher les AT de lire le contenu en arriére plan
  main.setAttribute("aria-hidden", "true");
  firstFocusableElement.focus(); // focus sur le premier element du modal
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
