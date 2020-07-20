let wdw = document.getElementById('window')  // window -> espaço em branco
let ttl = document.getElementById('title')  // title
let btn = document.getElementById('start')   // button
let countPlayer = 1
let countRound = 0
let countPoints = 0
let players = []
let points = []
var data = []

let numberOfPlayers = function(){
    let txtP = document.getElementById('manyPlayers')
    let p = Number(txtP.value)
    data.push(txtP.value)
    numberOfPlayers = p
}

function start(){
    // How many players?
    // mudando o titulo
    ttl.innerHTML = 'Quantos Jogadores?'

    // adicionando caixa de texto e novo botão
    wdw.innerHTML = `<input type="number" name="manyPlayers" id="manyPlayers">`
    wdw.innerHTML += `<input type="button" value="Confirmar" id="confirm" onclick="confirm()">`
}

function confirm(){
    numberOfPlayers()

    // mudando o titulo
    ttl.innerHTML = `${data[0]} jogadores, tem certeza?`

    // adicionando botoes
    wdw.innerHTML = `<input type="button" value="Sim" id="yes" onclick="fillNames()">`
    wdw.innerHTML += `<input type="button" value="Não" id="no" onclick="document.location.reload()">`
}

function fillNames(){
    // adicionando a textbox e botao
    wdw.innerHTML = `<input type="text" name="namePlayers" id="namePlayers">`
    wdw.innerHTML += `<input type="button" value="Próximo" id="next" onclick="next()">`

    // mudando titulo
    ttl.innerHTML = `Preencha abaixo com o nome do ${countPlayer}º jogador`
}

function next(){
    let txtN = document.getElementById('namePlayers')
    data.push(txtN.value)
    players.push(txtN.value)
    points.push(0)
    countPlayer++
    if (countPlayer <= numberOfPlayers){
        fillNames()
    }else{
        // mudando titulo
        ttl.innerHTML = "Tudo pronto!"

        // adc botao
        wdw.innerHTML = `<input type="button" value="Jogar" id="play" onclick="round()">`
    }
}

function round(){
    if (countRound == 0){
        localStorage.setItem("teste2", JSON.stringify(data))
        countRound++
        inGame()
    }else{
        countRound++
        // mudando titulo
        ttl.innerHTML = 'Esse foi a última rodada?'

        // adc botoes
        wdw.innerHTML = `<input type="button" value="Sim" id="yes" onclick="seeWinners()">`
        wdw.innerHTML += `<input type="button" value="Não" id="no" onclick="inGame()">`
    }
}

function inGame(){
    // mudando titulo
    ttl.innerHTML = `Preencha abaixo com os pontos do(a) ${players[countPoints]}`

    // adc numberbox
    wdw.innerHTML = `<input type="number" name="playerPoints" id="playerPoints">`
    wdw.innerHTML += `<input type="button" value="Adicionar" id="add" onclick="add()">`
}

function add(){
    let txtPP = document.getElementById('playerPoints')
    let PP = Number(txtPP.value)

    // add the value to the string
    points[countPoints] += PP

    // incrementa o contador
    countPoints++
    if (countPoints >= players.length){
        countPoints = 0
        round()
    }else{
        inGame()
    }
}

function seeWinners(){  // criar tela pra vencedor
    let sortedPlayers = []
    let sortedPoints = []
    let maxPoints = null
    let topPlayer = null

    for (let i = 0; i < numberOfPlayers; i++){
        for (let j = 0; j < numberOfPlayers; j++){
            if (j == 0){
                maxPoints = points[j]
                topPlayer = players[j]
            }else{
                if (points[j] < maxPoints){
                    maxPoints = points[j]
                    topPlayer = players[j]
                }
            }
        }
        sortedPlayers.push(topPlayer)
        sortedPoints.push(maxPoints)
        players.splice(players.indexOf(topPlayer), 1)
        points.splice(points.indexOf(maxPoints), 1)
    }

    wdw.style.flexDirection = "column";

    for (let i = 0; i < numberOfPlayers; i++){
        if (i == 0){
            wdw.innerHTML = `<p id="first">${i + 1}º -> ${sortedPlayers[i]} com ${sortedPoints[i]} pontos</p>`
        }else if (i == 1){
            wdw.innerHTML += `<p id="second">${i + 1}º -> ${sortedPlayers[i]} com ${sortedPoints[i]} pontos</p>`
        }else if (i == 2){
            wdw.innerHTML += `<p id="third">${i + 1}º -> ${sortedPlayers[i]} com ${sortedPoints[i]} pontos</p>`
        }else{
            wdw.innerHTML += `<p id="rest">${i + 1}º -> ${sortedPlayers[i]} com ${sortedPoints[i]} pontos</p>`
        }
    }
    

}