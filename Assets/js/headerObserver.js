document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LÓGICA DE DESTAQUE NO MENU (SCROLL SPY) ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.items-navegacao');
    const headerHeight = document.querySelector('.header').offsetHeight;

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // O "- headerHeight - 100" serve para trocar a cor um pouco antes da seção bater no topo
            if (scrollY >= (sectionTop - headerHeight - 150)) {
                current = section.getAttribute('id');
            }
        });

        // Correção específica para a Home:
        // Se estivermos na primeira tela (antes de descer tudo), mantém Home ativo
        if (scrollY < window.innerHeight) {
            current = 'home';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- 2. CLIQUE NO BOTÃO "INÍCIO" (SCROLL PARA O TEXTO) ---
    const homeLink = document.querySelector('a[href="#home"]');
    
    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o pulo padrão para o topo (0px)
            
            // Rola exatamente para a altura de 1 tela (100vh)
            // É lá que o texto começa na nossa configuração de Parallax
            window.scrollTo({
                top: window.innerHeight, 
                behavior: 'smooth'
            });
        });
    }

    // --- 3. ANIMAÇÃO DE ENTRADA DO TEXTO (MANTIDA) ---
    const textContainer = document.querySelector('.div-texto-home');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                textContainer.classList.add('visible');
            }
        });
    }, { threshold: 0.1 }); // Sensibilidade alta para detectar logo

    if(textContainer) observer.observe(textContainer);
});