const iceberg = document.querySelector(".iceberg");
const sun = document.getElementById("sun");
const dropsContainer = document.querySelector(".drops");


let scale = 1; // Taille initiale de l'iceberg
let isDragging = false;
let offsetX, offsetY;

sun.addEventListener('mousedown', (e) => {
    isDragging = true;
    // Calculer l'offset entre la position de la souris et la position du soleil
    offsetX = e.clientX - sun.getBoundingClientRect().left;
    offsetY = e.clientY - sun.getBoundingClientRect().top;
});
document.addEventListener('mousemove', (e) => {

    if (isDragging) {
        // Mettre à jour la position du soleil en fonction de la position de la souris
        const sunX = e.clientX - offsetX ;
        const sunY = e.clientY - offsetY;
        sun.style.left = `${sunX}px`;
        sun.style.top = `${sunY}px`;
    }

});
// Positionner le soleil juste à droite et un peu au-dessus de l'iceberg
function positionSun() {
    const icebergRect = iceberg.getBoundingClientRect();
    const sunX = icebergRect.right/10 + 400; // Positionné juste à droite de l'iceberg
    const sunY = icebergRect.top + (icebergRect.height / 2) - 40; // Un peu plus haut que le centre de l'iceberg
    sun.style.left = `${sunX}px`;
    sun.style.top = `${sunY}px`;
}
document.addEventListener('mouseup', () => {
    isDragging = false; // Arrêter le drag lorsque la souris est relâchée
});
// Appeler la fonction pour positionner le soleil initialement

positionSun();

// Initialiser la position du soleil

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
    const sunX = event.clientX - offsetX - 950; // Ajuster la position avec le décalage
    const sunY = event.clientY - offsetY; // Ajuster la position avec le décalage
    sun.style.left = `${Math.max(0, Math.min(window.innerWidth - 80, sunX))}px`;
    sun.style.top = `${Math.max(0, Math.min(window.innerHeight - 80, sunY))}px`;

    // Calculer la distance entre le soleil et l'iceberg
    const icebergRect = iceberg.getBoundingClientRect();
    const distance = Math.abs(sunX - icebergRect.right);


    // Ajuster la taille de l'iceberg en fonction de la distance
    if(distance >= 1240 || distance <= 820){
        dropsContainer.style.display = "none";
        scale=1;
    }else{
        dropsContainer.style.display = "flex"; // Afficher les gouttes

        const icebergPosition = iceberg.getBoundingClientRect();

        dropsContainer.style.left = `${icebergPosition.left-958 + icebergPosition.width / 2 - 10}px`; // Centrer les gouttes
        dropsContainer.style.top = `${icebergPosition.top + icebergPosition.height - 20}px`; // Placer les gouttes juste en dessous de l'iceberg
        if(distance>1000){
            scale= Math.max(0.5,(distance-1050)/200)
        }else{
            scale= Math.max(0.5,(1050-distance)/200)
        }

    }
    console.log(distance);
    iceberg.style.transform = `scale(${scale})`;

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