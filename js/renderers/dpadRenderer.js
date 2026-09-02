class DpadRenderer extends BaseRenderer{

    constructor(perfil){

        super(perfil);

    }

    actualizar(gamepad){

        if(!this.perfil.dpad)
            return;

        for(const direccion in this.perfil.dpad){

            if(direccion === "tipo")
                continue;

            const info =
            this.perfil.dpad[direccion];

            const elemento =
			this.obtenerElemento(
				info.svg
			);

            if(!elemento)
                continue;

            let presionado = false;

            if(this.perfil.dpad.tipo === "botones"){

                const boton =
                gamepad.buttons[info.indice];

                if(!boton)
                    continue;

                presionado = boton.pressed;

            }
            else if(this.perfil.dpad.tipo === "ejes"){

                const valor =
                gamepad.axes[info.eje] ?? 0;

                const umbral =
                info.umbral ?? 0.5;

                presionado =
                info.direccion < 0
                    ? valor <= -umbral
                    : valor >= umbral;

            }
            else{
                continue;
            }

            const estilo =
			this.obtenerEstilo(
				"dpad",
				presionado
			);

            this.aplicarEstilo(
				elemento,
				estilo
			);

        }

    }

}
