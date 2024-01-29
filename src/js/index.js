// document.addEventListener('DOMContentLoaded', function() {
//     var parallaxContainer = document.querySelector('.parallax-container');
//     var parallaxBg = document.querySelector('.parallax-bg');

//     parallaxContainer.addEventListener('mousemove', function(e) {
//         var offsetX = e.clientX / window.innerWidth;
//         var offsetY = e.clientY / window.innerHeight;

//         parallaxBg.style.transform = 'translate(-' + offsetX * 50 + 'px, -' + offsetY * 50 + 'px)';
//     });
// });



// document.addEventListener('DOMContentLoaded', function() {
//     var parallaxBg = document.querySelector('.parallax-bg');

//     window.addEventListener('scroll', function() {
//         var scrollPosition = window.pageYOffset;
//         parallaxBg.style.transform = 'translateY(' + scrollPosition * .3 + 'px)'; // Измените 0.4, чтобы подстроить скорость параллакса под ваше предпочтение
//     });
// });



window.addEventListener('scroll', function() {
    let offset = window.pageYOffset;
    let parallaxBg = document.getElementById('parallax-bg');
    parallaxBg.style.backgroundPositionY = offset * 0.7 + 'px';
});

