var cells = document.querySelectorAll('.cell');


cells.forEach(element => {
    element.addEventListener('click', () => {highlightCell(element)})
})

function highlightCell(element) {
    highlightedCell = element.id;
    var x = element.id[0];
    var y = element.id[1];
    var column = "column-" + x;
    var row = "row-" + y;
    var square = element.parentNode.id;
    var value = parseInt(element.innerHTML)
    cells.forEach(cell => {
    //Remove all style classes from cells
        cell.classList.remove('pink', 'lighter-pink', 'blue', 'light-blue', 'zoom');
        if (cell.classList.contains(column) || cell.classList.contains(row) || cell.classList.contains(square)) {
            cell.classList.add("light-blue")
        } else if ((value && value == cell.innerHTML)) {
            cell.classList.add("lighter-pink")
        }
    })
    if (!element.classList.contains("puzzle-part")) {
    //if clicked cell is not a part of the puzzle (user-editable cell)
        element.classList.add('zoom', 'blue')
        if (element.classList.contains("filled-cell")) {
        //if element is filled by user 
            document.querySelectorAll("button").forEach(button =>  {
                button.classList.remove("disabled", "not-candidate", "blue")
                if (element.innerHTML == button.innerHTML) {
                //button is blue if filled cell value matched button
                    button.classList.add("blue");
                }
            })
            if (candidatesUpdate) {
                document.querySelectorAll("button").forEach(button =>  {
                    button.classList.add("not-candidate")
                })
            }
        } else if (element.classList.contains("empty-cell")) {
        //if element is empty
            document.querySelectorAll("button").forEach(button =>  {
                button.classList.remove("disabled", "not-candidate", "blue")
            })
            var candidates = userCandidatesGrid[y][x]
            if (candidatesUpdate) {
                if (candidates) {
                    document.querySelectorAll("button").forEach(button =>  {
                        if (candidates.includes(parseInt(button.innerHTML))) {
                            button.classList.add("blue")
                        }
                    })
                }
            } else if (candidates) {
                document.querySelectorAll("button").forEach(button =>  {
                    if (!candidates.includes(parseInt(button.innerHTML))) {
                        button.classList.add("not-candidate")
                    }
                })
            }
        }
    } else {
    //if clicked cell is part of the puzzle
        element.classList.add('pink')
        document.querySelectorAll("button").forEach(button =>  {
            button.classList.remove("blue", "not-candidate")
            button.classList.add("disabled");
        })
    }
    
}


var candidatesDivString = `
<div class='candidates-div row m-0 p-0 g-0 justify-items-stretch'>
    <div class="col-4 p-0 g-0 d-flex align-items-center justify-content-center invisible-text single-candidate-div candidate-1">1</div>
    <div class="col-4 p-0 g-0 d-flex align-items-center justify-content-center invisible-text single-candidate-div candidate-2">2</div>
    <div class="col-4 p-0 g-0 d-flex align-items-center justify-content-center invisible-text single-candidate-div candidate-3">3</div>
    <div class="col-4 p-0 g-0 d-flex align-items-center justify-content-center invisible-text single-candidate-div candidate-4">4</div>
    <div class="col-4 p-0 g-0 d-flex align-items-center justify-content-center invisible-text single-candidate-div candidate-5">5</div>
    <div class="col-4 p-0 g-0 d-flex align-items-center justify-content-center invisible-text single-candidate-div candidate-6">6</div>
    <div class="col-4 p-0 g-0 d-flex align-items-center justify-content-center invisible-text single-candidate-div candidate-7">7</div>
    <div class="col-4 p-0 g-0 d-flex align-items-center justify-content-center invisible-text single-candidate-div candidate-8">8</div>
    <div class="col-4 p-0 g-0 d-flex align-items-center justify-content-center invisible-text single-candidate-div candidate-9">9</div>
</div>
`

