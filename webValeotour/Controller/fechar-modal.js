const modalcancelar = document.getElementById('cancelar-modal');
const modalalterar = document.getElementById('alterar-modal');
const modal = document.getElementById('modal');
const backgroundModal = document.getElementById('background-modal');
const abrirModalDiv = document.getElementById('abrir-modal');

modalalterar.addEventListener('click', () => {
    modal.style.display = 'none';
    backgroundModal.style.display = 'none';
    window.location.href = './alterar-dados.php';
})

modalcancelar.addEventListener('click', () => {
    modal.style.display = 'none';
    backgroundModal.style.display = 'none';
})

abrirModalDiv.addEventListener('click',() => {
    modal.style.display = 'flex';
    backgroundModal.style.display = 'flex';
})

