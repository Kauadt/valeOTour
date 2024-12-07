const button = document.getElementById("button-control-cards");
const cards = document.getElementById("first-card");
const arrow = document.getElementById("arrow-back");
let movidoParaTras = false;

button.addEventListener("click", function() {
    if (!movidoParaTras) {
        cards.style.marginLeft = '-350px';
        arrow.style.transform = 'rotateY(180deg)';
        arrow.style.transition = 'transform 0.3s';
    } else {
        cards.style.marginLeft = '40px';
        arrow.style.transform = 'rotateY(360deg)';
    }
    movidoParaTras = !movidoParaTras;
})
