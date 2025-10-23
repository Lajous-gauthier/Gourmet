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



