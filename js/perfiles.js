class ProfileManager{


    constructor(){

        this.perfiles={};

    }



    async cargar(nombre){


        const respuesta =
        await fetch(
            `controls/${nombre}/control.json`
        );


        const perfil =
        await respuesta.json();


        this.perfiles[nombre]=perfil;


        return perfil;


    }


}