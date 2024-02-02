import burger from './burger.js'


const burgerMenu = document.getElementById('burgerMenu');
const menuItems = document.getElementById('menuItems');

burgerMenu.addEventListener('click', () => {
    menuItems.classList.toggle('show');
    burgerMenu.classList.toggle('line__active')
    document.body.classList.toggle('active')

    if (body.classList.contains('active')) {
        body.style.overflow = 'hidden'; // Убираем скролл при открытом меню
    } else {
        body.style.overflow = ''; // Восстанавливаем скролл при закрытом меню
    }
});

// window.addEventListener('resize', () => {
//     if (window.innerWidth > 768) {
//         menuItems.classList.remove('show');
//     }
// });