document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    // Monta o payload com os dados vindos da URL
    const formData = {
        nome: params.get('nome'),
        email: params.get('email'),
        telefone: params.get('telefone'),
        faturamento: params.get('faturamento'),
        setor: params.get('setor'),
        empresa: params.get('empresa'),
        mensagem: params.get('mensagem'),
        origem: location.hostname || 'site'
    };

    // Se o campo nome e email forem obrigatórios, valida antes de enviar
    if (!formData.nome || !formData.email) {
        console.error('Nome e e-mail são obrigatórios');
        return;
    }

    // URL do seu Google Apps Script
    const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbylHfkKvotHfY07b7yoJXpuGMUyTwNqMDki7j_oeyrPryYUmKX-e881OUgZdNEjH285dQ/exec'; // COLE A SUA AQUI

    // Faz o POST direto para o Google Sheets
    fetch(WEBAPP_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            console.error('Erro ao enviar dados para a planilha');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados enviados com sucesso:', data);
    })
    .catch((error) => {
        console.error('Erro na requisição:', error);
    });

    // Exibe o nome do cliente dinamicamente, se existir o elemento
    const clientName = params.get('nome');
    const clientNameSpan = document.getElementById('client-name');
    if (clientName && clientNameSpan) {
        clientNameSpan.textContent = clientName;
    }
});