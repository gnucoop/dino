---
title: Proyectos
description: Gestione sus proyectos en Dino. Vea, agregue, edite, elimine, importe y exporte registros de proyectos con filtrado y acciones masivas.
---

# Proyectos

La página **Proyectos** en Dino le permite gestionar todos los valores de la métrica Proyecto. Esto puede utilizarse para mapear los proyectos de su organización, un programa, colaboraciones con donantes o cualquier otro tipo de grupo estructurado de actividades relevante para su trabajo. Puede ver una lista ordenable de proyectos, agregar nuevos, editar los existentes, eliminarlos, importar datos de forma masiva y exportar la lista para su análisis offline. La página también ofrece potentes herramientas de filtrado para encontrar rápidamente el proyecto que necesita.

![Vista principal de la página Proyectos](../imgs/metrics/projects.png)

## Navegar a Proyectos

Para abrir la página Proyectos, expanda la sección **Métricas** en la navegación principal y seleccione **Proyectos**. La URL del navegador terminará con `/metrics/projects`.

## Entender la lista de proyectos

La tabla principal muestra una lista de todos los proyectos. Cada fila corresponde a un proyecto y muestra las siguientes columnas por defecto:

- **Nombre del proyecto** – El nombre del proyecto. Puede ordenar la lista por esta columna.
- **Proyecto padre** – El proyecto de nivel superior al que pertenece este proyecto, si corresponde.
- **Código** – Un código de proyecto asignado manualmente.
- **Código automático** – Un código generado automáticamente. Este campo es de solo lectura y no puede editarse.
- **Sectores de intervención** – Los sectores en los que se enfoca el proyecto.
- **Donantes** – Las fuentes de financiamiento del proyecto.
- **Fecha de inicio** – La fecha en que comienza el proyecto.
- **Fecha de finalización** – La fecha en que finaliza el proyecto.

Las columnas ocultas (ID, Fecha de creación y Atributos adicionales) pueden mostrarse haciendo clic en el botón **Personalizar columnas** (el icono que parece una vista semanal) en la esquina superior derecha de la tabla.

!!! tip "Campos de solo lectura"
    El campo **Código automático** se genera automáticamente y no puede modificarse. Aparecerá atenuado en el cuadro de diálogo de edición.

La barra de herramientas superior muestra el número total de elementos encontrados y un paginador. Puede elegir cuántos proyectos ver por página.

## Gestionar proyectos

### Agregar un nuevo proyecto

1. Haga clic en el botón flotante **Agregar nuevo** (el icono **+** dentro de un círculo) en la esquina inferior derecha de la pantalla.
2. Se abre un cuadro de diálogo donde completa los detalles del proyecto. Los campos obligatorios están marcados como tales.
3. Pulse **Guardar** para crear el proyecto. Aparecerá en la lista inmediatamente.

### Editar un proyecto

1. En la fila del proyecto que desea modificar, haga clic en el icono **editar** (lápiz).
2. Modifique los campos en el cuadro de diálogo. El campo **Código automático** aparecerá atenuado.
3. Haga clic en **Guardar** para aplicar sus cambios.

### Ver un proyecto

- Haga clic en el icono **ver** (ojo) en la fila del proyecto para abrir una versión de solo lectura del cuadro de diálogo de detalles del proyecto.

### Eliminar un proyecto

1. Haga clic en el icono **eliminar** (papelera) en la fila del proyecto.
2. Confirme la eliminación en la ventana emergente. El proyecto se eliminará de forma permanente.

!!! warning "Eliminar un proyecto"
    Eliminar un proyecto lo remueve del sistema. Esta acción no puede deshacerse. Asegúrese de haber seleccionado el proyecto correcto antes de confirmar.

## Buscar y filtrar

La barra de **búsqueda y filtros** se encuentra debajo del recorrido de navegación. Puede:

- **Buscar por palabra clave** – Escriba cualquier término en el campo de palabra clave; la lista se filtra automáticamente.
- **Filtrar por rango de fechas** – Use los selectores **Desde fecha** y **Hasta fecha** para acotar los proyectos por fecha de inicio o de finalización.
- **Aplicar filtros adicionales** – Haga clic en el botón **lista de filtros** (icono de embudo) para abrir un cuadro de diálogo con filtros más avanzados, como sectores, donantes u otros atributos personalizados.
- **Guardar y cargar presets de filtros** – Use el gestor de presets para guardar su combinación actual de filtros y recargarla más tarde.

Los chips de filtros aparecen debajo de la barra de filtros, mostrando los filtros activos. Puede eliminar chips individuales haciendo clic en el icono **cancelar** de cada uno.

## Exportar e importar

### Exportar proyectos

1. Haga clic en el botón **exportar** (icono de descarga en la nube) en la barra de filtros.
2. Elija el formato de exportación (por ejemplo, CSV, Excel) y las columnas que desea incluir.
3. El archivo se descargará en su computadora.

### Importar proyectos

1. Haga clic en el botón flotante **importar** (icono de carga en la nube) en la esquina inferior derecha.
2. Suba un archivo con el formato adecuado (por ejemplo, CSV o Excel). El sistema creará o actualizará los proyectos según los datos.
3. Revise los resultados de la importación para detectar posibles errores o advertencias.

## Acciones masivas

Puede seleccionar varios proyectos usando las casillas de verificación a la izquierda de cada fila. Una vez que se selecciona al menos un proyecto, la barra de herramientas sobre la tabla muestra las acciones masivas:

- **Eliminar seleccionados** – Elimina todos los proyectos seleccionados después de la confirmación.
- **Editar seleccionados (edición masiva de formulario)** – Abre un cuadro de diálogo donde puede editar un campo común para todos los proyectos seleccionados a la vez.

Después de la edición o eliminación masiva, la lista se actualiza automáticamente.