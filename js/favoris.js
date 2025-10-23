// Je cree ma class 
class GestionnaireFavoris {
  constructor() {
    this.cleFavoris = "gourmetech_favoris";
  }

  // Je recupere favoris
  obtenirTous() { 
    try {
      return JSON.parse(localStorage.getItem(this.cleFavoris)) || [];
    } catch (e) {
      console.error("Erreur lecture favoris :", e);
      return [];
    }
  }

  // J’ajoute favori
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

  // Je supprime un favori
  supprimer(id) {
    const favoris = this.obtenirTous();            
    const nouveauxFavoris = favoris.filter(fav => fav.id !== id); 
    localStorage.setItem(this.cleFavoris, JSON.stringify(nouveauxFavoris));
  }

  // Je vérifie si un favori existe déjà
  estFavori(id) {
    return this.obtenirTous().some(fav => fav.id === id);
  }
}

// Création globale
const gestionFavoris = new GestionnaireFavoris();

function afficherNotification(message) {
        const notif = document.createElement("div");
        notif.className = "notification-favori";
        notif.textContent = message;
        notif.style.cssText = `...`;
        
        document.body.appendChild(notif);  
        
        setTimeout(() => {                 
          notif.style.animation = "slideOut 0.3s ease";
          setTimeout(() => notif.remove(), 300);  
        }, 3000);
      }

document.addEventListener("DOMContentLoaded", () => {  
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

    const recette = { 
      id, 
      titre: title, 
      image: img,    
      categorie, 
      temps: times,  
      niveau: level, 
      lien: link     
    };

    // Couleur du cœur
    function majButton() {
      if (gestionFavoris.estFavori(id)) {
        button.style.color = "#e74c3c";
      } else {
        button.style.color = "#95a5a6";
      }
    }
    
    // Mise à jour
    majButton();

    // Gestion du clic cœur
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

      // Mise à jour
      majButton();

      // Affichage notif
      
    });
  });
});

