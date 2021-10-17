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
    var value = false;
    if (element.innerHTML.length = 1) {
        value = parseInt(element.innerHTML)
    }

    cells.forEach(cell => {
        cell.classList.remove('pink', 'lighter-pink', 'blue', 'light-blue', 'zoom');
        if (cell.classList.contains(column) || cell.classList.contains(row) || cell.classList.contains(square)) {
            cell.classList.add("light-blue")
        } else if ((value && value == cell.innerHTML)) {
            cell.classList.add("lighter-pink")
        }
    })
    if (!element.classList.contains("puzzle-part")) {
        element.classList.add('zoom', 'blue')
    } else {
        element.classList.add('pink')
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
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            var id = String(x) + String(y);
            var element = document.getElementById(id);
            if (currentPuzzle[y][x]) {
                elementsArray[outerCounter] = element;
                valuesArray[outerCounter] = currentPuzzle[y][x]
                element.classList.add("invisible-text")
                outerCounter++;
            } else if (userGrid[y][x]) {
                userElementsArray[userOuterCounter] = element;
                userValuesArray[userOuterCounter] = userGrid[y][x]
                element.classList.add("invisible-text")
                userOuterCounter++;
            } else {
                element.innerHTML = candidatesDivString;
                element.classList.add("empty-cell")
                element.classList.remove("puzzle-part")
            }  
            
        }
    }
    var fillUserCells = false
    var interval = setInterval(() => {
        if (innerCounter > -1) {
            element = elementsArray[innerCounter]
            element.innerHTML = valuesArray[innerCounter]
            element.classList.add("puzzle-part")
            element.classList.remove("invisible-text", "empty-cell")
        }
        innerCounter++;
        if (innerCounter == outerCounter){
            fillUserCells = true
            clearInterval(interval);
        }
    }, 50)
    var userInterval = setInterval(() => {
        if (fillUserCells) {
            if (userInnerCounter > -1) {
                element = userElementsArray[userInnerCounter]
                element.innerHTML = userValuesArray[userInnerCounter]
                element.classList.add("filled-cell")
                element.classList.remove("invisible-text", "empty-cell")
            }
            userInnerCounter++;
        }
        if (userInnerCounter == userOuterCounter){
            clearInterval(userInterval);
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
        var cellDiv = document.getElementById(highlightedCell)
        if (candidatesUpdate) {
            var qSelector = " .candidate-" + element.innerHTML;
            var candidateDiv = cellDiv.querySelector(qSelector);
            if (candidateDiv.classList.contains("invisible-text")) {
                candidateDiv.classList.remove("invisible-text")
            } else {
                candidateDiv.classList.add("invisible-text");
            }
        } else {
            
            if (!cellDiv.classList.contains("puzzle-part")) {
                cellDiv.innerHTML = element.innerHTML;
                cellDiv.classList.remove("empty-cell");
                cellDiv.classList.add("filled-cell");
                highlightCell(cellDiv);
                var x = highlightedCell[0];
                var y = highlightedCell[1];
                userGrid[y][x] = parseInt(element.innerHTML)
                localStorage.setItem("userGrid", JSON.stringify(userGrid))
            }
            
            //fill highlighted cell with innerHTML of button and update puzzleentries grid and localstorage. Remove candidates
        }
    } else {

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
            localStorage.setItem("userGrid", JSON.stringify(userGrid));
        }
    }
}

function clearPuzzle() {
    userGrid = returnEmptyGrid();
    localStorage.setItem("userGrid", JSON.stringify(userGrid))
    displayPuzzle()
}
