---
title: Gestión de valores métricos – Áreas temáticas
description: Aprende a ver, añadir, editar, eliminar y buscar áreas temáticas en la sección de gestión de métricas de Dino.
---

# Gestión de valores métricos – Áreas temáticas

La página **Áreas temáticas** (a la que se accede desde la sección de Métricas) te permite organizar tus datos de métricas por categorías jerárquicas. Aquí puedes ver, crear, editar y eliminar áreas temáticas, así como filtrar y exportar la lista.

![Main view of the Thematic Areas page](../imgs/metrics/areas.png)

## Lo que verás

- Las **migas de pan** en la parte superior muestran tu ubicación actual en la aplicación (p. ej., **Métricas > Áreas temáticas**).
- La tabla principal muestra todas las áreas temáticas, con columnas como **Nombre del área**, **Área principal** y (si está configurado) otros atributos. Puedes personalizar las columnas visibles haciendo clic en el icono **view_week** del encabezado.
- Una **barra de búsqueda** y un **panel de filtros** te permiten encontrar áreas por palabra clave, rango de fechas u otros metadatos.
- El botón **Exportar** (**cloud_download**) permite descargar la lista actual como archivo.
- Hay dos botones flotantes de acción:
    - **+ (Añadir nuevo)** – crea un área temática nueva.
    - **cloud_upload** – importa áreas desde un archivo externo.

## Trabajar con áreas temáticas

### Añadir un área temática nueva

1. Haz clic en el botón flotante **+**.
2. En el cuadro de diálogo que se abre, rellena los campos obligatorios (p. ej., **Nombre del área**, **Área principal**).
3. Haz clic en **Crear** para guardar el área nueva.

!!! tip "Área principal"
    Para crear una subárea, selecciona un **Área principal** en el menú desplegable. Si se deja en blanco, el área nueva se convierte en una entrada de nivel superior.

### Editar un área existente

1. Localiza en la tabla el área que quieres cambiar.
2. Haz clic en el icono **edit** (lápiz) en la columna de acciones de la fila.
3. Modifica los campos en el cuadro de diálogo y haz clic en **Guardar**.

### Ver los detalles

- Haz clic en el icono **visibility** para abrir un cuadro de diálogo de solo lectura con todos los campos del área.
- También puedes **hacer clic en una fila** para expandirla y mostrar los subáreas (si la jerarquía está configurada).

### Eliminar un área

1. Haz clic en el icono **delete** (papelera) en la columna de acciones de la fila.
2. Confirma la eliminación en el cuadro de diálogo que aparece.

!!! warning "Consideraciones al eliminar"
    Eliminar un área principal puede afectar a las subáreas. Dino te advertirá si hay elementos asociados. Procede con precaución.

## Búsqueda y filtrado

- Usa el campo de **búsqueda por palabra clave** en la parte superior de la lista para filtrar las áreas por nombre.
- Abre el panel de filtros haciendo clic en la flecha **expand**. Puedes establecer:
    - **Desde fecha / Hasta fecha** – filtrar por fecha de creación.
    - **Filtros adicionales** (p. ej., campos específicos de métricas) – si tu instancia tiene atributos personalizados.
- Aplica un **preajuste de filtro** (si está disponible) para cargar rápidamente combinaciones de filtros guardadas.

## Exportar la lista

1. Haz clic en el botón **cloud_download** de la barra de herramientas.
2. Elige el formato de exportación (p. ej., CSV, Excel).
3. El archivo se generará con el conjunto de áreas actualmente visible (filtrado).

## Acciones masivas

Para realizar acciones en varias áreas a la vez (p. ej., eliminar varias), selecciona las casillas de verificación junto a las filas. Los botones de acciones masivas aparecerán en el encabezado de las columnas. Actualmente, la pantalla de Áreas temáticas admite la **eliminación masiva**.

## Navegación con migas de pan

Las migas de pan muestran tu ubicación actual (p. ej., **Métricas > Áreas temáticas**). Haz clic en cualquier enlace de las migas de pan para saltar a un nivel superior.

## Páginas relacionadas

- [Descripción general de métricas](index.md)
- [Gestión de valores métricos – Casos](cases.md)
- [Gestión de valores métricos – Ubicaciones](locations.md)
- [Gestión de valores métricos – Organizaciones](organizations.md)
- [Gestión de valores métricos – Proyectos](projects.md)
- [Usuarios y grupos](../administration/users.md)