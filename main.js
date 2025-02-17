let computerNum = 0
let playButton = document.getElementById("play-button")
let userInput = document.getElementById("user-input")
let resultArea = document.getElementById("result-area")
let resetButton = document.getElementById("reset-button")
let chances = 3
let gameOver = false
let chanceArea = document.getElementById("chance-area")
let history = []
let answer = document.getElementById("answer")
let historyArea = document.getElementById("history-area")

playButton.addEventListener("click", play)
resetButton.addEventListener("click", reset)
userInput.addEventListener("focus", function () {
    userInput.value = "";
})
answer.addEventListener("mouseenter", function () {
    answer.textContent = `${computerNum}`; // 호버 시 정답 노출
})
answer.addEventListener("mouseleave", function () {
    answer.textContent = "정답 확인(hover)"; // 마우스 떼면 다시 숨김
});


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
    chanceArea.textContent = `LEFT CHANCE : ${chances} !!`


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
    historyArea.textContent = `history : ${history}`

    if (chances < 1) {
        if(userValue !== computerNum){
        gameOver = true;
        resultArea.textContent = "GAME OVER"}
        if(userValue == computerNum){
            gameOver = true;
            resultArea.textContent = "BINGO!!"}
    }

    if (gameOver == true) {
        playButton.disabled = true;
    }
}


function reset() {
    userInput.value = "";
    pickRandomNum();

    chances = 3;
    history = [];
    gameOver = false;

    resultArea.textContent = "UP OR DOWN"
    chanceArea.textContent = `CHANCE : ${chances} !!`;
    historyArea.textContent = `history ${history}`

    playButton.disabled = false;

}
pickRandomNum();