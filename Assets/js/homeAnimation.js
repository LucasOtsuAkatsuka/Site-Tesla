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

document.addEventListener("DOMContentLoaded", () => {
    let isAnimating = false;
    
    // Ajuste este valor se a Header estiver cobrindo o texto.
    const headerOffset = 0; 
    
    // Duração da animação em milissegundos (quanto menor, mais rápido e "seco" o freio)
    const animationDuration = 800; 

    // Função de Easing (Movimento suave: começa devagar, acelera, termina devagar)
    const easeInOutQuad = (t) => {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    };

    // Função que anima o scroll manualmente (O segredo do freio)
    const customScrollTo = (targetPosition) => {
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            
            // Calcula o progresso (0 a 1)
            let progress = timeElapsed / animationDuration;
            if (progress > 1) progress = 1;

            // Aplica a curva de suavidade
            const ease = easeInOutQuad(progress);

            // Move a tela
            window.scrollTo(0, startPosition + (distance * ease));

            if (timeElapsed < animationDuration) {
                requestAnimationFrame(animation);
            } else {
                // FIM DA ANIMAÇÃO:
                // Garante que parou no pixel exato
                window.scrollTo(0, targetPosition);
                
                // Libera o scroll e a trava
                setTimeout(() => {
                    document.body.style.overflow = ''; // Devolve o scroll nativo
                    document.documentElement.style.overflow = ''; 
                    isAnimating = false;
                }, 50); // Pequeno delay para garantir que a inércia morreu
            }
        };

        requestAnimationFrame(animation);
    };

    // Função Principal de Disparo
    const triggerScrollDown = () => {
        if (isAnimating) return;
        isAnimating = true;

        // --- O FREIO ABS ---
        // Ao definir overflow: hidden, o navegador é OBRIGADO a matar 
        // qualquer inércia/momentum acumulado no touchpad instantaneamente.
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        const targetPosition = window.innerHeight - headerOffset;
        
        customScrollTo(targetPosition);
    };

    // ---------------- EVENT LISTENERS ---------------- //

    // 1. Bloqueador de Eventos (Impede briga com o scroll manual)
    const preventDefault = (e) => {
        if (isAnimating) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    };
    
    // Adiciona o bloqueio com prioridade máxima
    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });

    // 2. Detector de Roda do Mouse / Touchpad
    window.addEventListener('wheel', (e) => {
        if (!isAnimating && window.scrollY < 10) {
            // Se tentar descer (deltaY > 0)
            if (e.deltaY > 0) {
                e.preventDefault(); // Cancela o scroll nativo inicial
                triggerScrollDown();
            }
        }
    }, { passive: false });

    // 3. Detector de Toque (Mobile)
    let touchStartY = 0;
    
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
        if (!isAnimating && window.scrollY < 10) {
            const touchEndY = e.touches[0].clientY;
            const deltaY = touchStartY - touchEndY;

            // Sensibilidade do toque (arrastar mais de 30px)
            if (deltaY > 30) { 
                e.preventDefault();
                triggerScrollDown();
            }
        }
    }, { passive: false });
});