// importer la factory-function
import { photographerFactory } from "../factories/photographer.js";

// fetch(get) tous les photographers
async function getPhotographers() {
  const photographers = await fetch("../../data/photographers.json").then(
    (res) => res.json()
  );
  console.log(photographers.photographers);
  return photographers.photographers;
}

// inserer les elements a la DOM
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    //console.log(photographerFactory(photographer).name);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
