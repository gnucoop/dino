---
title: Proyectos
description: Gestiona tus proyectos en Dino. Visualiza, agrega, edita, elimina, importa y exporta registros de proyectos con filtros y acciones masivas.
---

# Proyectos

La página **Proyectos** en Dino te permite gestionar todos tus registros estructurados de proyectos. Puedes ver una lista ordenable de proyectos, agregar nuevos, editar existentes, eliminarlos, importar datos en lote y exportar la lista para análisis fuera de línea. La página también ofrece potentes herramientas de filtrado para encontrar rápidamente el proyecto que necesitas.

![Vista principal de la página Proyectos](../imgs/metrics/projects.png)

## Navegar a Proyectos

Para abrir la página Proyectos, expande la sección **Métricas** desde la navegación principal y selecciona **Proyectos**. La URL del navegador terminará en `/metrics/projects`.

## Comprender la lista de proyectos

La tabla principal muestra una lista de todos los proyectos. Cada fila corresponde a un proyecto y muestra las siguientes columnas por defecto:

- **Nombre del proyecto** – El nombre del proyecto. Puedes ordenar la lista por esta columna.
- **Proyecto principal** – El proyecto de nivel superior al que pertenece este proyecto, si existe.
- **Código** – Un código de proyecto asignado manualmente.
- **Código automático** – Un código generado automáticamente. Este campo es de solo lectura y no se puede editar.
- **Sectores de intervención** – Los sectores en los que se enfoca el proyecto.
- **Donantes** – Las fuentes de financiamiento del proyecto.
- **Fecha de inicio** – La fecha en que comienza el proyecto.
- **Fecha de fin** – La fecha en que termina el proyecto.

Las columnas ocultas (ID, Fecha de creación y Atributos adicionales) se pueden mostrar haciendo clic en el botón **Personalizar columnas** (el icono tiene apariencia de vista semanal) en la esquina superior derecha de la tabla.

!!! tip "Campos de solo lectura"
    El campo **Código automático** se genera automáticamente y no se puede modificar. Aparecerá atenuado en el cuadro de diálogo de edición.

La barra de herramientas superior muestra el número total de elementos encontrados y un paginador. Puedes elegir cuántos proyectos ver por página.

## Gestión de proyectos

### Agregar un nuevo proyecto

1. Haz clic en el botón flotante **Agregar nuevo** (el icono **+** dentro de un círculo) en la parte inferior derecha de la pantalla.
2. Se abre un cuadro de diálogo donde completas los detalles del proyecto. Los campos obligatorios están marcados en consecuencia.
3. Presiona **Guardar** para crear el proyecto. Aparecerá en la lista de inmediato.

### Editar un proyecto

1. En la fila del proyecto que deseas modificar, haz clic en el icono de **editar** (lápiz).
2. Modifica los campos en el cuadro de diálogo. El campo **Código automático** aparecerá atenuado.
3. Haz clic en **Guardar** para aplicar los cambios.

### Ver un proyecto

- Haz clic en el icono de **ver** (ojo) en la fila del proyecto para abrir una versión de solo lectura del cuadro de diálogo de detalles del proyecto.

### Eliminar un proyecto

1. Haz clic en el icono de **eliminar** (papelera) en la fila del proyecto.
2. Confirma la eliminación en la ventana emergente. El proyecto se eliminará permanentemente.

!!! warning "Eliminar un proyecto"
    Eliminar un proyecto lo borra del sistema. Esta acción no se puede deshacer. Asegúrate de haber seleccionado el proyecto correcto antes de confirmar.

## Búsqueda y filtrado

La barra de **búsqueda y filtros** se encuentra debajo de las migas de pan. Puedes:

- **Buscar por palabra clave** – Escribe cualquier término en el campo de palabra clave; la lista se filtra automáticamente.
- **Filtrar por rango de fechas** – Usa los selectores de **Fecha desde** y **Fecha hasta** para acotar los proyectos por fecha de inicio o fin.
- **Aplicar filtros adicionales** – Haz clic en el botón **lista de filtros** (icono de embudo) para abrir un cuadro de diálogo con filtros más avanzados, como sectores, donantes u otros atributos personalizados.
- **Guardar y cargar preajustes de filtro** – Usa el gestor de preajustes para guardar tu combinación actual de filtros y recargarla más tarde.

Las etiquetas de filtro aparecen debajo de la barra de filtros, mostrando los filtros activos. Puedes eliminar etiquetas individuales haciendo clic en el icono de **cancelar** en cada una.

## Exportación e importación

### Exportar proyectos

1. Haz clic en el botón **exportar** (icono de nube con flecha hacia abajo) en la barra de filtros.
2. Elige el formato de exportación (por ejemplo, CSV, Excel) y las columnas que deseas incluir.
3. El archivo se descargará en tu computadora.

### Importar proyectos

1. Haz clic en el botón flotante **importar** (icono de nube con flecha hacia arriba) en la parte inferior derecha.
2. Sube un archivo con el formato adecuado (por ejemplo, CSV o Excel). El sistema creará o actualizará proyectos según los datos.
3. Revisa los resultados de la importación para detectar errores o advertencias.

## Acciones masivas

Puedes seleccionar varios proyectos usando las casillas de verificación a la izquierda de cada fila. Una vez que al menos un proyecto esté seleccionado, la barra de herramientas sobre la tabla muestra acciones masivas:

- **Eliminar seleccionados** – Elimina todos los proyectos seleccionados después de la confirmación.
- **Editar seleccionados (edición masiva de formulario)** – Abre un cuadro de diálogo donde puedes editar un campo común para todos los proyectos seleccionados a la vez.

Después de editar o eliminar en lote, la lista se actualiza automáticamente.