function activateTab(tabId, btnElement) {
    // 1. Remove a classe 'active' de todos os botões
    document.querySelectorAll('.prova-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // 2. Adiciona a classe 'active' no botão clicado
    btnElement.classList.add('active');

    // 3. Esconde todos os conteúdos
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none'; // Garante que suma
    });

    // 4. Mostra o conteúdo alvo
    const target = document.getElementById(tabId);
    target.style.display = 'flex';
    // Pequeno delay para permitir a transição de opacidade (fade in)
    setTimeout(() => {
        target.classList.add('active');
    }, 10);
}