

function createPuzzleFromSolution() {
    var newPuzzle = createCopyOfMultidimensionalArray(puzzle);
    var maxNumberToRemove = 81 - settings["minimumClues"];
    solution = createCopyOfMultidimensionalArray(puzzle);
    var coords = createArrayOfAllCoords();
    while (maxNumberToRemove > 0 && coords.length > 0) {
        var i = Math.floor(Math.random() * coords.length);
        var x = coords[i][0];
        var y = coords[i][1];
        newPuzzle[y][x] = 0;
        coords.splice(i, 1);
        if (checkIfSolvable(newPuzzle)) {
            maxNumberToRemove--;
        } else {
            newPuzzle[y][x] = solution[y][x]
        }
    }
    return newPuzzle
}

function getSuccessfulSolution() {
    var solution = fillGrid()
    while (!solution) {
        solution = fillGrid()
    }
    return solution
}

function resetPuzzleCandidates() {
    puzzleCandidates = returnEmptyGrid()
}

function returnEmptyGrid() {
    return [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
}