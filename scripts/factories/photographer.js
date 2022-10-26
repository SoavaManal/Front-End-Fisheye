// factory function
export function photographerFactory(data) {
  const { id, name, portrait, city, country, tagline, price } = data;
  // chemin ou source pour recuperer les portrail des photographes
  const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

  // methode pour afficher les photographers
  function getUserCardDOM() {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    // image informative contient un alt
    img.setAttribute("alt", "portrail de " + name);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const a = document.createElement("a");
    a.setAttribute("href", `photographer.html?id=${id}&name=${name}`);
    // Ajouter un titre au lien avec le nom du photographe
    a.setAttribute("title", name);

    const h3 = document.createElement("h3");
    h3.textContent = city + ", " + country;
    const p1 = document.createElement("p");
    p1.textContent = tagline;
    const p2 = document.createElement("p");
    p2.classList.add("p_gray");
    p2.textContent = price + "€/jour ";
    a.appendChild(img);
    a.appendChild(h2);
    article.appendChild(a);
    article.appendChild(h3);
    article.appendChild(p1);
    article.appendChild(p2);
    return article;
  }

  // methode pour afficher un seul photographer
  function getPohotographersInfo() {
    const barreInfo = document.createElement("div");
    barreInfo.classList.add("info_photographer");

    const h1 = document.createElement("h1");
    h1.textContent = name;

    const h2 = document.createElement("h2");
    h2.textContent = city + ", " + country;

    const p = document.createElement("p");
    p.textContent = tagline;

    barreInfo.appendChild(h1);
    barreInfo.appendChild(h2);
    barreInfo.appendChild(p);

    return barreInfo;
  }

  function getPicture() {
    const pictureDiv = document.createElement("div");
    pictureDiv.classList.add("picture");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "portrait de " + name);

    pictureDiv.appendChild(img);
    return pictureDiv;
  }

  return {
    name,
    id,
    picture,
    city,
    price,
    getUserCardDOM,
    getPohotographersInfo,
    getPicture,
  };
}
