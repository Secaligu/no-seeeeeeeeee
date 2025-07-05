const rompecabezas = document.getElementById('rompecabezas');
const pieza = [];

for (let i = 1; i < 9; i++) {
    const img = document.createElement("img");
    img.src = `img/img${i}.jpg`;
    img.classList.add("piezas");
    img.draggable = true;
    img.dataset.orden = i;
    pieza.push(img);
}

pieza.sort(() => Math.random() - 0.5);

pieza.forEach(p => rompecabezas.appendChild(p));

let piezaARRASTRADA = null;

rompecabezas.addEventListener("dragstart", e => {
    if (e.target.classList.contains("piezas")) {
        piezaARRASTRADA = e.target;
    }
});

rompecabezas.addEventListener("dragover", e => {
    e.preventDefault();
});

rompecabezas.addEventListener("drop", e => {
    if (e.target.classList.contains("piezas") && piezaARRASTRADA !== e.target) {
        const nodo1 = piezaARRASTRADA;
        const nodo2 = e.target;

        const clonado1 = nodo1.cloneNode(true);
        const clonado2 = nodo2.cloneNode(true);

        rompecabezas.replaceChild(clonado1, nodo2);
        rompecabezas.replaceChild(clonado2, nodo1);

        verificarrompecabezas();
    }
});

function verificarrompecabezas() {
    const piezasActuales = [...rompecabezas.children];
    const correcto = piezasActuales.every((pieza, i) => parseInt(pieza.dataset.orden) === i + 1);
    if (correcto) {
        document.getElementById('sonido').play();
    }
}
