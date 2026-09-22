---
title: Casos
description: "Gestione casos en Dino: cree, edite, visualice, filtre, exporte y organice registros de casos con una tabla de datos estructurada."
---

# Casos

La página Casos le ofrece un espacio de trabajo centralizado para hacer seguimiento y gestionar casos individuales. Cada caso es un registro estructurado que puede contener un nombre, un código, una imagen, una relación de dependencia, notas y atributos adicionales. Puede crear casos nuevos, editar los existentes, ver detalles, eliminar registros y exportar su lista de casos, todo desde una única tabla interactiva.

![Vista principal de la página Casos](../imgs/metrics/cases.png)

## Descripción general de la tabla

La tabla principal muestra las siguientes columnas de forma predeterminada:

- **Nombre del caso** – El nombre que asigna al caso (ordenable).
- **Código** – Un código generado por el sistema o asignado manualmente (solo lectura después de la creación).
- **Imagen del caso** – Un archivo de imagen cargado que representa el caso.
- **Caso principal** – El nombre del caso principal al que pertenece este caso.

Las columnas adicionales (como **ID**, **Notas**, **Fecha de creación** y **Atributos adicionales**) están ocultas de forma predeterminada. Puede personalizar qué columnas aparecen haciendo clic en el botón **Personalizar columnas** (icono de ojo) en el encabezado de la tabla.

## Acciones sobre un caso individual

En el lado derecho de cada fila encontrará iconos para las siguientes acciones:

- **Editar** – Abre un cuadro de diálogo para modificar los detalles del caso.
- **Imprimir** – Genera una tarjeta PDF imprimible para el caso.
- **Ver** – Abre un cuadro de diálogo de solo lectura para inspeccionar la información del caso.
- **Eliminar** – Abre un cuadro de diálogo de confirmación para eliminar el caso de forma permanente.

Haga clic en el icono **Más** (tres puntos verticales) para ver todas las acciones disponibles si algunas están ocultas.

## Acciones masivas

Seleccione varios casos con las casillas de verificación de la primera columna. Cuando se selecciona al menos un caso, aparece un botón **Eliminar** en la parte superior de la tabla. Puede eliminar todos los casos seleccionados a la vez.

!!! warning "La eliminación masiva es permanente"
    Los casos eliminados no se pueden recuperar. Utilice la acción de eliminación masiva con precaución.

## Crear un caso nuevo

1. Haga clic en el botón de acción flotante **Añadir nuevo** (icono de más) en la esquina inferior derecha de la página.
2. Se abrirá un cuadro de diálogo. Complete los campos obligatorios:
   - **Nombre del caso** – Introduzca un nombre descriptivo.
   - **Código** – (Opcional) Proporcione un código único. Este campo es de solo lectura después de la creación.
   - **Imagen del caso** – Cargue un archivo de imagen.
   - **Caso principal** – De forma opcional, vincule este caso a un caso principal existente.
   - **Notas** – Añada las notas que considere relevantes.
3. Haga clic en **Guardar** para crear el caso.

## Importar casos

Utilice el botón de acción flotante **Importar** (icono de carga en la nube) para cargar casos de forma masiva desde un archivo. Los formatos admitidos los define su administrador del sistema.

## Filtrado y búsqueda

La barra de búsqueda de la parte superior le permite filtrar casos por:

- **Palabra clave** – Busca en todos los campos mostrados.
- **Rango de fechas** – Filtra por fecha de creación (Desde / Hasta).
- **Filtros adicionales** – Seleccione entre filtros predefinidos como métrica, estado, usuario o grupo de usuarios.

Después de aplicar filtros, puede guardar la combinación como un **preajuste** para reutilizarla rápidamente. Para guardar un preajuste:

1. Abra el panel de filtros.
2. Introduzca un nombre en el campo de preajuste.
3. Haga clic en **Guardar**.  
Para aplicar un preajuste guardado, selecciónelo en la lista y haga clic en **Aplicar**.

## Exportar casos

Haga clic en el botón **Exportar** (icono de descarga en la nube) de la barra de filtros. Elija el formato de exportación (por ejemplo, CSV o Excel) y seleccione qué columnas incluir. El archivo exportado contendrá todos los casos visibles en ese momento, respetando los filtros activos.

## Personalizar la tabla

- **Ordenar** – Haga clic en cualquier encabezado de columna ordenable (por ejemplo, **Nombre del caso**, **Fecha de creación**) para ordenar la tabla.
- **Selector de columnas** – Abra el cuadro de diálogo del selector de columnas para mostrar u ocultar columnas.
- **Expandir filas** – Algunos casos pueden tener subelementos (otros casos vinculados como detalles). Haga clic en una fila para expandirla y ver los registros relacionados.

La página también muestra una **ruta de navegación** en la parte superior para que pueda volver a la sección principal de Métricas.

## Páginas relacionadas

- [Descripción general de métricas](index.md) – Vuelva al panel principal de métricas.
- [Áreas temáticas](areas.md) – Organice los casos por área temática.
- [Ubicaciones](locations.md) – Asocie los casos con ubicaciones geográficas.
- [Organizaciones](organizations.md) – Vincule los casos con organizaciones.
- [Proyectos](projects.md) – Agrupe los casos por proyectos.