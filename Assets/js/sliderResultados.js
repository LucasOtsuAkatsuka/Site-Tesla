let listItems = document.querySelectorAll('.carousel .list .item');
let thumbnailItems = document.querySelectorAll('.carousel .thumbnail .item');

let itemActive = 0;
let countItem = listItems.length;
let isRunning = false; 

refreshSlider();

thumbnailItems.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        if (index === itemActive || isRunning) return;

        itemActive = index;
        
        refreshSlider();
    });
});

function refreshSlider() {
    isRunning = true;

    let itemActiveOld = document.querySelector('.carousel .list .item.active');
    let thumbnailActiveOld = document.querySelector('.carousel .thumbnail .item.active');

    if(itemActiveOld) itemActiveOld.classList.remove('active');
    if(thumbnailActiveOld) thumbnailActiveOld.classList.remove('active');

    listItems[itemActive].classList.add('active');
    thumbnailItems[itemActive].classList.add('active');

    setTimeout(() => {
        isRunning = false;
    }, 1000); 
}