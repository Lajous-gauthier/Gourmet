 // menu burger telephone
 
 const btn = document.getElementById('menuToggle');
  const nav = document.getElementById('navLinks');

  btn.addEventListener('click', () => {
    const opened = nav.classList.toggle('active'); // ajoute/supprime .active
    btn.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });


  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
  }));


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