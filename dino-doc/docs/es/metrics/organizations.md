---
title: Organizaciones
description: "Gestione organizaciones en Dino: ver, añadir, editar, eliminar e importar organizaciones."
---

# Organizaciones

La página **Organizaciones** enumera todos los valores posibles de la métrica de organización. Las organizaciones pueden ser sus socios del proyecto o cualquier entidad involucrada en sus actividades. Utilice esta pantalla para ver, añadir, editar, eliminar e importar organizaciones, y para gestionar la jerarquía organizacional.

![Vista principal de la página Organizaciones](../imgs/metrics/organizations.png)

## Columnas de la tabla

De forma predeterminada, la tabla muestra las siguientes columnas:

- **Organization Name** – el nombre de la organización. Esta columna se puede ordenar.
- **Organización principal** – el nombre de la organización principal, si existe.

Las columnas adicionales (ID, Creation Date, Logo path, Website url, Additional Attributes) están ocultas de forma predeterminada. Utilice el botón **Columnas**, situado encima de la tabla a la derecha, para mostrarlas u ocultarlas.

## Acciones de fila

Pase el cursor sobre una fila para mostrar los iconos **Ver** y **Editar**. Haga clic en la fila para seleccionarla: la barra de acciones encima de la tabla mostrará entonces todas las acciones:

- **Ver** (icono de visibilidad) – abre un diálogo de solo lectura con los detalles de la organización.
- **Editar** (icono de lápiz) – abre un diálogo para cambiar los detalles de la organización.
- **Eliminar** (icono de papelera) – elimina permanentemente la organización. Primero aparece un diálogo de confirmación.

!!! warning "Elimine organizaciones con cuidado"
    La eliminación de una organización no se puede deshacer. Una organización que sea utilizada por formularios, o que tenga organizaciones secundarias, no se puede eliminar; consulte [Métricas](index.md).

## Acciones masivas

Seleccione una o varias filas con las casillas de la primera columna. Aparecerá una barra de herramientas encima de la tabla con las acciones que puede aplicar:

- Con una fila seleccionada, puede ver, editar o eliminar esa organización.
- Con varias filas seleccionadas, puede eliminarlas todas a la vez.

## Búsqueda y filtros

La barra de filtros situada en la parte superior de la página ofrece:

- **Búsqueda por palabra clave** – filtra las organizaciones por cualquier texto.
- **Filtros** – abre el diálogo de filtros para acotar la lista por fecha de creación (**Desde fecha** / **Hasta la fecha**).
- **Exportar** – descarga la lista como archivo.

Los filtros aplicados aparecen como chips debajo de la barra de filtros. Haga clic en el icono de cancelar de un chip para eliminar ese filtro.

## Añadir e importar organizaciones

Hay dos botones disponibles en la barra de herramientas encima de la tabla:

- **Add new ORGANIZATION** (icono de más) – abre un diálogo para crear una nueva organización.
- **Import ORGANIZATION** (icono de subir a la nube) – suba un archivo para importar organizaciones de forma masiva.

!!! tip "Jerarquía organizacional"
    Establezca una **Organización principal** al crear una organización para construir una jerarquía de entidades relacionadas.

## Pasos: crear una nueva organización

1. Haga clic en el botón **Add new ORGANIZATION** de la barra de herramientas.
2. En el diálogo que se abre, rellene los campos obligatorios, empezando por el nombre de la organización. Los campos opcionales están marcados como *(opcional)*.
3. De forma opcional, establezca una **Organización principal** para situar la nueva organización en una jerarquía.
4. De forma opcional, añada una ruta de logotipo, una URL de sitio web y cualquier atributo adicional.
5. Haga clic en **Guardar**. La nueva organización aparece inmediatamente en la lista.

## Pasos: importar organizaciones

1. Haga clic en el botón **Import ORGANIZATION** de la barra de herramientas.
2. Suba un archivo `.xls`, `.xlsx` o `.csv` y asigne sus columnas a los atributos de la organización.
3. Haga clic en **Aplicar importación** y revise el resultado. Las organizaciones cuyo nombre ya existe se reutilizan, no se actualizan.

## Pasos: exportar organizaciones

1. Aplique los filtros que necesite.
2. Haga clic en el botón **Exportar** de la barra de herramientas.
3. Elija qué exportar: *Elementos de la página* (la opción predeterminada), los elementos que coincidan con sus filtros o *Todos los elementos*.
4. Elija el formato: *csv*, *xlsx* o *splitted xlsx* y, a continuación, haga clic en **Exportar**.

## Páginas relacionadas

- [Descripción general de las métricas](index.md) – todas las páginas de gestión de métricas.
- [Áreas temáticas](areas.md) – gestione las áreas temáticas de las organizaciones.
- [Casos](cases.md) – asocie casos con organizaciones.
- [Ubicaciones](locations.md) – vincule ubicaciones con organizaciones.
- [Proyectos](projects.md) – conecte organizaciones con proyectos.