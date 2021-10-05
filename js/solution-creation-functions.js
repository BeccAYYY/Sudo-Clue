function fillGrid() {
    var change = false;
    var success = true;
    var filledSquares = 9;
    while (filledSquares < 81 && success) {
        if (change) {
            var start = filledSquares;
            filledSquares = filledSquares + fillSingleCandidateCells();
            filledSquares = filledSquares + fillSingleOptionRequirements();
            var difference = filledSquares - start;
            if (difference) {
                change = true;
            } else {
                change = false;
            }
            if (!change) {
                var lockedCandidate = findLockedCandidate();
                if (lockedCandidate) {
                    removeCandidatesOfLockedCandidate(lockedCandidate);
                    change = true;
                }
            }
            if (!change) {
                var subset = findNakedSubset();
                if (subset) {
                    removeCandidatesOfNakedSubset(subset);
                    change = true;
                }
            }
            if (!change) {
                var subset = findHiddenSubset();
                if (subset) {
                    removeCandidatesOfHiddenSubset(subset);
                    change = true;
                }
            }
        } else {
            var x = 0;
            while (!change && x < 9) {
                var y = 0;
                while (!change && y < 9) {
                    if (puzzle[y][x] == 0) {
                        candidates = puzzleCandidates[y][x];
                        var n = candidates[Math.floor(Math.random() * candidates.length)];
                        fillCell(x, y, n);
                        if (puzzle[y][x] == undefined) {
                            success = false;
                        }
                        change = true;
                        filledSquares++;
                    }
                    y++;
                }
                x++;
            }
        }
    }
    //console.log(puzzle);
    return success;
}


function reset() {
    puzzle = [
        [1, 2, 3, 0, 0, 0, 0, 0, 0],
        [4, 5, 6, 0, 0, 0, 0, 0, 0],
        [7, 8, 9, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    var a = oneThroughNine;
    var b = [4, 5, 6, 7, 8, 9]
    var c = [1, 2, 3, 7, 8, 9]
    var d = [1, 2, 3, 4, 5, 6]
    var e = [2, 3, 5, 6, 8, 9]
    var f = [1, 3, 4, 6, 7, 9]
    var g = [1, 2, 4, 5, 7, 8]


    puzzleCandidates = [
        [0, 0, 0, b, b, b, b, b, b],
        [0, 0, 0, c, c, c, c, c, c],
        [0, 0, 0, d, d, d, d, d, d],
        [e, f, g, a, a, a, a, a, a],
        [e, f, g, a, a, a, a, a, a],
        [e, f, g, a, a, a, a, a, a],
        [e, f, g, a, a, a, a, a, a],
        [e, f, g, a, a, a, a, a, a],
        [e, f, g, a, a, a, a, a, a]
    ]

}