function displayPuzzle() {
    var outerCounter = 0;
    var innerCounter = -6;
    var elementsArray = new Array;
    var valuesArray = new Array;
    var userOuterCounter = 0;
    var userInnerCounter = -6;
    var userElementsArray = new Array;
    var userValuesArray = new Array;
    var userCandidatesOuterCounter = 0;
    var userCandidatesInnerCounter = -6;
    var userCandidatesElementsArray = new Array;
    var userCandidatesValuesArray = new Array;
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            var id = String(x) + String(y);
            var element = document.getElementById(id);
            element.classList.remove("puzzle-part", "empty-cell", "filled-cell");

            if (currentPuzzle[y][x]) {
                elementsArray[outerCounter] = element;
                valuesArray[outerCounter] = currentPuzzle[y][x];
                element.classList.add("invisible-text");
                outerCounter++;
            } else if (userGrid[y][x]) {
                userElementsArray[userOuterCounter] = element;
                userValuesArray[userOuterCounter] = userGrid[y][x];
                element.classList.add("invisible-text");
                userOuterCounter++;
            } else if (userCandidatesGrid[y][x]) {
                userCandidatesElementsArray[userCandidatesOuterCounter] = element;
                userCandidatesValuesArray[userCandidatesOuterCounter] = userCandidatesGrid[y][x];
                element.classList.add("invisible-text");
                userCandidatesOuterCounter++;
            } else {
                element.innerHTML = candidatesDivString;
                element.classList.add("empty-cell");
            }  
            
        }
    }
    var fillUserCells = false
    var interval = setInterval(() => {
        if (innerCounter > -1) {
            element = elementsArray[innerCounter];
            element.innerHTML = valuesArray[innerCounter];
            element.classList.add("puzzle-part");
            element.classList.remove("invisible-text", "empty-cell", "filled-cell");
        }
        innerCounter++;
        if (innerCounter == outerCounter){
            fillUserCells = true;
            clearInterval(interval);
        }
    }, 50)
    var fillUserCandidatesCells = false;
    var userInterval = setInterval(() => {
        if (fillUserCells) {
            if (userElementsArray.length) {
                if (userInnerCounter > -1) {
                    element = userElementsArray[userInnerCounter];
                    element.innerHTML = userValuesArray[userInnerCounter];
                    element.classList.add("filled-cell");
                    element.classList.remove("invisible-text", "empty-cell", "puzzle-part");
                }
                userInnerCounter++;
                if (userInnerCounter == userOuterCounter){
                    fillUserCandidatesCells = true;
                    clearInterval(userInterval);
                }
            } else {
                fillUserCandidatesCells = true;
                clearInterval(userInterval);
            }
        }
        
    }, 50)
    var userCandidatesInterval = setInterval(() => {
        if (fillUserCandidatesCells) {
            if (userCandidatesInnerCounter > -1) {
                element = userCandidatesElementsArray[userCandidatesInnerCounter];
                element.innerHTML = candidatesDivString;
                userCandidatesValuesArray[userCandidatesInnerCounter].forEach(candidate => {
                    var qSelector = ".candidate-" + candidate;
                    element.querySelector(qSelector).classList.remove("invisible-text");
                })
                element.classList.add("empty-cell");
                element.classList.remove("invisible-text", "filled-cell", "puzzle-part");
                
            }
            userCandidatesInnerCounter++;
        }
        if (userCandidatesInnerCounter == userCandidatesOuterCounter){
            fillUserCandidatesCells = true;
            clearInterval(userCandidatesInterval);
            if (highlightedCell) {
                highlightCell(document.getElementById(highlightedCell));
            }
        }
    }, 50)
}





