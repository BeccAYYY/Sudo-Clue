function findNextStep() {
    puzzle = combineUserAndPuzzleGrids();
    updateCandidatesGridForPuzzle();
    var single = findSingleCandidateCell()
    if (single) {
        var id = String(single.xIndex) + String(single.yIndex);
        document.getElementById(id).classList.add('hint-cell')
    } else {
        var loneRanger = findSingleOptionRequirement();
        if (loneRanger) {
            var id = String(loneRanger.xIndex) + String(loneRanger.yIndex);
            document.getElementById(id).classList.add('hint-cell')
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