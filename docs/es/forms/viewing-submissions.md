---
title: Ver y gestionar envíos
description: Cómo explorar, buscar, ver, editar, exportar y gestionar los envíos de formularios en Dino.
---

# Ver y gestionar envíos

Esta página muestra todos los envíos para un esquema de formulario específico. Desde esta lista puedes explorar, buscar, ver detalles, editar, exportar y gestionar entradas individuales.

---

## Explorar la lista

La lista muestra todos los envíos para el formulario seleccionado. En la parte superior se indica el número total de entradas que coinciden con los filtros actuales.

Utiliza los **controles de paginación** para moverte entre páginas, o saltar a la primera o última página.

También puedes cambiar qué **columnas** son visibles haciendo clic en el **botón selector de columnas** (icono de cuadrícula) en el encabezado de la tabla.

---

## Buscar y filtrar

Una barra de filtros sobre la lista te permite reducir qué entradas se muestran:

- **Búsqueda por palabra clave** — escribe cualquier palabra para filtrar las entradas cuyos campos contengan ese texto.
- **Fecha desde / Fecha hasta** — muestra solo las entradas creadas dentro de un rango de fechas.
- **Filtros por métrica** — filtra por proyecto, ubicación, área, caso, organización u otros datos vinculados.
- **Filtro por estado** — muestra solo las entradas con un estado específico del flujo de trabajo.
- **Filtro por usuario** — muestra solo las entradas creadas por un usuario o grupo de usuarios específico.
- **Filtros guardados (preestablecidos)** — guarda tu combinación de filtros actual como un preestablecido para acceder rápidamente más tarde. Usa el menú de preestablecidos en la barra de filtros para guardar, cargar o eliminar preestablecidos.

Para eliminar un filtro, haz clic en la **×** dentro de ese campo.

---

## Acciones por fila

Cada fila tiene un conjunto de iconos de acción a la derecha. Las acciones disponibles dependen de tus permisos:

- **Ver** (icono de ojo) — abre la entrada en modo de solo lectura.
- **Editar** (icono de lápiz) — abre la entrada para editarla.
- **Imprimir** (icono de impresora) — genera una versión en PDF de la entrada.
- **Exportar como Word** (icono de documento) — descarga la entrada como un documento de Word.
- **Duplicar** (icono de copiar) — crea un nuevo borrador de entrada precargado con los datos de esta entrada.
- **Eliminar** (icono de papelera) — elimina permanentemente la entrada. Aparecerá una solicitud de confirmación.
- **Imprimir credencial** (icono de credencial) — genera un documento de credencial para esta entrada (disponible si el formulario está vinculado a un caso).
- **Ver registro** (icono de historial) — ve el historial de cambios realizados en esta entrada.

!!! note "Acciones basadas en permisos"
    No todas las acciones son visibles para cada usuario. Las acciones que se muestran dependen de los permisos asignados. Algunas acciones, como editar o eliminar, pueden estar disponibles solo si el estado de la entrada lo permite.

---

## Acciones masivas

Para actuar sobre varias entradas a la vez:

1. Selecciona las entradas que deseas gestionar marcando la casilla de verificación en sus filas.
2. Utiliza los **botones de acción masiva** que aparecen en la barra de herramientas para eliminar o editar todas las entradas seleccionadas de una vez.

!!! warning "Restricciones de edición masiva"
    La edición masiva solo está disponible si todas las entradas seleccionadas tienen un estado que permite la edición.

---

## Agregar una nueva entrada

Haz clic en el **botón +** (botón circular flotante en la parte inferior derecha de la página) para abrir un formulario en blanco y registrar un nuevo envío.

---

## Importar entradas

Haz clic en el **botón de importar** (icono de subida en la nube, botón flotante en la parte inferior derecha) para importar entradas masivamente desde un archivo.

---

## Exportar la lista

Haz clic en el **botón Exportar** (icono de descarga) en la barra de filtros para descargar la lista actual de entradas como un archivo.

---

## Ver datos en un mapa

Si los envíos incluyen datos geográficos, haz clic en el **botón Mapa** en la barra de filtros para abrir la [Vista de mapa](map-view.md) para este formulario.