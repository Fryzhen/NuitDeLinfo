import {gameover} from './gameover.js';
const bonhomme = document.getElementById("bonhomme");
const temperatureBar = document.getElementById("temperatureBar");

const images = {
    red: "../img/bonhommerouge.png",
    green: "../img/bonhommevert.png",
    blue: "../img/bonhommebleu.png",
};

const changeBonhommeImage = (color) => {
    bonhomme.src = images[color];
};

let greenStartTime = null;
let timeSick = null;
const checkGreenDuration = () => {
    if (timeSick && (Date.now() - timeSick) / 1000 > 10) {
        gameover("avez laissé geler/bruler votre corp!"); // cheh
    }
    if (bonhomme.src.includes("vert") && greenStartTime) {
        if ((Date.now() - greenStartTime) / 1000 > 5) {
            const isRed = Math.random() < 0.5;
            changeBonhommeImage(isRed ? "red" : "blue");
            temperatureBar.value = isRed
                ? Math.random() * (40 - 37.5) + 37.5
                : Math.random() * (36.5 - 34) + 34;
            greenStartTime = null;
            timeSick = Date.now();
        }
    }
};

setInterval(() => checkGreenDuration(), 500);

temperatureBar.addEventListener("input", () => {
    const temp = +temperatureBar.value;
    if (temp === 37) {
        if (!greenStartTime) greenStartTime = Date.now();
        changeBonhommeImage("green");
        timeSick = null
    }
    else {
        greenStartTime = null;
        changeBonhommeImage(temp < 37 ? "blue" : "red");
    }
});

changeBonhommeImage("green");
greenStartTime = Date.now();