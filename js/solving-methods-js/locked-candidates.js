
function findLockedCandidate() {
    var lockedCandidate = false;
    var candidate;
    var i = 0;
    while (!lockedCandidate && i < 27) {
        var removeFromLocations = new Array;
        var group = groups[i];
        var groupRequirements = getGroupRequirements(group);
        var n = 0;
        while (!lockedCandidate && n < groupRequirements.length) {
            candidate = groupRequirements[n];
            var sectionsWithCandidate = [0, 0, 0]
            group.forEach((cell, groupIndex) => {
                var x = cell["x"];
                var y = cell["y"];
                if (puzzleCandidates[y][x] !== 0 && puzzleCandidates[y][x].includes(candidate)) {
                    var section = Math.floor(groupIndex / 3)
                    sectionsWithCandidate[section] = 1;
                }
            })
            if (sectionsWithCandidate.filter(section => section == 1).length == 1) {
                var otherLocations = false;
                var section = sectionsWithCandidate.indexOf(1);
                if (i < 9) {
                    var yIndex = i;
                    var a = Math.floor(yIndex / 3) * 3;
                    var lockedGroup = a + section + 18;
                    groups[lockedGroup].forEach(cell => {
                        var x = cell["x"];
                        var y = cell["y"];
                        if (y !== yIndex) {
                            if (puzzleCandidates[y][x] !== 0 && puzzleCandidates[y][x].includes(candidate)) {
                                removeFromLocations.push(cell);
                                if (!otherLocations) {
                                    otherLocations = true;
                                }
                            }
                        }
                    })
                } else if (i < 18) {
                    var xIndex = i - 9;
                    var a = section * 3;
                    var b = Math.floor(xIndex / 3);
                    var lockedGroup = a + b + 18;
                    groups[lockedGroup].forEach(cell => {
                        var x = cell["x"];
                        var y = cell["y"];
                        if (x !== xIndex) {
                            if (puzzleCandidates[y][x] !== 0 && puzzleCandidates[y][x].includes(candidate)) {
                                removeFromLocations.push(cell);
                                if (!otherLocations) {
                                    otherLocations = true;
                                }
                            }
                        }
                    })
                } else {
                    //Find column from square
                    var squareGroup = i - 18;
                    var a = Math.floor(squareGroup / 3) * 3;
                    var lockedGroup = a + section;
                    var startX = getSectionForSquareLockedCandidate(squareGroup) * 3
                    var endX = startX + 2
                    groups[lockedGroup].forEach(cell => {
                        var x = cell["x"];
                        var y = cell["y"];
                        if (x < startX || x > endX) {
                            if (puzzleCandidates[y][x] !== 0 && puzzleCandidates[y][x].includes(candidate)) {
                                removeFromLocations.push(cell);
                                if (!otherLocations) {
                                    otherLocations = true;
                                }
                            }
                        }
                    })
                }
                if (otherLocations) {
                    lockedCandidate = {
                        "candidate": candidate,
                        "removeFromLocations": removeFromLocations
                    }
                }
            }
            if (!lockedCandidate && i > 17) {
                sectionsWithCandidate = [0, 0, 0];
                group.forEach((cell, groupIndex) => {
                    var x = cell["x"];
                    var y = cell["y"];
                    if (puzzleCandidates[y][x] !== 0 && puzzleCandidates[y][x].includes(candidate)) {
                        var section = getSectionForSquareLockedCandidate(groupIndex);
                        sectionsWithCandidate[section] = 1;
                    }
                })
                if (sectionsWithCandidate.filter(section => section == 1).length == 1) {
                    var otherLocations = false;
                    var section = sectionsWithCandidate.indexOf(1);
                    var squareGroup = i - 18;
                    var a = getSectionForSquareLockedCandidate(squareGroup) * 3;
                    var lockedGroup = a + section + 9;
                    var startY = Math.floor(squareGroup / 3) * 3;
                    var endY = startY + 2;
                    groups[lockedGroup].forEach(cell => {
                        var x = cell["x"];
                        var y = cell["y"];
                        if (y < startY || y > endY) {
                            if (puzzleCandidates[y][x] !== 0 && puzzleCandidates[y][x].includes(candidate)) {
                                removeFromLocations.push(cell);
                                if (!otherLocations) {
                                    otherLocations = true;
                                }
                            }
                        }
                    })
                    if (otherLocations) {
                        lockedCandidate = {
                            "candidate": candidate,
                            "removeFromLocations": removeFromLocations
                        }
                    }
                }
            }
            n++;
        }
        i++;
    }
    return lockedCandidate;
}

function removeCandidatesOfLockedCandidate(lockedCandidate) {
    lockedCandidate["removeFromLocations"].forEach(cell => {
        var x = cell["x"];
        var y = cell["y"];
        puzzleCandidates[y][x] = puzzleCandidates[y][x].filter(candidate => candidate !== lockedCandidate["candidate"])
    })
}



