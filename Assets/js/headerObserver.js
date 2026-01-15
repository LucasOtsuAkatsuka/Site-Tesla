document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona todos os links do menu e todas as seções
    const navLinks = document.querySelectorAll('.items-navegacao');
    const sections = document.querySelectorAll('section');

    // 2. Configuração do Observador
    // rootMargin: "-100px..." cria uma linha imaginária 100px abaixo do topo.
    // Isso compensa a altura do seu Header (6rem = aprox 96px).
    const options = {
        threshold: 0.2, // Ativa quando 20% da seção estiver visível
        rootMargin: "-100px 0px -50% 0px" 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se a seção entrou na área de visão definida
            if (entry.isIntersecting) {
                // Pega o ID da seção atual
                const id = entry.target.getAttribute('id');
                
                // Remove a classe 'active' de todos os links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Adiciona a classe 'active' APENAS no link correspondente
                // Procura o link que tem o href igual ao id da seção (ex: href="#sobre")
                const activeLink = document.querySelector(`.items-navegacao[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, options);

    // 3. Começa a observar cada seção que tenha um ID
    sections.forEach(section => {
        if(section.getAttribute('id')) {
            observer.observe(section);
        }
    });
});