function formatTimer() {   
    var hrs = Math.floor(timerValue / 3600);
    var mins = Math.floor((timerValue % 3600) / 60);
    var secs = Math.floor(timerValue % 60);
    var formattedTime = "";
    if (hrs > 0) {
        formattedTime += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    formattedTime += "" + mins + ":" + (secs < 10 ? "0" : "");
    formattedTime += "" + secs;
    return formattedTime;
}



function buttonPress(element) {
    if (highlightedCell) {
        userGridHistory.push(createCopyOfMultidimensionalArray(userGrid));
        userCandidatesGridHistory.push(createCopyOfMultidimensionalArray(userCandidatesGrid));
        //Runs if a cell is currently selected
        var x = parseInt(highlightedCell[0]);
        var y = parseInt(highlightedCell[1]);
        var cellDiv = document.getElementById(highlightedCell)
        if (!cellDiv.classList.contains("puzzle-part")) {
        //Runs if cell can be edited (not part of the puzzle)
            if (candidatesUpdate) {
            //Runs if candidates update button is active (editing candidates)
                if (cellDiv.classList.contains("filled-cell")) {
                    //Clears cell if a candidate is selected when the cell is filled
                    clearCell()
                }
                var qSelector = " .candidate-" + element.innerHTML;
                var candidateDiv = cellDiv.querySelector(qSelector);
                if (candidateDiv.classList.contains("invisible-text")) {
                //Runs if candidate is currently hidden (unhides/adds candidate to candidates array)
                    candidateDiv.classList.remove("invisible-text")
                    if (userCandidatesGrid[y][x]) {
                    //Runs if Candidates for the cell is already an array (not 0)
                        userCandidatesGrid[y][x].push(parseInt(element.innerHTML))
                    } else {
                    //Runs if candidates for the cell is empty (0) and changes it to an array and adds the candidate
                        userCandidatesGrid[y][x] = new Array;
                        userCandidatesGrid[y][x].push(parseInt(element.innerHTML))
                    }
                } else {
                //Runs if candidate is currently show (hides it and removes it from candidates array)
                    userCandidatesGrid[y][x].splice(userCandidatesGrid[y][x].indexOf(parseInt(element.innerHTML)),  1)
                    candidateDiv.classList.add("invisible-text");
                    if (!userCandidatesGrid[y][x].length) {
                    //If the new array of candidates is empty, changes it back from an array to a 0
                        userCandidatesGrid[y][x] = 0;
                    }
                }
                
            } else {
            //Runs if candidates editing is not selected (fills the cell)
                if (cellDiv.innerHTML == element.innerHTML) {
                //Runs if cell already contains the number of the button pressed.
                    clearCell()
                } else {
                //Runs if the button number is different to the value of the cell
                    cellDiv.innerHTML = element.innerHTML;
                    cellDiv.classList.remove("empty-cell");
                    cellDiv.classList.add("filled-cell");
                    userGrid[y][x] = parseInt(element.innerHTML)
                    userCandidatesGrid[y][x] = 0;
                    puzzleCandidates = createCopyOfMultidimensionalArray(userCandidatesGrid);
                    changeCandidatesGridAfterFill(x, y, userGrid[y][x]);
                    userCandidatesGrid = createCopyOfMultidimensionalArray(puzzleCandidates);
                    resetPuzzleDisplay()
                }
                
                localStorage.setItem("userGrid", JSON.stringify(userGrid));
                //fill highlighted cell with innerHTML of button and update puzzleentries grid and localstorage. Remove candidates
            }
        } 
        //Updates candidates grid localstorage after the above has executed
        localStorage.setItem("userCandidatesGrid", JSON.stringify(userCandidatesGrid))
        highlightCell(cellDiv);
    } 
}

function clearCell() {
    if (highlightedCell) {
        var cell = document.getElementById(highlightedCell) 
        if (!cell.classList.contains("puzzle-part")) {
            cell.classList.remove("filled-cell");
            cell.classList.add("empty-cell");
            cell.innerHTML = candidatesDivString;
            highlightCell(cell);
            var x = highlightedCell[0];
            var y = highlightedCell[1];
            userGrid[y][x] = 0;
            userCandidatesGrid[y][x] = 0;
            localStorage.setItem("userGrid", JSON.stringify(userGrid));
            localStorage.setItem("userCandidatesGrid", JSON.stringify(userCandidatesGrid));
        }
    }
}

function clearPuzzle() {
    userGrid = returnEmptyGrid();
    localStorage.setItem("userGrid", JSON.stringify(userGrid))
    userCandidatesGrid = returnEmptyGrid();
    localStorage.setItem("userCandidatesGrid", JSON.stringify(userCandidatesGrid))
    resetPuzzleDisplay()
}


function changeToCustomDifficulty() {
    document.querySelectorAll(".selected-button").forEach(button => {
        button.classList.remove("selected-button")
    })
    customDifficultyButton.classList.add("selected-button")
    localStorage.setItem("Difficulty", "custom");
}
function setDifficultySettingInputs() {
    cluesSettingNumber.innerHTML = settings["minimumClues"]
    minimumClues.value = settings["minimumClues"]
    loneRangersCheckbox.checked = methods["Lone Rangers"]
    lockedCandidatesCheckbox.checked = methods["Locked Candidates"]
    nakedSubsetsCheckbox.checked = methods["Naked Subsets"]
    hiddenSubsetsCheckbox.checked = methods["Hidden Subsets"]
}


function resetPuzzleDisplay() {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            var id = String(x) + String(y);
            var element = document.getElementById(id);
            element.classList.remove("puzzle-part", "empty-cell", "filled-cell");
            if (currentPuzzle[y][x]) {
                element.innerHTML = currentPuzzle[y][x];
                element.classList.add("puzzle-part");
            } else if (userGrid[y][x]) {
                element.innerHTML = userGrid[y][x];
                element.classList.add("filled-cell");
            } else if (userCandidatesGrid[y][x]) {
                element.innerHTML = candidatesDivString;
                userCandidatesGrid[y][x].forEach(candidate => {
                    var qSelector = ".candidate-" + candidate;
                    element.querySelector(qSelector).classList.remove("invisible-text");
                })
                element.classList.add("empty-cell");
            } else {
                element.innerHTML = candidatesDivString;
                element.classList.add("empty-cell");
            }  
            
        }
    }

}


function undo() {
    if (userGridHistory.length) {
        userGrid = userGridHistory.splice(userGridHistory.length -1, 1)[0];
        userCandidatesGrid = userCandidatesGridHistory.splice(userCandidatesGridHistory.length -1, 1)[0];
        localStorage.setItem("userGrid", JSON.stringify(userGrid));
        localStorage.setItem("userCandidatesGrid", JSON.stringify(userCandidatesGrid));
        resetPuzzleDisplay();
    }
}