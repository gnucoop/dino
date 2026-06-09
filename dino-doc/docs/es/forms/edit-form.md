---
title: Editar un envío de formulario
description: Aprende a editar un envío de formulario existente en Dino.
---

# Editar un envío de formulario

La pantalla de Editar Formulario te permite modificar un envío de formulario existente. Puedes actualizar datos, agregar nueva información o guardar tus cambios como borrador para completarlos más tarde.

Cuando abres un envío de formulario para editarlo, ves la misma interfaz de formulario que se usa para la entrada de datos, pero con todos los datos guardados previamente ya rellenados.

![Vista principal de la página Editar Formulario](../imgs/forms/edit-form.png)

## Cómo editar un envío

1.  Navega a la lista de envíos de tu formulario.
2.  Localiza el envío específico que deseas editar.
3.  Haz clic en el botón **Editar** (generalmente representado por un icono de lápiz) para ese envío. Esto abre el formulario en modo de edición.
4.  Realiza los cambios que desees en cualquier campo del formulario.
5.  Elige una acción en la parte inferior del formulario:
    *   **Guardar borrador**: Guarda tus cambios actuales sin enviar el formulario. Puedes volver y editarlo nuevamente más tarde.
    *   **Enviar**: Guarda todos los cambios y envía los datos del formulario actualizados.

!!! tip "Seguimiento de cambios"
    Dino registra automáticamente los cambios que realizas entre el envío original y la versión editada. Esto crea un historial de quién cambió qué y cuándo.

## Funciones disponibles

Mientras editas, tienes acceso a las mismas funciones que al crear un nuevo envío:

*   **Métricas opcionales**: Algunos formularios pueden tener secciones o preguntas opcionales que puedes elegir completar.
*   **Carga de archivos**: Adjunta nuevos archivos o reemplaza los existentes si esta función está habilitada para tu formulario.
*   **Campos secundarios**: Para ciertos puntos de datos, pueden mostrarse campos relacionados adicionales para una entrada más detallada.
*   **Relaciones de formulario (dependencias)**: Si el formulario incluye campos dependientes, es posible que veas indicaciones adicionales basadas en respuestas anteriores. Las dependencias se definen al crear el esquema del formulario.

![Diálogo del editor de relaciones (dependencias) del formulario](../imgs/forms/edit-form-schema-relationships.png)

!!! warning "Integridad de datos"
    Ten cuidado al editar datos críticos. Otros informes o análisis pueden depender de los valores originales enviados. Considera si crear un nuevo envío corregido podría ser más apropiado que editar uno antiguo.

## Comprender la estructura del formulario

El formulario que ves mientras editas se basa en un **esquema de formulario** — el modelo subyacente que define todos los campos, secciones y reglas. Puedes ver una vista previa compilada del esquema del formulario desde el diseñador.

![Vista del formulario compilado después de hacer clic en Ver el formulario](../imgs/forms/edit-form-view.png)

El esquema en sí se puede editar por separado. Si necesitas cambiar la estructura de un formulario (agregar o eliminar campos, ajustar la validación), consulta [Editar esquema de formulario](edit-form-schema.md).

![Vista principal de la página Editar esquema de formulario](../imgs/forms/edit-form-schema.png)

## Acciones relacionadas

*   Para comprender la estructura del formulario en sí, consulta [Editar esquema de formulario](edit-form-schema.md).
*   Para crear un envío completamente nuevo, normalmente comienzas desde la página principal de [Formularios](index.md).
*   Para explorar tus formularios y envíos en un mapa, consulta [Mapa de formularios](forms-map.md).