let computerNum = 0
let playButton = document.getElementById("play-button")
let userInput = document.getElementById("user-input")
let resultArea = document.getElementById("result-area")
let resetButton = document.getElementById("reset-button")
let chances = 5
let gameOver = false
let chanceArea = document.getElementById("chance-area")
let history = []


playButton.addEventListener("click", play)
resetButton.addEventListener("click", reset)
userInput.addEventListener("focus", function () {
    userInput.value = "";
})

function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100)+1;
        console.log("정답", computerNum);
}

function play() {
    let userValue = userInput.value;
    let demicalPoint = userValue % 1

    if (userValue < 1 || userValue > 100) {
        resultArea.textContent = "1부터 100사이 숫자만 입력 가능합니다."
        return;
    }
    
    if (demicalPoint !== 0) {
        resultArea.textContent = "소수점 입력 불가. 정수만 입력 가능합니다."
        return;
    }

    if (history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다."
        return;
    }

    chances--;
    chanceArea.textContent = `CHANCE : ${chances}`


    if (userValue < computerNum) {
        resultArea.textContent = "UP"
    } else if (userValue > computerNum) {
        resultArea.textContent = "DOWN"
    } else {
        resultArea.textContent = "BINGO"
        gameOver = true;
    }

    history.push(userValue);
    console.log(history);

    if (chances < 1) {
        gameOver = true;
    }

    if (gameOver == true) {
        playButton.disabled = true;
    }
}


function reset() {
    userInput.value = "";
    pickRandomNum();

    chances = 5;
    history = [];
    gameOver = false;

    resultArea.textContent = "UP OR DOWN"
    chanceArea.textContent = `CHANCE : ${chances}`;

    playButton.disabled = false;
    
}
pickRandomNum();