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

let openCards = [];

//Aleatorizador dos emojis, utilizando if ternário para randomizar o peso de cada item do array, assim, garantindo a aleatoridade.
let shuffleEmojis = emojis.sort(()=>(Math.random() > 0.5 ? 2 : -1));

for(let i = 0; i < emojis.length; i++){
    //aqui criamos dinamicamente a div pelo JS
    let box = document.createElement("div");
    //nomeando a div criada
    box.className = "item";
    //inserindo os itens na div
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
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

function checkMatch(){
    if ( openCards[0].innerHTML === openCards[1].innerHTML){
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }
    openCards = [];

    if(document.querySelectorAll(".boxMatch").length === emojis.length){
        clearInterval(state.action.countDownTimerId);// Parar o temporizador
        alert("Você venceu!");
        window.location.reload();//reiniciar o jogo
    }
}

const state = {
    view:{
        timeLeft: document.querySelector("#time-left")
    },
    values: {
        currentTime: 60
    },
    action: {
        countDownTimerId: null //armazenar o ID do intervalor
    }
}
//função para incializar o tempo restante e atualizar a interface
function initializeTimer(){
    state.values.currentTime = 60;//tempo incial em segundos
    state.view.timeLeft.textContent = state.values.currentTime; //Atualizar o DOM
}

//função para inciar o temporizador
function startTimer(){
    state.action.countDownTimerId = setInterval(countDown,1000);//atualizar a cada segundo
}



//função para decrementar o tempo de jogo (contagem regressiva)
function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    //Verificação se o tempo acabou
    if(state.values.currentTime <= 0){
        clearInterval(state.action.countDownTimerId);
        clearInterval(state.action.timerId);
        alert("GAME OVER! Seu resultado foi: " + state.values.result);
        //reiniciar o jogo
        window.location.reload();
    }
}

//chamar o início do jogo ao carregar a página
document.addEventListener("DOMContentLoaded", ()=> {
    initializeTimer();
    startTimer();
})