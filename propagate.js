(function () {
  const form = document.querySelector("form");
  const qs = new URLSearchParams(location.search);

  // Preenche automaticamente os campos vindos pela URL
  for (const [k, v] of qs.entries()) {
    const el = document.querySelector(`[name="${k}"]`);
    if (el && !el.value) el.value = v;
  }

  // Mantém todos os parâmetros como hidden inputs
  if (form) {
    for (const [k, v] of qs.entries()) {
      if (!form.querySelector(`input[type="hidden"][name="${k}"]`)) {
        const h = document.createElement("input");
        h.type = "hidden";
        h.name = k;
        h.value = v;
        form.appendChild(h);
      }
    }

    // Se for a página de sucesso, envia os dados para o Google Sheets
    if (location.pathname.includes("sucesso.html")) {
      form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const data = {};
        const inputs = form.querySelectorAll("input, select, textarea");
        inputs.forEach(input => {
          if (input.name) {
            data[input.name] = input.value;
          }
        });

        // Adiciona data e hora automaticamente
        data.timestamp = new Date().toLocaleString("pt-BR");

        try {
          const response = await fetch("https://script.google.com/macros/s/AKfycbylHfkKvotHfY07b7yoJXpuGMUyTwNqMDki7j_oeyrPryYUmKX-e881OUgZdNEjH285dQ/exec", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });

          const result = await response.json();
          console.log("✅ Dados enviados:", result);
          alert("Informações salvas com sucesso!");
        } catch (err) {
          console.error("❌ Erro ao enviar:", err);
          alert("Erro ao salvar suas informações. Tente novamente.");
        }
      });
    }
  }
})();
