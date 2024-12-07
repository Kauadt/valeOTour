
const inputFile = document.querySelector("#imagem_principal");
const pictureImage = document.querySelector(".picture__image");
const pictureImageTxt = "<div class='choose-image'><iconify-icon icon='ion:images-outline' style='font-size:50px'></iconify-icon><br>Clique para selecionar sua imagem</div>";
pictureImage.innerHTML = pictureImageTxt;

inputFile.addEventListener("change", function (e) {
   const inputTarget = e.target;
   const file = inputTarget.files[0];

   if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", function (e) {
         const readerTarget = e.target;

         const img = document.createElement("img");
         img.src = readerTarget.result;
         img.classList.add("picture__img");

         pictureImage.innerHTML = "";
         pictureImage.appendChild(img);
      });

      reader.readAsDataURL(file);
   } else {
      pictureImage.innerHTML = pictureImageTxt;
   }
});




document.addEventListener('DOMContentLoaded', function () {
   ImgUpload();
});

function ImgUpload() {
   var imgWrap = document.querySelector('.upload__img-wrap');
   var imgArray = [];

   document.querySelector('.upload__inputfile').addEventListener('change', function (e) {
      var maxLength = parseInt(this.getAttribute('data-max_length'), 10);
      var files = e.target.files;
      var filesArr = Array.from(files);

      filesArr.forEach(function (f) {
         if (!f.type.match('image.*')) {
            return;
         }

         if (imgArray.length >= maxLength) {
            return false;
         } else {
            var len = imgArray.filter(img => img !== undefined).length;
            if (len >= maxLength) {
               return false;
            } else {
               imgArray.push(f);

               var reader = new FileReader();
               reader.onload = function (e) {
                  var imgCloseCount = document.querySelectorAll('.upload__img-close').length;
                  var html = `<div class='upload__img-box'>
                             <div style='background-image: url(${e.target.result})' data-file='${f.name}' class='img-bg'>
                               <div class='upload__img-close'>&times;</div>
                             </div>
                           </div>`;
                  imgWrap.insertAdjacentHTML('beforeend', html);
               };
               reader.readAsDataURL(f);
            }
         }
      });
   });

   document.body.addEventListener('click', function (e) {
      if (e.target.classList.contains('upload__img-close')) {
         var file = e.target.parentElement.dataset.file;

         imgArray = imgArray.filter(img => img.name !== file);

         e.target.parentElement.parentElement.remove();
      }
   });
}

// Adicionar arquivos selecionados ao formulário
document.querySelector('form').addEventListener('submit', function () {
   var imgList = imgArray.map(img => img.name).join(',');
   document.getElementById('img_list').value = imgList;
});
