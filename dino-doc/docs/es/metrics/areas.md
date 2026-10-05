---
title: "Gestión de valores de métricas: Áreas temáticas"
description: Aprende a ver, añadir, editar, eliminar y buscar áreas temáticas en la sección de gestión de métricas de Dino.
---

# Gestión de valores de métricas: Áreas temáticas

La página **Áreas temáticas** (accesible desde la sección Métricas) te permite organizar los datos de tus métricas mediante categorías jerárquicas. Aquí puedes ver, crear, editar y eliminar áreas temáticas, así como filtrar y exportar la lista.

![Vista principal de la página Áreas temáticas](../imgs/metrics/areas.png)

## Qué puedes ver

- El **percorso di navigazione** en la parte superior muestra tu ubicación actual en la aplicación (por ejemplo, **Métricas > Áreas temáticas**).
- La tabla principal lista todas las áreas temáticas y muestra columnas como **Nombre del área**, **Área principal** y (si está configurado) otros atributos. Puedes personalizar las columnas visibles haciendo clic en el botón **Columnas** situado encima de la tabla.
- Un campo de **buscar por palabra clave** y el botón **Filtros** te permiten encontrar áreas por nombre o por fecha de creación.
- El botón **Exportar** (cloud_download) te permite descargar la lista actual como archivo.
- Hay dos botones disponibles en la barra de herramientas:
    - **Add new AREA** – crea una nueva área temática.
    - **Import AREA** – abre la página de importación, donde puedes subir un archivo `.xls`, `.xlsx` o `.csv`, mapear sus columnas y revisar el resultado. Las áreas cuyo nombre ya existe se reutilizan, no se actualizan.

## Trabajar con Áreas temáticas

### Añadir una nueva área temática

1. Haz clic en el botón **Add new AREA** de la barra de herramientas.
2. En el cuadro de diálogo que se abre, rellena el **Nombre del área** y, si es necesario, el **Área principal** y cualquier atributo adicional. Los campos opcionales están marcados como *(opcional)*.
3. Haz clic en **Guardar** para crear la nueva área.

!!! tip "Área principal"
    Para crear una subárea, empieza a escribir en el campo **Área principal** y elige el área principal entre las sugerencias. Si lo dejas en blanco, la nueva área se convierte en una entrada de nivel superior.

### Editar un área existente

1. Busca en la tabla el área que quieres modificar.
2. Pasa el cursor sobre su fila y haz clic en el icono **Editar** (lápiz), o haz clic en la fila para seleccionarla y pulsa **Editar** en la barra de acciones situada encima de la tabla.
3. Modifica los campos en el cuadro de diálogo y haz clic en **Guardar**.

![Cuadro de diálogo de edición para modificar un valor de métrica](../imgs/metrics/areas-edit.png)

### Ver los detalles

- Pasa el cursor sobre una fila y haz clic en el icono **Visibilidad** (ojo), o selecciona la fila y pulsa **Ver** en la barra de acciones, para abrir un cuadro de diálogo de solo lectura que muestra todos los campos del área.

### Eliminar un área

1. Haz clic en la fila del área para seleccionarla y, a continuación, pulsa **Eliminar** en la barra de acciones situada encima de la tabla.
2. Confirma la eliminación en el cuadro de diálogo que aparece.

!!! warning "Consideraciones sobre la eliminación"
    Un área que sea utilizada por formularios, o que tenga áreas secundarias, no se puede eliminar. Si solo la utilizan informes, Dino te avisa y te permite confirmar. Los grupos de usuarios que otorgan el área no se comprueban: elimínala primero de ellos. Consulta [Métricas](index.md).

## Buscar y filtrar

- Utiliza el campo de **búsqueda por palabra clave** situado encima de la lista para filtrar áreas por nombre.
- Haz clic en **Filtros** para establecer un **Desde fecha** y un **Hasta la fecha**, que filtran por fecha de creación, y luego haz clic en **Buscar**.
- Los filtros aplicados aparecen como etiquetas debajo de la barra de herramientas; haz clic en el icono **cancelar** de una etiqueta para eliminarla.

## Exportar la lista

1. Haz clic en el botón **Exportar** de la barra de herramientas.
2. Elige qué exportar: *Elementos de la página* (opción predeterminada), los elementos que coincidan con tus filtros o *Todos los elementos*.
3. Elige el formato: *csv*, *xlsx* o *splitted xlsx* y, a continuación, haz clic en **Exportar**.

## Acciones masivas

Para realizar acciones sobre varias áreas a la vez, selecciona las casillas situadas junto a las filas. Cuando se selecciona una fila, sus acciones individuales aparecen en la barra de acciones situada encima de la tabla; cuando se seleccionan varias filas, la barra ofrece las acciones masivas. Actualmente, la pantalla Áreas temáticas solo admite la **eliminación masiva**.

## Navegar con el percorso di navigazione

El percorso di navigazione muestra tu ubicación actual (por ejemplo, **Métricas > Áreas temáticas**). Haz clic en cualquier enlace del percorso di navigazione para saltar a un nivel superior.

## Páginas relacionadas

- [Descripción general de Métricas](index.md)
- [Gestión de valores de métricas: Casos](cases.md)
- [Gestión de valores de métricas: Ubicaciones](locations.md)
- [Gestión de valores de métricas: Organizaciones](organizations.md)
- [Gestión de valores de métricas: Proyectos](projects.md)
- [Usuarios y grupos](../administration/users.md)