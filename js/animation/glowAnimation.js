class GlowAnimation extends BaseAnimation{

    constructor(elemento, opciones = {}){

        super(
            elemento,
            opciones.duracion ?? 300
        );

        this.color =
            opciones.color ?? "#00ff66";

        this.intensidad =
            opciones.intensidad ?? 10;

        this.presionado = true;

        this.saliendo = false;

    }


    actualizar(ahora){

        const t =
            this.progreso(ahora);


        if(this.presionado){

            /*
             * Entrada del glow
             */

            const fuerza =
                Math.sin(
                    Math.min(t, 1) * Math.PI / 2
                );


            this.elemento.style.filter =
                `drop-shadow(
                    0 0 ${this.intensidad * fuerza}px ${this.color}
                )`;


            /*
             * Cuando termina la entrada,
             * dejamos el glow al máximo.
             */

            if(t >= 1){

                this.elemento.style.filter =
                    `drop-shadow(
                        0 0 ${this.intensidad}px ${this.color}
                    )`;

                return true;

            }


            return true;

        }


        /*
         * Animación de salida
         */

        const fuerza =
            1 -
            Math.min(t, 1);


        this.elemento.style.filter =
            `drop-shadow(
                0 0 ${this.intensidad * fuerza}px ${this.color}
            )`;


        if(t >= 1){

            this.elemento.style.filter =
                "none";

            return false;

        }


        return true;

    }


    soltar(){

        if(!this.presionado)
            return;


        this.presionado = false;

        this.saliendo = true;

        /*
         * Reiniciamos el contador para que
         * la salida empiece desde el glow máximo.
         */

        this.inicio =
            performance.now();

    }

}