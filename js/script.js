// dark mode 

const toggleBtn = document.querySelector("#themeToggle") || document.querySelector(".theme-toggle");

if (toggleBtn) {
  const html = document.documentElement;
  let theme = localStorage.getItem("theme");
  if (!theme) theme = "light";

  html.setAttribute("data-theme", theme);
  if (theme === "dark") {
    toggleBtn.textContent = "light_mode";
  } else {
    toggleBtn.textContent = "dark_mode";
  }

  toggleBtn.addEventListener("click", () => {
    if (theme === "dark") {
      theme = "light";
      toggleBtn.textContent = "dark_mode";
    } else {
      theme = "dark";
      toggleBtn.textContent = "light_mode";
    }
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  });
}


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




