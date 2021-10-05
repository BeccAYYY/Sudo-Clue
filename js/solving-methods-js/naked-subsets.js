
function findNakedSubset() {
    var subset = false;

    //Rows
    var yIndex = 0;
    while (!subset && yIndex < 9) {
        var candidatesArrays = new Array;
        var subsetCandidates = false;
        puzzleCandidates[yIndex].forEach((candidates) => {
            if (candidates !== 0) {
                candidatesArrays.push(candidates)
            }
        })
        if (candidatesArrays.length > 2) {
            subsetCandidates = checkGroupForNakedSubset(candidatesArrays);
        }
        if (subsetCandidates) {
            subset = {
                "candidates": subsetCandidates,
                "subsetCoords": [],
                "nonSubsetCoords": []
            }
            puzzleCandidates[yIndex].forEach((candidates, xIndex) => {
                if (candidates !== 0 && checkIfArraysMatch(subsetCandidates, candidates)) {
                    subset["subsetCoords"].push({
                        "xIndex": xIndex,
                        "yIndex": yIndex
                    })
                } else {
                    subset["nonSubsetCoords"].push({
                        "xIndex": xIndex,
                        "yIndex": yIndex
                    })
                }
            })
        }
        yIndex++;
    }

    //Squares

    var a = getSquare(0);
    var b = getSquare(3);
    var c = getSquare(6);
    var squareCoords = [a, b, c];
    var squareYIndex = 0;
    while (!subset && squareYIndex < 3) {
        var squareXIndex = 0;
        while (!subset && squareXIndex < 3) {
            var yIndexes = squareCoords[squareYIndex]
            var xIndexes = squareCoords[squareXIndex]
            var candidatesArrays = new Array;
            var subsetCandidates = false;
            yIndexes.forEach(yIndex => {
                xIndexes.forEach(xIndex => {
                    var candidates = puzzleCandidates[yIndex][xIndex]
                    if (candidates !== 0) {
                        candidatesArrays.push(candidates)
                    }
                })
            })
            if (candidatesArrays.length > 2) {
                subsetCandidates = checkGroupForNakedSubset(candidatesArrays);
            }
            if (subsetCandidates) {
                subset = {
                    "candidates": subsetCandidates,
                    "subsetCoords": [],
                    "nonSubsetCoords": []
                }
                yIndexes.forEach(yIndex => {
                    xIndexes.forEach(xIndex => {
                        var candidates = puzzleCandidates[yIndex][xIndex];
                        if (candidates !== 0 && checkIfArraysMatch(subsetCandidates, candidates)) {
                            subset["subsetCoords"].push({
                                "xIndex": xIndex,
                                "yIndex": yIndex
                            })
                        } else {
                            subset["nonSubsetCoords"].push({
                                "xIndex": xIndex,
                                "yIndex": yIndex
                            })
                        }
                    })
                })
            }
            squareXIndex++;
        }
        squareYIndex++;
    }

    //Columns
    var xIndex = 0;
    while (!subset && xIndex < 9) {
        var candidatesArrays = new Array;
        var subsetCandidates = false;
        puzzleCandidates.forEach((row) => {
            candidates = row[xIndex]
            if (candidates !== 0) {
                candidatesArrays.push(candidates)
            }
        })
        if (candidatesArrays.length > 2) {
            subsetCandidates = checkGroupForNakedSubset(candidatesArrays);
        }
        if (subsetCandidates) {
            subset = {
                "candidates": subsetCandidates,
                "subsetCoords": [],
                "nonSubsetCoords": []
            }
            puzzleCandidates.forEach((row, yIndex) => {
                var candidates = row[xIndex];
                if (candidates !== 0 && checkIfArraysMatch(subsetCandidates, candidates)) {
                    subset["subsetCoords"].push({
                        "xIndex": xIndex,
                        "yIndex": yIndex
                    })
                } else {
                    subset["nonSubsetCoords"].push({
                        "xIndex": xIndex,
                        "yIndex": yIndex
                    })
                }

            })


        }
        xIndex++;
    }
    return subset;
}

function checkGroupForNakedSubset(candidatesArrays) {
    var i = 0;
    subset = false;
    while (!subset && i < candidatesArrays.length) {
        var matches = 0;
        var n = 0;
        while (!subset && n < candidatesArrays.length) {
            if (n !== i && candidatesArrays[i].length < candidatesArrays.length) {
                if (candidatesArrays[i].length == 2) {
                    var externalCandidates = false;
                    if (candidatesArrays[i].length >= candidatesArrays[n].length && checkIfArraysMatch(candidatesArrays[i], candidatesArrays[n])) {
                        matches++;
                    } else {
                        var candidateIndex = 0;
                        while (!externalCandidates && candidateIndex < candidatesArrays[i].length) {
                            if (candidatesArrays[n].includes(candidatesArrays[i][candidateIndex])) {
                                externalCandidates = true;
                            }
                            candidateIndex++;
                        }
                    }
                    if (matches == 1 && externalCandidates) {
                        subset = candidatesArrays[i];
                    }

                } else if (candidatesArrays[i].length == 3) {
                    var externalCandidates = false;
                    if (candidatesArrays[i].length >= candidatesArrays[n].length && checkIfArraysMatch(candidatesArrays[i], candidatesArrays[n])) {
                        matches++;
                    } else {
                        var candidateIndex = 0;
                        while (!externalCandidates && candidateIndex < candidatesArrays[i].length) {
                            if (candidatesArrays[n].includes(candidatesArrays[i][candidateIndex])) {
                                externalCandidates = true;
                            }
                            candidateIndex++;
                        }
                    }
                    if (matches == 2 && externalCandidates) {
                        subset = candidatesArrays[i];
                    }
                }
            }
            n++;
        }
        i++;
    }
    return subset;
}



function removeCandidatesOfNakedSubset(subset) {
    subset["nonSubsetCoords"].forEach(coordinate => {
        var xIndex = coordinate["xIndex"];
        var yIndex = coordinate["yIndex"];
        var candidates = subset["candidates"]
        if (puzzleCandidates[yIndex][xIndex] !== 0) {
            puzzleCandidates[yIndex][xIndex] = puzzleCandidates[yIndex][xIndex].filter(candidate => !candidates.includes(candidate))
        }
    })
}