function saveCurrentPuzzleToLocalStorage() {
    if (currentPuzzle) {
        localStorage.setItem("currentPuzzle", JSON.stringify(currentPuzzle))
    } else {
        localStorage.setItem("currentPuzzle", false)
    }
}
