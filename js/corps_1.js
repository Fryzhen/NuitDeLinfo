document.addEventListener("DOMContentLoaded", () => {
    const bonhomme = document.getElementById("corps_1");
    const temperatureBar = document.getElementById("temperatureBar");

    const images = {
        red: "../images/bonhommerouge.png",
        green: "../images/bonhommevert.png",
        blue: "../images/bonhommebleu.png",
    };

    const changeBonhommeImage = (color) => {
        bonhomme.style.backgroundImage = `url(${images[color]})`;
        bonhomme.setAttribute("data-color", color);
    };

    let greenStartTime = null;

    const checkGreenDuration = () => {
        if (bonhomme.getAttribute("data-color") === "green" && greenStartTime) {
            const timeInGreen = (Date.now() - greenStartTime) / 1000;
            if (timeInGreen >= 5) {
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
        const temp = parseFloat(temperatureBar.value);
        if (temp === 37) {
            if (!greenStartTime) greenStartTime = Date.now();
            changeBonhommeImage("green");
        } else {
            greenStartTime = null;
            changeBonhommeImage(temp < 37 ? "blue" : "red");
        }
    });

    changeBonhommeImage("green");
});
