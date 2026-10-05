---
title: Proyectos
description: Gestiona tus proyectos en Dino. Consulta, añade, edita, elimina, importa y exporta registros de proyectos con filtros y acciones masivas.
---

# Proyectos

La página **Proyectos** de Dino te permite gestionar todos los valores de la métrica Proyecto. Puede utilizarse para mapear los proyectos de tu organización, un programa, colaboraciones con donantes o cualquier otro grupo estructurado de actividades relevante para tu trabajo. Puedes consultar una lista ordenable de proyectos, añadir nuevos, editar los existentes, eliminarlos, importar datos de forma masiva y exportar la lista para analizarla sin conexión. La página también ofrece herramientas de filtrado para encontrar rápidamente el proyecto que necesitas.

![Vista principal de la página Proyectos](../imgs/metrics/projects.png)

## Cómo acceder a Proyectos

Para abrir la página Proyectos, haz clic en **Métricas** en la navegación principal y, a continuación, en la tarjeta **Proyectos**. La URL del navegador terminará en `/metrics/projects`.

## Cómo entender la lista de proyectos

La tabla principal muestra una lista de todos los proyectos. Cada fila corresponde a un proyecto y muestra las siguientes columnas de forma predeterminada:

- **Nombre del proyecto** – El nombre del proyecto. Puedes ordenar la lista por esta columna.
- **Proyecto principal** – El proyecto de nivel superior al que pertenece este proyecto, si lo hay.
- **Código** – Un código de proyecto asignado manualmente.
- **Código automático** – Un código generado automáticamente. Lo establece Dino: no se muestra en el cuadro de diálogo del proyecto y no se puede editar.
- **Sectores de Intervención** – Los sectores en los que se centra el proyecto.
- **Donantes** – Las fuentes de financiación del proyecto.
- **Fecha de inicio** – La fecha en que comienza el proyecto.
- **Fecha final** – La fecha en que finaliza el proyecto.

Las columnas ocultas (ID, Fecha de creación y Atributos adicionales) se pueden mostrar con el botón **Columnas** (información sobre herramientas *Personalizar las columnas*), situado encima de la tabla, a la derecha.

!!! tip "Campos de solo lectura"
    El campo **Código automático** se genera automáticamente y no se puede modificar. Se muestra en la lista, pero no en el cuadro de diálogo del proyecto.

La barra de herramientas superior muestra el número total de elementos encontrados y un paginador. Puedes elegir cuántos proyectos ver por página.

## Gestión de proyectos

### Añadir un nuevo proyecto

1. Haz clic en el botón **Añadir nuevo PROYECTO** en la barra de herramientas situada encima de la tabla.
2. Se abre un cuadro de diálogo en el que rellenas los detalles del proyecto. Los campos opcionales están marcados como *(opcional)*.
3. Pulsa **Guardar** para crear el proyecto. Aparece en la lista inmediatamente.

### Editar un proyecto

1. Pasa el cursor sobre la fila del proyecto y haz clic en el icono **Editar** (lápiz), o selecciona la fila y haz clic en **Editar** en la barra de acciones situada encima de la tabla.
2. Modifica los campos en el cuadro de diálogo.
3. Haz clic en **Guardar** para aplicar los cambios.

### Ver un proyecto

- Pasa el cursor sobre la fila del proyecto y haz clic en el icono **Ver** (ojo), o selecciona la fila y haz clic en **Ver** en la barra de acciones, para abrir una versión de solo lectura del cuadro de diálogo de detalles del proyecto.

### Eliminar un proyecto

1. Haz clic en la fila del proyecto para seleccionarla y, a continuación, haz clic en **Eliminar** en la barra de acciones situada encima de la tabla.
2. Confirma la eliminación en la ventana emergente. El proyecto se elimina de forma permanente.

!!! warning "Eliminar un proyecto"
    Eliminar un proyecto lo quita del sistema. Esta acción no se puede deshacer. Un proyecto que esté siendo utilizado por formularios, o que tenga proyectos secundarios, no se puede eliminar; consulta [Métricas](index.md).

## Búsqueda y filtrado

La barra de **búsqueda y filtros** se encuentra debajo del encabezado de la página. Puedes:

- **buscar por palabra clave** – Escribe cualquier término en el campo de palabra clave; la lista se filtra automáticamente.
- **Filtrar por rango de fechas** – Haz clic en **Filtros**, establece un **Desde fecha** y un **Hasta la fecha**, y luego haz clic en **Buscar**. Las fechas filtran por la fecha de creación del proyecto, no por su fecha de inicio o finalización.

Debajo de la barra de filtros aparecen etiquetas de filtro que muestran los filtros activos. Puedes eliminar etiquetas individuales haciendo clic en el icono **cancelar** de cada una.

## Exportar e importar

### Exportar proyectos

1. Haz clic en el botón **Exportar** de la barra de herramientas.
2. Elige qué exportar: *Elementos de la página* (opción predeterminada), los elementos que coincidan con tus filtros o *Todos los elementos*.
3. Elige el formato: *csv*, *xlsx* o *splitted xlsx*, y luego haz clic en **Exportar**.

### Importar proyectos

1. Haz clic en el botón **Importar PROYECTO** en la barra de herramientas situada encima de la tabla.
2. Sube un archivo `.xls`, `.xlsx` o `.csv` y asigna sus columnas a los campos del proyecto.
3. Haz clic en **Aplicar importación** y revisa el resultado por si hay errores o advertencias. Los proyectos cuyo nombre ya existe se reutilizan, no se actualizan.

## Acciones masivas

Puedes seleccionar varios proyectos con las casillas de verificación situadas a la izquierda de cada fila. Con varios proyectos seleccionados, la barra de acciones situada encima de la tabla ofrece **Eliminar**, que quita todos los proyectos seleccionados tras la confirmación. No hay edición masiva.

Después de eliminar, la lista se actualiza automáticamente.

## Páginas relacionadas

- [Descripción general de Métricas](index.md)
- [Áreas temáticas](areas.md)
- [Organizaciones](organizations.md)
- [Ubicaciones](locations.md)
- [Casos](cases.md)