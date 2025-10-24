//section barre de recherche

const search = document.getElementById("recherche")
const cartes = document.querySelectorAll(".carte")

search.addEventListener("keyup", ()=>{
  const value = search.value.toLowerCase();

  cartes.forEach(carte=>{
    const name = carte.dataset.title.toLowerCase();

    if(name.includes(value)){
      carte.style.display = "block"
    } else {
      carte.style.display = "none"
    }
  })
})


// recherche par filtres (checkbox)

const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');

function filtrerRecettes() {
  const categories = Array.from(document.querySelectorAll('input[name="categorie"]:checked')).map(cb => cb.parentElement.textContent.trim());
  const temps = Array.from(document.querySelectorAll('input[name="time"]:checked')).map(cb => cb.parentElement.textContent.trim());
  const niveaux = Array.from(document.querySelectorAll('input[name="niveau"]:checked')).map(cb => cb.parentElement.textContent.trim());

  
  cartes.forEach(carte => {
    const cat = carte.dataset.categorie;
    const time = carte.dataset.time;
    const niveau = carte.dataset.niveau;

    const matchCategorie = categories.length === 0 || categories.includes(cat);
    const matchTime = temps.length === 0 || temps.includes(time);
    const matchNiveau = niveaux.length === 0 || niveaux.includes(niveau);

    carte.style.display = matchCategorie && matchTime && matchNiveau ? '' : 'none';
  });
}
checkboxes.forEach(cb => cb.addEventListener('change', filtrerRecettes));