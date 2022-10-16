// l'importation des factory function
import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";

// ---datas Photographer---
// recuperer le id en paramettre
const params = new URLSearchParams(document.location.search); // envoi les params du url
const id = params.get("id"); // envoi le params en argument
console.log(id);

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
console.log(firstName);

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
  //const main = document.querySelector("#main");
  const mediaDiv = document.querySelector(".media");

  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const cardMedia = mediaModel.getMedia(firstName);
    mediaDiv.appendChild(cardMedia);
    // const createEncart = mediaModel.getEncart();
    // main.appendChild(createEncart);
  });
}

// get encart
async function getEncart(photographer, media) {
  const main = document.querySelector("#main");

  const encart = document.createElement("aside");
  encart.classList.add("encart");

  // let sommeLikes = 0;
  // console.log(mediaFactory(media).likes);
  // const likesArray = mediaFactory(media).likes;
  // for (let like of likesArray) {
  //   sommeLikes = +like;
  // }

  // const p1 = document.createElement("p");
  // p1.innerText = sommeLikes;

  const p2 = document.createElement("p");
  p2.innerText = photographerFactory(photographer).price + "€ / jour";
  encart.appendChild(p2);

  encart.appendChild(p2);

  main.appendChild(encart);
}

// affichage des datas media
const photographer = await getPhotographer();
const media = await getMedia();
await displayData(photographer);
await displayMedia(media);
await getEncart(photographer, media);

// ---selector:trier les medias---

const media_trier = await getMedia();
const medias_array = Array.from(media_trier);
const leTri = document.querySelector("#tri_media");
leTri.addEventListener("change", (e) => {
  console.log(e.target.value);

  // boucle pour verifier la valeur du selector
  switch (e.target.value) {
    case "":
      document.querySelector(".media").innerHTML = "";
      displayMedia(media_trier);
      break;
    case "popularite":
      medias_array.sort((a, b) => b.likes - a.likes);
      console.log(medias_array);
      document.querySelector(".media").innerHTML = "";
      displayMedia(medias_array);
      break;
    case "date":
      medias_array.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      console.log(medias_array);
      document.querySelector(".media").innerHTML = "";
      displayMedia(medias_array);
      break;
    case "titre":
      medias_array.sort((a, b) => a.title[0].localeCompare(b.title[0]));
      console.log(medias_array);
      document.querySelector(".media").innerHTML = "";
      displayMedia(medias_array);
      break;
  }
});

// lightbox logique
const lightbox = document.querySelectorAll(".media_lightbox");
console.log(lightbox);
for (let btn_media of lightbox) {
  btn_media.addEventListener("click", () => {
    console.log("click");
  });
}
