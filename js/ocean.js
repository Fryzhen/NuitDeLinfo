const iceberg = document.querySelector(".iceberg");
const sun = document.getElementById("sun");
const dropsContainer = document.querySelector(".drops");

let scale = 1; // Taille initiale de l'iceberg
let dragging = false; // État du soleil (en train d'être déplacé ou non)
let offsetX, offsetY; // Décalage entre le soleil et la souris

// Positionner le soleil juste à droite et un peu au-dessus de l'iceberg
function positionSun() {
    const icebergRect = iceberg.getBoundingClientRect();
    const sunX = icebergRect.right + 20; // Positionné juste à droite de l'iceberg
    const sunY = icebergRect.top + (icebergRect.height / 2) - 40; // Un peu plus haut que le centre de l'iceberg
    sun.style.left = `${sunX}px`;
    sun.style.top = `${sunY}px`;
}

// Initialiser la position du soleil
positionSun();

// Gestion du déplacement du soleil
sun.addEventListener("mousedown", (event) => {
    dragging = true;
    sun.style.cursor = "grabbing";

    // Calculer le décalage entre le clic et le coin supérieur gauche du soleil
    offsetX = event.clientX - sun.getBoundingClientRect().left;
    offsetY = event.clientY - sun.getBoundingClientRect().top;
});

document.addEventListener("mousemove", (event) => {
    if (!dragging) return;

    // Suivre la position de la souris avec le décalage calculé
    const sunX = event.clientX - offsetX; // Ajuster la position avec le décalage
    const sunY = event.clientY - offsetY; // Ajuster la position avec le décalage
    sun.style.left = `${Math.max(0, Math.min(window.innerWidth - 80, sunX))}px`;
    sun.style.top = `${Math.max(0, Math.min(window.innerHeight - 80, sunY))}px`;

    // Calculer la distance entre le soleil et l'iceberg
    const icebergRect = iceberg.getBoundingClientRect();
    const distance = Math.abs(sunX - icebergRect.right);

    // Ajuster la taille de l'iceberg en fonction de la distance
    scale = Math.max(0.5, Math.min(2, 2 - distance / 200)); // Distance > 200 rétrécit, < 200 grossit
    iceberg.style.transform = `scale(${scale})`;

    // Afficher les gouttes sur l'iceberg uniquement quand il rétrécit
    if (scale < 1) {
        dropsContainer.style.display = "flex"; // Afficher les gouttes
        // Positionner les gouttes sur l'iceberg
        const icebergPosition = iceberg.getBoundingClientRect();
        dropsContainer.style.left = `${icebergPosition.left + icebergPosition.width / 2 - 10}px`; // Centrer les gouttes
        dropsContainer.style.top = `${icebergPosition.top + icebergPosition.height}px`; // Placer les gouttes juste en dessous de l'iceberg
    } else {
        dropsContainer.style.display = "none"; // Cacher les gouttes si l'iceberg est à sa taille initiale
    }
});

document.addEventListener("mouseup", () => {
    dragging = false;
    sun.style.cursor = "grab";
});

// Animation continue de l'iceberg
function animateIceberg() {
    if (scale <= 0.5) {
        console.log("L'iceberg a fondu !");
    }
    requestAnimationFrame(animateIceberg);
}

animateIceberg();