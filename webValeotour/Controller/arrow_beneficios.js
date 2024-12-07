const container = document.getElementById('carrossel-beneficios');
const button = document.getElementById('btn-avancar-beneficios');

let isAtEnd = false;
let isRotated = false; // Controle para a rotação

button.addEventListener('click', function() {
    // Alterna entre rolar até o final e voltar ao início
    if (isAtEnd) {
        container.scrollTo({
            left: 0,
            behavior: 'smooth'
        });
    } else {
        container.scrollTo({
            left: container.scrollWidth,
            behavior: 'smooth'
        });
    }
    isAtEnd = !isAtEnd;

    // Adiciona ou remove a classe de rotação
    button.classList.toggle('rotate');
});