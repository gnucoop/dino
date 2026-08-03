---
title: Casos
description: "Gestiona casos en Dino: crea, edita, visualiza, filtra, exporta y organiza registros de casos con una tabla de datos estructurada."
---

# Casos

La página de Casos te ofrece un espacio de trabajo centralizado para hacer seguimiento y gestionar casos individuales. Cada caso es un registro estructurado que puede contener un nombre, código, imagen, relación con el caso padre, notas y atributos adicionales. Puedes crear casos nuevos, editar los existentes, ver detalles, eliminar registros y exportar tu lista de casos, todo desde una única tabla interactiva.

![Main view of the Cases page](../imgs/metrics/cases.png)

## Resumen de la tabla

La tabla principal muestra las siguientes columnas de forma predeterminada:

- **Nombre del caso** – El nombre que asignas al caso (ordenable).
- **Código** – Un código generado por el sistema o asignado manualmente (solo lectura después de la creación).
- **Imagen del caso** – Un archivo de imagen subido que representa el caso.
- **Caso padre** – El nombre de cualquier caso padre al que pertenezca este caso.

Las columnas adicionales (como **ID**, **Notas**, **Fecha de creación** y **Atributos adicionales**) están ocultas de forma predeterminada. Puedes personalizar qué columnas aparecen haciendo clic en el botón **Personalizar columnas** (icono de ojo) en el encabezado de la tabla.

## Acciones sobre un caso individual

En el lado derecho de cada fila encontrarás iconos para las siguientes acciones:

- **Editar** – Abre un diálogo para modificar los detalles del caso.
- **Imprimir** – Genera una tarjeta PDF imprimible para el caso.
- **Ver** – Abre un diálogo de solo lectura para inspeccionar la información del caso.
- **Eliminar** – Abre un diálogo de confirmación para eliminar el caso de forma permanente.

Haz clic en el icono **Más** (tres puntos verticales) para ver todas las acciones disponibles si algunas están ocultas.

## Acciones masivas

Selecciona varios casos usando las casillas de verificación de la primera columna. Cuando hay al menos un caso seleccionado, aparece un botón **Eliminar** en la parte superior de la tabla. Puedes eliminar todos los casos seleccionados a la vez.

!!! warning "La eliminación masiva es permanente"
    Los casos eliminados no se pueden recuperar. Usa la acción de eliminación masiva con cuidado.

## Crear un caso nuevo

1. Haz clic en el botón de acción flotante **Añadir nuevo** (icono de más) en la parte inferior derecha de la página.
2. Se abrirá un diálogo. Completa los campos obligatorios:
   - **Nombre del caso** – Introduce un nombre descriptivo.
   - **Código** – (Opcional) Proporciona un código único. Este campo es de solo lectura después de la creación.
   - **Imagen del caso** – Sube un archivo de imagen.
   - **Caso padre** – Opcionalmente, vincula este caso a un caso padre existente.
   - **Notas** – Añade cualquier nota relevante.
3. Haz clic en **Guardar** para crear el caso.

## Importar casos

Usa el botón de acción flotante **Importar** (icono de subida a la nube) para cargar casos de forma masiva desde un archivo. Los formatos admitidos los define el administrador del sistema.

## Filtrar y buscar

La barra de búsqueda en la parte superior te permite filtrar casos por:

- **Palabra clave** – Busca en todos los campos mostrados.
- **Rango de fechas** – Filtra por fecha de creación (Desde / Hasta).
- **Filtros adicionales** – Selecciona entre filtros predefinidos como métrica, estado, usuario o grupo de usuarios.

Después de aplicar filtros, puedes guardar la combinación como un **preajuste** para reutilizarla rápidamente. Para guardar un preajuste:

1. Abre el panel de filtros.
2. Introduce un nombre en el campo de preajuste.
3. Haz clic en **Guardar**.  
Para aplicar un preajuste guardado, selecciónalo de la lista y haz clic en **Aplicar**.

## Exportar casos

Haz clic en el botón **Exportar** (icono de descarga desde la nube) en la barra de filtros. Elige el formato de exportación (p. ej., CSV o Excel) y selecciona qué columnas incluir. El archivo exportado contendrá todos los casos visibles actualmente, respetando los filtros activos.

## Personalizar la tabla

- **Ordenar** – Haz clic en cualquier encabezado de columna ordenable (p. ej., **Nombre del caso**, **Fecha de creación**) para ordenar la tabla.
- **Selector de columnas** – Abre el diálogo del selector de columnas para mostrar u ocultar columnas.
- **Expandir filas** – Algunos casos pueden tener subelementos (otros casos vinculados como detalles). Haz clic en una fila para expandirla y ver los registros relacionados.

La página también muestra una **ruta de migas de pan** en la parte superior para que puedas volver a la sección principal de Métricas.

## Páginas relacionadas

- [Resumen de métricas](index.md) – Vuelve al panel principal de métricas.
- [Áreas temáticas](areas.md) – Organiza los casos por área temática.
- [Ubicaciones](locations.md) – Asocia casos con ubicaciones geográficas.
- [Organizaciones](organizations.md) – Vincula casos a organizaciones.
- [Proyectos](projects.md) – Agrupa casos en proyectos.