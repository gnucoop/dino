---
title: Proyectos
description: Gestione sus proyectos en Dino. Vea, añada, edite, elimine, importe y exporte registros de proyectos con filtros y acciones masivas.
---

# Proyectos

La página **Proyectos** de Dino le permite gestionar todos sus registros estructurados de proyectos. Puede ver una lista ordenable de proyectos, añadir nuevos, editar los existentes, eliminarlos, importar datos de forma masiva y exportar la lista para análisis sin conexión. La página también ofrece potentes herramientas de filtrado para encontrar rápidamente el proyecto que necesita.

![Main view of the Projects page](../imgs/metrics/projects.png)

## Cómo acceder a Proyectos

Para abrir la página de Proyectos, expanda la sección **Métricas** desde el menú de navegación principal y seleccione **Proyectos**. La URL del navegador terminará en `/metrics/projects`.

## Comprender la lista de proyectos

La tabla principal muestra una lista de todos los proyectos. Cada fila corresponde a un proyecto y muestra las siguientes columnas por defecto:

- **Nombre del proyecto** – El nombre del proyecto. Puede ordenar la lista por esta columna.
- **Proyecto padre** – El proyecto de nivel superior al que pertenece este proyecto, si existe.
- **Código** – Un código de proyecto asignado manualmente.
- **Código automático** – Un código generado automáticamente. Este campo es de solo lectura y no se puede editar.
- **Sectores de intervención** – Los sectores en los que se centra el proyecto.
- **Donantes** – Las fuentes de financiación del proyecto.
- **Fecha de inicio** – La fecha en que comienza el proyecto.
- **Fecha de fin** – La fecha en que termina el proyecto.

Las columnas ocultas (ID, fecha de creación y atributos adicionales) se pueden mostrar haciendo clic en el botón **Personalizar columnas** (el icono tiene forma de vista semanal) en la esquina superior derecha de la tabla.

!!! tip "Campos de solo lectura"
    El campo **Código automático** se genera automáticamente y no se puede cambiar. Aparecerá atenuado en el cuadro de edición.

La barra de herramientas superior muestra el número total de elementos encontrados y un paginador. Puede elegir cuántos proyectos ver por página.

## Gestión de proyectos

### Añadir un nuevo proyecto

1. Haga clic en el botón flotante **Añadir nuevo** (el icono **+** circular) en la esquina inferior derecha de la pantalla.
2. Se abre un cuadro de diálogo en el que rellena los detalles del proyecto. Los campos obligatorios están marcados como corresponda.
3. Pulse **Guardar** para crear el proyecto. Aparecerá en la lista inmediatamente.

### Editar un proyecto

1. En la fila del proyecto que desea cambiar, haga clic en el icono **editar** (lápiz).
2. Modifique los campos del cuadro de diálogo. El campo **Código automático** aparecerá atenuado.
3. Haga clic en **Guardar** para aplicar los cambios.

### Ver un proyecto

- Haga clic en el icono **ver** (ojo) en la fila del proyecto para abrir una versión de solo lectura del cuadro de diálogo de detalles del proyecto.

### Eliminar un proyecto

1. Haga clic en el icono **eliminar** (papelera) en la fila del proyecto.
2. Confirme la eliminación en la ventana emergente. El proyecto se eliminará permanentemente.

!!! warning "Eliminar un proyecto"
    Eliminar un proyecto lo elimina del sistema. Esta acción no se puede deshacer. Asegúrese de haber seleccionado el proyecto correcto antes de confirmar.

## Búsqueda y filtrado

La barra de **búsqueda y filtros** se encuentra debajo de las migas de pan. Puede:

- **Buscar por palabra clave** – Escriba cualquier término en el campo de palabra clave; la lista se filtra automáticamente.
- **Filtrar por rango de fechas** – Utilice los selectores de **Fecha desde** y **Fecha hasta** para reducir los proyectos por fecha de inicio o fin.
- **Aplicar filtros adicionales** – Haga clic en el botón **lista de filtros** (icono de embudo) para abrir un cuadro de diálogo con filtros más avanzados, como sectores, donantes u otros atributos personalizados.
- **Guardar y cargar ajustes preestablecidos de filtro** – Utilice el administrador de ajustes preestablecidos para guardar su combinación de filtros actual y volver a cargarla más adelante.

Las chips de filtro aparecen debajo de la barra de filtros y muestran los filtros activos. Puede eliminar cada chip haciendo clic en el icono **cancelar** de cada una.

## Exportación e importación

### Exportar proyectos

1. Haga clic en el botón **exportar** (icono de descarga de nube) en la barra de filtros.
2. Elija el formato de exportación (por ejemplo, CSV, Excel) y las columnas que desea incluir.
3. El archivo se descargará en su equipo.

### Importar proyectos

1. Haga clic en el botón flotante **importar** (icono de subida de nube) en la esquina inferior derecha.
2. Cargue un archivo con el formato adecuado (por ejemplo, CSV o Excel). El sistema creará o actualizará proyectos según los datos.
3. Revise los resultados de la importación para ver si hay errores o advertencias.

## Acciones masivas

Puede seleccionar varios proyectos mediante las casillas de verificación a la izquierda de cada fila. Una vez que se selecciona al menos un proyecto, la barra de herramientas superior de la tabla muestra las acciones masivas:

- **Eliminar seleccionados** – Elimina todos los proyectos seleccionados después de la confirmación.
- **Editar seleccionados (edición masiva de formulario)** – Abre un cuadro de diálogo en el que puede editar un campo común para todos los proyectos seleccionados a la vez.

Después de la edición o eliminación masiva, la lista se actualiza automáticamente.