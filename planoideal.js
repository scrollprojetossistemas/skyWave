function verificarTipoCliente() {
    var tipoCliente = document.getElementById("tipoCliente").value;
    var perguntasContainer = document.getElementById("perguntasAdicionais");

    // Mostrar ou esconder perguntas adicionais com base no tipo de cliente
    if (tipoCliente === "empresa") {
        // Exibir apenas o campo de dispositivos
        perguntasContainer.innerHTML = `
            <div class="pergunta">
                <label for="quantosDispositivos">Quantos dispositivos tem no ambiente?</label>
                <input type="number" id="quantosDispositivos" name="quantosDispositivos" min="1" max="10" required>
            </div>
        `;
    } else {
        // Mostrar as perguntas completas para "lar"
        perguntasContainer.innerHTML = `
            <div class="pergunta">
                <label for="tamanhoAmbiente">Qual é o tamanho do ambiente?</label>
                <select id="tamanhoAmbiente" name="tamanhoAmbiente">
                    <option value="pequeno">Pequeno</option>
                    <option value="medio">Médio</option>
                    <option value="grande">Grande</option>
                </select>
            </div>
            <div class="pergunta">
                <label for="quantosDispositivos">Quantos dispositivos tem no ambiente?</label>
                <input type="number" id="quantosDispositivos" name="quantosDispositivos" min="1" max="10" required>
            </div>
            <div class="pergunta">
                <label for="usoInternet">Você trabalha com internet ou usa apenas para lazer?</label>
                <select id="usoInternet" name="usoInternet" required>
                    <option value="trabalho">Trabalho</option>
                    <option value="lazer">Lazer</option>
                </select>
            </div>
            <div class="pergunta">
                <label for="prioridadeInternet">Você prefere?</label>
                <select id="prioridadeInternet" name="prioridadeInternet" required>
                    <option value="cobertura">Cobertura para a casa inteira</option>
                    <option value="velocidade">Alta velocidade</option>
                    <option value="ambos">Ambos</option>
                </select>
            </div>
        `;
    }
}

function determinarPlano() {
    var tipoCliente = document.getElementById("tipoCliente").value;

    // Se for empresa, o plano é automaticamente 800MB
    if (tipoCliente === "empresa") {
        document.getElementById("planoRecomendado").textContent = "O plano ideal para você é o plano de 800MB.";
        document.getElementById("resultado").style.display = "block";
        return;
    }

    // Coletar valores para "Lar"
    var tamanhoAmbiente = document.getElementById("tamanhoAmbiente").value;
    var dispositivos = parseInt(document.getElementById("quantosDispositivos").value);
    var usoInternet = document.getElementById("usoInternet").value;
    var prioridadeInternet = document.getElementById("prioridadeInternet").value;

    var planoRecomendado = "";

    // Lógica para determinar o plano
    if (tipoCliente === "lar") {
        if (
            dispositivos <= 2 &&
            usoInternet === "lazer" &&
            prioridadeInternet === "cobertura"
        ) {
            planoRecomendado = "200MB";
        } else if (
            dispositivos <= 2 &&
            usoInternet === "trabalho" && 
            prioridadeInternet === "velocidade"
        ) {
            planoRecomendado = "600MB";
        } else if (
            tamanhoAmbiente === "medio" ||
            dispositivos > 2 ||
            prioridadeInternet === "ambos"
        ) {
            planoRecomendado = "600MB";
        } else {
            planoRecomendado = "800MB"; // Default para situações não especificadas
        }
    }

    // Exibir o resultado
    document.getElementById("planoRecomendado").textContent = "O plano ideal para você é o plano de " + planoRecomendado + ".";
    document.getElementById("resultado").style.display = "block";
}

function redirectToPlano() {
    var plano = document.getElementById("planoRecomendado").textContent;
    if (plano.includes("800MB")) {
        window.location.href = "plano-800mb.html";
    } else if (plano.includes("600MB")) {
        window.location.href = "plano-600mb.html";
    } else {
        window.location.href = "plano-200mb.html";
    }
}
