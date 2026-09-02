const manager = new GamepadManager();
const renderer = new Renderer();
const detector = new DetectorPerfil();

const modelo = document.getElementById("modelo");
const estado = document.getElementById("estado");
const perfilTexto = document.getElementById("perfil");
const entrada = document.getElementById("entrada");

const perfiles = new ProfileManager();
const diseños = new DesignManager();
const animationManager = new AnimationManager();

let perfilCargado = null;
let gamepadSeleccionado = null;


// =====================================================
// SELECTORES PERSONALIZADOS PARA OBS
// =====================================================

class CustomSelect{

    constructor({container, button, text, options, onChange}){

        this.container = container;
        this.button = button;
        this.text = text;
        this.optionsContainer = options;
        this.onChange = onChange;

        this.items = [];
        this.value = "";

        this.button.addEventListener("click", (event) => {

            event.stopPropagation();

            this.toggle();

        });


        this.optionsContainer.addEventListener("click", (event) => {

            const option =
                event.target.closest(".custom-option");

            if(
                !option ||
                option.classList.contains("vacio")
            ){
                return;
            }

            this.select(
                option.dataset.value,
                true
            );

        });

    }


    toggle(){

        const abierto =
            this.container.classList.contains("open");

        cerrarSelectores();

        if(!abierto){

            this.container.classList.add("open");

            this.button.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    }


    close(){

        this.container.classList.remove("open");

        this.button.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    setOptions(items, selectedValue = ""){

        this.items = items || [];

        this.optionsContainer.innerHTML = "";


        if(this.items.length === 0){

            const vacio =
                document.createElement("div");

            vacio.className =
                "custom-option vacio";

            vacio.textContent =
                "Sin opciones disponibles";

            this.optionsContainer.appendChild(vacio);

            this.value = "";

            this.text.textContent =
                "Sin opciones";

            return;

        }


        for(const item of this.items){

            const option =
                document.createElement("button");

            option.type = "button";

            option.className =
                "custom-option";

            option.dataset.value =
                String(item.value);

            option.setAttribute(
                "role",
                "option"
            );

            option.textContent =
                item.text;

            this.optionsContainer.appendChild(
                option
            );

        }


        const existe =
            this.items.some(
                item =>
                    String(item.value) ===
                    String(selectedValue)
            );


        const valorInicial =
            existe
                ? String(selectedValue)
                : String(this.items[0].value);


        this.select(
            valorInicial,
            false
        );

    }


    select(value, ejecutar = true){

        value = String(value);

        const item =
            this.items.find(
                opcion =>
                    String(opcion.value) === value
            );


        if(!item){

            this.value = "";

            return;

        }


        this.value = value;

        this.text.textContent =
            item.text;


        this.optionsContainer
            .querySelectorAll(".custom-option")
            .forEach(option => {

                const seleccionado =
                    option.dataset.value === value;

                option.classList.toggle(
                    "seleccionado",
                    seleccionado
                );

                option.setAttribute(
                    "aria-selected",
                    seleccionado
                        ? "true"
                        : "false"
                );

            });


        this.close();


        if(
            ejecutar &&
            this.onChange
        ){

            this.onChange(value);

        }

    }

}


function cerrarSelectores(){

    document
        .querySelectorAll(".custom-select.open")
        .forEach(select => {

            select.classList.remove("open");

            const button =
                select.querySelector(
                    ".custom-select-button"
                );

            if(button){

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

}


document.addEventListener(
    "click",
    cerrarSelectores
);


// =====================================================
// SELECTOR DE CONTROL
// =====================================================

const gamepadCustomSelect =
    new CustomSelect({

        container:
            document.getElementById(
                "gamepadCustomSelect"
            ),

        button:
            document.getElementById(
                "gamepadSelectButton"
            ),

        text:
            document.getElementById(
                "gamepadSelectText"
            ),

        options:
            document.getElementById(
                "gamepadSelectOptions"
            ),

        onChange: (value) => {

            gamepadSeleccionado =
                Number(value);

            perfilCargado = null;

        }

    });


// =====================================================
// SELECTOR DE DISEÑO
// =====================================================

const designCustomSelect =
    new CustomSelect({

        container:
            document.getElementById(
                "designCustomSelect"
            ),

        button:
            document.getElementById(
                "designSelectButton"
            ),

        text:
            document.getElementById(
                "designSelectText"
            ),

        options:
            document.getElementById(
                "designSelectOptions"
            ),

        onChange: async (value) => {

            await cambiarDiseño(value);

        }

    });


// =====================================================
// PESTAÑAS
// =====================================================

const tabs =
    document.querySelectorAll(".tab");

const tabPanels =
    document.querySelectorAll(".tab-panel");


tabs.forEach(tab => {

    tab.addEventListener(
        "click",
        () => {

            const destino =
                tab.dataset.tab;

            cerrarSelectores();


            tabs.forEach(item => {

                const activo =
                    item === tab;

                item.classList.toggle(
                    "activo",
                    activo
                );

                item.setAttribute(
                    "aria-selected",
                    activo
                        ? "true"
                        : "false"
                );

            });


            tabPanels.forEach(panel => {

                const activo =
                    panel.dataset.panel ===
                    destino;

                panel.classList.toggle(
                    "activo",
                    activo
                );

                panel.hidden =
                    !activo;

            });

        }

    );

});


function obtenerRutaPerfilActual(){

    return renderer.perfil?.ruta ??
        "controls/xbox/";

}


function actualizarEntrada(gp){

    if(!entrada) return;


    const botonesActivos =
        gp.buttons

            .map(
                (boton, indice) =>
                    boton.pressed ||
                    boton.value > 0.5
                        ? indice
                        : null
            )

            .filter(
                indice =>
                    indice !== null
            );


    const ejesActivos =
        gp.axes

            .map(
                (valor, indice) =>
                    Math.abs(valor) > 0.2
                        ? `${indice}:${valor.toFixed(2)}`
                        : null
            )

            .filter(
                valor =>
                    valor !== null
            );


    entrada.textContent =
        `mapping: ${gp.mapping || "sin estándar"} · ` +
        `${gp.buttons.length} botones · ` +
        `${gp.axes.length} ejes · ` +
        `activos B[${botonesActivos.join(", ") || "-"}] ` +
        `E[${ejesActivos.join(", ") || "-"}]`;

}


// =====================================================
// EDITOR DE IMÁGENES
// =====================================================

const img1Select =
    document.getElementById("img1Select");

const img1Scale =
    document.getElementById("img1Scale");

const img1PosX =
    document.getElementById("img1PosX");

const img1PosY =
    document.getElementById("img1PosY");


const img2Select =
    document.getElementById("img2Select");

const img2Scale =
    document.getElementById("img2Scale");

const img2PosX =
    document.getElementById("img2PosX");

const img2PosY =
    document.getElementById("img2PosY");


function actualizarImg1(){

    if(!renderer.cargado)
        return;

    renderer.actualizarImagenCuerpoSVG(

        0,

        img1Select.value,

        img1Scale.value,

        img1PosX.value,

        img1PosY.value

    );

}


function actualizarImg2(){

    if(!renderer.cargado)
        return;

    renderer.actualizarImagenCuerpoSVG(

        1,

        img2Select.value,

        img2Scale.value,

        img2PosX.value,

        img2PosY.value

    );

}


[
    img1Select,
    img1Scale,
    img1PosX,
    img1PosY
]
.forEach(el => {

    if(el){

        el.addEventListener(
            "input",
            actualizarImg1
        );

        el.addEventListener(
            "change",
            actualizarImg1
        );

    }

});


[
    img2Select,
    img2Scale,
    img2PosX,
    img2PosY
]
.forEach(el => {

    if(el){

        el.addEventListener(
            "input",
            actualizarImg2
        );

        el.addEventListener(
            "change",
            actualizarImg2
        );

    }

});


function aplicarImagenesDeDiseño(diseño){

    if(
        !diseño.imagenesCuerpo ||
        diseño.imagenesCuerpo.length < 2
    ){

        return;

    }


    const img1 =
        diseño.imagenesCuerpo[0];

    const img2 =
        diseño.imagenesCuerpo[1];


    if(img1Select){

        img1Select.innerHTML = "";

        const option1 =
            document.createElement("option");

        option1.value =
            img1.ruta;

        option1.textContent =
            img1.ruta
                .split("/")
                .pop();

        option1.selected = true;

        img1Select.appendChild(
            option1
        );

    }


    if(img1Scale)
        img1Scale.value =
            img1.escala;

    if(img1PosX)
        img1PosX.value =
            img1.posX;

    if(img1PosY)
        img1PosY.value =
            img1.posY;


    if(img2Select){

        img2Select.innerHTML = "";

        const option2 =
            document.createElement("option");

        option2.value =
            img2.ruta;

        option2.textContent =
            img2.ruta
                .split("/")
                .pop();

        option2.selected = true;

        img2Select.appendChild(
            option2
        );

    }


    if(img2Scale)
        img2Scale.value =
            img2.escala;

    if(img2PosX)
        img2PosX.value =
            img2.posX;

    if(img2PosY)
        img2PosY.value =
            img2.posY;


    actualizarImg1();
    actualizarImg2();

}


// =====================================================
// CAMBIO DE DISEÑO
// =====================================================

async function cambiarDiseño(archivo){

    if(!archivo)
        return;


    try{

        const diseño =
            await diseños.cargar(

                obtenerRutaPerfilActual() +
                archivo

            );


        renderer.aplicarDiseño(
            diseño
        );

        aplicarImagenesDeDiseño(
            diseño
        );

    }
    catch(error){

        console.error(
            "No se pudo aplicar el diseño:",
            error
        );

    }

}


// =====================================================
// ACTUALIZAR LISTA DE CONTROLES
// =====================================================

function actualizarLista(){

    const pads =
        manager.obtenerControles();

    const seleccionAnterior =
        gamepadSeleccionado;


    const opciones = [];


    for(const gp of pads){

        if(!gp)
            continue;


        opciones.push({

            value:
                gp.index,

            text:
                `${gp.id} [${gp.index}]`

        });

    }


    if(

        seleccionAnterior !== null &&

        manager.obtenerControles()
            [seleccionAnterior]

    ){

        gamepadSeleccionado =
            seleccionAnterior;

    }

    else if(
        opciones.length > 0
    ){

        gamepadSeleccionado =
            Number(
                opciones[0].value
            );

        perfilCargado = null;

    }

    else{

        gamepadSeleccionado = null;

        perfilCargado = null;

    }


    gamepadCustomSelect.setOptions(

        opciones,

        gamepadSeleccionado ?? ""

    );

}


// =====================================================
// ACTUALIZAR LISTA DE DISEÑOS
// =====================================================

async function actualizarListaDiseños(
    nombrePerfil
){

    if(!nombrePerfil){

        designCustomSelect
            .setOptions([]);

        return;

    }


    const ruta =
        `controls/${nombrePerfil.toLowerCase()}/diseños.json`;


    try{

        const lista =
            await diseños.cargarLista(
                ruta
            );


        const opciones =
            lista.map(
                diseño => ({

                    value:
                        diseño.archivo,

                    text:
                        diseño.nombre

                })
            );


        designCustomSelect.setOptions(
            opciones
        );

    }
    catch(error){

        console.error(
            "No se pudieron cargar los diseños:",
            error
        );

        designCustomSelect
            .setOptions([]);

    }

}


// =====================================================
// ACTUALIZAR OVERLAY
// =====================================================

async function actualizar(){

    if(
        gamepadSeleccionado === null
    ){

        estado.textContent =
            "🔴 Sin control";

        perfilTexto.textContent =
            "-";

        if(entrada)
            entrada.textContent =
                "-";

        perfilCargado = null;

        requestAnimationFrame(
            actualizar
        );

        return;

    }


    const gp =
        manager.obtenerControles()
            [gamepadSeleccionado];


    if(gp){

        modelo.textContent =
            gp.id;

        estado.textContent =
            "🟢 Conectado";

        actualizarEntrada(
            gp
        );


        const nombrePerfil =
            detector.detectar(gp);


        if(
            perfilCargado !==
            nombrePerfil
        ){

            try{

                const perfil =
                    await perfiles.cargar(
                        nombrePerfil
                    );


                await actualizarListaDiseños(
                    nombrePerfil
                );


                perfilTexto.textContent =
                    perfil.nombre;


                await renderer.mostrarPerfil(
                    perfil
                );


                if(
                    designCustomSelect.value
                ){

                    const diseño =
                        await diseños.cargar(

                            perfil.ruta +
                            designCustomSelect.value

                        );


                    renderer.aplicarDiseño(
                        diseño
                    );

                    aplicarImagenesDeDiseño(
                        diseño
                    );

                }


                actualizarImg1();
                actualizarImg2();


                perfilCargado =
                    nombrePerfil;

            }
            catch(error){

                console.error(
                    "Error al cargar el perfil:",
                    error
                );

                estado.textContent =
                    "⚠️ Error al cargar perfil";

            }

        }


        try{

            renderer.actualizarBotones(
                gp
            );

            renderer.actualizarSticks(
                gp
            );

            renderer.actualizarTriggers(
                gp
            );

            renderer.actualizarDpad(
                gp
            );


            animationManager.actualizar();

        }
        catch(error){

            console.error(
                "Error al procesar entradas del gamepad:",
                error
            );

            estado.textContent =
                "⚠️ Error al procesar entradas";

        }

    }
    else{

        estado.textContent =
            "🔴 Sin control";

        perfilTexto.textContent =
            "-";

        if(entrada)
            entrada.textContent =
                "-";

        perfilCargado = null;

    }


    requestAnimationFrame(
        actualizar
    );

}


// =====================================================
// EVENTOS DE GAMEPAD
// =====================================================

window.addEventListener(
    "gamepadconnected",
    actualizarLista
);

window.addEventListener(
    "gamepaddisconnected",
    actualizarLista
);


// =====================================================
// INICIO
// =====================================================

actualizarLista();

actualizar();
