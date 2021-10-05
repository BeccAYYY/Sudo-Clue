
/*

*/




function checkIfSolvable(methods) {
    var change = true;
    var success = true;
    var puzzleCandidates = createCandidatesGridForPuzzle();
    var filledSquares = countFilledCells();
    while (filledSquares < 81 && success) {
        if (change) {
            var start = filledSquares;
            filledSquares = filledSquares + fillSingleCandidateCells();
            if (methods["Lone Rangers"]) {
                filledSquares = filledSquares + fillSingleOptionRequirements();
            }
            var difference = filledSquares - start;
            if (difference) {
                change = true;
            } else {
                change = false;
            }
            if (!change && methods["Locked Candidates"]) {
                var lockedCandidate = findLockedCandidate();
                if (lockedCandidate) {
                    removeCandidatesOfLockedCandidate(lockedCandidate);
                    change = true;
                }
            }
            if (!change && methods["Naked Subsets"]) {
                var subset = findNakedSubset();
                if (subset) {
                    removeCandidatesOfNakedSubset(subset);
                    change = true;
                }
            }
            if (!change && methods["Hidden Subsets"]) {
                var subset = findHiddenSubset();
                if (subset) {
                    removeCandidatesOfHiddenSubset(subset);
                    change = true;
                }
            }
        } else {
            success = false;
        }
    }
    return success;
}

function updateCandidatesGridForPuzzle() {
    puzzleCandidates = [
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
    puzzleCandidates.forEach((row, y) => {
        row.forEach((cell, x) => {
            cell = getCellCandidates(x, y);
        })
    })
    return puzzleCandidates;
}

