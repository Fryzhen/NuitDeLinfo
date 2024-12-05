// Récupérer les éléments
const cursorImage = document.getElementById('cursorImage');
const poubelle = document.getElementById('poubelle');
const container = document.getElementById('container');

let isDragging = false;  // Variable pour savoir si le déchet est en train d'être déplacé

// Ajouter un événement mousemove sur le container pour déplacer le déchet
container.addEventListener('mousemove', function(event) {
    if (isDragging) {
        // Récupérer les coordonnées de la souris
        const mouseX = event.clientX - container.offsetLeft;
        const mouseY = event.clientY - container.offsetTop;

        // Déplacer l'image pour qu'elle suive la souris
        cursorImage.style.left = mouseX - cursorImage.width / 2 + 'px';  // Centrer l'image sur la souris
        cursorImage.style.top = mouseY - cursorImage.height / 2 + 'px';  // Centrer l'image sur la souris
    }
});

// Lorsque la souris appuie sur l'image des déchets, activer le drag
cursorImage.addEventListener('mousedown', function() {
    isDragging = true;
});

// Lorsque la souris relâche le clic, arrêter le drag
window.addEventListener('mouseup', function() {
    isDragging = false;
});

// Lorsque l'image des déchets entre en contact avec la poubelle
poubelle.addEventListener('mouseenter', function() {
    if (isDragging) {
        // Cacher l'image du déchet en la déplaçant derrière la poubelle
        cursorImage.style.zIndex = -1;  // Mettre l'image derrière la poubelle
        cursorImage.style.left = poubelle.offsetLeft + (poubelle.offsetWidth - cursorImage.width) / 2 + 'px';
        cursorImage.style.top = poubelle.offsetTop + (poubelle.offsetHeight - cursorImage.height) / 2 + 'px';
        isDragging = false;
    }
});
