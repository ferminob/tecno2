let petalos1 = [];
let petalos2 = [];
let petalos3 = [];

let petalosActual = [];

let colorActual;
let colorObjetivo;

let totalCapas = 6;

let estado = 0;
let capasVisibles = 0;
let contadorVolar = 0;

let varianteActual = 1;
let varianteAnterior = 0;

function preload() {

    for (let i = 0; i < totalCapas; i++) {
        let img = loadImage('var1/capa' + i + '.png');
        petalos1.push(new Petalo(i, img));
    }

    for (let i = 0; i < totalCapas; i++) {
        let img = loadImage('var2/capa' + i + '.png');
        petalos2.push(new Petalo(i, img));
    }

    for (let i = 0; i < totalCapas; i++) {
        let img = loadImage('var3/capa' + i + '.png');
        petalos3.push(new Petalo(i, img));
    }
}

function setup() {

    createCanvas(1562, 1557);

    colorActual = color(21, 145, 106);
    colorObjetivo = color(21, 145, 106);

    for (let p of petalos1) p.crearBuffer();
    for (let p of petalos2) p.crearBuffer();
    for (let p of petalos3) p.crearBuffer();

    petalosActual = petalos1;
}

function draw() {

    colorActual = lerpColor(colorActual, colorObjetivo, 0.03);

    background(colorActual);

    let multiplicador = keyIsDown(71) ? 2 : 1;

    // SOLO dibuja las capas visibles
    for (let i = 0; i < capasVisibles; i++) {

        petalosActual[i].actualizar(multiplicador);
        petalosActual[i].dibujar(i);
    }

    if (estado === 3) {

        contadorVolar++;

        if (contadorVolar > 120) {
            reiniciarObra();
        }
    }
}

function reiniciarObra() {

    // evitar repetir variante
    do {

        varianteActual = Math.floor(Math.random() * 3) + 1;

    } while (varianteActual === varianteAnterior);

    varianteAnterior = varianteActual;

    if (varianteActual === 1) {
        petalosActual = petalos1;
    }

    if (varianteActual === 2) {
        petalosActual = petalos2;
    }

    if (varianteActual === 3) {
        petalosActual = petalos3;
    }

    estado = 0;
    capasVisibles = 0;
    contadorVolar = 0;

    for (let p of petalosActual) {

        p.reset();

        // por si reset limpia buffers
        p.crearBuffer();
    }
    if (varianteActual === 1) {
        petalosActual = petalos1;
        colorObjetivo = color(21, 145, 106);
    }

    if (varianteActual === 2) {
        petalosActual = petalos2;
        colorObjetivo = color(145, 21, 106);
    }

    if (varianteActual === 3) {
        petalosActual = petalos3;
        colorObjetivo = color(106, 21, 145);
    }
}

function keyPressed() {

    if (key === 'r' || key === 'R') {

        reiniciarObra();
    }

    if (key === ' ' && estado === 0) {

        capasVisibles++;

        if (capasVisibles >= totalCapas) {
            estado = 2;
        }

    } else if (key === ' ' && estado === 2) {

        estado = 3;

        for (let p of petalosActual) {
            p.iniciarVuelo();
        }   

    } else if (key === ' ' && estado === 3) {

        reiniciarObra();
    }
}