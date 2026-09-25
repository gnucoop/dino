---
title: Organizaciones
description: "Gestione organizaciones en Dino: visualice, añada, edite, elimine e importe organizaciones."
---

# Organizaciones

La página **Organizaciones** enumera todos los valores posibles de la métrica de organización. Las organizaciones pueden ser sus socios del proyecto o cualquier entidad que participe en sus actividades. Utilice esta pantalla para visualizar, añadir, editar, eliminar e importar organizaciones, así como para gestionar la jerarquía organizativa.

![Vista principal de la página Organizaciones](../imgs/metrics/organizations.png)

## Columnas de la tabla

De forma predeterminada, la tabla muestra las siguientes columnas:

- **Nombre de la organización**: el nombre de la organización. Esta columna se puede ordenar.
- **Organización superior**: el nombre de la organización superior, si existe.

Las columnas adicionales (ID, Fecha de creación, Ruta del logotipo, URL del sitio web, Atributos adicionales) están ocultas pero disponibles cuando personaliza la visualización de columnas mediante el icono **Personaliza las columnas** (en la esquina inferior derecha del encabezado de la tabla).

## Acciones de fila

Cada fila tiene tres acciones a las que se accede haciendo clic en el botón **Más** (tres puntos) junto a la fila:

- **Visualizar** (icono de visibilidad): abre un cuadro de diálogo de solo lectura con los detalles de la organización.
- **Editar** (icono de lápiz): abre un cuadro de diálogo para modificar los detalles de la organización.
- **Eliminar** (icono de papelera): elimina permanentemente la organización. Antes de eliminarla, aparece un cuadro de diálogo de confirmación.

!!! warning "Elimine las organizaciones con cuidado"
    La eliminación de una organización no se puede deshacer. Asegúrese de que ningún caso ni formulario activo dependa de ella antes de eliminarla.

También puede hacer clic directamente en una fila para **seleccionarla** (para acciones masivas) o **expandirla** y ver detalles adicionales en línea.

## Acciones masivas y filtros

Seleccione varias filas con las casillas de la primera columna y, a continuación, utilice los botones de eliminación masiva o edición masiva que aparecen en la barra de herramientas.

### Búsqueda y filtros

La barra de filtros situada en la parte superior de la página ofrece:

- **Búsqueda por palabra clave**: filtra las organizaciones por cualquier texto.
- **Intervalo de fechas**: filtra por intervalo de fechas de creación.
- **Gestor de ajustes predefinidos**: guarda y carga ajustes predefinidos de filtros de búsqueda.
- **Exportar**: descarga la lista filtrada como archivo.

Haga clic en el botón **Filtrar** para abrir filtros avanzados y obtener un control más granular.

## Añadir e importar organizaciones

En la esquina inferior derecha siempre hay visibles dos botones de acción flotantes:

- **Añadir nuevo** (icono de más): abre un cuadro de diálogo para crear una nueva organización. Se le pedirá que introduzca el nombre de la organización, la organización superior, la URL del sitio web y otros detalles.
- **Importar** (icono de carga en la nube): permite subir un archivo (CSV, JSON o XML) para importar organizaciones de forma masiva. Siga las instrucciones en pantalla para asignar los campos.

!!! tip "Internacionalización"
    Los nombres y las etiquetas de las organizaciones se pueden traducir si su instancia de Dino admite varios idiomas. Consulte [Idiomas](../administration/languages.md) para obtener más detalles.

## Pasos: Crear una nueva organización

1. Haga clic en el botón flotante **Añadir nuevo**.
2. En el cuadro de diálogo que se abre, rellene los campos obligatorios (Nombre de la organización y al menos un atributo).
3. Opcionalmente, defina una **Organización superior** para crear una jerarquía.
4. Haga clic en **Guardar**. La nueva organización aparece inmediatamente en la lista.

## Pasos: Exportar organizaciones

1. Aplique los filtros que necesite en la barra de búsqueda.
2. Haga clic en el botón **Exportar** (icono de descarga en la nube) de la barra de filtros.
3. Elija el formato de exportación (CSV, Excel, etc.) y confirme.
4. El archivo se descarga en su dispositivo.

## Páginas relacionadas

- [Resumen de métricas](index.md): todas las páginas de gestión de métricas.
- [Áreas temáticas](areas.md): gestione áreas temáticas para las organizaciones.
- [Casos](cases.md): asocie casos con organizaciones.
- [Ubicaciones](locations.md): vincule ubicaciones con organizaciones.
- [Proyectos](projects.md): conecte organizaciones con proyectos.