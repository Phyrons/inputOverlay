class LayerManager{

    constructor(){

        this.capas={};

    }



    registrar(){

        this.capas={};



        document
        .querySelectorAll("#controlSVG > g")
        .forEach(capa=>{

            this.capas[capa.id]=capa;

        });

    }



    obtener(nombre){

        return this.capas[nombre];

    }
	
	
	cambiarVisibilidad(nombre, visible){

		const capa = this.obtener(nombre);

		if(!capa)
			return;

		capa.style.display =
		visible ? "" : "none";

	}

    mostrar(nombre){

		this.cambiarVisibilidad(
			nombre,
			true
		);

	}

	ocultar(nombre){

		this.cambiarVisibilidad(
			nombre,
			false
		);

	}



    toggle(nombre){

        const capa=this.obtener(nombre);

        if(!capa)
            return;

        capa.style.display=
        capa.style.display==="none"
        ? ""
        : "none";

    }

	cambiarTodas(visible){

		for(const capa of Object.values(this.capas)){

			capa.style.display =
			visible ? "" : "none";

		}

	}

    mostrarTodas(){

		this.cambiarTodas(true);

	}

	ocultarTodas(){

		this.cambiarTodas(false);

	}



    listar(){

        return Object.keys(this.capas);

    }
	
	registrarCapa(nombre, visible = true){

		const capa =
		document.getElementById(
			`capa-${nombre}`
		);

		if(!capa)
			return;

		this.capas[nombre] = capa;

		capa.style.display =
		visible
		? ""
		: "none";

	}

}