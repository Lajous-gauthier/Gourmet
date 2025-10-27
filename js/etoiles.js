window.onload = () => {

const stars = document.querySelectorAll(".la-star")

const note = document.querySelector("#note")

for (star of stars) {
    star.addEventListener("mouseover", function(){
       resetStars()
        this.style.color = "red"

        let previousStar = this.previousElementSibling

        while(previousStar){
            previousStar.style.color = "red"
            previousStar = previousStar.previousElementSibling

        }
    })
    star.addEventListener("click" , function(){
        note.value = this.dataset.value
    })

}

function resetStars(){
    for(star of stars){
        star.style.color = "black"
    }}
}


Video.time = 26 min 