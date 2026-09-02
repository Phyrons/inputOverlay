class BaseRenderer{

    constructor(perfil){

        this.perfil = perfil;
		
		this.diseño = null;

    }

    obtenerElemento(id){

        return document.getElementById(id);

    }

    aplicarEstilo(elemento, estilo){

        if(!elemento || !estilo)
            return;

        if(estilo.fill !== undefined){

            elemento.style.fill =
				estilo.fill;
        }

        elemento.style.filter =
        estilo.shadow ?? "none";

    }

    obtenerEstilo(tipo, activo){

        if(!this.perfil.estilo)
            return null;

        switch(tipo){

            case "trigger":

                return this.perfil.estilo.trigger ?? null;

            case "stick":

				return activo && this.perfil.estilo.stick
					? this.perfil.estilo.stick
					: this.perfil.estilo.normal;

            default:

                return activo
                    ? this.perfil.estilo.activo
                    : this.perfil.estilo.normal;

        }

    }
	
	obtenerColorTrigger(valor, color){

		const intensidad =
		Math.floor(valor * 255);

		return `rgb(
			${intensidad},
			${color[1]},
			${color[2]}
		)`;

	}
	
	moverElemento(elemento, x, y){
        if(!elemento) return;
        // Usamos translate para mover el elemento de forma fluida y segura
        elemento.style.transform = `translate(${x}px, ${y}px)`;
    }
	
	aplicarDeadzone(valor, zona){

		if(Math.abs(valor) < zona)
			return 0;

		return valor;

	}
	
	obtenerColorDiseño(elemento){

		if(!elemento)
			return null;


		const nombre =
			elemento.dataset.diseño;


		if(!nombre)
			return null;


		if(!this.diseño)
			return null;


		if(!this.diseño.colores)
			return null;


		return this.diseño.colores[nombre]
			?? null;

	}


	aplicarColorDiseño(elemento){

		if(!elemento)
			return;


		const color =
			this.obtenerColorDiseño(
				elemento
			);


		if(color === null)
			return;


		const tipo =
			elemento.dataset.diseñoTipo
			??
			"fill";


		if(tipo === "stroke"){

			elemento.style.stroke =
				color;

		}
		else{

			elemento.style.fill =
				color;

		}

	}

}