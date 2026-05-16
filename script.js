const botao = document.querySelector("button")

const input = document.querySelector("#cidade")


botao.addEventListener("click", buscarCidade)

input.addEventListener("keypress", function(event){

  if(event.key === "Enter"){

    buscarCidade()

  }

})

async function buscarCidade() {
    document.querySelector(".loading").innerHTML =
  "Carregando..."

  const cidade = document.querySelector("#cidade").value

  const chave = "9b1143a7aacc99cba3d02c7319c1233d"

  const dados = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`
  ).then(resposta => resposta.json())

  console.log(dados)

  document.querySelector(".loading").innerHTML = ""

  document.querySelector(".cidade").innerHTML = dados.name

document.querySelector(".temp").innerHTML =
  Math.floor(dados.main.temp) + "°C"

document.querySelector(".description").innerHTML =
  dados.weather[0].description

  const icone = dados.weather[0].icon

  const clima = dados.weather[0].main

document.querySelector(".icone").src =
  `https://openweathermap.org/img/wn/${icone}@2x.png`

document.querySelector(".umidade").innerHTML =
  "💧 Umidade: " + dados.main.humidity + "%"

document.querySelector(".vento").innerHTML =
  "🌬️ Vento: " + dados.wind.speed + " km/h"
}

