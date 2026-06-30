---
title: Gestión de valores métricos – Áreas temáticas
description: Aprenda a ver, agregar, editar, eliminar y buscar áreas temáticas en la sección de gestión de métricas de Dino.
---

# Gestión de valores métricos – Áreas temáticas

La página **Áreas temáticas** (accesible desde la sección Métricas) le permite organizar sus datos de métricas por categorías jerárquicas. Aquí puede ver, crear, editar y eliminar áreas temáticas, así como filtrar y exportar la lista.

![Vista principal de la página de gestión de valores métricos](../imgs/metrics/areas.png)

## Lo que ve

- Las **migas de pan** en la parte superior muestran su ubicación actual en la aplicación.
- La tabla principal enumera todas las áreas temáticas, mostrando columnas como **Nombre del área**, **Área principal** y (si está configurado) otros atributos. Puede personalizar las columnas visibles haciendo clic en el icono **view_week** en el encabezado.
- Una **barra de búsqueda** y un **panel de filtros** le permiten encontrar áreas por palabra clave, rango de fechas u otros metadatos.
- El botón **Exportar** (cloud_download) le permite descargar la lista actual como archivo.
- Hay dos botones de acción flotantes disponibles:
    - **+ (Agregar nuevo)** – crea una nueva área temática.
    - **cloud_upload** – importa áreas desde un archivo externo.

## Trabajar con áreas temáticas

### Agregar una nueva área temática

1. Haga clic en el botón flotante **+**.
2. En el cuadro de diálogo que se abre, complete los campos obligatorios (por ejemplo, **Nombre del área**, **Área principal**).
3. Haga clic en **Crear** para guardar la nueva área.

!!! tip "Área principal"
    Para crear una subárea, seleccione un **Área principal** en el menú desplegable. Si se deja en blanco, la nueva área se convierte en una entrada de nivel superior.

### Editar un área existente

1. Encuentre el área que desea cambiar en la tabla.
2. Haga clic en el icono **edit** (lápiz) en la columna de acciones de la fila.
3. Modifique los campos en el cuadro de diálogo y haga clic en **Guardar**.

### Ver detalles

- Haga clic en el icono **visibility** para abrir un cuadro de diálogo de solo lectura que muestra todos los campos del área.
- También puede **hacer clic en una fila** para expandirla y revelar las áreas secundarias (si la jerarquía está configurada).

### Eliminar un área

1. Haga clic en el icono **delete** (papelera) en la columna de acciones de la fila.
2. Confirme la eliminación en el cuadro de diálogo que aparece.

!!! warning "Consideraciones sobre eliminación"
    Eliminar un área principal puede afectar a las áreas secundarias. Dino le advertirá si hay elementos asociados. Proceda con precaución.

## Búsqueda y filtrado

- Use el campo de **búsqueda por palabra clave** en la parte superior de la lista para filtrar áreas por nombre.
- Abra el panel de filtros haciendo clic en la flecha **expand**. Puede configurar:
    - **Fecha desde / Fecha hasta** – filtrar por fecha de creación.
    - **Filtros adicionales** (por ejemplo, campos específicos de métricas) – si su instancia tiene atributos personalizados.
- Aplique un **preajuste de filtro** (si está disponible) para cargar rápidamente combinaciones de filtros guardadas.

## Exportar la lista

1. Haga clic en el botón **cloud_download** en la barra de herramientas.
2. Elija el formato de exportación (por ejemplo, CSV, Excel).
3. El archivo se generará con el conjunto de áreas actualmente visible (filtrado).

## Acciones masivas

Para realizar acciones en varias áreas a la vez (por ejemplo, eliminar varias), seleccione las casillas de verificación junto a las filas. Los botones de acciones masivas aparecerán en el encabezado de la columna. Actualmente, la pantalla de Áreas temáticas admite **eliminación masiva**.

## Navegación con migas de pan

Las migas de pan muestran su ubicación actual (por ejemplo, **Métricas > Áreas temáticas**). Haga clic en cualquier enlace de las migas de pan para saltar a un nivel superior.

## Páginas relacionadas

- [Resumen de Métricas](index.md)
- [Gestión de valores métricos – Casos, ubicaciones, organizaciones y proyectos](areas.md) (esta página)
- [Usuarios y grupos](../administration/users.md)
