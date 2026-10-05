---
title: Editar esquema de formulario
description: "Crea y modifica esquemas de formulario: define el nombre, el icono, la visibilidad, los estados, las métricas, las relaciones y la estructura del formulario en sí."
---

# Editar esquema de formulario

La página Editar esquema de formulario te permite crear un nuevo esquema de formulario o modificar uno existente. Aquí defines los atributos generales del formulario, gestionas sus estados y métricas, controlas la visibilidad, lo conectas con otros esquemas de formulario y construyes las preguntas que tus usuarios responderán.

Puedes llegar a esta página de las siguientes formas:

- Haciendo clic en el botón **+** (*Add New Forms Schema*) en la esquina inferior derecha de la [vista general de formularios](index.md) para construir un nuevo esquema.
- Seleccionando **Editar** en la tarjeta de un esquema existente o desde su vista de detalle.

El percorso di navigazione en la parte superior muestra tu posición actual (p. ej., **Forms / Schema / My Survey / Edit**).

![Vista principal de la página Editar esquema de formulario](../imgs/forms/edit-form-schema.png)

El editor está organizado en pestañas: **Configuración**, **Métricas**, **Estado**, **Construir** y **Relaciones**. Los botones **Guardar** e **Importar XLSForm** permanecen visibles en la fila de pestañas, por lo que puedes guardar tu trabajo desde cualquier pestaña.

## Pestaña Configuración

La pestaña **Configuración** contiene los metadatos y la configuración general del cuestionario.

| Campo | Descripción |
|-------|-------------|
| **Nombre del formulario** | Un identificador único del sistema (p. ej., `survey_2025`). Dino te avisa si el nombre ya está en uso. |
| **Etiqueta del formulario** | El nombre legible que se muestra en las listas y los report. |
| **Conjunto de iconos** | Elige **Por defecto** (iconos material) o **Humanitarian** (iconos SVG personalizados). |
| **Icono del formulario** | Selecciona un icono de la lista de autocompletado. La vista previa junto al campo se actualiza en tiempo real. |
| **Visibilidad** | **Privado**: solo los usuarios de Dino con permiso para enviar pueden mandar datos a este esquema de formulario. **Público**: cualquiera con el enlace puede enviar. Consulta [public forms](../public-forms/index.md) para más detalles. |
| **Generar informe** | Cuando está en **Sí**, Dino genera automáticamente un report para el formulario. Si ya existe un report, esta opción queda bloqueada en **Sí**; para desactivarla, primero debes eliminar el esquema y los datos del report. Consulta [Auto reports](../reports/autoreports.md) para más detalles. |

!!! tip "Ve directamente a las preguntas"
    Haz clic en **Ir a la construcción** en la parte inferior de la pestaña Configuración para abrir la pestaña **Construir** de inmediato.

## Pestaña Métricas

En la pestaña **Métricas** eliges qué métricas se aplican a este cuestionario y cómo se comportan.

- **Métricas de formulario**: las métricas que se recogen en cada dato. Selecciona una o varias de la lista.
- **Comportamiento del conjunto de métricas**: **Por defecto** permite que cada valor de métrica aparezca varias veces en los datos. **Único** permite que un valor de métrica (p. ej., el nombre de un distrito) se use solo una vez por formulario.
- **Métricas para incluir en el formulario**: selecciona las métricas cuyos datos deben incluirse en el formulario.
- **Métricas incluidas como opciones de elección**: agrega una fila por cada métrica que quieras exponer como origen de elección. En cada fila, elige la métrica, opcionalmente indica atributos adicionales que se trasladen a la opción de elección y agrega una condición de filtro si quieres acotar las opciones disponibles. El nuevo origen de elección se llama `$metricName_metric_choice`.

!!! warning "Comportamiento del conjunto de métricas Único"
    Usa **Único** con cuidado: una vez que un valor se usa para una métrica, no puede reutilizarse en otro dato del mismo esquema de formulario.

## Pestaña Estado

En la pestaña **Estado** defines los estados que puede tener un dato de este cuestionario (por ejemplo, Borrador, Aprobado, Rechazado).

1. Haz clic en el campo **Estados de los formularios** para desplegar la lista.
2. Para agregar un estado existente, selecciónalo en la lista.
3. Para crear un nuevo estado, haz clic en **Crear un nuevo estado**. Se abre un diálogo donde puedes introducir una etiqueta, elegir un color y guardar.
4. Para editar un estado existente, haz clic en el icono **Editar** (lápiz) que aparece junto a él.
5. Haz clic fuera del desplegable para cerrarlo.

También puedes asociar un nivel a cada estado para establecer un orden. Cuando se crean nuevos datos de formulario, reciben el estado con el nivel más bajo.

## Pestaña Construir

La pestaña **Construir** contiene el creador de formularios, donde arrastras, sueltas y configuras campos, diapositivas y secciones individuales. Los cambios se reflejan de inmediato en la vista previa. Usa esta pestaña para definir las preguntas que los usuarios responderán realmente.

## Pestaña Relaciones

Las relaciones toman valores de campos u opciones de elección de otros esquemas de formulario y los traen a este; por ejemplo, un subformulario que depende de una elección hecha en el formulario principal.

1. Abre la pestaña **Relaciones**.
2. Haz clic en **Agregar relación con otros formularios**.
3. En la nueva fila, elige el **Formulario** del que tomar los datos y luego selecciona los **Campos** que quieres traer a este formulario.
4. Opcionalmente, elige uno o varios valores de **Métrica** para filtrar la relación.
5. Para usar un solo campo como opción de elección, activa **Campo como opción** y luego elige el **Campo de etiqueta** y, si es necesario, un **Campo adicional**.

![Pestaña Relaciones del editor de esquemas de formulario](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Guarda primero"
    La pestaña Relaciones y las secciones de datos de métricas necesitan un esquema de formulario guardado. Mientras todavía estás creando un esquema, permanecen bloqueadas con el recordatorio *Guarda primero el formulario para añadir relaciones*.

## Guardar e importar

- **Guardar**: almacena todos los cambios. El botón está deshabilitado mientras el formulario no es válido o ya se está guardando.
- **Importar XLSForm**: abre un diálogo donde puedes arrastrar un archivo XLSForm o hacer clic en **Escoge un archivo** (`.xls` o `.xlsx`; el archivo necesita las hojas *survey*, *choices* y *settings*), y luego hacer clic en **Aplicar** para cargarlo en el editor. Úsalo para reutilizar la estructura de un esquema de otro proyecto. No se almacena nada hasta que hagas clic en **Guardar**.