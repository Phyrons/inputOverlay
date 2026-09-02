# 🎮 Input Overlay

A customizable **game controller overlay for OBS Studio**, designed to display your controller inputs directly on stream.

The overlay automatically detects your connected controller and displays buttons, sticks, triggers, bumpers and other inputs using the selected visual design.

> ⚠️ **Current compatibility:** Xbox controllers and generic controllers using **XInput** configuration are currently supported.

---

## 🌎 Languages

🇺🇸 **English** · 🇪🇸 **[Español](#-español)**

---

# 🇺🇸 English

## ✨ Features

- 🎮 Automatic controller detection
- 🕹️ Displays analog stick movement
- 🔘 Displays button presses
- 🎯 Displays triggers and bumpers
- 🎨 Multiple visual designs
- ⚙️ Design selection directly from OBS
- 🖥️ Designed to work as a Browser Source in OBS Studio
- 🔄 Automatically updates when the OBS scene becomes active

---

# 📥 Installation

## 1. Download the project

Click the green **`<> Code`** button at the top right of the GitHub repository and select:

**`Download ZIP`**

Extract the ZIP file somewhere convenient on your computer.

You should end up with a folder similar to:

```text
inputOverlay/
├── index.html
├── ...
└── ...
```

---

# 🎥 OBS Studio Setup

## 2. Add a Browser Source

Open your OBS scene and add a new source:

**Sources → + → Browser**

---

## 3. Enable Local File

In the Browser Source properties, enable:

☑ **Local File**

---

## 4. Select `index.html`

Click **Browse** and navigate to the folder where you extracted the project.

Select:

```text
inputOverlay/index.html
```

> 💡 Make sure you select the `index.html` file inside the `inputOverlay` folder, not the ZIP file.

---

## 5. Set the Browser size

Set the following values:

| Setting | Value |
|---|---:|
| Width | `1200` |
| Height | `1200` |

---

## 6. Enable automatic refresh

Enable:

☑ **Refresh browser when scene becomes active**

This allows the overlay to refresh automatically when you switch to the OBS scene containing it.

---

## 7. Refresh the page

Click:

**`Refresh cache of current page`**

Then click:

**`OK`**

---

# ✂️ Crop the Overlay

## 8. Open Transform

Right-click the Browser Source and select:

**Transform → Edit Transform**

---

## 9. Enter the crop values

In the **Crop** section, enter these values:

| Side | Value |
|---|---:|
| Left | `159 px` |
| Right | `159 px` |
| Top | `419 px` |
| Bottom | `303 px` |

Click **Close** when finished.

---

# 🎮 Test the Controller

## 10. Test your controller

Move the analog sticks or press any button on your controller.

If everything is detected correctly, the overlay should display your controller using the **default design**.

### Supported controllers

Currently supported:

- Xbox controllers
- Generic controllers configured as **XInput**

> ⚠️ If the controller is not detected, try disconnecting it and connecting it again before restarting OBS.

---

# 🎨 Changing the Overlay Design

## 11. Open the interaction window

To select a different design:

1. Right-click the Browser Source.
2. Select **Interact**.
3. OBS will open the browser interaction window.
4. At the top of the overlay you will see three options:
   - **Controller**
   - **Designs**
   - **Edit**

---

## 12. Select a design

Go to:

**Designs**

Then use the dropdown menu to select the design you want.

The overlay should update automatically with the selected design.

---

## ⚠️ Important: Before closing the interaction window

**Do not close the interaction window while you are in `Edit`.**

Before closing it, make sure you are on:

- **Controller**, or
- **Designs**

and make sure the dropdown menu is **closed**.

> ❗ Closing the interaction window while the **Edit** section is active can cause the overlay to become misaligned.

If this happens, simply reopen **Interact**, return to **Controller** or **Designs**, close the dropdown menu, and then close the interaction window.

---

# 🎯 Final Setup

## 13. Position and resize

Once everything is working:

- Adjust the size of the Browser Source.
- Move it to your preferred position.
- Place it wherever you want on your OBS scene.

And that's it! 🎉

Your controller inputs should now appear on stream.

---

# 🛠️ Troubleshooting

### The controller isn't showing

Try the following:

1. Make sure the controller is connected **before** testing the overlay.
2. Move an analog stick or press a button.
3. Disconnect and reconnect the controller.
4. Make sure the controller is using **XInput**.
5. Refresh the Browser Source in OBS.

### The overlay looks misaligned

Check that the crop values are exactly:

```text
Left:   159 px
Right:  159 px
Top:    419 px
Bottom: 303 px
```

Also make sure you did not close the OBS interaction window while the **Edit** menu was active.

### The overlay doesn't update

Try:

**Right-click Browser Source → Refresh**

or reopen the OBS scene if necessary.

---

# 📌 Current Limitations

This project is currently focused on:

- Xbox controllers
- Generic XInput-compatible controllers

Other controller types may not work correctly yet.

More controller profiles and designs may be added in future versions.

---

# 🤝 Contributing

Suggestions, bug reports and contributions are welcome!

If you find a problem or have an idea for a new controller profile or visual design, feel free to open an **Issue** or submit a **Pull Request**.

---

# 📄 License

See the repository for license information.

---

# 🇪🇸 Español

## ✨ Características

- 🎮 Detección automática del control
- 🕹️ Visualización del movimiento de los joysticks
- 🔘 Visualización de botones
- 🎯 Visualización de gatillos y bumpers
- 🎨 Múltiples diseños visuales
- ⚙️ Selección de diseños directamente desde OBS
- 🖥️ Diseñado para utilizarse como fuente de navegador en OBS Studio
- 🔄 Actualización automática al activar la escena de OBS

---

# 📥 Instalación

## 1. Descargar el proyecto

Presiona el botón verde **`<> Code`** ubicado en la parte superior derecha del repositorio de GitHub y selecciona:

**`Download ZIP`**

Descomprime el archivo ZIP en la ubicación que prefieras.

Deberías terminar con una carpeta similar a:

```text
inputOverlay/
├── index.html
├── ...
└── ...
```

---

# 🎥 Configuración en OBS Studio

## 2. Agregar una fuente de navegador

Abre la escena de OBS donde quieres utilizar el overlay y agrega una nueva fuente:

**Fuentes → + → Navegador**

---

## 3. Activar "Archivo Local"

Dentro de las propiedades de la fuente de navegador, activa:

☑ **Archivo Local**

---

## 4. Seleccionar `index.html`

Presiona **Examinar** y busca la carpeta donde descomprimiste el proyecto.

Selecciona:

```text
inputOverlay/index.html
```

> 💡 Asegúrate de seleccionar el archivo `index.html` que se encuentra dentro de la carpeta `inputOverlay`, no el archivo ZIP.

---

## 5. Configurar el tamaño

Establece los siguientes valores:

| Configuración | Valor |
|---|---:|
| Ancho | `1200` |
| Alto | `1200` |

---

## 6. Activar actualización automática

Activa:

☑ **Actualizar el navegador cuando la escena se active**

Esto permite que el overlay se actualice automáticamente cada vez que actives la escena de OBS donde se encuentra.

---

## 7. Actualizar la caché

Presiona:

**`Actualizar la caché de la página actual`**

Después presiona:

**`Aceptar`**

---

# ✂️ Recortar el Overlay

## 8. Abrir Transformar

Haz clic derecho sobre la fuente de navegador y selecciona:

**Transformar → Editar transformación**

---

## 9. Configurar el recorte

En la sección **Recorte**, coloca los siguientes valores:

| Lado | Valor |
|---|---:|
| Izquierda | `159 px` |
| Derecha | `159 px` |
| Arriba | `419 px` |
| Abajo | `303 px` |

Presiona **Cerrar**.

---

# 🎮 Probar el control

## 10. Comprobar que funciona

Mueve los joysticks o presiona cualquier botón del control.

Si el control es detectado correctamente, el overlay debería mostrarlo utilizando el **diseño predeterminado**.

### Controles compatibles

Actualmente son compatibles:

- Controles Xbox
- Controles genéricos configurados como **XInput**

> ⚠️ Si el overlay no muestra el control, intenta desconectarlo y volverlo a conectar antes de reiniciar OBS.

---

# 🎨 Cambiar el diseño

## 11. Abrir la ventana de interacción

Para seleccionar otro diseño:

1. Haz clic derecho sobre la fuente de navegador.
2. Selecciona **Interactuar**.
3. OBS abrirá una ventana de interacción con el navegador.
4. En la parte superior aparecerán tres opciones:
   - **Control**
   - **Diseños**
   - **Edición**

---

## 12. Seleccionar un diseño

Entra en:

**Diseños**

Después utiliza el menú desplegable para seleccionar el diseño que quieras utilizar.

El overlay debería actualizarse automáticamente.

---

## ⚠️ Importante antes de cerrar la ventana

**NO cierres la ventana de interacción mientras estés dentro de `Edición`.**

Antes de cerrarla, asegúrate de estar en:

- **Control**, o
- **Diseños**

y asegúrate también de que el menú desplegable esté **cerrado**.

> ❗ Si cierras la ventana de interacción mientras estás en **Edición**, el overlay puede quedar descuadrado.

Si esto sucede, vuelve a abrir **Interactuar**, regresa a **Control** o **Diseños**, cierra el menú desplegable y después cierra la ventana.

---

# 🎯 Configuración final

## 13. Ajustar posición y tamaño

Una vez que todo funcione correctamente:

- Ajusta el tamaño de la fuente de navegador.
- Mueve el overlay a la posición que prefieras.
- Colócalo donde quieras dentro de tu escena.

¡Y listo! 🎉

Ahora los movimientos y botones de tu control aparecerán directamente en tu transmisión.

---

# 🛠️ Solución de problemas

### El control no aparece

Prueba lo siguiente:

1. Asegúrate de conectar el control antes de probar el overlay.
2. Mueve un joystick o presiona algún botón.
3. Desconecta y vuelve a conectar el control.
4. Comprueba que el control esté utilizando **XInput**.
5. Actualiza la fuente de navegador en OBS.

### El overlay aparece descuadrado

Comprueba que los valores de recorte sean exactamente:

```text
Izquierda: 159 px
Derecha:   159 px
Arriba:    419 px
Abajo:     303 px
```

También verifica que no hayas cerrado la ventana de interacción mientras **Edición** estaba activa.

### El overlay no se actualiza

Prueba:

**Clic derecho sobre la fuente → Actualizar**

o vuelve a activar la escena de OBS.

---

# 📌 Limitaciones actuales

Actualmente el proyecto está enfocado en:

- Controles Xbox
- Controles genéricos compatibles con XInput

Otros tipos de controles pueden no funcionar correctamente todavía.

En futuras versiones se pueden agregar nuevos perfiles de controles y diseños visuales.

---

# 🤝 Contribuciones

¡Las sugerencias, reportes de errores y contribuciones son bienvenidos!

Si encuentras algún problema o tienes una idea para agregar un nuevo perfil de control o diseño visual, puedes abrir un **Issue** o enviar un **Pull Request**.

---

# 📄 Licencia

Consulta el repositorio para obtener información sobre la licencia.
