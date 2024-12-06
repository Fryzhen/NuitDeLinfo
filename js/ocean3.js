
// Fonction pour générer une nouvelle image de déchet
function generateDechet() {
    // Afficher l'alerte "Attention, pense à trier"

    alert('Attention, pense à trier !');


    const dechet = document.createElement('img');
    dechet.src = 'images/dechets1.png'; // Image du déchet
    dechet.alt = 'Déchet';
    dechet.style.position = 'absolute';
    dechet.style.width = '50px';
    dechet.style.height = '50px';
    dechet.style.pointerEvents = 'none';
    dechet.style.left = `${Math.random() * 90}%`; // Position horizontale aléatoire
    dechet.style.top = '0px'; // Position de départ en haut
    document.getElementById('container').appendChild(dechet);

    let dechetTop = 0;
    let isTouchedByPoubelle = false; // Variable pour savoir si le déchet a été touché par la poubelle

    let interval = setInterval(() => {
        if (dechetTop < 200) { // Limite de la hauteur du container
            dechetTop += 2;
            dechet.style.top = dechetTop + 'px';
        } else {
            clearInterval(interval); // Arrêter l'animation du déchet
        }
        checkCollision(dechet); // Vérifier la collision avec la poubelle
    }, 20); // Animation de la chute

}

// Vérifier si le déchet entre en collision avec la poubelle
function checkCollision(dechet) {
    const poubelle = document.getElementById('poubelle');
    const dechetRect = dechet.getBoundingClientRect();
    const poubelleRect = poubelle.getBoundingClientRect();
    let isTouchedByPoubelle = false;

    // Vérifier si les rectangles de l'image de déchet et de la poubelle se chevauchent
    if (
        dechetRect.top < poubelleRect.bottom &&
        dechetRect.bottom > poubelleRect.top &&
        dechetRect.left < poubelleRect.right &&
        dechetRect.right > poubelleRect.left
    ) {
        // Si collision, supprimer le déchet du DOM et marquer qu'il a été récupéré
        dechet.remove();
        isTouchedByPoubelle = true; // Le déchet a été récupéré
    }

    return isTouchedByPoubelle;
}

// Faire déplacer la poubelle avec le curseur de la souris
function movePoubelle(e) {
    const poubelle = document.getElementById('poubelle');
    const container = document.getElementById('container');

    // Calculer la position du curseur par rapport au conteneur
    const containerRect = container.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    // Placer la poubelle à la position du curseur
    poubelle.style.left = `${mouseX - poubelle.offsetWidth / 2}px`;  // Centrer la poubelle sur le curseur
    poubelle.style.top = `${mouseY - poubelle.offsetHeight / 2}px`;   // Centrer la poubelle sur le curseur
}

// Ajouter un écouteur d'événement pour déplacer la poubelle avec le curseur
document.addEventListener('mousemove', movePoubelle);

// Générer un nouveau déchet toutes les 5 secondes
setInterval(generateDechet, 5000); // Intervalle de 5 secondes


//--------------------------------------------------------------------------------------------------------------------------------------

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
