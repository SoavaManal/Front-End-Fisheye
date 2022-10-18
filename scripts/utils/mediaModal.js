// close or open modale
export function modalMedia() {
  const closeIt = document.querySelector(".close");
  closeIt.addEventListener("click", () => {
    document.querySelector("#media_modal").style.display = "none";
    document.querySelector("#main").classList.toggle("effet_flou");
  });

  const lightbox = document.querySelectorAll(".media_lightbox");
  for (let btn_media of lightbox) {
    btn_media.addEventListener("click", () => {
      document.querySelector("#media_modal").style.display = "block";
      document.querySelector("#main").classList.toggle("effet_flou");
    });
  }

  // glisser a gauche et a droite
  // nbr de media a defiler
  let nbr_media = document.querySelectorAll(".media_section").length;
  console.log(nbr_media);

  let position = 0;
  const right = document.querySelectorAll(".span_right");
  right.forEach((r) => {
    r.addEventListener("click", () => {
      if (position > -nbr_media + 1) {
        position--;
        document.querySelector(".container").style.transform =
          "translate(" + position * 655 + "px)";
        console.log("right");
      } else {
        r.style.visibility = "hidden";
      }
    });
  });

  const left = document.querySelectorAll(".span_left");
  left.forEach((l) => {
    l.addEventListener("click", () => {
      if (position < 0) {
        position++;
        console.log(position);
        document.querySelector(".container").style.transform =
          "translate(" + position * 655 + "px)";
        console.log("left");
      } else {
        l.style.visibility = "hidden";
      }
    });
  });
}
