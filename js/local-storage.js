function saveCurrentPuzzleToLocalStorage() {
    if (currentPuzzle) {
        localStorage.setItem("currentPuzzle", JSON.stringify(currentPuzzle))
    } else {
        localStorage.setItem("currentPuzzle", false)
    }
}


function updateDifficultySettingsInLocalStorage() {
    localStorage.setItem("Lone Rangers", methods["Lone Rangers"]);
    localStorage.setItem("Locked Candidates", methods["Locked Candidates"]);
    localStorage.setItem("Naked Subsets", methods["Naked Subsets"]);
    localStorage.setItem("Hidden Subsets", methods["Hidden Subsets"]);
    localStorage.setItem("minimumClues", settings["minimumClues"]);
}