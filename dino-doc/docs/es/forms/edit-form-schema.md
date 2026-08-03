---
title: Editar esquema de formulario
description: "Crea y modifica esquemas de formulario: define nombre, icono, estados, métricas, visibilidad y relaciones."
---

# Editar esquema de formulario

La página **Editar esquema de formulario** te permite crear un nuevo esquema de formulario o modificar uno existente. Aquí defines los atributos básicos del formulario, gestionas sus estados y métricas, controlas la visibilidad y vinculas el esquema con otros formularios mediante relaciones.

Puedes acceder a esta página de las siguientes maneras:

- Haz clic en **Crear** en la [Vista general de formularios](index.md) para crear un nuevo esquema.
- Selecciona **Editar** en la tarjeta de un esquema existente o desde su vista de detalle.

Las migas de pan de la parte superior muestran tu posición actual (p. ej., **Formularios > Mi encuesta > Editar**).

![Main view of the Edit Form Schema page](../imgs/forms/edit-form-schema.png)

## Atributos del formulario

Rellena o ajusta los siguientes campos:

| Campo | Descripción |
|-------|-------------|
| **Nombre del formulario** | Identificador único del sistema (p. ej., `survey_2025`). Dino avisa si el nombre ya está en uso. |
| **Etiqueta del formulario** | El nombre legible que se muestra en listas e informes. |
| **Conjunto de iconos** | Elige **Por defecto** (iconos de Material) o **Humanitario** (iconos SVG personalizados). |
| **Identificador de icono** | Selecciona un icono de la lista de autocompletar. La vista previa se actualiza en tiempo real. |
| **Estados del formulario** | Una o varias etiquetas que describen el estado de un envío (p. ej., Borrador, Aprobado, Rechazado). Selecciona estados existentes o haz clic en **Crear nuevo estado** para añadir uno sobre la marcha. |
| **Métricas del formulario** | Métricas que se recopilan para cada envío. Selecciona una o varias de la lista. |
| **Visibilidad** | **Privado**: solo los miembros de los grupos asignados pueden ver el formulario. **Público**: cualquier persona con el enlace puede verlo y enviarlo. |
| **Comportamiento del conjunto de métricas** | **Por defecto**: cada valor de métrica puede aparecer varias veces en los envíos. **Único**: un valor de métrica (p. ej., un nombre de distrito) solo puede utilizarse una vez por formulario. |
| **Generar informe** | Si se elige **Sí**, Dino genera automáticamente un informe después de cada envío. Esta opción se oculta si ya hay un informe automático configurado. |

!!! warning "Comportamiento único del conjunto de métricas"
    Usa **Único** con cuidado: una vez que un valor se usa para una métrica, no puede reutilizarse en otro envío del mismo formulario.

## Gestión de estados del formulario

1. Haz clic en el campo **Estados del formulario** para desplegar la lista.
2. Para añadir un estado existente, marca su casilla.
3. Para crear un estado nuevo, haz clic en **Crear nuevo estado**. Se abre un diálogo donde puedes introducir una etiqueta, elegir un color y guardar.
4. Para editar un estado existente, haz clic en el icono **editar** (lápiz) que aparece junto a él.
5. Haz clic fuera del menú desplegable para cerrarlo.

## Definición de relaciones

Las relaciones permiten vincular campos entre distintos esquemas de formulario (p. ej., un subformulario que depende de una opción del formulario principal).

1. Haz clic en el botón **Relaciones**.
2. En el diálogo, añade, edita o elimina conexiones entre esquemas.

![Form relationships (dependencies) editor dialog](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Las relaciones solo están disponibles al editar un esquema existente, no durante la creación inicial."

## Guardar e importar

- **Guardar** – guarda todos los cambios. El botón está desactivado si el formulario no es válido o si todavía se está guardando.
- **Importar** – abre un selector de archivos para cargar un esquema de formulario desde un archivo JSON o CSV. Utilízalo para reutilizar una estructura de esquema de otro proyecto.

## El constructor de formularios

Debajo de los atributos, el área **Constructor de formularios** te permite arrastrar, soltar y configurar campos individuales (preguntas, secciones, etc.). Los cambios se reflejan de inmediato en la vista previa que aparece a la derecha del constructor.