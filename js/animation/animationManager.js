class AnimationManager{

    constructor(){

        this.animaciones = [];

        EventBus.on(
            "buttonPressed",
            datos => {

                // Si ya existe una animación para
                // este elemento, eliminarla.
                this.animaciones =
                    this.animaciones.filter(
                        animacion =>
                            animacion.elemento !==
                            datos.elemento
                    );


                const animacion =
                    AnimationFactory.crear(
                        datos.animacion?.tipo ?? "glow",
                        datos.elemento,
                        datos.animacion
                    );


                if(animacion){

                    this.animaciones.push(
                        animacion
                    );

                }

            }
        );


        EventBus.on(
            "buttonReleased",
            datos => {

                for(const animacion of this.animaciones){

                    if(
                        animacion.elemento ===
                        datos.elemento
                    ){

                        if(
                            typeof animacion.soltar ===
                            "function"
                        ){

                            animacion.soltar();

                        }

                    }

                }

            }
        );

    }


    agregar(animacion){

        // Evitar dos animaciones sobre
        // el mismo elemento.

        this.animaciones =
            this.animaciones.filter(
                existente =>
                    existente.elemento !==
                    animacion.elemento
            );


        this.animaciones.push(
            animacion
        );

    }


    actualizar(){

        const ahora =
            performance.now();


        this.animaciones =
            this.animaciones.filter(

                animacion =>
                    animacion.actualizar(ahora)

            );

    }

}
