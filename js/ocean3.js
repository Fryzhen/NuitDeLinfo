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
