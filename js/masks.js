function showPage(pageId) {
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    showPage('home');

    const applyMask = (input, mask) => {
        let value = input.value.replace(/\D/g, '');
        let maskedValue = '';
        let charIndex = 0;

        for (let i = 0; i < mask.length; i++) {
            if (charIndex >= value.length) break;

            if (mask[i] === '9') {
                maskedValue += value[charIndex];
                charIndex++;
            } else {
                maskedValue += mask[i];
            }
        }
        input.value = maskedValue;
    };

    const handleCPFMask = (e) => {
        applyMask(e.target, '999.999.999-99');
    };

    const handleCEPMask = (e) => {
        applyMask(e.target, '99999-999');
    };

    const handleTelefoneMask = (e) => {
        let mask = e.target.value.replace(/\D/g, '').length === 11 ? '(99) 99999-9999' : '(99) 9999-9999';
        applyMask(e.target, mask);
    };

    document.getElementById('cpf')?.addEventListener('input', handleCPFMask);
    document.getElementById('cep')?.addEventListener('input', handleCEPMask);
    document.getElementById('telefone')?.addEventListener('input', handleTelefoneMask);
    
    document.getElementById('cadastroForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = e.target;
        const messageBox = document.getElementById('messageBox');
        
        if (form.checkValidity()) {
            messageBox.textContent = "Cadastro efetuado com sucesso! Seus dados foram validados.";
            messageBox.className = 'p-4 text-center text-lg rounded-lg mt-4 bg-green-100 text-green-800';
            messageBox.classList.remove('hidden');
            form.reset(); 
            document.getElementById('estado').value = ''; 
        } else {
            messageBox.textContent = "Por favor, preencha todos os campos obrigatórios corretamente.";
            messageBox.className = 'p-4 text-center text-lg rounded-lg mt-4 bg-red-100 text-red-800';
            messageBox.classList.remove('hidden');
        }
    });

    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showPage(hash);
    }
});
