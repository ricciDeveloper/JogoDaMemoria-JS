const emojis = [
    "🍕",
    "🍕",
    "🍔",
    "🍔",
    "🍟",
    "🍟",
    "🌭",
    "🌭",
    "🥓",
    "🥓",
    "🧀",
    "🧀",
    "🍖",
    "🍖",
    "🥩",
    "🥩"
  
];
const state = {
    view:{
        timeLeft: document.querySelector("#time-left"),
        level: document.querySelector("#level") ,// Exibe o nível no DOM
    },
    values: {
        currentTime: 60,
        level: 1,
        speedMultpilier: 1,
    },
    action: {
        countDownTimerId: null //armazenar o ID do intervalor
    }
}
let openCards = [];

//Aleatorizador dos emojis, utilizando if ternário para randomizar o peso de cada item do array, assim, garantindo a aleatoridade.
function shuffleArray(array){
    return array.sort(() => (Math.random() > 0.5 ? 2 : -1));
}
let shuffleEmojis = shuffleArray(emojis);
function initializeBoard(){
    const gameContainer = document.querySelector(".game");
    gameContainer.innerHTML = "";
    shuffleEmojis = shuffleArray(emojis);
    shuffleEmojis.forEach(emoji => {
        const box = document.createElement("div");
        box.className = "item";
        box.innerHTML = emoji;
        box.onclick = handleClick;
        gameContainer.appendChild(box);
    })
}

function handleClick(){
    if (openCards.length<2){
        this.classList.add("boxOpen");
        openCards.push(this);
    }
    if(openCards.length === 2){
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (openCards.length === 2) {
        if (openCards[0]?.innerHTML === openCards[1]?.innerHTML) {
            openCards[0].classList.add("boxMatch");
            openCards[1].classList.add("boxMatch");
        } else {
            openCards[0].classList.remove("boxOpen");
            openCards[1].classList.remove("boxOpen");
        }
        openCards = [];

        // Verificar condição de vitória
        if (document.querySelectorAll(".boxMatch").length === emojis.length) {
            clearInterval(state.action.countDownTimerId); // Parar o temporizador
            alert("Você venceu!");
            advanceLevel(); // Avançar o nível após a vitória
        }
    }
}



//função para incializar o tempo restante e atualizar a interface
function initializeTimer(){
    state.values.currentTime = Math.max(20,60 - state.values.level *2);//tempo incial em segundos
    state.view.timeLeft.textContent = state.values.currentTime; //Atualizar o DOM
}

//função para inciar o temporizador
function startTimer(){
    state.action.countDownTimerId = setInterval(countDown,1000 / state.values.speedMultpilier);//atualizar a cada segundo
}

//função para avanço de nível no jogo
function advanceLevel() {
    // Avança para o próximo nível
    state.values.level++;
    // Acelera o tempo em 0.5x a cada nível
    state.values.speedMultpilier += 0.5;
    alert(`Bem-vindo ao level: ${state.values.level}`);
    // Atualiza o nível no DOM
    state.view.level.textContent = `Level: ${state.values.level}`;

    // Reinicia o tabuleiro
    resetBoard();

    // Reinicia o jogo para o próximo nível
    initializeTimer();
    startTimer();
}


//função para decrementar o tempo de jogo (contagem regressiva)
function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    //Verificação se o tempo acabou
    if(state.values.currentTime <= 0){
        clearInterval(state.action.countDownTimerId);
        alert(`GAME OVER! Você alcançou o nível ${state.values.level}` );
        //reiniciar o jogo
        window.location.reload();
    }
}
//Função para resetar os cards e embaralhar novamente
function resetBoard(){
    //limpa o estado das cartas abertas
    openCards = [];
    initializeBoard();
}
//chamar o início do jogo ao carregar a página
document.addEventListener("DOMContentLoaded", ()=> {
    initializeBoard();
    initializeTimer();
    startTimer();
})