const swiper = new Swiper('.swiper-container', {
    effect: "cards",
    grabCursor: true,
    initialSlide: 0,
    loop: false,
    
    // Configurações específicas do efeito CARDS
    cardsEffect: {
        perSlideOffset: 8, // Distância entre os cards de trás
        perSlideRotate: 4, // Rotação sutil (aumente se quiser mais bagunçado)
        slideShadows: false, // Remove sombras padrão do swiper (usamos a nossa no CSS)
    },
    
    rotate: true,
    mousewheel: {
        invert: false,
    },
});