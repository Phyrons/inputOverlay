class BaseAnimation{

    constructor(elemento,duracion=200){

        this.elemento = elemento;
        this.inicio = performance.now();
        this.duracion = duracion;

    }

    progreso(ahora){

        return Math.min(
            1,
            (ahora-this.inicio)/
            this.duracion
        );

    }
	
	terminar(){

        return performance.now()
        >=
        this.inicio + this.duracion;

    }

}