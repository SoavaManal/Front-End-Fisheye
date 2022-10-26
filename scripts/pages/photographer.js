// l'importation des fonction
import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";
import { modalMedia } from "../utils/mediaModal.js";

// ---datas Photographer---

// recuperer le id en paramettre
const params = new URLSearchParams(document.location.search); // envoi les params du url
const id = params.get("id"); // envoi le params en argument
console.log("le id: ", id);

// fetch(get) les donnees du photographer
async function getPhotographer() {
  const photographer = await fetch("../../data/photographers.json")
    .then((res) => res.json())
    .then((data) => data.photographers.find((p) => p.id == id));
  console.log(photographer);
  return photographer;
}

// afficher les données du photographer
async function displayData(photographer) {
  const photographersHeader = document.querySelector(".photograph-header");
  const divContacte = document.querySelector(".contact_button");

  // reinseigner la factory fonction a une variable
  const photographerModel = photographerFactory(photographer);

  // utiliser les methodes de la factory-function
  const cardInfoDOM = photographerModel.getPohotographersInfo();
  const cardPicture = photographerModel.getPicture();

  // inserer les elements à la DOM
  photographersHeader.insertBefore(cardInfoDOM, divContacte);
  photographersHeader.appendChild(cardPicture);

  // recuperer le nom du photographe et l'afficher au formulaire du contact
  const nameInContact = document.querySelector(".header_contact");
  nameInContact.innerText = "Contactez-moi " + photographerModel.name;
}

//---datas Medias---

// fetch(get) les datats medias pour chaque photographer
async function getMedias() {
  const medias = await fetch("../../data/photographers.json")
    .then((res) => res.json())
    .then((data) => data.media.filter((m) => m.photographerId == id));
  console.log(medias);
  return medias;
}

// recuperer le first-name du potographer
// pour afficher le dossier d'image de chaque photographer
const name = params.get("name").split(" ")[0];
const firstName = name.replace("-", " ");
console.log("first Name: ", firstName);

// afficher les medias
async function displayMedia(medias) {
  const media_modal = document.querySelector(".container");
  const mediaDiv = document.querySelector(".media");

  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    // passer le firstName en pramettre pour recuperer les image du photographer
    const cardMedia = mediaModel.getMedia(firstName);
    const lightboxMedia = mediaModel.mediaModal(firstName);
    // afficher les medias dans la page photographer
    mediaDiv.appendChild(cardMedia);
    // afficher les medias dans la modal
    media_modal.appendChild(lightboxMedia);
  });
}

// appel des fonctions
async function init() {
  const allMedias = await getMedias();
  const photographer = await getPhotographer();
  const nbr = allMedias.length;

  // afficher les datas photographer/medias
  await displayData(photographer);
  await displayMedia(allMedias);
  // fonction du modal medias "utils/mediaModal.js"
  modalMedia(nbr);
  // appel de la fonction pour affciher encart
  getEncart(photographer, allMedias);

  // fonction pour afficher les donnees sur encart
  async function getEncart(photographer, medias) {
    const encart = document.createElement("aside");
    encart.classList.add("encart");

    // calculer le totals des likes
    let likes = 0;
    medias.forEach((media) => {
      likes += mediaFactory(media).likes;
    });

    // fonction qui gerre la logique des like
    function heartLogique(like) {
      // boucle pour ajouté ou retirer un like
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
      // return like 0 si l'utilisateur n'a pas encore liké et 1 s'il a deja liké
      return like;
    }

    // creer un element qui contient le total des likes
    const p1 = document.createElement("p");
    // recuperer l'element qui affiche les like de chaque media
    let spanLike = document.querySelectorAll(".likes");
    // recuperer les elements qui contient le coeur
    const heartIcon = document.querySelectorAll(".heart");
    // pour chaque image
    for (let i = 0; i < heartIcon.length; i++) {
      // le like=0 au depart pour chaque media
      let like = 0;
      heartIcon[i].addEventListener("click", () => {
        // au click le like=1 et les likes incremente
        // au click le like=0 et les likes decremente
        like = heartLogique(like);
        // parseInt permet de changer le type du string a number
        let nbrLike = parseInt(spanLike[i].textContent);
        if (like == 0) {
          // decrementé le nbr de like afficher dans spanLike
          spanLike[i].textContent = nbrLike - 1;
        } else if (like == 1) {
          // incrementé le nbr de like afficher dans spanLike
          spanLike[i].textContent = nbrLike + 1;
        }
        console.log("totale des likes: ", likes);

        // modifier la total du like dans l'encart
        p1.textContent = likes;
        const icon = document.createElement("span");
        icon.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        p1.appendChild(icon);
      });
    }
    // la totale du like au depart
    console.log("le total du likes:", likes);
    p1.textContent = likes;
    const icon = document.createElement("span");
    icon.innerHTML = `<i class="fa-solid fa-heart"></i>`;
    p1.appendChild(icon);

    // creer un element qui contient le prix par jours du photographer
    const p2 = document.createElement("p");
    p2.innerText = photographerFactory(photographer).price + "€ / jour";

    // inserer les element creer a la DOM
    encart.appendChild(p1);
    encart.appendChild(p2);
    const main = document.querySelector("#main");
    main.appendChild(encart);
  }

  // ---selector:trier les medias---

  const leTri = document.querySelector("#tri_media");
  leTri.addEventListener("change", (e) => {
    console.log(e.target.value);

    // boucle pour verifier la valeur du selector
    switch (e.target.value) {
      case "popularite":
        // trier les medias des plus au moins liké
        allMedias.sort((a, b) => b.likes - a.likes);
        console.log(allMedias);
        break;
      case "date":
        // trier les media par date de plus récent au plus ancien
        allMedias.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        console.log(allMedias);
        break;
      case "titre":
        // trier par ordre alphabetique
        allMedias.sort((a, b) => a.title[0].localeCompare(b.title[0]));
        console.log(allMedias);
        break;
    }
    // Mettre a jour la DOM
    document.querySelector(".media").innerHTML = "";
    document.querySelector(".container").innerHTML = "";
    // re-apeller les fonction d'affichage
    displayMedia(allMedias);
    modalMedia(nbr);
    getEncart(photographer, allMedias);
  });
}
init();
