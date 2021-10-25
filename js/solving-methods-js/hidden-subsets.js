function findHiddenSubset() {
    var subset = false;
    var i = 0;
    while (!subset && i < groups.length) {
        var group = groups[i];
        var requirementLocations = new Array;
        var requirementNumbers = new Array;
        var groupRequirements = getGroupRequirements(group);
        groupRequirements.forEach(requirement => {
            requirementLocations.push([])
            requirementNumbers.push(requirement)
            group.forEach(cell => {
                var x = cell["x"];
                var y = cell["y"];
                if (puzzleCandidates[y][x] !== 0 && puzzleCandidates[y][x].includes(requirement)) {
                    requirementLocations[requirementLocations.length - 1].push([x, y])
                }
            })
        })
        i++;
        subset = checkGroupForHiddenSubset(requirementLocations);
        if (subset) {
            var subsetNumbers = new Array;
            subset["indexes"].forEach(index => {
                subsetNumbers.push(requirementNumbers[index])
            })
            subset = {
                "locations": subset["locations"],
                "subsetNumbers": subsetNumbers
            }
        }
    }
    return subset;
}

function checkGroupForHiddenSubset(requirementLocations) {
    var i = 0;
    var subset = false;
    while (!subset && i < requirementLocations.length) {
        var matches = 0;
        var n = 0;
        var matchIndexes = [i];
        while (!subset && n < requirementLocations.length) {
            if (n !== i && requirementLocations[i].length < requirementLocations.length) {
                if (requirementLocations[i].length == 2) {
                    var externalCandidates = false;
                    if (requirementLocations[i].length >= requirementLocations[n].length && checkIfMultidimensionalArraysMatch(requirementLocations[i], requirementLocations[n])) {
                        matches++;
                        matchIndexes.push(n)
                    } else {
                        var locationIndex = 0;
                        while (!externalCandidates && locationIndex < requirementLocations[i].length) {
                            if (checkIfMultidimensionalArrayContainsArray(requirementLocations[n], requirementLocations[i][locationIndex])) {
                                externalCandidates = true;
                            }
                            locationIndex++;
                        }
                    }
                    if (matches == 1 && externalCandidates) {
                        subset = {
                            "locations": requirementLocations[i],
                            "indexes": matchIndexes
                        };
                    }

                } else if (requirementLocations[i].length == 3) {
                    var externalCandidates = false;
                    if (requirementLocations[i].length >= requirementLocations[n].length && checkIfMultidimensionalArraysMatch(requirementLocations[i], requirementLocations[n])) {
                        matches++;
                        matchIndexes.push(n)
                    } else {
                        var locationIndex = 0;
                        while (!externalCandidates && locationIndex < requirementLocations[i].length) {
                            if (checkIfMultidimensionalArrayContainsArray(requirementLocations[n], requirementLocations[i][locationIndex])) {
                                externalCandidates = true;
                            }
                            locationIndex++;
                        }
                    }
                    if (matches == 2 && externalCandidates) {
                        subset = {
                            "locations": requirementLocations[i],
                            "indexes": matchIndexes
                        };
                    }
                }
            }
            n++;
        }
        i++;
    }
    return subset;
}


function removeCandidatesOfHiddenSubset(subset) {
    subset["locations"].forEach(cell => {
        x = cell[0];
        y = cell[1];
        puzzleCandidates[y][x] = puzzleCandidates[y][x].filter(candidate => subset["subsetNumbers"].includes(candidate))
    })
}