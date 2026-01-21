document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.querySelector(".home-overlay");
    const sectionHome = document.querySelector(".section-home");

    window.addEventListener("scroll", () => {
        // Pega a altura da janela (viewport)
        const windowHeight = window.innerHeight;
        // Pega quanto o usuário já rolou
        const scrollY = window.scrollY;

        // Calcula a opacidade baseada na rolagem da PRIMEIRA tela (0 a 100vh)
        // Se rolou 0px, opacity = 0
        // Se rolou a altura da tela inteira, opacity = 1
        let opacity = scrollY / windowHeight;

        // Limita a opacidade entre 0 e 1 para não quebrar
        if (opacity > 1) opacity = 1;
        if (opacity < 0) opacity = 0;

        // Aplica o efeito
        if (overlay) {
            overlay.style.opacity = opacity;
        }
    });
});

/*
(function() {
    let isAnimating = false;
    
    // --- CONFIGURAÇÕES ---
    const ANIMATION_DURATION = 700; 
    
    // ZONA DE TOLERÂNCIA (O SEGREDO DA CORREÇÃO):
    // Aumentamos de 1px para 60px. 
    // Isso garante que, mesmo que o scroll "escape" um pouco no início, 
    // o script ainda vai pegar o usuário e levar para o lugar certo.
    const TRIGGER_THRESHOLD = 500; 

    // Curva "EaseOutExpo" (Rápida e suave)
    const easeOutExpo = (t) => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const smoothScrollToTarget = (targetY) => {
        const startY = window.scrollY;
        const distance = targetY - startY;
        let startTime = null;

        const animationStep = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            
            let progress = timeElapsed / ANIMATION_DURATION;
            if (progress > 1) progress = 1;

            const ease = easeOutExpo(progress);
            window.scrollTo(0, startY + (distance * ease));

            if (timeElapsed < ANIMATION_DURATION) {
                requestAnimationFrame(animationStep);
            } else {
                window.scrollTo(0, targetY);
                setTimeout(() => { isAnimating = false; }, 50);
            }
        };

        requestAnimationFrame(animationStep);
    };

    const triggerAction = () => {
        isAnimating = true;
        const destination = window.innerHeight;
        smoothScrollToTarget(destination);
    };

    // --- BLOQUEIO E DETECÇÃO ---
    
    const options = { passive: false };

    // 1. RODA DO MOUSE (PC)
    window.addEventListener('wheel', (e) => {
        if (isAnimating) {
            e.preventDefault();
            return;
        }

        // CORREÇÃO AQUI: Usamos a TRIGGER_THRESHOLD em vez de 1 ou 5.
        // Se o usuário estiver nos primeiros 60px da página...
        if (window.scrollY < TRIGGER_THRESHOLD) {
            // ...e tentar descer (deltaY > 0)
            if (e.deltaY > 0) {
                e.preventDefault(); // Trava o scroll nativo (mesmo que já tenha descido um pouco)
                triggerAction();    // E completa a animação até o ponto certo
            }
        }
    }, options);

    // 2. TECLADO
    window.addEventListener('keydown', (e) => {
        if (isAnimating) { e.preventDefault(); return; }
        
        const keys = [32, 34, 40]; 
        if (window.scrollY < TRIGGER_THRESHOLD && keys.includes(e.keyCode)) {
            e.preventDefault();
            triggerAction();
        }
    }, options);

    // 3. TOQUE (Mobile)
    let touchStartY = 0;
    
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, options);

    window.addEventListener('touchmove', (e) => {
        if (isAnimating) { e.preventDefault(); return; }

        if (window.scrollY < TRIGGER_THRESHOLD) {
            const touchEndY = e.touches[0].clientY;
            const deltaY = touchStartY - touchEndY;

            // Sensibilidade do toque
            if (deltaY > 5) { 
                e.preventDefault();
                triggerAction();
            }
        }
    }, options);

})();
*/