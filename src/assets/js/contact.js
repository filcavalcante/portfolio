document.querySelector('form[name="contact"]').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.querySelector('input[name="name"]');
    var email = document.querySelector('input[name="email"]');
    var message = document.querySelector('textarea[name="message"]')

    // Limpa mensagens de erro anteriores
    document.querySelectorAll('.error-message').forEach(function(errorMessage) {
        errorMessage.textContent = '';
    });

    // Validação do nome
    if (!/^[a-zA-Z\s]{3,}$/.test(name.value)) {
        name.nextElementSibling.textContent = 'Por favor, insira um nome válido!';
        return;
    }

    // Validação do telefone
    if (celular.value.length != 15) {
        celular.nextElementSibling.textContent = 'Por favor, insira um número de telefone válido!';
        return;
    }

    // Validação do email
    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        email.nextElementSibling.textContent = 'Por favor, insira um endereço de email válido!';
        return;
    }

    // Validação da mensagem
    if(message.value.length < 4) {
        message.nextElementSibling.textContent = 'Por favor, Informe uma mensagem válida!';
        return;
    }

    this.submit();
});

var celular = document.getElementById("telefone");

// Máscara para o celular
celular.addEventListener("input", () => {

    // Remove os caracteres não numéricos usando a expressão regular /\D/g e limita a 11 dígitos.
    var limparValor = celular.value.replace(/\D/g, "").substring(0,11);

    // Divide a string em um array de caracteres individuais.
    var numerosArray = limparValor.split("");

    // Criar a variável para receber o número formatado
    var numeroFormatado = "";
    
    // Acessa o IF quando a quantidade de números é maior do que zero
    if(numerosArray.length > 0){
        // Formata o DD e concatenar o valor
        // slice - extrai uma parte do array
        // join - une os elementos do array em uma única string
        numeroFormatado += `(${numerosArray.slice(0,2).join("")})`;
    }

    // Acessa o IF quando a quantidade de números é maior do que dois
    if(numerosArray.length > 2){
        // Formata o número do telefone e concatenar o valor
        // slice - extrai uma parte do array
        // join - une os elementos do array em uma única string
        numeroFormatado += ` ${numerosArray.slice(2,7).join("")}`;
    }

    // Acessa o IF quando a quantidade de números é maior do que sete
    if(numerosArray.length > 7){
        // Formatar o número do telefone e concatena o valor
        // slice - extrai uma parte do array
        // join - une os elementos do array em uma única string
        numeroFormatado += `-${numerosArray.slice(7,11).join("")}`;
    }

    // Envia para o campo o número formatado
    celular.value = numeroFormatado;
});