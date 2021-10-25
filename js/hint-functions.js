var previousClue = false;

function findNextStep() {
    if (checkIfWrongAnswers()) {
        clueText.innerHTML = "You have some incorrect answers. Review your grid or press \"Check Answers\" to see the incorrect cells."
        cluePopup.classList.remove("hidden-popup");
        showClueButton.classList.remove("invisible-text")
        showClueButton.innerHTML = "Hide Clue"
        previousClue = "Wrong Answers"
        return;
    }
    puzzle = combineUserAndPuzzleGrids();
    updateCandidatesGridForPuzzle();
    var single = findSingleCandidateCell()
    if (single) {
        var id = String(single.xIndex) + String(single.yIndex);
        var cellDiv = document.getElementById(id);
        if (previousClue === "Single") {
            cellDiv.classList.add('hint-cell')
            previousClue = single;
            clueText.innerHTML = "There is a \"Single\" at the highlighted location. A single is a cell with only one candidate. Press \"Get Clue\" again to fill the cell."
            return;
        } else if (JSON.stringify(previousClue) === JSON.stringify(single)) {
            showAndHideClue()
            cellDiv.classList.remove("empty-cell", "wrong-cell", "hint-cell");
            cellDiv.classList.add("filled-cell");
            userGrid[single.yIndex][single.xIndex] = parseInt(single.candidate)
            userCandidatesGrid[single.yIndex][single.xIndex] = 0;
            puzzleCandidates = createCopyOfMultidimensionalArray(userCandidatesGrid);
            changeCandidatesGridAfterFill(single.xIndex, single.yIndex, userGrid[single.yIndex][single.xIndex]);
            userCandidatesGrid = createCopyOfMultidimensionalArray(puzzleCandidates);
            resetPuzzleDisplay()
            previousClue = false;
            clueText.innerHTML = "You do not have any current clues."
            localStorage.setItem("userGrid", JSON.stringify(userGrid));
            localStorage.setItem("userCandidatesGrid", JSON.stringify(userCandidatesGrid));
            return;
        } else {
            clueText.innerHTML = "There is at least one \"Single\" available. A single is a cell with only one candidate. Press \"Get Clue\" again to see its location."
            cluePopup.classList.remove("hidden-popup");
            showClueButton.classList.remove("invisible-text")
            showClueButton.innerHTML = "Hide Clue"
            previousClue = "Single"
            return;
        }
        
    }
    var loneRanger = findSingleOptionRequirement();
    if (loneRanger) {
        var id = String(loneRanger.xIndex) + String(loneRanger.yIndex);
        var cellDiv = document.getElementById(id);
        if (previousClue === "Lone Ranger") {
            cellDiv.classList.add('hint-cell')
            previousClue = loneRanger;
            clueText.innerHTML = "There is a \"Lone Ranger\" at the highlighted location. A lone ranger is a candidate that can only go in one cell in a group. Press \"Get Clue\" again to fill the cell."
            return;
        } else if (JSON.stringify(previousClue) === JSON.stringify(loneRanger)) {
            showAndHideClue()
            cellDiv.classList.remove("empty-cell", "wrong-cell", "hint-cell");
            cellDiv.classList.add("filled-cell");
            userGrid[loneRanger.yIndex][loneRanger.xIndex] = parseInt(loneRanger.candidate)
            userCandidatesGrid[loneRanger.yIndex][loneRanger.xIndex] = 0;
            puzzleCandidates = createCopyOfMultidimensionalArray(userCandidatesGrid);
            changeCandidatesGridAfterFill(loneRanger.xIndex, loneRanger.yIndex, userGrid[loneRanger.yIndex][loneRanger.xIndex]);
            userCandidatesGrid = createCopyOfMultidimensionalArray(puzzleCandidates);
            resetPuzzleDisplay()
            previousClue = false;
            clueText.innerHTML = "You do not have any current clues."
            localStorage.setItem("userGrid", JSON.stringify(userGrid));
            localStorage.setItem("userCandidatesGrid", JSON.stringify(userCandidatesGrid));
            return;
        } else {
            clueText.innerHTML = "There is at least one \"Lone Ranger\" available. A lone ranger is a candidate that can only go in one cell in a group. Press \"Get Clue\" again to see its location."
            cluePopup.classList.remove("hidden-popup");
            showClueButton.classList.remove("invisible-text")
            showClueButton.innerHTML = "Hide Clue"
            previousClue = "Lone Ranger"
            return;
        }
    }
    var invalidCandidates = returnCellsWithTooManyCandidates()
    if (invalidCandidates.length) {
        if (previousClue == "Invalid Candidates") {
            invalidCandidates.forEach(invalidCandidateCell => {
                var id = String(invalidCandidateCell[0]) + String(invalidCandidateCell[1])
                document.getElementById(id).classList.add("hint-cell");
                clueText.innerHTML = "The highlighted cells have invalid candidates. Review them, or select \"Get Clue\" again to remove them."
            })
            previousClue = invalidCandidates;
            return;
        } else if (JSON.stringify(previousClue) == JSON.stringify(invalidCandidates)) {
            invalidCandidates.forEach(invalidCandidateCell => {
                var x = invalidCandidateCell[0];
                var y = invalidCandidateCell[1];
                var candidate = invalidCandidateCell[2];
                console.log(x, y, candidate)
                var id = String(x) + String(y)
                document.getElementById(id).classList.remove("wrong-cell", "hint-cell");
                userCandidatesGrid[y][x].splice(userCandidatesGrid[y][x].indexOf(candidate), 1)
                if (userCandidatesGrid[y][x].length == 0) {
                    userCandidatesGrid[y][x] = 0;
                }
            })
            resetPuzzleDisplay()
            clueText.innerHTML = "You do not have any current clues."
            localStorage.setItem("userCandidatesGrid", JSON.stringify(userCandidatesGrid));
            previousClue = false;
        } else {
            clueText.innerHTML = "You have invalid candidates in your grid. Review them, or select \"Get Clue\" again to see their locations."
            cluePopup.classList.remove("hidden-popup");
            showClueButton.classList.remove("invisible-text")
            showClueButton.innerHTML = "Hide Clue"
            previousClue = "Invalid Candidates";
            return;
        }
    }
    
}


function combineUserAndPuzzleGrids() {
    var combinedArray = createCopyOfMultidimensionalArray(currentPuzzle);
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x ++) {
            if (userGrid[y][x]) {
                combinedArray[y][x] = userGrid[y][x];
            }
        }
    }
    return combinedArray
}


function checkIfWrongAnswers() {
    var wrongAnswer = false;
    checkIfSolvable(currentPuzzle);
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (userGrid[y][x] && userGrid[y][x] !== puzzle[y][x]) {
                wrongAnswer = true;
            }
        }
    }
    return wrongAnswer;
}


function returnCellsWithTooManyCandidates() {
    var invalidCandidateCells = new Array;
    userCandidatesGrid.forEach((row, y) => {
        row.forEach((cellCandidates, x) => {
            if (cellCandidates) {
                cellCandidates.forEach(candidate => {
                    if (!puzzleCandidates[y][x].includes(candidate)) {
                        invalidCandidateCells.push([x, y, candidate]);
                    }
                })
            }
        })
    })
    return invalidCandidateCells;
}

