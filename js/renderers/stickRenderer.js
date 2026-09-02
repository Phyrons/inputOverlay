class StickRenderer extends BaseRenderer{


    constructor(perfil){

        super(perfil);

    }



    actualizar(gamepad){


        if(!this.perfil)
            return;



        for(const nombre in this.perfil.sticks){


            const info =
            this.perfil.sticks[nombre];



            const stick =
			this.obtenerElemento(
				info.svg
			);



            if(!stick)
                continue;



            let x = (gamepad.axes && gamepad.axes[info.ejeX] !== undefined) 
				? gamepad.axes[info.ejeX] 
				: 0;

			let y = (gamepad.axes && gamepad.axes[info.ejeY] !== undefined) 
				? gamepad.axes[info.ejeY] 
				: 0;



            const deadzone =
			info.deadzone ??
			this.perfil.configuracion.deadzoneDefault;

			x =
			this.aplicarDeadzone(
				x,
				deadzone
			);

			y =
			this.aplicarDeadzone(
				y,
				deadzone
			);



            // Movimiento

            // Movimiento relativo al centro
            this.moverElemento(
                stick,
                x * info.recorrido,
                y * info.recorrido
            );



            // Click L3/R3

            if(info.botonClick !== undefined){

                const botonClick =
                gamepad.buttons[
                    info.botonClick
                ];

                if(!botonClick)
                    continue;


                const presionado =
                botonClick.pressed;



                const estilo =
				this.obtenerEstilo(
					"stick",
					presionado
				);



                this.aplicarEstilo(
                    stick,
                    estilo
                );


            }


        }


    }

}
