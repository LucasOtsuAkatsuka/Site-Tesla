let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

let timeRunning = 1050; 
let timeAutoNext = 7000;

let isRunning = false; 
let runTimeOut;

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

thumbnailBorderDom.addEventListener('click', (event) => {
    const clickedItem = event.target.closest('.item');
    if (!clickedItem || isRunning) return;

    const currentActiveImage = SliderDom.querySelector('.item img').src;
    
    const clickedImage = clickedItem.querySelector('img').src;
    if (currentActiveImage === clickedImage) {
        return;
    }

    const currentThumbs = document.querySelectorAll('.carousel .thumbnail .item');
    const index = Array.from(currentThumbs).indexOf(clickedItem);

    for (let i = 0; i < index; i++) {
        let firstSlider = SliderDom.querySelector('.item');
        let firstThumb = thumbnailBorderDom.querySelector('.item');
        
        SliderDom.appendChild(firstSlider);
        thumbnailBorderDom.appendChild(firstThumb);
    }
    showSlider('next');
});

function showSlider(type){
    if(isRunning === true) return; 
    isRunning = true;

    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }

    clearTimeout(runTimeOut);

    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
        isRunning = false; 
    }, timeRunning);
}