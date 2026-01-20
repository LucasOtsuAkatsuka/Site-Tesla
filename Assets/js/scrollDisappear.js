document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona o ícone do mouse
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // Escuta o evento de rolagem
    window.addEventListener('scroll', () => {
        // Se a rolagem for maior que 50 pixels (usuário começou a descer)
        if (window.scrollY > 50) {
            // Adiciona a classe que torna transparente
            scrollIndicator.classList.add('hidden');
        } else {
            // Se voltar para o topo, mostra de novo
            scrollIndicator.classList.remove('hidden');
        }
    });
});