// l'importation des factory function
import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";
import { modalMedia } from "../utils/mediaModal.js";

// ---datas Photographer---
// recuperer le id en paramettre
const params = new URLSearchParams(document.location.search); // envoi les params du url
const id = params.get("id"); // envoi le params en argument
console.log("le id: ", id);

// fonction pour fetch les donnees du photographer
async function getPhotographer() {
  const photographer = await fetch("../../data/photographers.json")
    .then((res) => res.json())
    .then((data) => data.photographers.find((p) => p.id == id));
  console.log(photographer);
  return photographer;
}

// fonction utilise la factory fonction et ces methodes pour inserer les elements a la DOM
async function displayData(photographer) {
  const photographersHeader = document.querySelector(".photograph-header");
  const divContacte = document.querySelector(".contact_button");

  // reinsegner la factory fonction a une variable
  const photographerModel = photographerFactory(photographer);
  // utiliser les methode de la factory-function
  const cardInfoDOM = photographerModel.getPohotographersInfo();
  const cardPicture = photographerModel.getPicture();
  // inserer les elements a la DOM
  photographersHeader.insertBefore(cardInfoDOM, divContacte);
  photographersHeader.appendChild(cardPicture);
}

// appel les deux fonction dessus pour afficher les datas photographer
// async function init() {
//   // Récupère les datas du photographer
//   const photographer = await getPhotographer();
//   await displayData(photographer);
// }
// init();

// ---datas medias---

// recuperer le first-name du paramettre
// pour afficher le dossier d'image de chaque photographer
const name = params.get("name").split(" ")[0];
const firstName = name.replace("-", " ");
console.log("first Name: ", firstName);

// fetch les datats medias pour le photographer en question
async function getMedia() {
  const medias = await fetch("../../data/photographers.json")
    .then((res) => res.json())
    .then((data) => data.media.filter((m) => m.photographerId == id));
  console.log(medias);
  return medias;
}

// inserer la DOM
async function displayMedia(medias) {
  const media_modal = document.querySelector(".container");
  const mediaDiv = document.querySelector(".media");

  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const cardMedia = mediaModel.getMedia(firstName);
    const lightboxMedia = mediaModel.mediaModal(firstName);
    mediaDiv.appendChild(cardMedia);
    media_modal.appendChild(lightboxMedia);
  });
}

// get encart
async function getEncart(photographer, medias) {
  const encart = document.createElement("aside");
  encart.classList.add("encart");

  let likes = 0;
  medias.forEach((media) => {
    likes += mediaFactory(media).likes;
  });

  // possibilitté de liké les photos et videos
  // let like = 0;

  function heartLogique(like) {
    switch (like) {
      case 0:
        like++;
        likes++;
        console.log("like:", like);
        break;
      case 1:
        like--;
        likes--;
        console.log("like:", like);
        break;
    }
    return like;
  }
  const p1 = document.createElement("p");
  const heartIcon = document.querySelectorAll(".heart");
  for (let i = 0; i < heartIcon.length; i++) {
    let like = 0;
    heartIcon[i].addEventListener("click", () => {
      like = heartLogique(like);
      console.log("deja liké ou pas: ", like);
      console.log("totale des likes: ", likes);

      p1.textContent = likes;
      const icon = document.createElement("span");
      icon.innerHTML = `<i class="fa-solid fa-heart"></i>`;
      p1.appendChild(icon);
    });
  }

  console.log("le total du likes:", likes);
  p1.textContent = likes;
  const icon = document.createElement("span");
  icon.innerHTML = `<i class="fa-solid fa-heart"></i>`;
  p1.appendChild(icon);

  const p2 = document.createElement("p");
  p2.innerText = photographerFactory(photographer).price + "€ / jour";

  encart.appendChild(p1);
  encart.appendChild(p2);

  main.appendChild(encart);
}

// appel des fonctions pour afficher des datas
const photographer = await getPhotographer();
const media = await getMedia();
await displayData(photographer);
await displayMedia(media);
await getEncart(photographer, media);

//--- affichage du modal media
const allMedias = await getMedia();
modalMedia(allMedias.length);
console.log("le nombre de medias: ", allMedias.length);

// ---selector:trier les medias---

//const medias_array = Array.from(allMedias);
const leTri = document.querySelector("#tri_media");
leTri.addEventListener("change", (e) => {
  console.log(e.target.value);

  // boucle pour verifier la valeur du selector
  switch (e.target.value) {
    case "":
      document.querySelector(".media").innerHTML = "";
      document.querySelector(".container").innerHTML = "";
      displayMedia(allMedias);
      // modalMedia();
      break;
    case "popularite":
      allMedias.sort((a, b) => b.likes - a.likes);
      console.log(allMedias);
      document.querySelector(".media").innerHTML = "";
      document.querySelector(".container").innerHTML = "";
      displayMedia(allMedias);
      // modalMedia();
      break;
    case "date":
      allMedias.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      console.log(allMedias);
      document.querySelector(".media").innerHTML = "";
      document.querySelector(".container").innerHTML = "";
      displayMedia(allMedias);
      // modalMedia();
      break;
    case "titre":
      allMedias.sort((a, b) => a.title[0].localeCompare(b.title[0]));
      console.log(allMedias);
      document.querySelector(".media").innerHTML = "";
      document.querySelector(".container").innerHTML = "";
      displayMedia(allMedias);
      // modalMedia();
      break;
  }
  modalMedia(allMedias.length);
});
