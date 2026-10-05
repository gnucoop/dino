---
title: Agregación
description: Ver, filtrar y gestionar todos los datos de los formularios de tus form schemas desde una sola página.
---

# Agregación

La página Agregación te ofrece una vista centralizada de todos los datos de los formularios de tus form schemas. En lugar de abrir cada formulario individualmente, puedes consultar todos los datos en una sola tabla, acotarlos con filtros y realizar acciones como ver, editar, imprimir o eliminar.

![Vista principal de la página Agregación](../imgs/aggregation/index.png)

## Ver la lista de agregación

La tabla muestra una fila por cada dato. De forma predeterminada se muestran las columnas **Formulario** y **Estado**; usa el botón **Columnas** situado encima de la tabla, a la derecha, para elegir qué columnas se muestran.

- Cada fila muestra un icono de estado. Si un dato tiene problemas de validación, aparece un icono de advertencia en la fila.
- Pasa el cursor sobre una fila para mostrar los iconos **Ver** y **Editar**; haz clic en cualquier parte de una fila para seleccionarla y ver todas las acciones disponibles.
- El contador **Elementos encontrados** y el paginador de la parte superior de la página te indican cuántos datos existen y te permiten moverte entre páginas.

Si no aplicas ningún filtro, la lista muestra todos los datos que tienes permiso para ver, en función de tus permisos de usuario.

## Filtro y búsqueda

1. Escribe en el campo **buscar por palabra clave** de la barra de herramientas para buscar entre los datos.
2. Haz clic en **Filtros** en la barra de herramientas para abrir el panel de filtros.
3. Elige una **Desde fecha** y una **Hasta la fecha** para filtrar por fecha de creación.
4. Rellena cualquiera de los filtros adicionales: **Área**, **Caso**, **Código de caso**, **Ubicación**, **Organización**, **Proyecto**, **Estado del formulario** y **Usuario**. Los valores disponibles dependen de las métricas configuradas en tu Dino.
5. Haz clic en **Buscar** para aplicar los filtros, o en **Restablecer los filtros** para borrarlos.

Los filtros activos aparecen como chips debajo de la barra de herramientas. Haz clic en el icono **cancelar** de un chip para eliminar ese filtro.

!!! tip "Sin preajustes guardados"
    La página Agregación no admite preajustes de filtros guardados ni condiciones de filtro avanzadas. Debes combinar los filtros cada vez que necesites una vista personalizada; eliminar un chip es la forma más rápida de relajar una búsqueda existente.

## Acciones de fila

Pasa el cursor sobre una fila para mostrar los iconos **Ver** (ojo) y **Editar** (lápiz). Para ver todas las acciones, haz clic en la fila para seleccionarla: la barra de acciones situada encima de la tabla mostrará entonces un botón por cada acción que tengas permitida.

| Acción | Descripción |
|--------|-------------|
| **Ver** | Abre el dato en modo de solo lectura. |
| **Editar** | Modifica los datos del dato. |
| **Imprimir** | Genera un PDF del dato. |
| **Eliminar** | Elimina el dato. |

**Imprimir** y **Eliminar** piden confirmación (*¿Quieres imprimir los elementos seleccionados?*, **Sí** / **No**) antes de ejecutarse.

## Crear un nuevo dato

El botón **Agregar nuevo formulario** de la barra de herramientas te permite iniciar un nuevo dato. Solo se muestra si la creación de datos desde la página Agregación está habilitada en tu instancia de Dino.

![Diálogo para elegir un form schema e iniciar un nuevo dato](../imgs/aggregation/index-new.png)

1. Haz clic en **Agregar nuevo formulario**. Se abre el diálogo **Crear formulario**, con la lista de form schemas disponibles.
2. Selecciona el form schema que quieras usar.
3. Haz clic en **Crear formulario**. Se te redirige a la página [Editar formulario](../forms/edit-form.md), donde rellenas y guardas los datos.

## Imprimir un PDF

Puedes generar un PDF de cualquier dato. El PDF incluye la etiqueta del form schema, los nombres de las métricas activas y los datos que se rellenaron.

1. Haz clic en la fila que quieras imprimir para seleccionarla y, a continuación, haz clic en **Imprimir** en la barra de acciones.
2. Confirma con **Sí**.
3. El PDF se abre en una nueva pestaña del navegador o se descarga automáticamente.

La cabecera del PDF incluye el título del form schema y todos los nombres de las métricas actualmente activas en el sistema.

!!! warning "Disponibilidad de las métricas"
    El PDF incluye únicamente las métricas que estén activas en el momento de lanzar la impresión. Una métrica añadida después de crear el dato no aparecerá.

## Páginas relacionadas

- [Formularios](../forms/index.md): gestiona los form schemas que hay detrás de tus datos.
- [Editar formulario](../forms/edit-form.md): rellena y actualiza los datos.
- [Importar datos](../forms/import.md): trae datos a Dino de forma masiva.
- [Métricas](../metrics/index.md): configura las métricas que determinan los filtros y la salida impresa.