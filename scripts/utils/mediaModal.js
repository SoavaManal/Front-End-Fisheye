// les varriables
const closeIt = document.querySelector(".close");
const main = document.querySelector("#main");
const container = document.querySelector(".container");
const modal = document.querySelector(".medias_modal");

const focus = '[tabindex="0"]';
const focusableContent = modal.querySelector(focus);

// le modal medias
export function modalMedia(nbr) {
  // function close
  function closeModal() {
    modal.style.display = "none";
    main.classList.remove("effet_flou");
    main.setAttribute("aria-hidden", "false");
    // closeIt.focus();
  }
  // fermer avec la sourie au click
  closeIt.addEventListener("click", () => {
    closeModal();
  });

  // fermer avec le clavier "Enter"
  closeIt.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      closeModal();
    }
  });

  // function display
  function displayModal(i) {
    document.querySelector(".medias_modal").style.display = "block";
    main.classList.add("effet_flou");
    // caché le contenu en arriére plan au assistant technologie
    main.setAttribute("aria-hidden", "true");
    // appliquer une translate de (-i*655)px pour afficher la bonne image
    container.style.transform = "translate(" + -i * 654 + "px)";

    console.log("l'indice: ", i);
    let position = -i;

    // fonction pour glisser a droite
    function arrowRight() {
      if (position !== -nbr + 1) {
        position--;
        container.style.transform = "translate(" + position * 654 + "px)";
      } else {
        //r.style.visibility = "hidden";
        position = 0;
      }
    }
    const right = document.querySelectorAll(".span_right");
    right.forEach((r) => {
      // au click avec la souris
      r.addEventListener("click", () => {
        arrowRight();
      });
    });

    // fonction pour glisser les medias a gauche
    function arrowLeft() {
      if (position !== 0) {
        position++;
        container.style.transform = "translate(" + position * 654 + "px)";
      } else {
        position = -nbr;
      }
    }

    const left = document.querySelectorAll(".span_left");
    left.forEach((l) => {
      // au click avec la sourie
      l.addEventListener("click", () => {
        arrowLeft();
      });
    });

    // apeller les fonction aarowRight() et arrowLeft() au click sur les fléche du glavier(left/right)
    document.querySelector(".media").addEventListener("keydown", (event) => {
      if (event.key == "ArrowRight") {
        arrowRight();
      }
      if (event.key == "ArrowLeft") {
        arrowLeft();
      }
      if (event.key == "Tab") {
        focusableContent.focus();
        event.preventDefault();
      }
    });
  }

  // afficher ou caché la modal
  const btn_media = document.querySelectorAll(".media_lightbox");
  for (let i = 0; i < btn_media.length; i++) {
    // au click sur un article
    btn_media[i].addEventListener("click", () => {
      displayModal(i);
    });
    // au clavier touche "Entrer"
    btn_media[i].addEventListener("keypress", (event) => {
      if (event.key == "Enter") {
        displayModal(i);
      }
    });
  }
}
