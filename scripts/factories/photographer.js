function photographerFactory(data) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    // image informative contient un alt
    img.setAttribute("alt", "portrail de " + name);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const a = document.createElement("a");
    a.setAttribute("href", "photographer.html?id=" + id);
    // Ajouter un titre au lien avec le nom du photographe
    a.setAttribute("title", name);

    const h3 = document.createElement("h3");
    h3.textContent = city + ", " + country;
    const p1 = document.createElement("p");
    p1.textContent = tagline;
    const p2 = document.createElement("p");
    p2.classList.add("p_gray");
    p2.textContent = price + "€/jour";
    a.appendChild(img);
    a.appendChild(h2);
    article.appendChild(a);
    article.appendChild(h3);
    article.appendChild(p1);
    article.appendChild(p2);
    return article;
  }
  return { name, picture, city, getUserCardDOM };
}
