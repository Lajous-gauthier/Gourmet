// Je cree ma class 
class GestionnaireFavoris {
  constructor() {
    this.cleFavoris = "gourmetech_favoris";
  }

  obtenirTous() { 
    try {
      return JSON.parse(localStorage.getItem(this.cleFavoris)) || [];
    } catch (e) {
      console.error("Erreur lecture favoris :", e);
      return [];
    }
  }

  ajouter(recette) {
    const favoris = this.obtenirTous();
    if (!favoris.some(fav => fav.id === recette.id)) {
      favoris.push({
        ...recette,
        dateAjout: new Date().toISOString()
      });
      localStorage.setItem(this.cleFavoris, JSON.stringify(favoris));
      return true;
    }
    return false;
  }

  supprimer(id) {
    const favoris = this.obtenirTous();            
    const nouveauxFavoris = favoris.filter(fav => fav.id !== id); 
    localStorage.setItem(this.cleFavoris, JSON.stringify(nouveauxFavoris));
  }

  estFavori(id) {
    return this.obtenirTous().some(fav => fav.id === id);
  }
}

const gestionFavoris = new GestionnaireFavoris();

//Fonction notification et styles
function afficherNotification(message) {
  const notif = document.createElement("div");
  notif.className = "notification-favori";
  notif.textContent = message;
  notif.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #2c3e50;
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notif);
  
setTimeout(() => {
    notif.style.transform = "translateX(0)";
    notif.style.opacity = "1";
  }, 10);
  
  // Animation de sortie après 3 secondes
  setTimeout(() => {
    notif.style.transform = "translateX(400px)";
    notif.style.opacity = "0";
    setTimeout(() => notif.remove(), 300);
  }, 3000);
}

//Fonction favoris
function afficherFavoris() {
  const container = document.getElementById("favoritesContainer");
  const messageVide = document.getElementById("noFavorites");

  if (!container) return;

  const favoris = gestionFavoris.obtenirTous();

  if (favoris.length === 0) {
    messageVide.style.display = "block";
    container.innerHTML = "";
    return;
  }

  messageVide.style.display = "none";
  container.innerHTML = "";

  favoris.forEach((recette) => {
    const carte = document.createElement("article");
    carte.className = "carte-favori";
    carte.innerHTML = `
      <div class="image-container">
        <img src="${recette.image}" alt="${recette.titre}" />
      </div>
      <div class="carte-content">
        <h3>${recette.titre}</h3>
        <div class="infos">
          <span class="badge temps">⏱️ ${recette.temps}</span>
          <span class="badge niveau">📊 ${recette.niveau}</span>
        </div>
        <div class="actions">
          <a href="${recette.lien}" class="btn-voir">Voir la recette</a>
          <button class="btn-supprimer" data-id="${recette.id}">
            <span class="material-symbols-outlined">delete</span>
            Retirer
          </button>
        </div>
      </div>
    `;

    container.appendChild(carte);

    const btnSupprimer = carte.querySelector(".btn-supprimer");
    btnSupprimer.addEventListener("click", () => {
      if (confirm(`Retirer "${recette.titre}" de vos favoris ?`)) {
        gestionFavoris.supprimer(recette.id);
        afficherNotification("Retiré des favoris");
        afficherFavoris();
      }
    });
  });
}

//Initialisation au chargement
document.addEventListener("DOMContentLoaded", () => {  
  // Page principale
  if (document.querySelector("#cartes")) {
    const cartes = document.querySelectorAll(".carte");

    cartes.forEach((carte) => {
      const button = carte.querySelector(".material-symbols-outlined");
      const title = carte.querySelector("h2").textContent.trim();
      const img = carte.querySelector("img").src;
      const categorie = carte.querySelector(".categorie").textContent.trim();
      const times = carte.querySelector(".time").textContent.trim();
      const level = carte.querySelector(".niveau").textContent.trim();
      const link = carte.querySelector(".voir-recette").href;  

      const id = title.toLowerCase().split(" ").join("-");  

      const recette = { 
        id, 
        titre: title, 
        image: img,    
        categorie, 
        temps: times,  
        niveau: level, 
        lien: link     
      };

      function majButton() {
        if (gestionFavoris.estFavori(id)) {
          button.style.color = "#f8000cff";
        } else {
          button.style.color = "#000";
        }
      }
      
      majButton();
      button.style.cursor = "pointer";

      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (gestionFavoris.estFavori(id)) {
          gestionFavoris.supprimer(id);
          afficherNotification(`❌ ${title} retiré des favoris`);
        } else {
          gestionFavoris.ajouter(recette);
          afficherNotification(`💜 ${title} ajouté aux favoris`);
        }

        majButton();
      });
    });
  }

  // Page favoris
  if (document.getElementById("favoritesContainer")) {
    afficherFavoris();
  }
});