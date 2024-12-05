
const caca = document.getElementById("caca")
const button = document.getElementById("button")
console.log(caca.value)

button.addEventListener("click", () => {
    caca.value = +caca.value + 1
})

// fait un compteur qui augment caca tout les 1 secondes
setInterval(() => {
    caca.value = +caca.value + 1
}, 1000)