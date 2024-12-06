
// Pompe
const handle = document.getElementById("handle");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const waves = document.getElementsByClassName("wave");

const pumpHeight = 200; // Hauteur de la pompe
const handleHeight = 50; // Hauteur de la poignée
let progress = 100;
let isDragging1 = false;

// Met à jour la barre de progression
function updateProgressBar() {
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${Math.floor(progress)}%`;
}

// Lorsque l'utilisateur commence à glisser
handle.addEventListener("mousedown", (event) => {
    isDragging1 = true;
});

handle.addEventListener("touchstart", (event) => {
    isDragging1 = true;
});

// Pendant le glissement
document.addEventListener("mousemove", (event) => {
    if (!isDragging1) return;

    const pumpRect = handle.parentElement.getBoundingClientRect();
    let newTop = event.clientY - pumpRect.top - handleHeight / 2;

    // Contraindre la poignée dans les limites
    if (newTop < 0) newTop = 0;
    if (newTop > pumpHeight - handleHeight) newTop = pumpHeight - handleHeight;

    handle.style.top = `${newTop}px`;

    // Si la poignée est en bas, augmenter la progression
    if (newTop >= pumpHeight - handleHeight - 5) {
        progress = Math.min(progress + 10, 100);
        updateProgressBar();
    }
});

document.addEventListener("touchmove", (event) => {
    if (!isDragging1) return;

    const pumpRect = handle.parentElement.getBoundingClientRect();
    let newTop = event.touches[0].clientY - pumpRect.top - handleHeight / 2;

    // Contraindre la poignée dans les limites
    if (newTop < 0) newTop = 0;
    if (newTop > pumpHeight - handleHeight) newTop = pumpHeight - handleHeight;

    handle.style.top = `${newTop}px`;

    // Si la poignée est en bas, augmenter la progression
    if (newTop >= pumpHeight - handleHeight - 5) {
        progress = Math.min(progress + 10, 100);
        updateProgressBar();
    }
});

// Lorsque l'utilisateur relâche
document.addEventListener("mouseup", () => {
    isDragging1 = false;
    // Retour automatique de la poignée
    handle.style.top = "0px";
});

document.addEventListener("touchend", () => {
    isDragging1 = false;
    // Retour automatique de la poignée
    handle.style.top = "0px";
});

// Réduction progressive
setInterval(() => {
    if (progress > 0) {
        progress -= 0.5;
        updateProgressBar();
        updateWaves()
    }
}, 100);


function updateWaves(){
    const vague1 = document.getElementById("vague1")
    const vague2 = document.getElementById("vague2")

    vague1.style.height = progress * 5 + ""
    vague2.style.height = progress * 5 + ""

}
