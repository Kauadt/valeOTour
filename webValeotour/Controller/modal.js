const modal = document.getElementById('modalLogin');
const closeBtn = document.getElementById('closeModal');

setTimeout(function() {
    modal.style.display = 'none'; // Esconde o modal após 3 segundos
  }, 3000); // 3000 milissegundos = 3 segundos

closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

