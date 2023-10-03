// Função para iniciar o contador e redirecionar após o tempo especificado
function iniciarContador() {
    var tempoRestante = 10; // Tempo em segundos
    var contadorElement = document.getElementById("contador").getElementsByTagName("span")[0];

    // Atualiza o contador a cada segundo
    var interval = setInterval(function () {
        tempoRestante--;
        contadorElement.textContent = tempoRestante;

        // Verifica se o tempo acabou
        if (tempoRestante <= 0) {
            clearInterval(interval); // Para o contador
            window.location.href = "https://filipe-cavalcante.netlify.app/"; // Redireciona para página principal
        }
    }, 1000);
}

// Chama a função para iniciar o contador quando a página carregar
window.addEventListener("load", iniciarContador);