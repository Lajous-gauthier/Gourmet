const apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
const recetteImg = document.getElementById('randomImg');
const loadButton = document.getElementById('generate');
const h2 = document.getElementById("titrerecette")
const categorie = document.getElementById("categorie")
const origine = document.getElementById("origine")


        function chargerImagerecette() {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const meal = data.meals[0]
                    h2.textContent = meal.strMeal;
                    recetteImg.src = meal.strMealThumb;
                    categorie.textContent = meal.strCategory;
                    origine.textContent = meal.strArea;
                })
                .catch(error => console.error('Erreur :', error));
        }

        window.onload = chargerImagerecette;
        loadButton.addEventListener('click', chargerImagerecette);
      
