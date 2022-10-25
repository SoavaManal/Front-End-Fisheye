// factory function
export function modalMedia(nbr) {
  const closeIt = document.querySelector(".close");
  function closeModal() {
    document.querySelector(".medias_modal").style.display = "none";
    document.querySelector("#main").classList.remove("effet_flou");
    document.querySelector("#main").setAttribute("aria-hidden", "false");
    closeIt.focus();
  }
  // close button
  closeIt.addEventListener("click", () => {
    closeModal();
  });

  closeIt.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      closeModal();
    }
  });

  // au click sur un article
  const btn_media = document.querySelectorAll(".media_lightbox");
  for (let i = 0; i < btn_media.length; i++) {
    btn_media[i].addEventListener("click", () => {
      document.querySelector(".medias_modal").style.display = "block";
      document.querySelector("#main").classList.add("effet_flou");
      // appliquer le aria-hidden sur le contenu en arriere plan
      document.querySelector("#main").setAttribute("aria-hidden", "true");
      // afficher le media
      // appliquer une translate de (-i*655)px pour afficher la bonne image
      document.querySelector(".container").style.transform =
        "translate(" + -i * 654 + "px)";
      console.log("l'indice: ", i);

      // glisser a gauche et a droite
      let position = -i;
      const right = document.querySelectorAll(".span_right");
      right.forEach((r) => {
        r.addEventListener("click", () => {
          if (position !== -nbr + 1) {
            position--;
            document.querySelector(".container").style.transform =
              "translate(" + position * 654 + "px)";
            console.log("right");
          } else {
            //r.style.visibility = "hidden";
            position = 0;
          }
          r.focus();
        });
      });

      const left = document.querySelectorAll(".span_left");
      left.forEach((l) => {
        l.addEventListener("click", () => {
          if (position !== 0) {
            position++;
            console.log(position);
            document.querySelector(".container").style.transform =
              "translate(" + position * 654 + "px)";
            console.log("left");
          } else {
            position = -nbr;
            //l.style.visibility = "hidden";
          }
          l.focus();
        });
      });
    });
  }
}
