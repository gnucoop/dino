---
title: Gestión de valores de métricas – Áreas temáticas
description: Aprende a ver, agregar, editar, eliminar y buscar áreas temáticas en la sección de gestión de métricas de Dino.
---

# Gestión de valores de métricas – Áreas temáticas

La página **Áreas temáticas** (accesible desde la sección Métricas) te permite organizar los datos de tus métricas mediante categorías jerárquicas. Aquí puedes ver, crear, editar y eliminar áreas temáticas, así como filtrar y exportar la lista.

![Vista principal de la página Áreas temáticas](../imgs/metrics/areas.png)

## Qué puedes ver

- Los **rastros de navegación** en la parte superior muestran tu ubicación actual en la aplicación (por ejemplo, **Métricas > Áreas temáticas**).
- La tabla principal enumera todas las áreas temáticas y muestra columnas como **Nombre del área**, **Área principal** y (si está configurado) otros atributos. Puedes personalizar las columnas visibles haciendo clic en el icono **Personaliza las columnas** del encabezado.
- Una **barra de búsqueda** y un **panel de filtros** te permiten encontrar áreas por palabra clave, rango de fechas u otros metadatos.
- El botón **Exportar** (cloud_download) te permite descargar la lista actual como archivo.
- Hay dos botones de acción flotantes disponibles:
    - **+ (Agregar nuevo)** – crea una nueva área temática.
    - **cloud_upload** – importa áreas desde un archivo externo.

## Trabajar con áreas temáticas

### Agregar una nueva área temática

1. Haz clic en el botón flotante **+**.
2. En el cuadro de diálogo que se abre, completa los campos obligatorios (por ejemplo, **Nombre del área**, **Área principal**).
3. Haz clic en **Crear** para guardar la nueva área.

!!! tip "Área principal"
    Para crear una subárea, selecciona un **Área principal** en el menú desplegable. Si lo dejas en blanco, la nueva área se convierte en una entrada de nivel superior.

### Editar un área existente

1. Busca en la tabla el área que deseas modificar.
2. Haz clic en el icono **editar** (lápiz) en la columna de acciones de la fila.
3. Modifica los campos en el cuadro de diálogo y haz clic en **Guardar**.

### Ver detalles

- Haz clic en el icono **visibility** para abrir un cuadro de diálogo de solo lectura que muestra todos los campos del área.
- También puedes **hacer clic en una fila** para expandirla y mostrar las áreas secundarias (si la jerarquía está configurada).

### Eliminar un área

1. Haz clic en el icono **eliminar** (papelera) en la columna de acciones de la fila.
2. Confirma la eliminación en el cuadro de diálogo que aparece.

!!! warning "Consideraciones sobre la eliminación"
    Eliminar un área principal puede afectar a las áreas secundarias. Dino te avisará si hay elementos asociados. Procede con precaución.

## Buscar y filtrar

- Utiliza el campo de **búsqueda por palabra clave** en la parte superior de la lista para filtrar áreas por nombre.
- Abre el panel de filtros haciendo clic en la flecha **expandir**. Puedes configurar:
    - **Desde la fecha / Hasta la fecha** – filtra por fecha de creación.
    - **Filtros adicionales** (por ejemplo, campos específicos de métricas) – si tu instancia tiene atributos personalizados.
- Aplica un **preajuste de filtro** (si está disponible) para cargar rápidamente combinaciones de filtros guardadas.

## Exportar la lista

1. Haz clic en el botón **cloud_download** de la barra de herramientas.
2. Elige el formato de exportación (por ejemplo, CSV, Excel).
3. El archivo se generará con el conjunto de áreas actualmente visible (filtrado).

## Acciones masivas

Para realizar acciones sobre varias áreas a la vez (por ejemplo, eliminar varias), marca las casillas situadas junto a las filas. Los botones de acción masiva aparecerán en el encabezado de la columna. Actualmente, la pantalla Áreas temáticas admite la **eliminación masiva**.

## Navegar con los rastros de navegación

Los rastros de navegación muestran tu ubicación actual (por ejemplo, **Métricas > Áreas temáticas**). Haz clic en cualquier enlace del rastro para saltar a un nivel superior.

## Páginas relacionadas

- [Descripción general de Métricas](index.md)
- [Gestión de valores de métricas – Casos](cases.md)
- [Gestión de valores de métricas – Ubicaciones](locations.md)
- [Gestión de valores de métricas – Organizaciones](organizations.md)
- [Gestión de valores de métricas – Proyectos](projects.md)
- [Usuarios y grupos](../administration/users.md)