---
title: Ubicaciones
description: Gestione las ubicaciones geográficas utilizadas en las métricas y formularios de Dino.
---

# Ubicaciones

La página **Ubicaciones** le permite gestionar las ubicaciones geográficas referenciadas por sus formularios, casos y otras métricas. Puede agregar nuevas ubicaciones, editar entradas existentes, importar datos en bloque y exportar la lista actual.

![Vista principal de la página Ubicaciones](../imgs/metrics/locations.png)

## Lo que ve

- **Migas de pan** – muestra su posición actual en la navegación.
- **Búsqueda y Filtros** – búsqueda por palabra clave, selector de rango de fechas y filtros avanzados configurables (p. ej., por métrica, estado, usuario). También puede guardar y cargar presets de filtros.
- **Tabla** – muestra Nombre de Ubicación y Ubicación Principal de forma predeterminada. Las columnas ocultas (ID, Fecha de Creación, Coordenadas, Atributos Adicionales) se pueden mostrar mediante el botón **Personalizar columnas** (parte inferior derecha del encabezado de la tabla).
- **Paginación** – controles para navegar entre páginas.
- **Acciones masivas** – seleccione filas usando casillas de verificación para eliminar o editar varias ubicaciones a la vez.
- **Botones de acción flotantes** – **Agregar nuevo** (icono de más) e **Importar** (icono de carga en la nube) permanecen disponibles mientras se desplaza.

## Acciones de fila

Cada fila tiene tres acciones rápidas (visibles al pasar el cursor sobre la fila):

- **Editar** – abre el diálogo de ubicación para modificar detalles.
- **Eliminar** – elimina la ubicación después de la confirmación.
- **Ver** – abre un diálogo de solo lectura que muestra todos los campos.

Al hacer clic en una fila, se selecciona (se resalta) y, si la lista es expandible, se revela un panel de detalles con datos adicionales.

## Trabajar con ubicaciones

### Agregar una nueva ubicación

1. Haga clic en el botón flotante **Agregar nuevo** (esquina inferior derecha).
2. En el diálogo, complete los campos obligatorios (p. ej., Nombre de Ubicación).
3. Opcionalmente, establezca una Ubicación Principal, Coordenadas y Atributos Adicionales.
4. Haga clic en **Guardar**.

### Editar una ubicación

1. Haga clic en el icono **Editar** (lápiz) en la fila deseada.
2. Actualice los campos en el diálogo.
3. Haga clic en **Guardar**.

### Eliminar una ubicación

1. Haga clic en el icono **Eliminar** (papelera) en la fila.
2. Confirme la eliminación en el mensaje.

### Importar ubicaciones desde un archivo

1. Haga clic en el botón flotante **Importar** (icono de carga en la nube).
2. Seleccione un archivo CSV o Excel siguiendo el formato esperado.
3. Asigne columnas a los campos de ubicación si es necesario.
4. Haga clic en **Importar**.

!!! tip "Edición masiva"
    Seleccione varias filas usando casillas de verificación, luego haga clic en el botón **Editar** (icono edit_note) que aparece sobre la tabla para actualizar varias ubicaciones a la vez.

### Exportar la lista de ubicaciones

1. Haga clic en el botón **Exportar** (icono de descarga en la nube) en la barra de filtros.
2. Elija el formato de exportación (CSV o Excel).
3. El archivo se descarga automáticamente.

## Páginas relacionadas

- [Resumen de Métricas](index.md) – volver al inicio de métricas.
- [Casos](cases.md) – gestionar casos que referencian ubicaciones.
- [Organizaciones](organizations.md) – gestionar organizaciones vinculadas a ubicaciones.
- [Proyectos](projects.md) – ver proyectos asociados a ubicaciones.

!!! warning "Eliminar una ubicación"
    Eliminar una ubicación puede afectar formularios y casos que la referencian. Asegúrese de que ningún registro activo dependa de la ubicación antes de eliminarla.