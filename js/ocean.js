const meltButton = document.getElementById("meltButton");
const iceberg = document.querySelector(".iceberg");
const dropsContainer = document.querySelector(".drops");

meltButton.addEventListener("click", () => {
    let scale = 1; // Taille initiale
    let melting = true;

    // Activer les gouttes
    dropsContainer.style.display = "block";

    // Générer des gouttes dynamiques
    for (let i = 0; i < 10; i++) {
        const drop = document.createElement("div");
        drop.classList.add("drop");
        drop.style.left = `${Math.random() * 150}px`; // Position aléatoire sous l'iceberg
        drop.style.animationDelay = `${Math.random() * 2}s`;
        dropsContainer.appendChild(drop);
    }

    // Intervalle pour réduire progressivement l'iceberg
    const meltInterval = setInterval(() => {
        if (scale > 0.2) {
            scale -= 0.01; // Réduire la taille progressivement
            iceberg.style.transform = `scale(${scale})`;
        } else {
            clearInterval(meltInterval); // Arrêter l'animation lorsque l'iceberg a disparu
            melting = false;
            meltButton.textContent = "L'iceberg a fondu !";
        }
    }, 100); // Mise à jour toutes les 100 ms

    // Désactiver le bouton
    meltButton.disabled = true;
    meltButton.textContent = "L'iceberg fond...";
});