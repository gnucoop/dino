---
title: Gestión de métricas
description: Cómo navegar, crear, editar, ver, importar y eliminar entradas de métricas (áreas, casos, ubicaciones, organizaciones, proyectos) en Dino.
---

# Gestión de métricas

En Dino, puedes gestionar diferentes tipos de datos estructurados, llamados métricas. Estos incluyen Áreas Temáticas, Casos, Ubicaciones, Proyectos y Organizaciones. Accedes a cada tipo desde la navegación principal. Cada tipo de métrica tiene una página de gestión dedicada con un diseño consistente para ver y gestionar sus entradas.

![Gestión de métricas](../imgs/metrics/managing-metrics.png)

!!! note "Permiso requerido"
    Gestionar valores de métricas requiere permisos específicos. Si no puedes ver las opciones de crear, editar o eliminar, contacta a tu administrador.

---

## Navegando por la lista

La página principal muestra una lista de todas las entradas para el tipo de métrica seleccionado. Puedes:

*   **Buscar y Filtrar**: Usa la barra de búsqueda sobre la lista para encontrar entradas por nombre u otros atributos.
*   **Ordenar**: Haz clic en los encabezados de columna marcados con un icono de ordenación para reordenar la lista.
*   **Exportar**: Haz clic en el botón **Exportar** en la barra de herramientas para descargar la lista actual como un archivo.
*   **Seleccionar o Expandir**: Haz clic en cualquier parte de una fila para seleccionarla. Haz clic en el icono de expandir para ver más detalles.

---

## Creando una nueva entrada

1.  Haz clic en el botón **+** (el botón flotante circular en la parte inferior derecha de la pantalla).
2.  Se abrirá un cuadro de diálogo con los campos para la nueva entrada.
3.  Completa la información requerida y haz clic en **Guardar**.

---

## Editando o viendo una entrada

Cada fila en la lista tiene iconos de acción en el lado derecho.

1.  Para ver los detalles de una entrada sin editarla, haz clic en el icono **Ver (ojo)**.
2.  Para editar una entrada, haz clic en el icono **Editar (lápiz)**.
3.  Se abre el mismo cuadro de diálogo del editor, poblado con los datos actuales de la entrada. Realiza tus cambios y haz clic en **Guardar**.

---

## Eliminando entradas

Puedes eliminar entradas individualmente o en masa.

**Para eliminar una sola entrada:**
1.  Haz clic en el icono **Eliminar (papelera)** en la fila que deseas eliminar.
2.  Aparecerá un cuadro de diálogo de confirmación. Haz clic en **Confirmar** para eliminar la entrada permanentemente.

**Para eliminar múltiples entradas:**
1.  Selecciona las entradas marcando las casillas en sus filas.
2.  Aparecerá una barra de herramientas. Haz clic en la acción **Eliminar** en esta barra de herramientas.
3.  Confirma la eliminación en el cuadro de diálogo que aparece.

---

## Importando entradas en masa

Puedes agregar muchas entradas a la vez importándolas desde un archivo.

1.  Haz clic en el botón **Importar (subida a la nube)**, que es un botón flotante en la parte inferior derecha de la pantalla.
2.  En el cuadro de diálogo, haz clic en **Elegir archivo** y selecciona un archivo `.xls`, `.xlsx` o `.csv` desde tu dispositivo.
3.  (Opcional) Marca la casilla para **No importar métricas si el nombre existe** para evitar crear entradas duplicadas.
4.  Haz clic en **Aplicar** para iniciar la importación.
5.  Haz clic en **Cerrar** cuando el proceso esté completo.

---

## Entendiendo el editor de entradas

Cuando creas, editas o ves una entrada, se abre un cuadro de diálogo con sus campos. Los campos disponibles dependen del tipo de métrica.

### Campos comunes
*   **Nombre** *(Requerido)*: El nombre para mostrar de esta entrada. Debe ser único dentro de su tipo de métrica.
*   **Padre**: Un campo opcional para vincular esta entrada a un padre, creando una jerarquía (por ejemplo, un subproyecto dentro de un proyecto). Comienza a escribir para buscar y seleccionar un padre.

### Campos específicos de la métrica

| Tipo de Métrica | Campos Clave (Además de Nombre y Padre) |
| :--- | :--- |
| **Áreas Temáticas** | No hay campos estándar adicionales. |
| **Casos** | **Código** (solo lectura), **Imagen** (subir o tomar una foto). |
| **Ubicaciones** | **Coordenadas**. |
| **Organizaciones** | **Ruta del Logo**, **URL del Sitio Web**. |
| **Proyectos** | **Código**, **Sectores de Intervención**, **Donantes**, **Fecha de Inicio**, **Fecha de Fin**. |

### Atributos adicionales

Debajo de los campos estándar, encontrarás una sección **Atributos adicionales**. Aquí puedes adjuntar pares clave-valor personalizados a una entrada.
*   Haz clic en **+** para agregar una nueva fila de atributo.
*   Haz clic en **-** junto a un atributo para eliminarlo.
*   Esta sección está oculta en el modo de vista si no existen atributos personalizados.

### Guardando tu trabajo
Haz clic en **Guardar** para crear o actualizar la entrada. Aparecerá un breve mensaje de confirmación.

!!! warning "Errores al guardar"
    Si ves un error al guardar, verifica que todos los campos obligatorios estén completos y que el nombre de la entrada no esté ya en uso. Si el problema continúa, contacta a tu administrador.

!!! warning "Subida de imagen sin conexión"
    Si guardas una entrada con una imagen mientras estás sin conexión, la imagen no se subirá. Debes guardar la entrada nuevamente una vez que vuelvas a estar en línea para subir el archivo de imagen.