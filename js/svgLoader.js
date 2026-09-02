class SVGLoader{

    async cargarCapa(
        archivo,
        contenedor,
        nombre
    ){

        const respuesta =
        await fetch(archivo);


        const texto =
        await respuesta.text();


        const parser =
        new DOMParser();


        const documento =
        parser.parseFromString(
            texto,
            "image/svg+xml"
        );


        const svg =
        documento.querySelector("svg");


        if(!svg)
            return;


        /*
         * Buscar la capa original
         */

        const contenido =
        svg.querySelector("g");


        if(!contenido){

            console.warn(
                "El SVG no contiene <g>:",
                archivo
            );

            return;

        }


        /*
         * Crear la capa externa
         */

        const grupo =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g"
        );


        grupo.id =
        `capa-${nombre}`;


        /*
         * Copiar estilos
         */

        svg.querySelectorAll("style")
        .forEach(style=>{

            const nuevoStyle =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "style"
            );


            nuevoStyle.textContent =
            this.aislarEstilos(
                style.textContent,
                `capa-${nombre}`
            );


            grupo.appendChild(
                nuevoStyle
            );

        });


        /*
         * Copiar defs
         */

        svg.querySelectorAll("defs")
        .forEach(defs=>{

            grupo.appendChild(
                defs.cloneNode(true)
            );

        });


        /*
         * Copiar contenido
         */

        grupo.appendChild(
            contenido.cloneNode(true)
        );


        /*
         * Insertar capa
         */

        contenedor.appendChild(
            grupo
        );

    }


    aislarEstilos(css, idCapa){

        /*
         * Dividir reglas CSS
         */

        return css.replace(
            /([^{}]+)\{([^{}]*)\}/g,
            (completo, selector, reglas)=>{

                const selectorLimpio =
                selector.trim();


                /*
                 * Ignorar @media, @keyframes, etc.
                 */

                if(
                    selectorLimpio.startsWith("@")
                ){

                    return completo;

                }


                /*
                 * Separar selectores por coma
                 */

                const selectores =
                selectorLimpio
                .split(",")
                .map(s=>{

                    return `#${idCapa} ${s.trim()}`;

                })
                .join(", ");


                return `
                    ${selectores} {
                        ${reglas}
                    }
                `;

            }
        );

    }

}
