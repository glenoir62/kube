console.log('Hello Dyma !');


const headerMobileButton = document.querySelector('.header-mobile-icon');
const headerMobileList = document.querySelector('.header-mobile-list');
headerMobileButton.addEventListener('click', () => {
    headerMobileList.classList.toggle('show');
})

