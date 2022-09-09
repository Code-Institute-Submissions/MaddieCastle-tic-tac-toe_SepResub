// Adds event listeners to game board buttons and the reset button.
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementById('game-board').getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function() {
           playerMove(button);
        })
        }
    document.getElementById('reset').addEventListener("click", function() {
        resetBoard();
    });
})


/**
 * Checks the turn number by counting the number of moves already taken.
 */
function checkTurn() {
    let turnNumber= 0;
    let board = document.getElementById('game-board').getElementsByTagName('button');
    for (square of board) {
        if (square.textContent) {
            turnNumber++
        }
    }
    return turnNumber;
}

/**
 * Adds the players move to the board, then calls checkForWinner() and computerMove().
 * Checks that the square that the player clicked on is empty, and that it is the players turn.
 */
function playerMove(button) {
    if (this.textContent) {
        return;
    }
    if (checkTurn() % 2 !== 0) {
        return;
    }
    button.textContent = 'x';
    checkForWinner('x');
    computerMove();
    
}

/**
 * Resets the board, removing all moves. Does not reset scoreboard.
 */
function resetBoard() {
    let squares = document.getElementById('game-board').getElementsByTagName('button');
            for (square of squares) {
                square.textContent = '';
            }
}

/**
 * Updates the scoreboard counters.
 * Parameter is the winner detemined in checkForWinner().
 */
function counterUpdate(winner) {
    if (winner === 'x') {
         document.getElementById('wins').textContent++
    } else if (winner === 'o') {
        document.getElementById('losses').textContent++
    } else {
        document.getElementById('draws').textContent++
    }
}

/**
 * Checks for a winner.
 * Tests each possible game winning state then updates the scoreboard, displays an alert, and resets the board.
 * Parameter passed to it is whoever made the last move.
 */
function checkForWinner(player) {
    let winStates = ['top', 'middle', 'bottom', 'left', 'center', 'right']
    let diagonal1 = ['top left', 'middle center', 'bottom right'];
    let diagonal2 = ['top right', 'middle center', 'bottom left'];
    let testState = '';

    // Tests each row and column for a winner.
    for (state of winStates) {
        testState = '';
        for (square of document.getElementsByClassName(state)) {
            testState = testState + square.textContent;
        }
        if (testState === player + player + player) {
            let winMessage = '';
            player === 'x' ? winMessage = 'Congratulations, you won!' 
                            : winMessage = 'You lost, better luck next time!';
            counterUpdate(player);
            window.alert(winMessage);
            resetBoard();
        }
    }
    testState = '';
    // Tests top left to bottom right diagonal for winner.
    for (space of diagonal1) {
        let square = document.getElementsByClassName(space)[0];
        if (!square.textContent) {
            moveHere = square;
        }
        testState = testState + square.textContent;
    }
    if (testState === player + player + player) {
        let winMessage = '';
        player === 'x' ? winMessage = 'Congratulations, you won!' 
                        : winMessage = 'You lost, better luck next time!';
        counterUpdate(player);
        window.alert(winMessage);
        resetBoard();
    }
    testState = '';

    // Tests top right to bottom left diagonal for winner.
    for (space of diagonal2) {
        let square = document.getElementsByClassName(space)[0];
        if (!square.textContent) {
            moveHere = square;
        }
        testState = testState + square.textContent;
    }
    if (testState === player + player + player) {
        let winMessage = '';
        player === 'x' ? winMessage = 'Congratulations, you won!' 
                        : winMessage = 'You lost, better luck next time!';
        counterUpdate(player);
        window.alert(winMessage);
        resetBoard();
    }

    // Checks if there is a draw.
    if (checkTurn() === 9) {
        counterUpdate();
        window.alert("It's a draw!");
        resetBoard();
    }

}

/**
 * Adds the computers moves to the board, checks for a winner after each move.
 * Calls checkForAlmostWinner() to check for winning moves and block the player.
 */
function computerMove() {
    let turnNumber = checkTurn();

    // Decides and adds to the board computers first move.
    if (turnNumber === 1) {
         if (document.getElementsByClassName('middle center')[0].textContent) {
            document.getElementsByClassName('top left')[0].textContent = 'o';
         }
         else {
            document.getElementsByClassName('middle center')[0].textContent = 'o';
         }
    }
    else if (checkTurn() !== 0) {

        // Adds computer move to square returned from checkAlmostWinner().
        let move = checkForAlmostWinner();
        if (move) {
            move.textContent = 'o';
            checkForWinner('o');
            return;
        } else {

            // Adds computer move to first empty board square.
            let squares = document.getElementsByTagName('button');
            for (square of squares) {
                if (!square.textContent) {
                    square.textContent = 'o';
                    checkForWinner('o');
                    return;
                }
            }
        }
    }
}

/**
 * Checks for one side being one move away from winning.
 * Tests every game winning state for someone one move away from winning,
 * then passes that square to computerMove()
 */
function checkForAlmostWinner() {
    let winStates = ['top', 'middle', 'bottom', 'left', 'center', 'right']
    let players = ['oo', 'xx'];
    let moveHere;
    let diagonal1 = ['top left', 'middle center', 'bottom right'];
    let diagonal2 = ['top right', 'middle center', 'bottom left'];
    let testState = '';

    // Repeats all tests for each player.
    for (player of players) {

        // Tests every row and column for winning game states.
        for (state of winStates) {
            testState = '';
            for (square of document.getElementsByClassName(state)) {
                if (!square.textContent) {
                    moveHere = square;
                }
                testState = testState + square.textContent;
            }
            if (testState === player) {
                return moveHere;
            }
        }
        testState = '';

        // Tests the top left to bottom right diagonal for winning game states.
        for (space of diagonal1) {
            let square = document.getElementsByClassName(space)[0];
            if (!square.textContent) {
                moveHere = square;
            }
            testState = testState + square.textContent;
        }
        if (testState === player) {
            return moveHere;
        }
        testState = '';

        // Tests the top right to bottom left diagonal for winning game states.
        for (space of diagonal2) {
            let square = document.getElementsByClassName(space)[0];
            if (!square.textContent) {
                moveHere = square;
            }
            testState = testState + square.textContent;
        }
        if (testState === player) {
            return moveHere;
        }
    }
}