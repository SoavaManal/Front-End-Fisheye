export function mediaFactory(data) {
  let { id, title, image, video, likes } = data;

  // Structurer le Dom pour les medias
  function getMedia(name) {
    const picture = `assets/photographers/${name}/${image}`;
    const videoMedia = `assets/photographers/${name}/${video}`;

    const article = document.createElement("article");
    article.classList.add("card_media");

    if (video) {
      const video = document.createElement("video");
      video.setAttribute("src", videoMedia);
      video.setAttribute("controls", "");
      video.setAttribute("title", title);
      video.classList.add("media_lightbox");

      article.appendChild(video);
    } else if (image) {
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", title);
      img.setAttribute("aria-label", "vue rapprochée de l'image de" + title);
      img.classList.add("media_lightbox");
      article.appendChild(img);
    }

    const barreInfo = document.createElement("div");
    barreInfo.classList.add("card_media_info");
    const p = document.createElement("p");
    p.innerText = title;
    const span = document.createElement("span");
    const nbr_like = document.createElement("p");
    nbr_like.classList.add("likes");
    nbr_like.innerText = likes;

    const icon = document.createElement("span");
    icon.innerHTML = `<i class="fa-solid fa-heart" aria-label="like"></i>`;
    icon.classList.add("heart");

    span.appendChild(nbr_like);
    span.appendChild(icon);
    barreInfo.appendChild(p);
    barreInfo.appendChild(span);
    article.appendChild(barreInfo);

    return article;
  }

  // Structurer pour les medias en modal
  function mediaModal(name) {
    const picture = `assets/photographers/${name}/${image}`;
    const videoMedia = `assets/photographers/${name}/${video}`;

    const lightbox = document.createElement("section");
    lightbox.classList.add("media_section");

    const imgLightbox = document.createElement("img");
    const videoLightbox = document.createElement("video");

    const h1 = document.createElement("h1");

    const divMedia = document.createElement("div");
    divMedia.classList.add("media_sliders");

    const span_left = document.createElement("span");
    span_left.classList.add("span_left");
    span_left.innerHTML = `<i class="fa-solid fa-chevron-left" label-aria="image précédente"></i>`;
    divMedia.appendChild(span_left);
    if (video) {
      videoLightbox.setAttribute("src", videoMedia);
      videoLightbox.setAttribute("controls", "");
      videoLightbox.setAttribute("title", title);
      divMedia.appendChild(videoLightbox);
    }
    if (image) {
      imgLightbox.setAttribute("src", picture);
      imgLightbox.setAttribute("alt", title);
      divMedia.appendChild(imgLightbox);
    }
    const span_right = document.createElement("span");
    span_right.classList.add("span_right");
    span_right.innerHTML = `<i class="fa-solid fa-chevron-right label-aria="image suivante"></i>`;
    divMedia.appendChild(span_right);

    h1.innerText = title;
    lightbox.appendChild(divMedia);
    lightbox.appendChild(h1);

    return lightbox;
  }

  return {
    id,
    image,
    title,
    likes,
    getMedia,
    mediaModal,
  };
}
