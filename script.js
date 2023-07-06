(function Gameboard () {
    let turn = 0;
    let boardArray = [];
    const playerFactory = (name, mark) => {
        return {name, mark};
    }

    const player1 = playerFactory("player1", "X");
    const player2 = playerFactory("player2", "O");
    const placeEvent = () => {
        const grids = document.querySelectorAll(".grid");
        grids.forEach(element => {
            element.addEventListener("click", playRound);
        });
    }

    const playRound = (element) => {
        if(turn <= 8){
            let playerMark = placeMarker(element);
            if(playerMark !== undefined){
                boardArray[element.target.id] = playerMark;
                console.log(boardArray);
            }
            
            console.log(boardArray);
            console.log(turn);
        }
        else {
            //PLACE TIE OR RESET GAME CODE HERE
        }
    }
    
    //checks whose turn and places player mark in grid.if its already marked, passes
    //returns player mark (x,o)
    const placeMarker = (element) =>{
        if (element.target.innerHTML == ""){
            let player = whoPlays();
            turn ++;
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

    placeEvent();
})();
