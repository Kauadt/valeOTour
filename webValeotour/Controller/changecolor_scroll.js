if (window.innerWidth > 1279) {
    window.addEventListener('scroll', function () {
        var x = window.pageYOffset;
        var elements = document.querySelectorAll('.changecolor');
        elements.forEach(function (element) {
            element.style.left = x + 'px';
            if (x < 770 || (x > 1797 && x < 3625)) {
                element.style.color = '#64D196';
            } else {
                element.style.color = '#002367';
            }
        });

        var elements2 = document.querySelectorAll('.changecolor2');
        elements2.forEach(function (element) {
            element.style.left = x + 'px';
            if (x < 770 || (x > 1797 && x < 3625)) {
                element.style.color = '#fff';
                element.style.borderColor = '#64D196';
            } else {
                element.style.color = '#002367';
                element.style.borderColor = '#93A9D2';
            }
        });
    });
} else {
    window.addEventListener('scroll', function () {
        var x = window.pageYOffset;
        var elements = document.querySelectorAll('.changecolor');
        elements.forEach(function (element) {
            element.style.left = x + 'px';
            if (x < 712 || (x > 1564 && x < 3581)) {
                element.style.color = '#64D196';
            } else {
                element.style.color = '#002367';
            }
        });

        var elements2 = document.querySelectorAll('.changecolor2');
        elements2.forEach(function (element) {
            element.style.left = x + 'px';
            if (x < 712 || (x > 1564 && x < 3581)) {
                element.style.color = '#fff';
                element.style.borderColor = '#64D196';
            } else {
                element.style.color = '#002367';
                element.style.borderColor = '#93A9D2';
            }
        });
    });
}
