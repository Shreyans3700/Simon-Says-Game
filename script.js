let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let btns = ["red","green","blue","orange"];

let h3 = document.querySelector("h3");

document.addEventListener("keypress",function(){
    if (started==false){
        started = true;
        console.log("Game Started.");
        levelUp();
    }
})

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250)
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250)
}

function levelUp(){
    userSeq = [];
    level++;
    // display which level you're on.
    h3.innerText = `Level ${level}`;

    //generate a random color
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];

    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx,randColor,randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function checkSequence(idx){

    if(userSeq[idx]==gameSeq[idx]){
        // console.log("Same value");
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h3.innerHTML = `Game Over! Your score was ${level} <br> Press any key to start again`;
        document.querySelector("body").classList.add("wrongFlash");
        setTimeout(function(){
            document.querySelector("body").classList.remove("wrongFlash");
        },200);
        reset();
    }
}

function buttonPress(){
    // console.log(this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);
    checkSequence(userSeq.length-1);
}

let allBtn = document.querySelectorAll(".btn")
for (btn of allBtn){
    btn.addEventListener("click",buttonPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}