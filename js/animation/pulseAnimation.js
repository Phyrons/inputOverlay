class PulseAnimation extends BaseAnimation{

	constructor(elemento, opciones = {}){

		super(
			elemento,
			opciones.duracion ?? 300
		);


		this.escala =
			opciones.escala ?? 0.18;

		this.elemento.style.transformBox = "fill-box";
		this.elemento.style.transformOrigin = "center";
	}


	actualizar(ahora){

		const t =
			this.progreso(ahora);


		if(t >= 1){

			this.elemento.style.transform =
				"";

			return false;

		}


		const fuerza =
			Math.sin(
				t * Math.PI
			);


		const escala =
			1 +
			fuerza * this.escala;


		this.elemento.style.transform =
			`scale(${escala})`;


		return true;

	}


}

