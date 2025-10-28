const COLORS = ["red", "blue", "green", "yellow", "purple", "orange"];
const board = document.getElementById("board");
const matchesEl = document.getElementById("matches");
const restartBtn = document.getElementById("restart");

let first = null;
let matches = 0;

function createBubbles() {
  board.innerHTML = "";
  matches = 0;
  matchesEl.textContent = "0";

  // генерираме 12 балончета (по 2 от всеки цвят)
  let bubbles = [];
  COLORS.forEach(color => {
    bubbles.push(color, color); // по 2
  });

  // разбъркваме
  bubbles = bubbles.sort(() => Math.random() - 0.5);

  bubbles.forEach(color => {
    const div = document.createElement("div");
    div.className = "bubble";
    div.style.background = color;
    div.dataset.color = color;

    div.addEventListener("click", () => handleClick(div));
    board.appendChild(div);
  });
}

function handleClick(bubble) {
  if (bubble.classList.contains("matched") || bubble === first) return;

  bubble.classList.add("selected");

  if (!first) {
    first = bubble;
  } else {
    // проверка
    if (first.dataset.color === bubble.dataset.color) {
      // съвпадение
      setTimeout(() => {
        first.classList.add("matched");
        bubble.classList.add("matched");
        first.style.visibility = "hidden";
        bubble.style.visibility = "hidden";
        matches++;
        matchesEl.textContent = matches;
        first = null;

        // проверка за край
        if (document.querySelectorAll(".bubble:not(.matched)").length === 0) {
          setTimeout(() => alert("Браво! Играта приключи 🎉"), 300);
        }
      }, 300);
    } else {
      // различни цветове
      setTimeout(() => {
        first.classList.remove("selected");
        bubble.classList.remove("selected");
        first = null;
      }, 500);
    }
  }
}

restartBtn.addEventListener("click", createBubbles);

// стартиране
createBubbles();
