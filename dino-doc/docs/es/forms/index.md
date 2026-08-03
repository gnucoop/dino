---
title: Formularios
description: Gestiona esquemas de formularios y recopila envíos de datos estructurados en Dino.
---

# Formularios

La página **Formularios** es tu punto de partida para la recopilación de datos estructurados en Dino. Desde aquí puedes explorar, crear y gestionar esquemas de formularios, así como ver y trabajar con los envíos recopilados mediante cada formulario.

![Vista principal de la página de Formularios](../imgs/forms/index.png)

La vista principal muestra una **cuadrícula de fichas de esquemas de formulario**. Cada ficha muestra la etiqueta y el icono del formulario. Al pasar el cursor sobre una ficha se muestran los botones de acción:

- **Editar esquema** – Modifica la estructura del formulario (campos, validación, métricas).
- **Eliminar esquema** – Elimina el esquema del formulario (y todos sus envíos).
- **Compartir URL** – Obtén un enlace público para permitir envíos externos.
- **Ver mapa** – Abre la vista de mapa para los envíos con datos de ubicación.
- **Chatea con tus datos** – Usa la función [DataChat](datachat.md) para hacer preguntas sobre los envíos en lenguaje natural.

!!! tip
    Las acciones disponibles en una ficha dependen de tus permisos. Es posible que no veas todos los botones.

Para crear un nuevo esquema de formulario, haz clic en el botón flotante **+** en la parte inferior derecha. Se te llevará a la página [Editar esquema de formulario](edit-form-schema.md) para diseñar tu formulario.

## Trabajar con envíos

Haz clic en una ficha de esquema de formulario para acceder a su **lista de envíos**. Esta tabla muestra todas las entradas de datos recopiladas para ese esquema.

![Lista de envíos (tabla de datos) de un esquema de formulario](../imgs/forms/index-list.png)

La lista incluye una **barra de filtros** que te permite buscar por palabra clave, rango de fechas, métricas, estado, usuario y más. También puedes guardar preajustes de filtro para reutilizarlos rápidamente.

Usa el botón **exportar** para descargar los envíos en formato CSV o XLSX.

![Diálogo de exportación para descargar envíos de formularios](../imgs/forms/index-export.png)

### Acciones de fila

Haz clic en una fila para expandir sus detalles, o usa las acciones de fila (ver, editar, eliminar, imprimir como PDF, descargar como DOCX, imprimir insignia). Las acciones disponibles dependen de tus permisos y de la configuración del formulario.

### Crear un nuevo envío

Haz clic en el botón flotante **+** en la página de lista para abrir un formulario en blanco para la entrada de datos.

![Formulario en blanco abierto para enviar una nueva entrada de datos](../imgs/forms/index-create.png)

Completa los campos y envía. El nuevo envío aparecerá en la lista.

### Operaciones masivas

Selecciona varios envíos usando las casillas de verificación para realizar **eliminaciones** o **ediciones** masivas (cambiar el mismo valor de campo en todas las entradas seleccionadas).

## Vistas adicionales

- **Mapa** – Ve los envíos con coordenadas geográficas en un mapa interactivo. Más información en [Mapa de formularios](forms-map.md).
- **DataChat** – Consulta los datos de tus formularios usando lenguaje natural. Consulta [DataChat](datachat.md) para más detalles.

!!! warning
    La función DataChat puede consumir créditos. Comprueba el saldo de créditos de tu cuenta antes de usarla.