class AnimationFactory{


    static crear(tipo, elemento, opciones={}){


        switch(tipo){


            case "glow":

                return new GlowAnimation(
                    elemento,
                    opciones
                );
				
			case "pulse": 
				
				return new PulseAnimation( 
					elemento, 
					opciones 
				);
				
			case "press":

			return new PressAnimation(
				elemento,
				opciones
			);

            default:

                console.warn(
                    "Animación desconocida:",
                    tipo
                );

                return null;


        }


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