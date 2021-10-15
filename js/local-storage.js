function saveCurrentPuzzleToLocalStorage() {
    if (currentPuzzle) {
        localStorage.setItem("currentPuzzle", turnPuzzleToString(currentPuzzle))
    } else {
        localStorage.setItem("currentPuzzle", false)
    }
}