const iceberg = document.querySelector(".iceberg");
const dropsContainer = document.querySelector(".drops");
const sun = document.getElementById("sun");

let scale = 1; // Taille initiale de l'iceberg
let sunPosition = 50; // Position horizontale du soleil
let meltingSpeed = 0; // Vitesse de fonte
let resetTimeout;

// Ajouter les gouttes
function createDrops() {
    dropsContainer.style.display = "block";
    for (let i = 0; i < 10; i++) {
        const drop = document.createElement("div");
        drop.classList.add("drop");
        drop.style.left = `${Math.random() * 150}px`; // Position aléatoire sous l'iceberg
        drop.style.animationDelay = `${Math.random() * 2}s`;
        dropsContainer.appendChild(drop);
    }
}

// Déplacer le soleil avec la souris
sun.addEventListener("mousedown", (event) => {
    event.preventDefault();
    sun.style.cursor = "grabbing";

    const onMouseMove = (e) => {
        let newTop = Math.max(10, Math.min(e.clientY, window.innerHeight - 100));
        let distanceFromIceberg = window.innerHeight - newTop;

        sun.style.top = `${newTop}px`;
        meltingSpeed = Math.max(0, (window.innerHeight - distanceFromIceberg) / 500); // Plus proche = plus rapide
    };

    const onMouseUp = () => {
        sun.style.cursor = "grab";
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        // Réinitialiser le soleil après 5 secondes d'inactivité
        clearTimeout(resetTimeout);
        resetTimeout = setTimeout(() => {
            sun.style.top = "10%";
            meltingSpeed = 0;
        }, 5000);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
});

// Fondre l'iceberg progressivement
function meltIceberg() {
    if (scale > 0.2 && meltingSpeed > 0) {
        scale -= meltingSpeed;
        iceberg.style.transform = `scale(${scale})`;
    }

    if (scale <= 0.2) {
        meltingSpeed = 0; // Arrêter la fonte lorsque l'iceberg a disparu
    }

    requestAnimationFrame(meltIceberg);
}

// Lancer la fonte
createDrops();
meltIceberg();