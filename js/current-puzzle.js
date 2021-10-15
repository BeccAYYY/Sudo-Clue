
function getCurrentPuzzle() {
    if (localStorage.getItem("currentPuzzle") == null) {
        localStorage.setItem("currentPuzzle", false) 
    }
    if (localStorage.getItem("currentPuzzle")) {
        var puzzleString = localStorage.getItem("currentPuzzle");
        currentPuzzle = new Array;
        var i = 0;
        for (let y = 0; y < 9; y++) {
            currentPuzzle.push([])
            for (let x = 0; x < 9; x++) {
                currentPuzzle[y].push(parseInt(puzzleString[i]));
                i++
            }
        }
    } else {
        currentPuzzle = false;
    }
    return currentPuzzle;
}

function turnPuzzleToString(puzzle) {
    var puzzleString = "";
    puzzle.forEach(row => {
        row.forEach(cell => {
            puzzleString += cell;
        })
    });
    return puzzleString;
}

function continueGame() {
    if (inProgressGame) {
        //check game matches database
    } else if (currentPuzzle) {
        displayPuzzle()
        inProgressGame = true;
        //Display filled squares and candidates
    } else {
        alert("Error")
        //display error message for "In-Progress Game could not be found, start a new game?"
    }
    startTimer()
}

function newGame() {
    getSuccessfulSolution();
    currentPuzzle = createPuzzleFromSolution();
    saveCurrentPuzzleToLocalStorage();
    displayPuzzle();
    inProgressGame = true;
    timerValue = 0;
    startTimer();
}

function startTimer() {
    if (pause) {
        pause = false;
        timer.innerHTML = formatTimer()
        var interval = setInterval(() => {
            timer.innerHTML = formatTimer()
            timerValue++
            if (pause) {
                clearInterval(interval)
            }
        }, 1000);
    }
}

