import { photographerFactory } from "./photographer.js";

export function mediaFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  //const picture=`assets/photographers/${name}/${image}`;

  function getMedia(name) {
    const picture = `assets/photographers/${name}/${image}`;
    const videoMedia = `assets/photographers/${name}/${video}`;

    const article = document.createElement("article");
    article.classList.add("card_media");

    if (video) {
      const video = document.createElement("video");
      video.setAttribute("src", videoMedia);
      video.setAttribute("controls", "");
      video.classList.add("media_lightbox");

      article.appendChild(video);
    } else if (image) {
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", title);
      img.classList.add("media_lightbox");
      article.appendChild(img);
    }

    const barreInfo = document.createElement("div");
    barreInfo.classList.add("card_media_info");
    const p = document.createElement("p");
    p.innerText = title;
    const span = document.createElement("span");
    span.innerText = likes;

    const icon = document.createElement("span");
    icon.innerHTML = `<i class="fa-solid fa-heart"></i>`;

    span.appendChild(icon);
    barreInfo.appendChild(p);
    barreInfo.appendChild(span);

    article.appendChild(barreInfo);

    return article;
  }
  // function getEncart() {
  //   const encart = document.createElement("aside");
  //   encart.classList.add("encart");

  //   // const p1 = document.createElement("p");
  //   // p1.textContent = sommeLike;

  //   const p2 = document.createElement("p");
  //   p2.innerText = price + "€ / jour";
  //   encart.appendChild(p2);

  //   return encart;
  // }

  return {
    id,
    image,
    title,
    likes,
    getMedia,
  };
}
