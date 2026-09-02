class PressAnimation extends BaseAnimation{


    constructor(elemento, opciones = {}){


        super(
            elemento,
            opciones.duracion ?? 150
        );


        this.escala =
        opciones.escala ?? 0.90;


        this.transformacionOriginal =
        elemento.getAttribute("transform") || "";


    }



    actualizar(ahora){


        const progreso =
        this.progreso(ahora);



        /*
            0 → 0.5
            El botón se hunde.

            0.5 → 1
            El botón vuelve.
        */


        let factor;


        if(progreso < 0.5){

            factor =
            progreso / 0.5;

        }
        else{

            factor =
            (1 - progreso) / 0.5;

        }



        const escalaActual =
        1 -
        (
            (1 - this.escala) *
            factor
        );



        this.elemento.style.transform =
        `scale(${escalaActual})`;



        if(progreso >= 1){

            this.elemento.style.transform =
            "";


            return false;

        }



        return true;

    }


}