const bonhomme = document.getElementById("bonhomme");
const temperatureBar = document.getElementById("temperatureBar");

const images = {
    red: "../images/bonhommerouge.png",
    green: "../images/bonhommevert.png",
    blue: "../images/bonhommebleu.png",
};

const changeBonhommeImage = (color) => {
    bonhomme.src = images[color];
};

let greenStartTime = null;

const checkGreenDuration = () => {
    if (bonhomme.src.includes("vert") && greenStartTime) {
        console.log("checkGreenDuration", (Date.now() - greenStartTime) / 1000);
        if ((Date.now() - greenStartTime) / 1000 > 5) {
            const isRed = Math.random() < 0.5;
            changeBonhommeImage(isRed ? "red" : "blue");
            temperatureBar.value = isRed
                ? Math.random() * (40 - 37.5) + 37.5
                : Math.random() * (36.5 - 34) + 34;
            greenStartTime = null;
        }
    }
};

setInterval(() => checkGreenDuration(), 500);

temperatureBar.addEventListener("input", () => {
    console.log("temperatureBar", temperatureBar.value);
    const temp = +temperatureBar.value;
    if (temp === 37) {
        if (!greenStartTime) greenStartTime = Date.now();
        changeBonhommeImage("green");
    }
    else {
        greenStartTime = null;
        changeBonhommeImage(temp < 37 ? "blue" : "red");
    }
});

changeBonhommeImage("green");
greenStartTime = Date.now();