class Petalo {

    constructor(id, img) {

        this.id = id;
        this.img = img;

        this.buffer = null;

        this.rotacion = 0;
        this.velocidadGiro = random(0.005, 0.02);

        // movimiento organico
        this.offsetX = random(-120, 120);
        this.offsetY = random(-120, 120);

        this.velX = 0;
        this.velY = 0;

        this.rotacionVuelo = 0;
        this.velRotacionVuelo = random(-0.08, 0.08);
    }

    crearBuffer() {

        this.buffer = createGraphics(width, height);
    }

    actualizar(mult) {

        // giro central
        if (estado === 2) {

            this.rotacion += (this.velocidadGiro * mult) * (this.id + 1);
        }

        // vuelo organico
        if (estado === 3) {

            this.offsetX += this.velX * mult;
            this.offsetY += this.velY * mult;

            this.rotacionVuelo += this.velRotacionVuelo * mult;

            // aceleracion suave hacia afuera
            this.velY -= 0.15 * mult;

            // deriva lateral
            this.velX *= 1.01;
        }
    }

    dibujar(indice) {

        if (this.buffer && (estado > 0 || indice < capasVisibles)) {

            this.buffer.clear();

            this.buffer.push();

            // CENTRO
            this.buffer.translate(width / 2, height / 2);

            // giro principal
            if (estado === 2) {

                this.buffer.rotate(this.rotacion);
            }

            // movimiento organico en vuelo
            if (estado === 3) {

                this.buffer.translate(this.offsetX, this.offsetY);
                this.buffer.rotate(this.rotacionVuelo);
            }

            this.buffer.translate(-width / 2, -height / 2);

            if (this.img) {

                this.buffer.image(this.img, 0, 0);
            }

            this.buffer.pop();

            image(this.buffer, 0, 0);
        }
    }

    iniciarVuelo() {

        // direccion basada en posicion/indice
        let angulo = map(this.id, 0, totalCapas - 1, -PI * 0.8, -PI * 0.2);

        // variacion organica
        angulo += random(-0.5, 0.5);

        let fuerza = random(8, 18);

        this.velX = cos(angulo) * fuerza;
        this.velY = sin(angulo) * fuerza;

        this.velRotacionVuelo = random(-0.15, 0.15);
    }

    reset() {

        this.rotacion = 0;

        this.offsetX = 0;
        this.offsetY = 0;

        this.velX = 0;
        this.velY = 0;

        this.rotacionVuelo = 0;
    }
}