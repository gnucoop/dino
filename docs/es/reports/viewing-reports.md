---
title: Visualización y gestión de informes
description: Cómo navegar, filtrar, visualizar, exportar, marcar como favorito y eliminar informes en Dino.
---

# Visualización y gestión de informes

Esta página enumera todos los informes generados a partir de un esquema de informe específico. Puedes navegar, buscar, visualizar, exportar, marcar como favorito y eliminar informes individuales desde esta lista central.

---

## Navegando por la lista

La lista muestra todos los informes para el esquema seleccionado. Cada fila representa un informe.

La lista incluye las siguientes columnas:

*   **Usuario**: La persona que creó el informe.
*   **Nombre**: El título del informe.
*   **Estado**: El estado actual del informe.
*   **Recopilado desde / Recopilado hasta**: El rango de fechas de los datos incluidos en el informe.
*   **Fecha de creación**: Cuándo se creó el informe.
*   **Proyecto, Ubicación, Área, Caso, Organización**: Estas columnas aparecen solo si los tipos de métricas correspondientes están activos en tu espacio de trabajo.

Utiliza los controles de paginación en la parte inferior de la lista para navegar entre páginas.

---

## Búsqueda y filtrado

Utiliza la barra de filtros sobre la lista para reducir los informes mostrados.

1.  Haz clic en cualquier campo de filtro (como **Proyecto** o **Ubicación**) para seleccionar valores específicos.
2.  Puedes combinar múltiples filtros.
3.  Para guardar tu combinación de filtros para uso posterior, haz clic en el icono del menú de preajustes en la barra de filtros y selecciona **Guardar como preajuste**.
4.  Para cargar un filtro guardado, abre el menú de preajustes y selecciona el nombre del preajuste.

---

## Acciones sobre los informes

Cada fila de informe tiene iconos de acción a la derecha. Las acciones disponibles para ti dependen de tus permisos de usuario.

*   **Ver** (![icono de ojo](../imgs/reports/eye-icon.png)): Abre el informe en una vista de solo lectura.
*   **Añadir a favoritos** (![icono de estrella](../imgs/reports/star-outline-icon.png)): Marca este informe como favorito para un acceso rápido.
*   **Quitar de favoritos** (![icono de estrella](../imgs/reports/star-filled-icon.png)): Elimina el informe de tu lista de favoritos.
*   **Eliminar** (![icono de papelera](../imgs/reports/delete-icon.png)): Elimina el informe permanentemente. Se te pedirá que confirmes esta acción.

!!! tip "Acciones basadas en permisos"
    Es posible que no veas todas las acciones. Los iconos que se muestran se basan en los permisos otorgados a tu rol de usuario.

---

## Añadir un nuevo informe

Un botón flotante **+** está disponible si tienes permiso para crear nuevos informes para este esquema.

1.  Haz clic en el botón **+**.
2.  Si el esquema del informe utiliza funciones de IA, una información sobre herramientas mostrará cuántos créditos se utilizarán. La creación del informe procederá automáticamente.

!!! warning "Créditos insuficientes"
    Si no tienes suficientes créditos de IA, aparecerá un mensaje de advertencia. Necesitarás añadir más créditos a tu cuenta antes de poder crear este informe.

---

## Visualizando un informe

Para ver un informe, haz clic en su fila en la lista o utiliza el icono de acción **Ver**.

### 1. Seleccionando métricas

Si el esquema del informe está vinculado a métricas, primero verás un paso de selección de métricas.

1.  Elige valores para las métricas requeridas (por ejemplo, Proyecto, Ubicación).
2.  Ajusta la **Fecha de inicio** y **Fecha de fin** si es necesario.
3.  Haz clic en **Siguiente** para generar y cargar el informe.

### 2. Visualización del informe

La vista del informe muestra el título del informe, el rango de fechas, las métricas seleccionadas y el contenido principal del informe, que está estructurado según su esquema.

!!! note "Contenido generado por IA"
    Si el informe incluye texto generado por IA, verás un indicador de progreso (por ejemplo, "Generando prompt del informe 1 de 3") mientras se prepara el contenido. Esto sucede automáticamente.

### 3. Exportando un informe

Desde la vista del informe, puedes exportarlo en diferentes formatos.

*   **PDF**: Haz clic en el botón PDF para descargar un archivo PDF.
*   **Excel (XLSX)**: Haz clic en el botón Excel para descargar una hoja de cálculo.
*   **Word (DOCX)**: Haz clic en el botón Word para descargar un documento de Word.

!!! warning "Sin contenido exportable"
    Si intentas exportar a Excel y ves un mensaje que dice "No se encontró ningún widget exportable", significa que el informe no contiene ningún dato de tabla o gráfico que pueda ponerse en una hoja de cálculo.

---

## Resolución de problemas

### "No se encontraron formularios para este informe"

!!! warning
    Este error significa que el informe no pudo generarse porque no hay datos enviados vinculados a él. Asegúrate de que se hayan recopilado envíos de formularios utilizando el esquema de formulario conectado a este informe antes de intentar visualizarlo.