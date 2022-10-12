//Mettre le code JavaScript lié à la page photographer.html

const params = new URLSearchParams(document.location.search); // envoi les params du url
const idParams = params.get("id"); // envoi le params en argument
console.log(idParams);

async function getPhotographer() {
  const photographer = await fetch("../../data/photographers.json")
    .then((res) => res.json())
    .then((data) => data.photographers.find((p) => p.id == idParams));
  console.log(photographer);
  return photographer;
}
getPhotographer();
