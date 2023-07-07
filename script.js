(function Gameboard () {
    let isWinnerAnnounced = false;
    let turn = 0;
    let boardArray = [];
    
    const winCombos = [ //win conditions 
        [0,1,2],
        [0,3,6],
        [3,4,5],
        [6,7,8],
        [1,4,7],
        [2,4,6],
        [2,5,8],
        [0,4,8]
    ];
    const grids = document.querySelectorAll(".grid");
    const resetButton = document.querySelector("#reset");

    const playerFactory = (name, mark) => {
        return {name, mark};
    }

    const player1 = playerFactory("player1", "X");
    const player2 = playerFactory("player2", "O");

    const placeEvent = () => {
        grids.forEach(element => {
            element.addEventListener("click", playRound);
        });
        resetButton.addEventListener("click", resetGame);
    }

    //winlogic: search thru winCombos[] if boardArray[] index mark is same with winCombos index, comboStrike++.
    //If comboStrike == 3, winner
    const checkWin = () => {
        let comboStrike = 0; //if combostrike become 3, win
        let currentMark = whoPlays().mark; 
        for(i = 0; i < winCombos.length; i++){
            for(x = 0; x < 4; x++){
                if(boardArray[winCombos[i][x]] == currentMark){
                    comboStrike++;
                    if(comboStrike == 3){
                        isWinnerAnnounced = true;
                        displayScreen.printWinner(whoPlays().name);
                    }
                }
            }
            comboStrike = 0;
        }
    }

    const playRound = (element) => {
        if(turn <= 8 && isWinnerAnnounced === false){
            let playerMark = placeMarker(element);
            if(playerMark !== undefined){
                boardArray[element.target.id] = playerMark;
                checkWin();
                turn ++;
                if(turn == 9 && isWinnerAnnounced === false){
                    displayScreen.populateScreen("Its tie.");
                }
            }
        }
        else {
            resetGame();
        }
    }
    
    //checks whose turn and places player mark in grid.if its already marked, passes
    //returns player mark (x,o)
    const placeMarker = (element) =>{
        if (element.target.innerHTML == ""){
            let player = whoPlays();
            element.target.innerHTML = player.mark;
            return player.mark;
        }
        else return;
    }

    //checks whose turn it is
    const whoPlays = () => {
        if (turn % 2 == 0){
            return player1;
        }
        else {
            return player2;
        }
    }

    const resetGame = () => {
        boardArray.length = 0;
        turn = 0;
        isWinnerAnnounced = false;
        grids.forEach(element => {
            element.innerHTML = "";
        });
        displayScreen.resetScreen();
    }
    placeEvent();
})();

const displayScreen = (() => {
    const screen = document.querySelector("#screen");
    const populateScreen = (text) => {
        screen.innerHTML += text;
    }
    const printWinner = (winnerName) => {
        screen.innerHTML = `Winner is: ${winnerName}.`;
    }
    const resetScreen = () => {
        screen.innerHTML = "";
    }
    return{printWinner,resetScreen,populateScreen};
})();
