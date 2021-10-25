

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




function findNakedSubset() {
    var subset = false;
    groups.forEach(group => {
        var candidatesArrays = new Array;
        var subsetCandidates = false;
        group.forEach(cell => {
            var x = cell.x
            var y = cell.y
            if (puzzleCandidates[y][x]) {
                candidatesArrays.push(puzzleCandidates[y][x])
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
            group.forEach(cell => {
                var x = cell.x
                var y = cell.y
                var candidates = puzzleCandidates[y][x]
                if (candidates !== 0 && checkIfArraysMatch(subsetCandidates, candidates)) {
                    subset["subsetCoords"].push({
                        "xIndex": x,
                        "yIndex": y
                    })
                } else {
                    subset["nonSubsetCoords"].push({
                        "xIndex": x,
                        "yIndex": y
                    })
                }
            })
        }
    })
    return subset;
}
