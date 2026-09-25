---
title: Ubicaciones
description: Gestiona las ubicaciones geográficas utilizadas en las métricas y los formularios de Dino.
---

# Ubicaciones

La página **Ubicaciones** te permite gestionar las ubicaciones geográficas a las que hacen referencia tus formularios, casos y otras métricas. Puedes añadir nuevas ubicaciones, editar las entradas existentes, importar datos de forma masiva y exportar la lista actual.

![Vista principal de la página Ubicaciones](../imgs/metrics/locations.png)

## Qué puedes ver

- **Ruta de navegación** – muestra tu posición actual en la navegación.
- **Búsqueda y filtros** – búsqueda por palabra clave, selector de rango de fechas y filtros avanzados configurables (por ejemplo, por métrica, estado, usuario). También puedes guardar y cargar ajustes de filtros predefinidos.
- **Tabla** – muestra el Nombre de la ubicación y la Ubicación principal de forma predeterminada. Las columnas ocultas (ID, Fecha de creación, Coordenadas, Atributos adicionales) se pueden mostrar mediante el botón **Personaliza las columnas** (en la esquina inferior derecha del encabezado de la tabla).
- **Paginación** – controles para navegar entre páginas.
- **Acciones masivas** – selecciona filas con las casillas para eliminar o editar varias ubicaciones a la vez.
- **Botones de acción flotantes** – **Añadir nuevo** (icono de más) e **Importar** (icono de subir a la nube) permanecen disponibles mientras te desplazas.

## Acciones por fila

Cada fila tiene tres acciones rápidas (visibles al pasar el cursor sobre la fila):

- **Editar** – abre el diálogo de ubicación para modificar los detalles.
- **Eliminar** – elimina la ubicación tras la confirmación.
- **Ver** – abre un diálogo de solo lectura que muestra todos los campos.

Al hacer clic en una fila, esta se selecciona (se resalta) y, si la lista es expandible, se muestra un panel de detalle con datos adicionales.

## Trabajar con ubicaciones

### Añadir una nueva ubicación

1. Haz clic en el botón flotante **Añadir nuevo** (esquina inferior derecha).
2. En el diálogo, rellena los campos obligatorios (por ejemplo, Nombre de la ubicación).
3. Opcionalmente, establece una Ubicación principal, Coordenadas y Atributos adicionales.
4. Haz clic en **Guardar**.

### Editar una ubicación

1. Haz clic en el icono **Editar** (lápiz) de la fila deseada.
2. Actualiza los campos en el diálogo.
3. Haz clic en **Guardar**.

### Eliminar una ubicación

1. Haz clic en el icono **Eliminar** (papelera) de la fila.
2. Confirma la eliminación en el aviso.

### Importar ubicaciones desde un archivo

1. Haz clic en el botón flotante **Importar** (icono de subir a la nube).
2. Selecciona un archivo CSV o Excel que siga el formato esperado.
3. Asigna las columnas a los campos de ubicación si es necesario.
4. Haz clic en **Importar**.

!!! tip "Edición masiva"
    Selecciona varias filas con las casillas y, a continuación, haz clic en el botón **Editar** (icono edit_note) que aparece encima de la tabla para actualizar varias ubicaciones a la vez.

### Exportar la lista de ubicaciones

1. Haz clic en el botón **Exportar** (icono de descargar de la nube) en la barra de filtros.
2. Elige el formato de exportación (CSV o Excel).
3. El archivo se descarga automáticamente.

### Coordenadas de ubicación

Si estableces el atributo "coordinates" de un valor de ubicación concreto, la información se utilizará para visualizar los datos de tus formularios en un [mapa](../forms/forms-map.md).

## Páginas relacionadas

- [Descripción general de las métricas](index.md) – vuelve al inicio de las métricas.
- [Casos](cases.md) – gestiona los casos que hacen referencia a ubicaciones.
- [Organizaciones](organizations.md) – gestiona las organizaciones vinculadas a ubicaciones.
- [Proyectos](projects.md) – consulta los proyectos asociados a ubicaciones.