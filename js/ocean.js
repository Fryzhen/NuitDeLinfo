const meltButton = document.getElementById("meltButton");
const glacier = document.querySelector(".glacier");

meltButton.addEventListener("click", () => {
    // Réduire la hauteur du glacier
    glacier.style.height = "50px";
    // Changer la couleur pour simuler de l'eau
    glacier.style.backgroundColor = "#87ceeb";

    // Optionnel : désactiver le bouton une fois cliqué
    meltButton.disabled = true;
    meltButton.textContent = "Le glacier fond...";
});