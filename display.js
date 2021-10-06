var cells = document.querySelectorAll('.cell');


cells.forEach(element => {
    element.addEventListener('click', () => {highlightCell(element)})
})

function highlightCell(element) {
    
    var x = element.id[0];
    var y = element.id[1];
    var column = "column-" + x;
    var row = "row-" + y;
    var square = element.parentNode.id;
    var value = false;
    if (element.innerHTML.length = 1) {
        value = parseInt(element.innerHTML)
    }

    cells.forEach(cell => {
        cell.classList.remove('pink', 'lighter-pink', 'blue', 'light-blue', 'zoom');
        if (cell.classList.contains(column) || cell.classList.contains(row) || cell.classList.contains(square)) {
            cell.classList.add("light-blue")
        } else if ((value && value == cell.innerHTML)) {
            cell.classList.add("lighter-pink")
        }
    })
    if (!element.classList.contains("puzzle-part")) {
        element.classList.add('zoom', 'blue')
    } else {
        element.classList.add('pink')
    }

}

for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
        var id = String(x) + String(y)
        if (newPuzzle[y][x]) {
            var element = document.getElementById(id)
            element.innerHTML = newPuzzle[y][x]
            element.classList.add("fw-bold", "puzzle-part")
        } 
    }
}

