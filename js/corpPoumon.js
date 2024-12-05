document.addEventListener("DOMContentLoaded", function() {
    const imgPoumon = document.getElementById('imgPoumon');
    const respirer = document.getElementById('respirer');
    const barreInterne = document.getElementById('oxygene-barre-interne');
    const tempsRestant = document.getElementById('temps-restant');
    const background = document.getElementById('poumon');

    let interval;
    let currentWidth = 100;
    const totalTime = 10; // Durée totale en secondes
    const decrementPerInterval = 100 / (totalTime * 20); // 20 intervalles par seconde
    let timeRemaining = totalTime; // Temps restant en secondes

    let oxygeneBarreInterne = document.getElementById('oxygeneBarreInterne');
    let gameOverMessage = document.getElementById('gameOver');
    let oxygeneLevel = 100; // Niveau d'oxygène initial

    function respirerPoumon() {
        imgPoumon.style.transform = 'scale(1.15)';
        setTimeout(() => {
            imgPoumon.style.transform = 'scale(1)';
        }, 500);
    }

    function reduireBarreOxygene() {
        if (currentWidth > 0) {
            currentWidth -= decrementPerInterval;
            imgPoumon.style.opacity = currentWidth / 100;
            barreInterne.style.width = currentWidth + '%';
            timeRemaining = Math.ceil((currentWidth / 100) * totalTime); // Met à jour le temps restant
            tempsRestant.textContent = timeRemaining + 's'; // Affiche le temps restant
            const greenValue = Math.floor((currentWidth / 100) * 255); // Calcule la valeur verte
            background.style.backgroundColor = `rgb(${0}, ${greenValue}, ${0})`;
        } else {
            clearInterval(interval);
            gameOverMessage.style.display = 'block'
            respirer.disabled = true;
        }
    }

    function resetBarreOxygene() {
        currentWidth = 100; // Réinitialise la largeur de la barre à 100%
        barreInterne.style.width = '100%'; // Met à jour l'affichage de la barre
        timeRemaining = totalTime; // Réinitialise le temps restant
        tempsRestant.textContent = timeRemaining + 's'; // Réinitialise l'affichage du temps
        clearInterval(interval); // Arrête l'intervalle précédent
        interval = setInterval(reduireBarreOxygene, 50); // Démarre un nouvel intervalle
    }

    respirer.addEventListener('click', function() {
        if(!respirer.disabled){
            respirerPoumon();
            resetBarreOxygene();
        }
    });

    // Démarre l'intervalle pour réduire la barre d'oxygène
    interval = setInterval(reduireBarreOxygene, 50);
});