function getSectionForSquareLockedCandidate(n) {
    var a = n / 3 - Math.floor(n / 3);
    var b = Math.round(a * 3);
    return b
}


function findLockedCandidateForHint(groupsToCheck) {
    var lockedCandidate = false;
    var candidate;
    var i = 0;
    while (!lockedCandidate && i < 27) {
        if (groupsToCheck.some(group => JSON.stringify(group) == JSON.stringify(groups[i]))) {
            var removeFromLocations = new Array;
            var group = groups[i];
            var groupRequirements = getGroupRequirements(group);
            var n = 0;
            while (!lockedCandidate && n < groupRequirements.length) {
                candidate = groupRequirements[n];
                var sectionsWithCandidate = [0, 0, 0]
                group.forEach((cell, groupIndex) => {
                    var x = cell["x"];
                    var y = cell["y"];
                    if (puzzleCandidates[y][x] !== 0 && puzzleCandidates[y][x].includes(candidate)) {
                        var section = Math.floor(groupIndex / 3)
                        sectionsWithCandidate[section] = 1;
                    }
                })
                if (sectionsWithCandidate.filter(section => section == 1).length == 1) {
                    var otherLocations = false;
                    var section = sectionsWithCandidate.indexOf(1);
                    if (i < 9) {
                        var yIndex = i;
                        var a = Math.floor(yIndex / 3) * 3;
                        var lockedGroup = a + section + 18;
                        groups[lockedGroup].forEach(cell => {
                            var x = cell["x"];
                            var y = cell["y"];
                            if (y !== yIndex) {
                                if (puzzleCandidates[y][x] !== 0 && puzzleCandidates[y][x].includes(candidate)) {
                                    removeFromLocations.push(cell);
                                    if (!otherLocations) {
                                        otherLocations = true;
                                    }
                                }
                            }
                        })
                    } else if (i < 18) {
                        var xIndex = i - 9;
                        var a = section * 3;
                        var b = Math.floor(xIndex / 3);
                        var lockedGroup = a + b + 18;
                        groups[lockedGroup].forEach(cell => {
                            var x = cell["x"];
                            var y = cell["y"];
                            if (x !== xIndex) {
                                if (puzzleCandidates[y][x] !== 0 && puzzleCandidates[y][x].includes(candidate)) {
                                    removeFromLocations.push(cell);
                                    if (!otherLocations) {
                                        otherLocations = true;
                                    }
                                }
                            }
                        })
                    } else {
                        //Find column from square
                        var squareGroup = i - 18;
                        var a = Math.floor(squareGroup / 3) * 3;
                        var lockedGroup = a + section;
                        var startX = getSectionForSquareLockedCandidate(squareGroup) * 3
                        var endX = startX + 2
                        groups[lockedGroup].forEach(cell => {
                            var x = cell["x"];
                            var y = cell["y"];
                            if (x < startX || x > endX) {
                                if (puzzleCandidates[y][x] !== 0 && puzzleCandidates[y][x].includes(candidate)) {
                                    removeFromLocations.push(cell);
                                    if (!otherLocations) {
                                        otherLocations = true;
                                    }
                                }
                            }
                        })
                    }
                    if (otherLocations) {
                        lockedCandidate = {
                            "candidate": candidate,
                            "removeFromLocations": removeFromLocations
                        }
                    }
                }
                if (!lockedCandidate && i > 17) {
                    sectionsWithCandidate = [0, 0, 0];
                    group.forEach((cell, groupIndex) => {
                        var x = cell["x"];
                        var y = cell["y"];
                        if (puzzleCandidates[y][x] !== 0 && puzzleCandidates[y][x].includes(candidate)) {
                            var section = getSectionForSquareLockedCandidate(groupIndex);
                            sectionsWithCandidate[section] = 1;
                        }
                    })
                    if (sectionsWithCandidate.filter(section => section == 1).length == 1) {
                        var otherLocations = false;
                        var section = sectionsWithCandidate.indexOf(1);
                        var squareGroup = i - 18;
                        var a = getSectionForSquareLockedCandidate(squareGroup) * 3;
                        var lockedGroup = a + section + 9;
                        var startY = Math.floor(squareGroup / 3) * 3;
                        var endY = startY + 2;
                        groups[lockedGroup].forEach(cell => {
                            var x = cell["x"];
                            var y = cell["y"];
                            if (y < startY || y > endY) {
                                if (puzzleCandidates[y][x] !== 0 && puzzleCandidates[y][x].includes(candidate)) {
                                    removeFromLocations.push(cell);
                                    if (!otherLocations) {
                                        otherLocations = true;
                                    }
                                }
                            }
                        })
                        if (otherLocations) {
                            lockedCandidate = {
                                "candidate": candidate,
                                "removeFromLocations": removeFromLocations
                            }
                        }
                    }
                }
                n++;
            }
            i++;
        }
    }
    return lockedCandidate;
}