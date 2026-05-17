const botao =
    document.querySelector("button")

const input =
    document.querySelector("#cidade")

const weatherInfo =
    document.querySelector(".weather-info")

const loading =
    document.querySelector(".loading")

const iconeClima =
    document.querySelector(".icone")

// =========================
// EVENTOS
// =========================

botao.addEventListener(
    "click",
    buscarCidade
)

input.addEventListener(
    "keypress",
    function(event){

        if(event.key === "Enter"){

            buscarCidade()
        }
    }
)

// =========================
// BUSCAR CIDADE
// =========================

async function buscarCidade(){

    const cidade =
        input.value.trim()

    // =========================
    // VALIDAÇÃO
    // =========================

    if(cidade === ""){

        loading.innerHTML =
            "Digite uma cidade"

        return
    }

    // =========================
    // LOADING
    // =========================

    loading.innerHTML =
        "Carregando..."

    weatherInfo.classList.add(
        "loading-weather"
    )

    botao.innerHTML =
        "Buscando..."

    // =========================
    // API
    // =========================

    const chave =
        "9b1143a7aacc99cba3d02c7319c1233d"

    try{

        const dados = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`
        ).then(
            resposta => resposta.json()
        )

        // =========================
        // CIDADE NÃO ENCONTRADA
        // =========================

        if(dados.cod == "404"){

            loading.innerHTML =
                "Cidade não encontrada"

            botao.innerHTML =
                "Buscar"

            weatherInfo.classList.remove(
                "loading-weather"
            )

            return
        }

        // =========================
        // LIMPA LOADING
        // =========================

        loading.innerHTML = ""

        // =========================
        // CIDADE
        // =========================

        document.querySelector(".cidade")
        .innerHTML =
            dados.name

        // =========================
        // TEMPERATURA
        // =========================

        document.querySelector(".temp")
        .innerHTML =
            Math.floor(
                dados.main.temp
            ) + "°C"

        // =========================
        // DESCRIÇÃO
        // =========================

        document.querySelector(".description")
        .innerHTML =
            dados.weather[0].description

        // =========================
        // ÍCONE
        // =========================

        const icone =
            dados.weather[0].icon

        iconeClima.src =
            `https://openweathermap.org/img/wn/${icone}@2x.png`

        iconeClima.style.opacity =
            "1"

        // =========================
        // UMIDADE
        // =========================

        document.querySelector(".umidade")
        .innerHTML =
            "💧 Umidade: " +
            dados.main.humidity + "%"

        // =========================
        // VENTO
        // =========================

        document.querySelector(".vento")
        .innerHTML =
            "🌬️ Vento: " +
            dados.wind.speed + " km/h"

        // =========================
        // REMOVE LOADING
        // =========================

        weatherInfo.classList.remove(
            "loading-weather"
        )

        // =========================
        // BOTÃO
        // =========================

        botao.innerHTML =
            "Buscar"

    }catch(erro){

        loading.innerHTML =
            "Erro ao buscar cidade"

        botao.innerHTML =
            "Buscar"

        weatherInfo.classList.remove(
            "loading-weather"
        )

        console.log(erro)
    }
}
