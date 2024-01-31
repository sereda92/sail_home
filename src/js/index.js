document.addEventListener('scroll', function() {
    const parallaxBg = document.querySelector('.parallax-bg');
    let scrollPosition = window.scrollY;
    parallaxBg.style.transform = 'translateY(' + scrollPosition * 0.6 + 'px)';
});
