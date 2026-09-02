class DesignManager{

    constructor(){

        this.diseños = [];

        this.actual = null;

    }


    async cargarLista(ruta){

        const respuesta =
            await fetch(ruta);

        if(!respuesta.ok){

            throw new Error(
                "No se pudo cargar la lista de diseños"
            );

        }

        this.diseños =
            await respuesta.json();

        return this.diseños;

    }


    async cargar(ruta){

        const respuesta =
            await fetch(ruta);

        if(!respuesta.ok){

            throw new Error(
                "No se pudo cargar el diseño"
            );

        }

        const diseño =
            await respuesta.json();

        this.actual =
            diseño;

        return diseño;

    }


    obtener(){

        return this.actual;

    }


    listar(){

        return this.diseños;

    }

}