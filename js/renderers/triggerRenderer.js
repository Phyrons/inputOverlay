class TriggerRenderer extends BaseRenderer {

    constructor(perfil) {

        super(perfil);

        this.diseño = null;

    }


    actualizar(gamepad) {

        if (!this.perfil || !gamepad || !gamepad.buttons)
            return;


        for (const nombre in this.perfil.triggers) {

            const info =
                this.perfil.triggers[nombre];


            const boton =
                gamepad.buttons[info.indice];


            if (!boton)
                continue;


            const elemento =
                this.obtenerElemento(
                    info.svg
                );


            if (!elemento)
                continue;


            /*
             * ==============================
             * ELEMENTOS SECUNDARIOS
             * ==============================
             */

            const interno =
                info.interno
                    ? this.obtenerElemento(
                        info.interno
                    )
                    : null;


            const texto =
                info.texto
                    ? this.obtenerElemento(
                        info.texto
                    )
                    : null;


            /*
             * ==============================
             * VALOR DEL TRIGGER
             * ==============================
             */

            const valor =
                Math.max(
                    0,
                    Math.min(
                        1,
                        Number(boton.value) || 0
                    )
                );


            /*
             * ==============================
             * COLOR ACTIVO
             * ==============================
             */

            const estilo =
                this.perfil.estilo?.trigger;


            const colorBase =
                estilo?.color ??
                [0, 255, 100];


            const color =
                `rgb(
                    ${colorBase[0]},
                    ${colorBase[1]},
                    ${colorBase[2]}
                )`;


            /*
             * ==============================
             * TRIGGER PRESIONADO
             * ==============================
             *
             * IMPORTANTE:
             *
             * No coloreamos "elemento" completo.
             *
             * LT / RT son el contenedor principal
             * y dentro tienen:
             *
             *     LT
             *      ├── LTbutton
             *      └── LTtext
             *
             *     RT
             *      ├── RTbutton
             *      └── RTtext
             *
             * El elemento "interno" es el que debe
             * iluminarse, igual que LB / RB.
             */

            if (valor > 0.1) {

                /*
                 * ==========================
                 * BOTÓN DEL TRIGGER
                 * ==========================
                 */

                if (interno) {

                    interno.style.fill =
                        color;

                    interno.style.fillOpacity =
                        1;

                }


                /*
                 * ==========================
                 * TEXTO
                 * ==========================
                 *
                 * No lo coloreamos por defecto.
                 *
                 * Así LT/RT conservan exactamente
                 * el diseño visual original.
                 */

                if (texto) {

                    texto.style.fillOpacity =
                        "";

                }


                /*
                 * ==========================
                 * GLOW
                 * ==========================
                 *
                 * El glow se aplica al elemento
                 * principal, pero NO modificamos
                 * su fill.
                 */

                if (estilo?.shadow) {

                    elemento.style.filter =
                        estilo.shadow;

                }

            }


            /*
             * ==============================
             * TRIGGER LIBERADO
             * ==============================
             */

            else {

                /*
                 * ==========================
                 * LIMPIAR EFECTOS TEMPORALES
                 * ==========================
                 */

                elemento.style.filter =
                    "";

                elemento.style.fillOpacity =
                    "";

                elemento.style.strokeOpacity =
                    "";


                if (interno) {

                    interno.style.fill =
                        "";

                    interno.style.fillOpacity =
                        "";

                    interno.style.strokeOpacity =
                        "";

                    interno.style.filter =
                        "";

                }


                if (texto) {

                    texto.style.fill =
                        "";

                    texto.style.fillOpacity =
                        "";

                    texto.style.strokeOpacity =
                        "";

                    texto.style.filter =
                        "";

                }


                /*
                 * ==========================
                 * RESTAURAR DISEÑO
                 * ==========================
                 */

                this.restaurarElementoDiseño(
                    elemento
                );


                if (interno) {

                    this.restaurarElementoDiseño(
                        interno
                    );

                }


                if (texto) {

                    this.restaurarElementoDiseño(
                        texto
                    );

                }

            }

        }

    }


    restaurarElementoDiseño(elemento) {

        if (!elemento)
            return;


        const clave =
            elemento.dataset.diseño;


        if (!clave)
            return;


        if (
            !this.diseño ||
            !this.diseño.colores
        )
            return;


        const color =
            this.diseño.colores[clave];


        if (color === undefined)
            return;


        const tipo =
            elemento.dataset.diseñoTipo
            ?? "fill";


        if (tipo === "stroke") {

            elemento.style.stroke =
                color;

        }

        else if (tipo === "stop-color") {

            elemento.style.stopColor =
                color;

        }

        else {

            elemento.style.fill =
                color;

        }

    }

}