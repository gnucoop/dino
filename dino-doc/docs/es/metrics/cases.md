---
title: Casos
description: "Gestiona casos en Dino: crea, edita, visualiza, imprime, filtra y exporta registros de casos desde una tabla de datos estructurada."
---

# Casos

La página Casos es un espacio de trabajo centralizado para rastrear y gestionar registros de casos individuales. Cada caso es un registro estructurado que puede contener un nombre, un código, una imagen, una relación principal, notas y atributos adicionales. Desde esta página puedes crear nuevos casos, editar o ver los existentes, imprimir fichas de casos, eliminar registros y exportar tu lista de casos, todo desde una única tabla interactiva.

![Vista principal de la página Casos](../imgs/metrics/cases.png)

## Descripción general de la tabla

La tabla muestra las siguientes columnas de forma predeterminada:

- **Case Name** – El nombre asignado al caso (ordenable).
- **Código** – Un código que identifica el caso. Dino lo genera: tú no lo introduces y no se muestra en el diálogo del caso.
- **Case Image** – Un archivo de imagen subido que representa el caso.
- **Caso principal** – El nombre de cualquier caso principal al que pertenezca este caso.

Las columnas adicionales — **ID**, **Notes**, **Fecha de creación** y **Atributos adicionales** — están ocultas de forma predeterminada. Haz clic en **Columnas** encima de la tabla para elegir qué columnas aparecen. También puedes arrastrar los encabezados de las columnas para reordenarlas, y la página muestra el número total de elementos encontrados junto al paginador.

## Trabajar con un solo caso

Pasa el cursor sobre una fila para mostrar los iconos **Editar** y **Ver**. Haz clic en la fila para seleccionarla: la barra de acciones encima de la tabla mostrará entonces todas las acciones:

- **Editar** – Abre un diálogo donde puedes modificar los detalles del caso.
- **Imprimir** – Genera una ficha en PDF imprimible para el caso.
- **Ver** – Abre un diálogo de solo lectura para inspeccionar la información del caso.
- **Eliminar** – Abre un diálogo de confirmación para eliminar el caso de forma permanente.

## Trabajar con varios casos

1. Selecciona una o varias filas usando las casillas de verificación de la primera columna.
2. Cuando se selecciona una sola fila, todas sus acciones estarán disponibles en la barra de acciones encima de la tabla.
3. Cuando se seleccionan varias filas, solo quedan las acciones masivas — actualmente **Eliminar**.

!!! warning "La eliminación es permanente"
    Los casos eliminados no se pueden recuperar. Revisa tu selección con cuidado antes de confirmar una eliminación masiva. Un caso que sea utilizado por form, o que tenga casos secundarios, no se puede eliminar; consulta [Metrics](index.md).

## Crear un caso

1. Haz clic en **Add new CASE** en la barra de herramientas encima de la tabla.
2. En el diálogo, completa los detalles del caso. Los campos opcionales están marcados como *(optional)*.
    - **Case Name** – Introduce un nombre descriptivo.
    - **Case Image** – Sube un archivo de imagen.
    - **Caso principal** – De forma opcional, vincula este caso a un caso principal existente.
    - **Notes** – Añade las notas que consideres relevantes.
3. Haz clic en **Guardar** para crear el caso.

## Importar casos

Haz clic en **Import CASE** en la barra de herramientas para subir casos de forma masiva desde un archivo `.xls`, `.xlsx` o `.csv`. La página de importación te guía a través de la subida del archivo, la asignación de sus columnas y la revisión del resultado. Los casos cuyo nombre ya existe se reutilizan, no se actualizan; el código lo genera Dino y no se puede importar.

## Buscar y filtrar

Usa la barra de herramientas para acotar la tabla:

- **Búsqueda por palabra clave** – Escribe en el campo de búsqueda para encontrar texto en los campos mostrados.
- **Filtros** – Abre el panel de filtros para establecer un **Desde fecha** y un **Hasta la fecha**, que filtran por fecha de creación, y luego haz clic en **Buscar**. La insignia del botón **Filtros** muestra cuántos filtros están activos.
- Los filtros aplicados aparecen como chips debajo de la barra de herramientas; haz clic en el icono de cancelar de un chip para eliminar ese filtro.

## Exportar casos

1. Haz clic en **Exportar** en la barra de herramientas.
2. Elige qué exportar: *Elementos de la página* (la opción predeterminada), los elementos que coincidan con tus filtros, o *Todos los elementos*.
3. Elige el formato: *csv*, *xlsx* o *splitted xlsx*, y luego haz clic en **Exportar**.

## Páginas relacionadas

- [Metrics Overview](index.md) – Vuelve al panel principal de métricas.
- [Thematic Areas](areas.md) – Organiza los casos por área temática.
- [Locations](locations.md) – Asocia los casos con posiciones geográficas.
- [Organizations](organizations.md) – Vincula los casos con organizaciones.
- [Projects](projects.md) – Agrupa los casos en proyectos.