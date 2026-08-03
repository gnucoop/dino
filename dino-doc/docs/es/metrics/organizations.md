---
title: Organizaciones
description: Gestiona organizaciones en Dino – ver, añadir, editar, eliminar e importar organizaciones.
---

# Organizaciones

La página **Organizaciones** muestra todas las organizaciones configuradas en tu instancia de Dino. Usa esta pantalla para ver, añadir, editar, eliminar e importar organizaciones, así como para gestionar la jerarquía organizativa.

![Main view of the Organizations page](../imgs/metrics/organizations.png)

## Columnas de la tabla

Por defecto, la tabla muestra las siguientes columnas:

- **Nombre de la organización** – el nombre de la organización. Esta columna se puede ordenar.
- **Organización principal** – el nombre de la organización principal, si existe.

Las columnas adicionales (ID, fecha de creación, ruta del logotipo, URL del sitio web, atributos adicionales) están ocultas, pero están disponibles al personalizar la visualización de columnas mediante el icono **Vista semanal** (esquina inferior derecha del encabezado de la tabla).

## Acciones de fila

Cada fila tiene tres acciones a las que se accede haciendo clic en el botón **Más** (tres puntos) junto a la fila:

- **Ver** (icono de visibilidad) – abre un diálogo de solo lectura con los detalles de la organización.
- **Editar** (icono de lápiz) – abre un diálogo para modificar los detalles de la organización.
- **Eliminar** (icono de papelera) – elimina la organización de forma permanente. Antes de eliminar aparece un diálogo de confirmación.

!!! warning "Elimina organizaciones con cuidado"
    Eliminar una organización no se puede deshacer. Asegúrate de que no haya casos ni formularios activos que dependan de ella antes de eliminarla.

También puedes hacer clic directamente en una fila para **seleccionarla** (para acciones masivas) o **expandirla** y ver detalles adicionales en línea.

## Acciones masivas y filtros

Selecciona varias filas con las casillas de verificación de la primera columna y, a continuación, usa los botones de eliminación o edición masiva que aparecen en la barra de herramientas.

### Búsqueda y filtros

La barra de filtros en la parte superior de la página ofrece:

- **Búsqueda por palabra clave** – filtra organizaciones por cualquier texto.
- **Rango de fechas** – filtra por rango de fechas de creación.
- **Gestor de preajustes** – guarda y carga preajustes de filtros de búsqueda.
- **Exportar** – descarga la lista filtrada como archivo.

Haz clic en el botón **Filtrar** para abrir filtros avanzados y obtener un control más detallado.

## Añadir e importar organizaciones

En la esquina inferior derecha hay dos botones de acción flotantes siempre visibles:

- **Añadir nueva** (icono de signo más) – abre un diálogo para crear una nueva organización. Se te pedirá que introduzcas el nombre de la organización, la organización principal, la URL del sitio web y otros detalles.
- **Importar** (icono de subida a la nube) – permite subir un archivo (CSV, JSON o XML) para importar organizaciones de forma masiva. Sigue las instrucciones en pantalla para asignar los campos.

!!! tip "Internacionalización"
    Los nombres y las etiquetas de las organizaciones se pueden traducir si tu instancia de Dino admite varios idiomas. Consulta [Idiomas](../administration/languages.md) para más detalles.

## Pasos: crear una nueva organización

1. Haz clic en el botón flotante **Añadir nueva**.
2. En el diálogo que se abre, completa los campos obligatorios (nombre de la organización y al menos un atributo).
3. Opcionalmente, establece una **organización principal** para crear una jerarquía.
4. Haz clic en **Guardar**. La nueva organización aparecerá inmediatamente en la lista.

## Pasos: exportar organizaciones

1. Aplica los filtros que necesites en la barra de búsqueda.
2. Haz clic en el botón **Exportar** (icono de descarga desde la nube) en la barra de filtros.
3. Elige el formato de exportación (CSV, Excel, etc.) y confirma.
4. El archivo se descarga en tu dispositivo.

## Páginas relacionadas

- [Resumen de métricas](index.md) – todas las páginas de gestión de métricas.
- [Áreas temáticas](areas.md) – gestiona las áreas temáticas de las organizaciones.
- [Casos](cases.md) – asocia casos a organizaciones.
- [Ubicaciones](locations.md) – vincula ubicaciones a organizaciones.
- [Proyectos](projects.md) – conecta organizaciones con proyectos.