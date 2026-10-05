---
title: Área de usuario
description: "Gestiona la configuración de tu cuenta en Dino: cambia tu contraseña, consulta tu clave y créditos de DINO-AI, personaliza el tema DINO, haz una copia de seguridad de tus datos o restáuralos, y comienza el recorrido de Dino."
---

# Área de usuario

El **Área de usuario** es tu página de cuenta personal. Reúne todo lo que te pertenece a ti y no a toda la instalación de Dino: tus datos de inicio de sesión, tu clave y créditos de DINO-AI, los colores que Dino usa para ti, la copia de seguridad y restauración de datos, y el recorrido guiado.

El encabezado de la página muestra tus iniciales, tu nombre completo y tu dirección de correo electrónico, para que siempre puedas confirmar con qué cuenta has iniciado sesión. La versión de Dino que se está ejecutando actualmente aparece en la esquina superior derecha.

![Vista principal de la página Área de usuario](../imgs/user-area/index.png)

El Área de usuario está organizada en pestañas. La pestaña en la que te encuentras forma parte de la dirección de la página, por lo que puedes guardarla en marcadores y volver a ella directamente. Cambiar de pestaña no modifica el historial de tu navegador: al pulsar Atrás sales del Área de usuario en lugar de retroceder por las pestañas que visitaste.

## Cambiar tu contraseña

La pestaña **Contraseña** es donde actualizas la contraseña que usas para iniciar sesión en Dino.

1. En el campo **Contraseña actual**, escribe la contraseña que usas ahora.
2. En el campo **Nueva contraseña**, escribe tu nueva contraseña. Debe tener al menos el número de caracteres que se indica debajo del campo.
3. En el campo **Confirmar una nueva contraseña**, escribe de nuevo la nueva contraseña.
4. Selecciona **Actualizar contraseña**.

Si quieres empezar de nuevo, selecciona **Cancelar** para borrar los tres campos. Si la contraseña actual no coincide, Dino te lo indica y no se realiza ningún cambio.

!!! tip "Elige una contraseña segura"
    Usa una contraseña que no utilices en ningún otro sitio y guárdala en un gestor de contraseñas. Consulta [Restablecer contraseña](../getting-started/reset-password.md) si has olvidado la actual y no puedes iniciar sesión.

## Clave y créditos de DINO-AI

La pestaña **IA** muestra la clave de DINO-AI que pertenece a tu cuenta, junto con el número de créditos de DINO-AI que te quedan.

- Selecciona **Mostrar** para ver la clave, u **Ocultar** para volver a ocultarla.
- Selecciona **Copiar** para poner la clave en el portapapeles.
- Si tu instalación permite comprar créditos, selecciona **Agregar más** para recargarlos.

La clave se asigna a tu cuenta automáticamente cuando inicias sesión: no hay nada que pegar aquí. Si no hay ninguna clave asociada a tu cuenta, la pestaña te lo indica.

## Tema DINO

La pestaña **Tema DINO** controla los colores que Dino usa para ti. Los cambios de color solo se aplican después de guardarlos, así que puedes experimentar con libertad; la elección entre claro y oscuro se aplica de inmediato.

1. Selecciona los campos **Color primario**, **Color acento** y **Color de advertencia** y elige un color en el selector.
2. Usa el campo **Nombre del preajuste** para dar nombre a la combinación, o elige un nombre existente de la lista.
3. Cambia entre modo claro y oscuro con los botones de sol y luna.
4. Selecciona **Guardar tema** para aplicar tus elecciones.

El panel **Vista previa** muestra cómo se verán los colores seleccionados antes de confirmarlos. **Cargar preajuste** recupera una combinación guardada, y **Restablecer** descarta tus cambios y vuelve al tema aplicado actualmente.

!!! tip "Los temas se guardan en este navegador"
    Tu tema y tus preajustes guardados se almacenan en el navegador que estás usando. En otro navegador o dispositivo, Dino parte del tema predeterminado.

## Copia de seguridad y restauración

La pestaña **Copia de seguridad y restauración** te permite descargar una copia completa de tus datos o volver a cargarla. Solo se muestra a los administradores, y únicamente cuando la copia de seguridad y la restauración están habilitadas en tu instalación.

Para hacer una copia de seguridad de tus datos:

1. Selecciona **Descargar copia de seguridad**.
2. Guarda el archivo, llamado `dino_db_export.json`, en un lugar seguro.

Para restaurar datos:

1. Selecciona **Elegir un archivo de copia de seguridad** y elige un archivo `.json` exportado desde Dino.
2. Confirma la restauración cuando Dino te lo pida.
3. Espera mientras Dino restaura los datos. Se muestra un indicador de progreso hasta que finaliza el proceso.

!!! warning "La restauración sobrescribe los datos coincidentes"
    Los datos del archivo se escriben en la base de datos local de este dispositivo: cualquier registro con el mismo ID que uno importado se sobrescribe. Haz una copia de seguridad nueva antes de restaurar y asegúrate de que el archivo es realmente el que quieres.

## Tutoriales

La pestaña **Tutoriales** solo se muestra cuando el recorrido guiado está configurado en tu instalación, y contiene una única acción. Selecciona **Comienza Dino Tour** para iniciar el recorrido guiado por las funciones principales de Dino: un buen repaso si eres nuevo en la plataforma o quieres volver a visitar un área concreta.

## Páginas relacionadas

- [Iniciar sesión](../getting-started/login.md)
- [Restablecer contraseña](../getting-started/reset-password.md)
- [Navegación principal](../interface/index.md)