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
        alert("Você venceu!")
    }
}