---
title: Casos
description: Gestione casos en Dino: cree, edite, vea, filtre, exporte y organice registros de casos con una tabla de datos estructurada.
---

# Casos

La página de Casos le ofrece un espacio de trabajo centralizado para hacer seguimiento y gestionar casos individuales. Cada caso es un registro estructurado que puede contener un nombre, código, imagen, relación con un caso padre, notas y atributos adicionales. Puede crear nuevos casos, editar los existentes, ver detalles, eliminar registros y exportar su lista de casos, todo desde una única tabla interactiva.

![Vista principal de la página de Casos](../imgs/metrics/cases.png)

## Resumen de la tabla

La tabla principal muestra por defecto las siguientes columnas:

- **Nombre del caso** – El nombre que asigna al caso (ordenable).
- **Código** – Un código generado por el sistema o asignado manualmente (solo lectura después de la creación).
- **Imagen del caso** – Un archivo de imagen subido que representa el caso.
- **Caso padre** – El nombre del caso padre al que pertenece este caso.

Otras columnas (como **ID**, **Notas**, **Fecha de creación** y **Atributos adicionales**) están ocultas por defecto. Puede personalizar qué columnas aparecen haciendo clic en el botón **Personalizar columnas** (icono de ojo) en el encabezado de la tabla.

## Acciones sobre un caso individual

A la derecha de cada fila encontrará iconos para las siguientes acciones:

- **Editar** – Abre un diálogo para modificar los detalles del caso.
- **Imprimir** – Genera una tarjeta PDF imprimible para el caso.
- **Ver** – Abre un diálogo de solo lectura para inspeccionar la información del caso.
- **Eliminar** – Abre un diálogo de confirmación para eliminar permanentemente el caso.

Si algunas acciones están ocultas, haga clic en el icono **Más** (tres puntos verticales) para ver todas las acciones disponibles.

## Acciones masivas

Seleccione varios casos usando las casillas de verificación de la primera columna. Cuando haya al menos un caso seleccionado, aparecerá un botón **Eliminar** en la parte superior de la tabla. Puede eliminar todos los casos seleccionados a la vez.

!!! warning "La eliminación masiva es permanente"
    Los casos eliminados no se pueden recuperar. Utilice la eliminación masiva con cuidado.

## Crear un nuevo caso

1. Haga clic en el botón flotante **Añadir nuevo** (icono de signo más) en la parte inferior derecha de la página.
2. Se abrirá un diálogo. Complete los campos obligatorios:
   - **Nombre del caso** – Ingrese un nombre descriptivo.
   - **Código** – (Opcional) Proporcione un código único. Este campo es de solo lectura después de la creación.
   - **Imagen del caso** – Suba un archivo de imagen.
   - **Caso padre** – Opcionalmente, vincule este caso a un caso padre existente.
   - **Notas** – Agregue cualquier nota relevante.
3. Haga clic en **Guardar** para crear el caso.

## Importar casos

Use el botón flotante **Importar** (icono de carga en la nube) para subir casos en lote desde un archivo. Los formatos admitidos los define el administrador del sistema.

## Filtrar y buscar

La barra de búsqueda en la parte superior le permite filtrar casos por:

- **Palabra clave** – Busca en todos los campos mostrados.
- **Rango de fechas** – Filtrar por fecha de creación (Desde / Hasta).
- **Filtros adicionales** – Seleccione entre filtros predefinidos como métrica, estado, usuario o grupo de usuarios.

Después de aplicar filtros, puede guardar la combinación como un **preset** para reutilizarla rápidamente. Para guardar un preset:

1. Abra el panel de filtros.
2. Ingrese un nombre en el campo de preset.
3. Haga clic en **Guardar**.  
Para aplicar un preset guardado, selecciónelo de la lista y haga clic en **Aplicar**.

## Exportar casos

Haga clic en el botón **Exportar** (icono de descarga en la nube) en la barra de filtros. Elija el formato de exportación (por ejemplo, CSV o Excel) y seleccione qué columnas incluir. El archivo exportado contendrá todos los casos visibles en ese momento, respetando los filtros activos.

## Personalizar la tabla

- **Ordenar** – Haga clic en el encabezado de cualquier columna ordenable (por ejemplo, **Nombre del caso**, **Fecha de creación**) para ordenar la tabla.
- **Selector de columnas** – Abra el diálogo del selector de columnas para mostrar u ocultar columnas.
- **Expandir filas** – Algunos casos pueden tener subelementos (otros casos vinculados como detalles). Haga clic en una fila para expandirla y ver los registros relacionados.

La página también muestra una **migaja de pan** en la parte superior para que pueda volver a la sección principal de Métricas.

## Páginas relacionadas

- [Resumen de Métricas](index.md) – Regrese al panel principal de métricas.
- [Áreas temáticas](areas.md) – Organice casos por área temática.
- [Ubicaciones](locations.md) – Asocie casos con ubicaciones geográficas.
- [Organizaciones](organizations.md) – Vincule casos con organizaciones.
- [Proyectos](projects.md) – Agrupe casos en proyectos.