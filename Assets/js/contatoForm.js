document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-contato-tesla");
    const statusMsg = document.getElementById("mensagem-status");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      
      const formData = new FormData(form);
  
      try {
        
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          mode: "no-cors"
        });
  
  
        statusMsg.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
        statusMsg.className = "sucesso";
        form.reset();
  
   
        setTimeout(() => {
          statusMsg.style.display = "none";
        }, 5000);
  
      } catch (error) {

        statusMsg.textContent = "Ocorreu um erro ao enviar. Tente novamente.";
        statusMsg.className = "erro";
        console.error("Erro ao enviar:", error);
      }
    });
  });

  function formatarCelular(input) {
    let valor = input.value.replace(/\D/g, "");
  
    if (valor.length > 11) valor = valor.slice(0, 11); 
  
    if (valor.length > 6) {
      input.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
    } else if (valor.length > 2) {
      input.value = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    } else if (valor.length > 0) {
      input.value = `(${valor}`;
    }
  }
  

  document.addEventListener("DOMContentLoaded", () => {
    const celularInput = document.getElementById("celular");
  
    if (celularInput) {
      celularInput.addEventListener("input", (e) => {
        formatarCelular(e.target);
      });
    }
  });