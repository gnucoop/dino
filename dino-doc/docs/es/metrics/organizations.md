---
title: Organizaciones
description: Gestiona organizaciones en Dino: ver, añadir, editar, eliminar e importar organizaciones.
---

# Organizaciones

La página **Organizaciones** muestra todas las organizaciones configuradas en su instancia de Dino. Utilice esta pantalla para ver, añadir, editar, eliminar e importar organizaciones, así como para gestionar la jerarquía organizativa.

![Vista principal de la página de Organizaciones](../imgs/metrics/organizations.png)

## Columnas de la tabla

De forma predeterminada, la tabla muestra las siguientes columnas:

- **Nombre de la organización** – el nombre de la organización. Esta columna se puede ordenar.
- **Organización principal** – el nombre de la organización principal, si existe.

Otras columnas (ID, Fecha de creación, Ruta del logotipo, URL del sitio web, Atributos adicionales) están ocultas, pero se pueden mostrar al personalizar la visualización mediante el icono **Ver Semana** (parte inferior derecha del encabezado de la tabla).

## Acciones por fila

Cada fila tiene tres acciones accesibles al hacer clic en el botón **Más** (tres puntos) junto a la fila:

- **Ver** (icono de ojo) – abre un cuadro de diálogo de solo lectura con los detalles de la organización.
- **Editar** (icono de lápiz) – abre un cuadro de diálogo para modificar los datos de la organización.
- **Eliminar** (icono de papelera) – elimina permanentemente la organización. Aparece un cuadro de diálogo de confirmación antes de eliminar.

!!! warning "Eliminar organizaciones con cuidado"
    La eliminación de una organización no se puede deshacer. Asegúrese de que no haya casos o formularios activos que dependan de ella antes de eliminarla.

También puede hacer clic directamente en una fila para **seleccionarla** (para acciones masivas) o **expandirla** para ver detalles adicionales en la misma línea.

## Acciones masivas y filtros

Seleccione varias filas mediante las casillas de verificación de la primera columna y luego use los botones de eliminación masiva o edición masiva que aparecen en la barra de herramientas.

### Búsqueda y filtros

La barra de filtros en la parte superior de la página ofrece:

- **Búsqueda por palabra clave** – filtra organizaciones por cualquier texto.
- **Rango de fechas** – filtra por rango de fecha de creación.
- **Gestor de preajustes** – guarda y carga preajustes de filtros de búsqueda.
- **Exportar** – descarga la lista filtrada como archivo.

Haga clic en el botón **Filtro** para abrir filtros avanzados y obtener un control más detallado.

## Añadir e importar organizaciones

Dos botones de acción flotantes están siempre visibles en la esquina inferior derecha:

- **Añadir nueva** (icono de más) – abre un cuadro de diálogo para crear una nueva organización. Se le pedirá que introduzca el nombre de la organización, la organización principal, la URL del sitio web y otros detalles.
- **Importar** (icono de carga desde la nube) – permite cargar un archivo (CSV, JSON o XML) para importar organizaciones de forma masiva. Siga las instrucciones en pantalla para asignar los campos.

!!! tip "Internacionalización"
    Los nombres y etiquetas de las organizaciones se pueden traducir si su instancia de Dino admite varios idiomas. Consulte [Idiomas](../administration/languages.md) para más detalles.

## Pasos: Crear una nueva organización

1. Haga clic en el botón flotante **Añadir nueva**.
2. En el cuadro de diálogo que se abre, rellene los campos obligatorios (Nombre de la organización y al menos un atributo).
3. Opcionalmente, establezca una **Organización principal** para crear una jerarquía.
4. Haga clic en **Guardar**. La nueva organización aparece inmediatamente en la lista.

## Pasos: Exportar organizaciones

1. Aplique los filtros que necesite en la barra de búsqueda.
2. Haga clic en el botón **Exportar** (icono de descarga desde la nube) en la barra de filtros.
3. Elija el formato de exportación (CSV, Excel, etc.) y confirme.
4. El archivo se descarga en su dispositivo.

## Páginas relacionadas

- [Resumen de métricas](index.md) – todas las páginas de gestión de métricas.
- [Áreas temáticas](areas.md) – gestiona áreas temáticas para organizaciones.
- [Casos](cases.md) – asocia casos con organizaciones.
- [Ubicaciones](locations.md) – vincula ubicaciones a organizaciones.
- [Proyectos](projects.md) – conecta organizaciones con proyectos.