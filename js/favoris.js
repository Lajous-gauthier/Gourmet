//je cree ma classe fav
class GestionnaireFavoris {
  constructor() {
    this.cle = "gourmetech_favoris";
  }

  getAll() {
    return JSON.parse(localStorage.getItem(this.cle)) || [];
  }

  add(recette) {
    const favoris = this.getAll();
    if (!favoris.some((fav) => fav.id === recette.id)) {
      favoris.push(recette);
      localStorage.setItem(this.cle, JSON.stringify(favoris));
    }
  }

  remove(id) {
    const favoris = this.getAll().filter((fav) => fav.id !== id);
    localStorage.setItem(this.cle, JSON.stringify(favoris));
  }

  isFavori(id) {
    return this.getAll().some((fav) => fav.id === id);
  }
}

//creation globale
const gestionFavoris = new GestionnaireFavoris();

document.addEventListener(`DOMContentLoaded`, () => {
  const card = document.querySelectorAll(".carte");

  card.forEach((carte) => {
    const button = carte.querySelector(".material-symbols-outlined");
    const title = carte.querySelector("h2").textContent.trim();
    const img = carte.querySelector("img").src;
    const categorie = carte.querySelector(".categorie").textContent.trim();
    const times = carte.querySelector(".time").textContent.trim();
    const level = carte.querySelector(".niveau").textContent.trim();
    const link = carte.querySelector(".voir-recette").href;

    const id = title.toLowerCase().split(" ").join("-");

    const recette = { id, title, img, categorie, times, level, link };

    //couleur coeur celon l'etat
    function majButton() {
      if (gestionFavoris.isFavori(id)) {
        button.style.color = "#e74c3c";
      } else {
        button.style.color = "#95a5a6";
      }
    }
    
    //mise a jour
    majButton();

    //gestion clic icon coeur
    button.addEventListener(`click`, (e) => {
      e.preventDefault();

      if (gestionFavoris.isFavori(id)) {
        gestionFavoris.remove(id);
        afficherNotification(`❌ ${title} retiré des favoris`);
      } else {
        gestionFavoris.add(recette);
        afficherNotification(`💜 ${title} ajouté aux favoris`);
      }

      //mise a jour
      majButton();
    });
  });
});
