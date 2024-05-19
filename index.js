const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions =[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,,4,6]
];

// let's initialize the game   

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    newGameBtn.classList.remove("active");
    // UI par empty karega box
    boxes.forEach((box, index) => {
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        // one more thing is missing, initialise the box properties
        box.classList = ` box box${index+1}`;

    });
   
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer == "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

function checkgameOver() {
    let winner = "";
    
    winningPositions.forEach((position) =>{
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            
            if(gameGrid[position[0]]==="X")
                winner = "X";
            else
                winner = "O";

            // diable the pointer events    
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })  

            // now winner is X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(winner !== ""){
        gameInfo.innerText =`Winner Player - ${winner}`;
        newGameBtn.classList.add("active"); 
        return;   
    }

    // when there is no winner
    let fillcount = 0;
    gameGrid.forEach((box) =>{
        if(box !== "")
            fillcount++;
    });

    //no winner - board is filled , game is TIE
    if(fillcount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");    
    }

}

function handleClick(index){
    if(gameGrid[index] == ""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index] = currentPlayer
        boxes[index].style.pointerEvents = "none";
        //swap the turn
        swapTurn();
        // check karo koi jeet to nahi gaya
        checkgameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click",() =>{
        handleClick(index);
    })
});

 newGameBtn.addEventListener("click",initGame);
