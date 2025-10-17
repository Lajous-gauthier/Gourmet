// Récupération sûre du bouton (id prioritaire, fallback sur la classe)
let toggleBtn = document.getElementById('themeToggle');
if (!toggleBtn) {
  toggleBtn = document.querySelector('.theme-toggle');
}

// Si pas de bouton trouvé, on quitte proprement (évite les erreurs)
if (!toggleBtn) {
  console.warn('Bouton de thème non trouvé (id="themeToggle" ou .theme-toggle manquant). Le script de thème est désactivé.');
} else {
  const htmlEl = document.documentElement;

  // Charger le thème sauvegardé ou définir "light" par défaut
  let currentTheme = localStorage.getItem('theme');
  if (!currentTheme) {
    currentTheme = 'light';
  }
  htmlEl.setAttribute('data-theme', currentTheme);

  // Mettre à jour l’icône du bouton selon le thème actuel
  if (currentTheme === 'dark') {
    toggleBtn.textContent = 'light_mode';
  } else {
    toggleBtn.textContent = 'dark_mode';
  }

  // Gestion du clic sur le bouton
  toggleBtn.addEventListener('click', () => {
    let newTheme;
    if (htmlEl.getAttribute('data-theme') === 'light') {
      newTheme = 'dark';
    } else {
      newTheme = 'light';
    }

    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
      toggleBtn.textContent = 'light_mode';
    } else {
      toggleBtn.textContent = 'dark_mode';
    }
  });
}
