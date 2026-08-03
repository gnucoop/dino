---
title: Ubicaciones
description: Gestiona las ubicaciones geográficas utilizadas en las métricas y formularios de Dino.
---

# Ubicaciones

La página **Ubicaciones** te permite gestionar las ubicaciones geográficas referenciadas por tus formularios, casos y otras métricas. Puedes añadir nuevas ubicaciones, editar entradas existentes, importar datos en masa y exportar la lista actual.

![Main view of the Locations page](../imgs/metrics/locations.png)

## Lo que verás

- **Ruta de navegación** – muestra tu posición actual en la navegación.
- **Búsqueda y filtros** – búsqueda por palabra clave, selector de rango de fechas y filtros avanzados configurables (p. ej., por métrica, estado, usuario). También puedes guardar y cargar ajustes de filtro.
- **Tabla** – muestra el Nombre de la ubicación y la Ubicación superior de forma predeterminada. Las columnas ocultas (ID, Fecha de creación, Coordenadas, Atributos adicionales) se pueden mostrar mediante el botón **Personalizar columnas** (abajo a la derecha del encabezado de la tabla).
- **Paginación** – controles para navegar entre páginas.
- **Acciones masivas** – selecciona filas usando las casillas de verificación para eliminar o editar varias ubicaciones a la vez.
- **Botones de acción flotantes** – **Añadir nuevo** (icono de más) e **Importar** (icono de subida a la nube) permanecen disponibles mientras te desplazas.

## Acciones de fila

Cada fila tiene tres acciones rápidas (visibles al pasar el cursor sobre la fila):

- **Editar** – abre el diálogo de ubicación para modificar los detalles.
- **Eliminar** – elimina la ubicación después de la confirmación.
- **Ver** – abre un diálogo de solo lectura que muestra todos los campos.

Al hacer clic en una fila, la selecciona (la resalta) y, si la lista es expandible, muestra un panel de detalles con datos adicionales.

## Trabajar con ubicaciones

### Añadir una nueva ubicación

1. Haz clic en el botón flotante **Añadir nuevo** (esquina inferior derecha).
2. En el diálogo, completa los campos obligatorios (p. ej., Nombre de la ubicación).
3. Opcionalmente, configura una Ubicación superior, Coordenadas y Atributos adicionales.
4. Haz clic en **Guardar**.

### Editar una ubicación

1. Haz clic en el icono **Editar** (lápiz) en la fila deseada.
2. Actualiza los campos en el diálogo.
3. Haz clic en **Guardar**.

### Eliminar una ubicación

1. Haz clic en el icono **Eliminar** (papelera) en la fila.
2. Confirma la eliminación en el aviso.

### Importar ubicaciones desde un archivo

1. Haz clic en el botón flotante **Importar** (icono de subida a la nube).
2. Selecciona un archivo CSV o Excel siguiendo el formato esperado.
3. Mapea las columnas a los campos de ubicación si es necesario.
4. Haz clic en **Importar**.

!!! tip "Edición masiva"
    Selecciona varias filas con las casillas de verificación y haz clic en el botón **Editar** (icono edit_note) que aparece sobre la tabla para actualizar varias ubicaciones a la vez.

### Exportar la lista de ubicaciones

1. Haz clic en el botón **Exportar** (icono de descarga de la nube) en la barra de filtros.
2. Elige el formato de exportación (CSV o Excel).
3. El archivo se descarga automáticamente.

## Páginas relacionadas

- [Resumen de métricas](index.md) – volver a la página principal de métricas.
- [Casos](cases.md) – gestiona los casos que referencian ubicaciones.
- [Organizaciones](organizations.md) – gestiona las organizaciones vinculadas a ubicaciones.
- [Proyectos](projects.md) – consulta los proyectos asociados a ubicaciones.

!!! warning "Eliminar una ubicación"
    Eliminar una ubicación puede afectar a los formularios y casos que la referencian. Asegúrate de que ningún registro activo dependa de la ubicación antes de eliminarla.