let ratingStorage = {};

window.onload = () => {
  const stars = document.querySelectorAll(".la-star");
  const note = document.querySelector("#note");

   const ratingId = note.dataset.id || 'default'; 
 
  const savedRating = getRating(ratingId);
  if (savedRating) {
    note.value = savedRating;
    resetStars(savedRating);
  }

  for (star of stars) {
    star.addEventListener("mouseover", function () {
      resetStars();
      this.style.color = "#e06b1a";
      this.classList.add("las");
      this.classList.remove("lar");
      let previousStar = this.previousElementSibling;

      while (previousStar) {
        previousStar.style.color = "#e06b1a";
        previousStar.classList.add("las");
        previousStar.classList.remove("lar");
        previousStar = previousStar.previousElementSibling;
      }
    });
    
    star.addEventListener("click", function () {
      note.value = this.dataset.value;
     
      saveRating(ratingId, this.dataset.value);
    });

    star.addEventListener("mouseout", function () {
      resetStars(note.value);
    });
  }

  function resetStars(note = 0) {
    for (star of stars) {
      if (star.dataset.value > note) {
        star.style.color = "#888"
        star.classList.add("lar");
        star.classList.remove("las");
      } else {
        star.style.color = "#e06b1a";
        star.classList.add("las");
        star.classList.remove("lar");
      }
    }
  }


  function saveRating(id, rating) {
    localStorage.setItem('userRating_' + id, rating);
  }

  function getRating(id) {
    return localStorage.getItem('userRating_' + id);
  }
};