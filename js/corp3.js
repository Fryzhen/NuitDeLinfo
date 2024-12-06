import {gameover} from './gameover.js';
const container = document.getElementById('container-globule');
const globule = document.getElementById('globule');
const viirusSize = 50; // Suppose que la largeur et hauteur de viirus sont de 50px
let viirusId = 0; // Identifiant unique pour chaque viirus
let activeViirusCount = 0; // Compteur d'images viirus actives

function createViirus(id) {
    const img = document.createElement('img');
    img.src = 'img/viruus-bleu.png';
    img.id = `viirus-${id}`;
    img.style.position = 'absolute';

    let posLeft, posTop;
    let viirusRect;
    const globuleRect = globule.getBoundingClientRect();

    // Trouver une position qui n'est pas sur l'image globule
    do {
        posLeft = Math.random() * (window.innerWidth / 2) - 20; // Décaler légèrement vers la gauche
        posTop = (window.innerHeight * 2 / 3) - 50 + Math.random() * (window.innerHeight / 3); // Décaler vers le haut

        viirusRect = {
            left: posLeft, top: posTop, right: posLeft + viirusSize, bottom: posTop + viirusSize
        };

    } while (viirusRect.right > globuleRect.left && viirusRect.left < globuleRect.right && viirusRect.bottom > globuleRect.top && viirusRect.top < globuleRect.bottom);

    img.style.left = `${posLeft}px`;
    img.style.top = `${posTop}px`;

    container.appendChild(img);
    activeViirusCount++;
    return img;
}

function isColliding(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
}

function addDraggableBehavior(viirus) {
    viirus.addEventListener('mousedown', (e) => {
        let shiftX = e.clientX - viirus.getBoundingClientRect().left;
        let shiftY = e.clientY - viirus.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            viirus.style.left = pageX - shiftX + 'px';
            viirus.style.top = pageY - shiftY + 'px';

            if (isColliding(viirus, globule)) {
                viirus.style.opacity = '0';
                setTimeout(() => {
                    viirus.remove(); // Retire l'image du DOM
                    activeViirusCount--; // Diminue le compteur de viirus
                }, 300);
                document.removeEventListener('mousemove', onMouseMove);
            }
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        viirus.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            viirus.onmouseup = null;
        };
    });

    viirus.ondragstart = function () {
        return false;
    };
}

setInterval(() => {
    if (activeViirusCount < 8) {
        const viirus = createViirus(viirusId++);
        addDraggableBehavior(viirus);
    }
    else {
        gameover("n'avez pas tués tous les virus à temps!");
    }
}, 3000); // Génère un nouveau viirus toutes les secondes
