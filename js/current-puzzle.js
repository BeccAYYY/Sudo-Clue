
function getCurrentPuzzle() {
    if (localStorage.getItem("currentPuzzle") == null) {
        localStorage.setItem("currentPuzzle", false) 
    }
    if (localStorage.getItem("currentPuzzle")) {
        currentPuzzle = JSON.parse(localStorage.getItem("currentPuzzle"));
    } else {
        currentPuzzle = false;
    }
    return currentPuzzle;
}

function getUserGrid() {
    if (localStorage.getItem("userGrid") == null) {
        localStorage.setItem("userGrid", JSON.stringify(returnEmptyGrid())) 
    }
    userGrid = JSON.parse(localStorage.getItem("userGrid"));
    return userGrid;
}

function getUserCandidatesGrid() {
    if (localStorage.getItem("userCandidatesGrid") == null) {
        localStorage.setItem("userCandidatesGrid", JSON.stringify(returnEmptyGrid())) 
    }
    userCandidatesGrid = JSON.parse(localStorage.getItem("userCandidatesGrid"));
    return userCandidatesGrid;
}

function getMinimumClues() {
    if (localStorage.getItem("minimumClues") == null) {
        localStorage.setItem("minimumClues", 40) 
    }
    var minimumClues = localStorage.getItem("minimumClues");
    return minimumClues;
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
    userGrid = returnEmptyGrid();
    localStorage.setItem("userGrid", JSON.stringify(userGrid));
    userCandidatesGrid = returnEmptyGrid();
    localStorage.setItem("userCandidatesGrid", JSON.stringify(userCandidatesGrid));
    saveCurrentPuzzleToLocalStorage();
    displayPuzzle();
    inProgressGame = true;
    timerValue = 0;
    startTimer();
    userGridHistory = new Array;
    userCandidatesGridHistory = new Array;
}

var interval;
function startTimer() {
    if (pause) {
        pause = false;
        timer.innerHTML = formatTimer()
        interval = setInterval(() => {
            if (pause) {
                clearInterval(interval)
            }
            timerValue++
            localStorage.setItem("timerValue", timerValue)
            timer.innerHTML = formatTimer()
        }, 1000);
    }
}


function checkAnswers() {
    checkIfSolvable(currentPuzzle)
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (userGrid[y][x] && userGrid[y][x] !== puzzle[y][x]) {
                var id = String(x) + String(y)
                document.getElementById(id).classList.add("wrong-cell")
                setTimeout((id) => document.getElementById(id).classList.remove("wrong-cell"), 10000, id)
            }
        }
    }
}

