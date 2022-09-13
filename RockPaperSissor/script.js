const selectionButtons = document.querySelectorAll('[data-selection]');
const  SELECTIONS = [
    {
        name : 'rock',
        emoji: '✊',
        beats: 'scissor'
    },
    {
        name: 'scissor',
        emoji: '✌️',
        beats: 'paper'
    },
    {
        name: 'paper',
        emoji: '🤚',
        beats: 'rock'
    }
];

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection;
        const selectionObj = SELECTIONS.find(selection => selection.name === selectionName);
        makeSelection(selectionObj);
    });
});

function makeSelection(selectionName) {
    let computerSelection = makeRandomSelection();
    let userSelection = selectionName;
    const results = document.querySelector('.results');
    let userScore = document.querySelector('.user-score');
    let computerScore = document.querySelector('.computer-score');
    const user = document.createElement('div');
    user.innerHTML = userSelection.emoji;
    const computer = document.createElement('div');
    computer.innerHTML = computerSelection.emoji;
    user.classList.add('result-selection');
    computer.classList.add('result-selection');
    if(userSelection.beats == computerSelection.name){
        user.classList.add('winner');
        userScore.innerHTML = parseInt(userScore.innerHTML) + 1;
    }else if(computerSelection.beats == userSelection.name){
        computer.classList.add('winner');
        computerScore.innerHTML = parseInt(computerScore.innerHTML) + 1;
    }
    results.appendChild(user);
    results.appendChild(computer);
}

function makeRandomSelection() {
    let index = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[index];
}