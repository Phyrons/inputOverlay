class ButtonRenderer extends BaseRenderer{

    constructor(perfil){

        super(perfil);

        this.estadoAnterior = {};

        this.animaciones = {};

        this.diseño = null;

    }


    actualizar(gamepad){

        if(!this.perfil)
            return;


        for(const nombre in this.perfil.botones){

            const info =
                this.perfil.botones[nombre];


            const boton =
                gamepad.buttons[info.indice];


            if(!boton)
                continue;


            const elemento =
                this.obtenerElemento(
                    info.svg
                );


            if(!elemento)
                continue;


            const interno =
				info.interno
					? this.obtenerElemento(info.interno)
					: null;


			const texto =
				info.texto
					? this.obtenerElemento(info.texto)
					: null;


            const presionado =
                boton.pressed;


            const anterior =
                this.estadoAnterior[nombre]
                || false;


            /*
             * ==============================
             * PRESIONADO
             * ==============================
             */

            if(presionado){

                const color =
                    info.animacion?.color
                    ??
                    this.perfil.estilo.activo.fill;


                const opacidad =
                    info.animacion?.opacidad
                    ??
                    1;


                /*
                 * Botón principal
                 */

                elemento.style.fill =
                    color;

                elemento.style.fillOpacity =
                    opacidad;


                /*
                 * Aro interior
                 */

                if(interno){

                    interno.style.stroke =
                        color;

                    interno.style.strokeOpacity =
                        opacidad;

                }


                /*
                 * Texto
                 */

                if(texto){

                    texto.style.fill =
                        color;

                    texto.style.fillOpacity =
                        opacidad;

                }

            }


            /*
             * ==============================
             * SOLTADO
             * ==============================
             */

            else{

                /*
                 * El color normal del diseño
                 * será restaurado por
                 * Renderer.aplicarDiseño().
                 */

                if(this.diseño){

                    this.restaurarElementoDiseño(
                        elemento
                    );


                    if(interno)
                        this.restaurarElementoDiseño(
                            interno
                        );


                    if(texto)
                        this.restaurarElementoDiseño(
                            texto
                        );

                }

                else{

                    this.aplicarEstilo(
                        elemento,
                        this.perfil.estilo.normal
                    );

                }

            }


            /*
             * ==============================
             * NUEVA PULSACIÓN
             * ==============================
             */

            if(
                presionado &&
                !anterior
            ){

                EventBus.emit(
                    "buttonPressed",
                    {
                        nombre:
                            nombre,

                        elemento:
                            elemento,

                        interno:
                            interno,

                        texto:
                            texto,

                        animacion:
                            info.animacion
                    }
                );

            }


            /*
             * ==============================
             * LIBERACIÓN
             * ==============================
             */

            if(
                !presionado &&
                anterior
            ){

                EventBus.emit(
                    "buttonReleased",
                    {
                        nombre:
                            nombre,

                        elemento:
                            elemento,

                        interno:
                            interno,

                        texto:
                            texto
                    }
                );

            }


            this.estadoAnterior[nombre] =
                presionado;

        }

    }


    restaurarElementoDiseño(elemento){

        if(!elemento)
            return;


        const clave =
            elemento.dataset.diseño;


        if(!clave)
            return;


        if(
            !this.diseño ||
            !this.diseño.colores
        )
            return;


        const color =
            this.diseño.colores[clave];


        if(color === undefined)
            return;


        const tipo =
            elemento.dataset.diseñoTipo
            ??
            "fill";


        if(tipo === "stroke"){

            elemento.style.stroke =
                color;

        }

        else if(tipo === "stop-color"){

            elemento.style.stopColor =
                color;

        }

        else{

            elemento.style.fill =
                color;

        }


        elemento.style.fillOpacity =
            "";


        elemento.style.strokeOpacity =
            "";

    }

}