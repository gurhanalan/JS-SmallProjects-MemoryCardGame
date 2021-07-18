const board = document.querySelector(".memory-game");
const attemptDisplay = document.querySelector(".attempt-counter span");

let firstClick, secondClick;
let backFaceClick = 0;
let attempNum = 0;
let orderArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// Shuffle function for orderArr
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

// Shuffling the orderArr
const shuffleArr = shuffle(orderArr);

// Assigning the shuffled orders to the cards
const cards = document.querySelectorAll(".memory-card");

cards.forEach((card, index) => {
    card.style.order = shuffleArr[index] + "";
});

console.log(firstClick);
// Adding event listener to the board to listen clicks to the backface of the card
board.addEventListener("click", (e) => {
    if (e.target.classList.contains("back-face") && secondClick === undefined) {
        backFaceClick++;
        if (backFaceClick <= 1) {
            firstClick = e.target.parentElement;
            firstClick.classList.add("flip");
            // firstClick.disabled = true;
        } else if (backFaceClick == 2) {
            secondClick = e.target.parentElement;
            secondClick.classList.add("flip");
            backFaceClick = 0;

            attempNum++;
            attemptDisplay.innerHTML = attempNum + "";
            // console.log(firstClick.firstElementChild.src);
            if (firstClick.dataset.name !== secondClick.dataset.name) {
                setTimeout(() => {
                    firstClick.classList.remove("flip");
                    secondClick.classList.remove("flip");
                    firstClick = undefined;
                    secondClick = undefined;
                }, 1000);
            } else {
                firstClick = undefined;
                secondClick = undefined;
            }
        }
    }
});
