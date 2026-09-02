class Renderer{

    constructor(){
        this.canvas = document.getElementById("canvas");
        this.perfil = null;
        this.capas = new LayerManager();
        this.svgLoader = new SVGLoader();
        this.cargado = false;
        this.buttons = null;
        this.sticks = null;
        this.triggers = null;
        this.dpad = null;
        this.animations = new AnimationManager();
        this.diseño = null;
    }
    
    actualizarAnimaciones(){
        this.animations.actualizar();
    }

    async mostrarPerfil(perfil){
        this.perfil = perfil;
        
        this.buttons = null;
        this.sticks = null;
        this.triggers = null;
        this.dpad = null;
        
        const contenedor = document.getElementById("controlSVG");
        contenedor.innerHTML = "";

        perfil.capas.sort((a, b) => a.orden - b.orden);

        for(const capa of perfil.capas){
            if(!capa.archivo){
                console.warn("La capa no tiene archivo:", capa.nombre);
                continue;
            }

            const archivo = perfil.ruta + capa.archivo;

            await this.svgLoader.cargarCapa(
                archivo,
                contenedor,
                capa.nombre
            );

            this.capas.registrarCapa(
                capa.nombre,
                capa.visible
            );
        }
        
        this.cargado = true;
        
        this.buttons = new ButtonRenderer(this.perfil);
        this.sticks = new StickRenderer(this.perfil);
        this.triggers = new TriggerRenderer(this.perfil);
        this.dpad = new DpadRenderer(this.perfil);
    }

    actualizarBotones(gamepad){
        if(!this.buttons) return;
        this.buttons.actualizar(gamepad);
    }
        
    actualizarSticks(gamepad){
        if(!this.sticks) return;
        this.sticks.actualizar(gamepad);
    }
    
    actualizarTriggers(gamepad){
        if(!this.triggers) return;
        this.triggers.actualizar(gamepad);
    }
    
    actualizarDpad(gamepad){
        if(!this.dpad) return;
        this.dpad.actualizar(gamepad);
    }
    
    mostrarCapa(nombre){
        this.capas.mostrar(nombre);
    }

    ocultarCapa(nombre){
        this.capas.ocultar(nombre);
    }

    toggleCapa(nombre){
        this.capas.toggle(nombre);
    }
    
    /*
     * =====================================================
     * GESTIÓN DE IMÁGENES INTERNAS DE LA CAPA CUERPO
     * =====================================================
     */
    actualizarImagenCuerpoSVG(indiceImagen, nuevaRuta, escala = 1, posX = 0, posY = 0) {
        const capaCuerpo = this.capas.obtener("cuerpo");
        if (!capaCuerpo) return;

        const imagenes = capaCuerpo.querySelectorAll("image");
        const imagenSVG = imagenes[indiceImagen];

        if (!imagenSVG) return;

        if (nuevaRuta) {
            imagenSVG.setAttribute("href", nuevaRuta);
        }

        imagenSVG.setAttribute("transform", `translate(${posX}, ${posY}) scale(${escala})`);
    }
    
    aplicarDiseño(diseño){
        if(!diseño) return;

        this.diseño = diseño;

        if(this.buttons) this.buttons.diseño = diseño;
        if(this.sticks) this.sticks.diseño = diseño;
        if(this.triggers) this.triggers.diseño = diseño;
        if(this.dpad) this.dpad.diseño = diseño;

        const colores = diseño.colores;
        if(!colores) return;

        document.querySelectorAll("[data-diseño]").forEach(elemento => {
            const nombre = elemento.dataset.diseño;
            const color = colores[nombre];

            if(color === undefined) return;

            const tipo = elemento.dataset.diseñoTipo ?? "fill";

            if(tipo === "fill"){
                elemento.style.fill = color;
            }
            else if(tipo === "stroke"){
                elemento.style.stroke = color;
            }
            else if(tipo === "stop-color"){
                elemento.style.stopColor = color;
            }
            else if(tipo === "values"){
                elemento.setAttribute(
                    "values",
                    Array.isArray(color) ? color.join(";") : color
                );
            }

            const nombreOpacidad = elemento.dataset.diseñoOpacidad;
            const opacidad = colores[nombreOpacidad];

            if(nombreOpacidad && opacidad !== undefined){
                elemento.style.opacity = opacidad;
            }
        });
    }
}
