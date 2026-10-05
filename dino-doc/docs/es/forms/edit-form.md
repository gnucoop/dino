---
title: Editar los datos de un formulario
description: Aprende a editar los datos ya enviados de un formulario en Dino, incluidas las Métricas de formulario, los borradores y cómo guardar los cambios.
---

# Editar los datos de un formulario

La pantalla Editar formulario te permite modificar datos que ya se han guardado. Verás la misma interfaz del formulario que se usa para introducir información, pero con todas las respuestas guardadas previamente ya rellenadas. Desde aquí puedes corregir valores, completar la información que falte o guardar tu progreso como borrador y terminarlo más tarde.

![Vista principal de la página Editar formulario](../imgs/forms/edit-form.png)

## Cómo abrir los datos de un formulario para editarlos

1. Ve a la página [Form](index.md).
2. Abre el form schema que contiene los datos.
3. Localiza en la lista de form los datos que quieres cambiar.
4. Pasa el cursor sobre su fila y haz clic en el icono **Editar** (lápiz), o haz clic en la fila para seleccionarla y pulsa **Editar** en la barra de acciones situada encima de la tabla. Se abrirá la pantalla Editar formulario con los datos guardados ya cargados.

## Trabajar con las Métricas de formulario

Si tu formulario usa métricas, la pantalla se abre en el paso **Métricas de formulario** antes de mostrar el cuestionario. Estos valores determinan la fecha y la agrupación de los datos en los report y las agregaciones; no forman parte del cuestionario en sí.

1. Revisa o cambia la **Fecha de creación** haciendo clic en **Cambiar** y eligiendo una nueva fecha.
2. Rellena los campos de métrica que se muestren, como posizione, proyecto u organización.
3. Si el form schema tiene estados, elige el **Estado del formulario** de los datos.
4. Haz clic en **Rellenar el formulario** para pasar al cuestionario. Si has abierto los datos con **Ver**, el botón mostrará **Ver el formulario**.

!!! tip "Crear una métrica sobre la marcha"
    Si la métrica que necesitas aún no existe, haz clic en **Nuevo** junto al campo de métrica para crearla sin salir del formulario. Esta opción solo aparece si tienes permiso para crear métricas.

![El paso Métricas de formulario](../imgs/forms/index-create.png)

## Editar tus respuestas

Una vez mostrado el cuestionario, puedes cambiar cualquier campo que tengas permiso para editar. Según cómo se haya configurado el formulario, los campos pueden organizarse en una, dos o tres columnas, y algunos pueden validarse mientras escribes.

1. Haz clic en un campo y actualiza su valor.
2. Avanza por los pasos o secciones restantes del cuestionario.
3. Cuando termines, elige una acción en la parte superior del formulario:
    * **Guardar formulario**: guarda todos tus cambios y actualiza los datos.
    * **Guardar borrador**: almacena tus cambios actuales sin finalizarlos, para que puedas volver y continuar más tarde. Este botón solo aparece si los borradores están habilitados en tu formulario.

!!! tip "Seguimiento de los cambios"
    Cuando el módulo de logs está habilitado en tu instancia de Dino, Dino registra los cambios realizados en cada conjunto de datos. Selecciona unos datos en la lista y haz clic en **Ver historial** en la barra de acciones para ver quién cambió qué y cuándo.

!!! warning "Editar datos críticos"
    Otros report o análisis pueden depender de los valores de estos datos. Si estás corrigiendo un error grave, valora si unos datos nuevos podrían ser más apropiados que modificar unos antiguos.

## Revisar los datos enviados

Si abres los datos con la acción **Ver** en lugar de **Editar**, el formulario se abre en modo de solo lectura. Todos los campos son visibles, pero no se pueden editar, y las acciones de guardado no están disponibles. Usa esta visualización para comprobar lo que se registró.

![Vista del formulario cumplimentado tras hacer clic en Ver el formulario](../imgs/forms/edit-form-view.png)

## Acciones relacionadas

* Para cambiar la estructura del propio formulario —sus campos, secciones y reglas de validación—, consulta [Editar form schema](edit-form-schema.md).
* Para entender cómo se relacionan los campos entre sí y cómo se comportan las dependencias, consulta las opciones de relaciones en [Editar form schema](edit-form-schema.md).
* Para ver los datos en un mapa, consulta [Mapa de formularios](forms-map.md).
* Para crear datos completamente nuevos, empieza desde la página [Form](index.md).