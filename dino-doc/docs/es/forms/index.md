---
title: Formularios
description: Gestione la recopilación de datos estructurados con formularios, vea y edite envíos, filtre, exporte e importe datos.
---
# Formularios

La página **Formularios** es su centro neurálgico para toda la recopilación de datos estructurados en Dino. Aquí puede gestionar esquemas de formularios, ver y editar envíos, y realizar acciones masivas sobre sus datos.

![Vista principal de la página de Formularios](../imgs/forms/index.png)

## Cuadrícula de esquemas de formularios

Cuando abre la página de Formularios por primera vez, ve una cuadrícula con todos los esquemas de formularios disponibles. Cada mosaico muestra el nombre del esquema y su icono. Pase el ratón sobre un mosaico para ver los botones de acción:

- **Editar esquema** — Abre el editor de esquemas para modificar la estructura del formulario.
- **Eliminar esquema** — Elimina el esquema y todos sus envíos.
- **Compartir URL pública** — Genera un enlace público al esquema para la recopilación externa de datos.
- **Ver mapa** — Abre el [Mapa de formularios](forms-map.md) mostrando los envíos geolocalizados.
- **Chatear con sus datos** — Inicia [DataChat](datachat.md) para hacer preguntas sobre los envíos.

Haga clic en un mosaico para abrir la lista de envíos de ese esquema.

!!! tip "Utilice la barra de filtros"
    En la parte superior de la página puede filtrar esquemas por palabra clave. La cuadrícula se actualiza automáticamente.

## Lista de envíos

Después de seleccionar un esquema de formulario, accederá a una vista de lista detallada. Esta tabla muestra todos los envíos (entradas) para ese esquema. Cada fila muestra los campos clave, incluyendo el estado (si está definido) y cualquier métrica personalizada.

![Lista de envíos de un esquema de formulario](../imgs/forms/index-list.png)

Desde esta lista puede:

- **Añadir un nuevo envío** — Haga clic en el botón flotante **+** (abajo a la derecha) para abrir un formulario en blanco.
- **Editar un envío existente** — Haga clic en el icono de **editar** de la fila.
- **Ver detalles del envío** — Haga clic en el icono de **ver**.
- **Eliminar un envío** — Haga clic en el icono de **eliminar**.
- **Imprimir o descargar** un PDF o DOCX del envío.
- **Imprimir una credencial** (si la métrica de caso está activa).
- **Expandir una fila** para ver detalles anidados (si está configurado).

### Filtrado y búsqueda

Utilice el panel de filtros expandible en la parte superior de la lista:

- **Búsqueda por palabra clave** — Encuentre envíos por cualquier texto.
- **Rango de fechas** — Filtre por fecha de creación.
- **Filtros de métricas** — Reduzca por ubicación, proyecto, área, caso, organización u otras métricas personalizadas.
- **Filtro de estado** — Filtre por estado del formulario (ej. Aprobado, Pendiente).
- **Filtro de usuario** — Muestre solo envíos creados por un usuario específico.

Puede guardar y recargar ajustes predefinidos de filtros usando el **gestor de preajustes**.

### Acciones masivas

Seleccione varias filas usando las casillas de verificación. Luego realice operaciones masivas:

- **Eliminar** — Elimine los envíos seleccionados.
- **Edición masiva** — Modifique un campo en todos los envíos seleccionados.

### Exportar e importar

![Diálogo de exportación para descargar envíos de formularios](../imgs/forms/index-export.png)

Haga clic en el botón **exportar** (icono de descarga en la nube) para abrir el diálogo de exportación. Elija entre formato CSV o XLSX y descargue todos los envíos filtrados.

![Diálogo de importación para subir múltiples envíos desde un archivo](../imgs/forms/index-import.png)

Si aparece un botón de **importar** (icono de subida en la nube), puede subir un archivo (CSV o XLSX) para añadir varios envíos de una sola vez.

!!! warning "Permisos"
    Algunas acciones (editar esquema, eliminar, exportar, importar) solo están disponibles si tiene los permisos necesarios. Contacte a su administrador para solicitar acceso.

## Páginas relacionadas

- [Editar esquema de formulario](edit-form-schema.md) — Personalice la estructura de un formulario.
- [Mapa de formularios](forms-map.md) — Vea los envíos geolocalizados en un mapa.
- [DataChat](datachat.md) — Haga preguntas sobre los datos de su formulario.
- [Editar formulario](edit-form.md) — Rellene o modifique un envío individual.
- [Informes](../reports/index.md) — Cree resúmenes y visualizaciones a partir de sus datos.
