let current_turn = 'X';
let status = document.getElementById('status');
status.innerText = `Current Turn: ${current_turn}`;
let won = null;
function updateStatus(winner) {
    if (won == null)
    {
        status.innerText = `Current Turn: ${current_turn}`;
    }
    else if (won == true)
    {
        status.innerText = `Player ${winner} has Won!`;     
    }
    else if (won == false) {
        status.innerText = `It's a Draw!`;
    }
}
let boxes = document.querySelectorAll('.box');

let winning_combinations = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8],
    [0, 3, 6],[1, 4, 7],[2, 5, 8],
    [0, 4, 8],[2, 4, 6]];

let disabled = false;
function disable_boxes() {
    for (let box of boxes) {
        box.disabled = true; // Disable all boxes
    }
    disabled = true; // Set the disabled flag to true
    return;
}

    function checkWinner() {
        for (let combination of winning_combinations) {
            let pos1 = combination[0];
            let pos2 = combination[1];
            let pos3 = combination[2];
            if (boxes[pos1].innerText === boxes[pos2].innerText && 
                boxes[pos2].innerText === boxes[pos3].innerText && 
                boxes[pos1].innerText !== '') {
                // alert(`Player ${boxes[pos1].innerText} wins!`);
                won = true;
                updateStatus(boxes[pos1].innerText);
                                                                        // for (let box of boxes) {
                                                                        //     box.disabled = true; // Disable all boxes
                                                                        // }
                                                                        // return;
                disable_boxes();
                return;
            }
            
        }
        if ([...boxes].every(box => box.disabled)){
            // alert("It's a draw!");
            won = false;
            updateStatus();
            disable_boxes();
        }
    }    

// preview of the current turn

boxes.forEach((box) => {
    box.addEventListener('mouseover', () => {
        if (box.innerText === '' && current_turn === 'X'&& !box.disabled && won == null) {
            box.innerText = 'X';
        } else if (box.innerText === '' && current_turn === 'O' && !box.disabled) {
            box.innerText = 'O';
        }
    });
});

boxes.forEach((box) => {
    box.addEventListener('mouseout', () => {
        if ((box.innerText === 'X' || box.innerText === 'O') && !box.disabled && won == null) {
            box.innerText = '';
        } 
    });
});

// handling the click event on each box

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (current_turn === 'X' && !box.disabled) {
            box.innerText = 'X';
            box.disabled = true;
            current_turn = 'O';
            updateStatus();
        } else if (current_turn === 'O' && !box.disabled) {
            box.innerText = 'O';
            box.disabled = true;
            current_turn = 'X';
            updateStatus();
        }
        checkWinner();
    });
});



function resetGame() {
    boxes.forEach((box) => {
        box.innerText = '';
        box.disabled = false;
    });
    current_turn = 'X';
    won = null;
    status.innerText = `Current Turn: ${current_turn}`;
}
let resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);
