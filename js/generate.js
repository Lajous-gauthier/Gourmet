    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const recetteImg = document.getElementById('randomImg');
    const loadButton = document.getElementById('generate');
    const h2 = document.getElementById("titrerecette");
    const categorie = document.getElementById("categorie");
    const origine = document.getElementById("origine");
    const instru = document.getElementById("instructions");
    const ingredientsListe = document.getElementById("ingredients");

    function chargerImagerecette() {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const meal = data.meals[0];
          h2.textContent = meal.strMeal;
          recetteImg.src = meal.strMealThumb;
          categorie.textContent = meal.strCategory;
          origine.textContent = meal.strArea;
          instru.textContent = meal.strInstructions;
          
          ingredientsListe.innerHTML = "";

          

        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`]
            const mesure = meal[`strMeasure${i}`]

            if (ingredient && ingredient.trim() !==""){
              const li = document.createElement('li');
              li.textContent = `${mesure ? mesure.trim() : ""} ${ingredient.trim()}`;
              ingredientsListe.appendChild(li);
            } 
            
            
          }
        })
        .catch(error => { console.error('Erreur :', error)
          h2.textContent = "Impossible de charger la recette";
        });
        
    }


    window.onload = chargerImagerecette;
    loadButton.addEventListener('click', chargerImagerecette);