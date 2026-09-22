---
title: Formularios
description: Gestiona esquemas de formularios y recopila envíos de datos estructurados en Dino.
---

# Formularios

La página **Formularios** es tu punto de partida para la recopilación de datos estructurados en Dino. Desde aquí puedes explorar, crear y gestionar esquemas de formularios, y luego ver y trabajar con los envíos recopilados a través de cada formulario.

![Vista principal de la página Formularios](../imgs/forms/index.png)

La vista principal muestra una **cuadrícula de tarjetas de esquemas de formularios**. Cada tarjeta muestra la etiqueta y el ícono del formulario. Al pasar el cursor sobre una tarjeta, aparecen botones de acción:

- **Editar esquema**: modifica la estructura del formulario (campos, validación, métricas).
- **Eliminar esquema**: elimina el esquema de formulario (y todos sus envíos).
- **Compartir URL**: obtén un enlace público para permitir envíos externos.
- **Ver mapa**: abre la vista de mapa para los envíos con datos de ubicación.
- **Chatear con tus datos**: usa la función [DataChat](datachat.md) para hacer preguntas sobre los envíos en lenguaje natural.

!!! tip
    Las acciones disponibles en una tarjeta dependen de tus permisos. Es posible que no veas todos los botones.

Para crear un nuevo esquema de formulario, haz clic en el botón flotante **+** en la esquina inferior derecha. Se te llevará a la página [Editar esquema de formulario](edit-form-schema.md) para diseñar tu formulario.

## Trabajar con envíos

Haz clic en una tarjeta de esquema de formulario para entrar en su **lista de envíos**. Esta tabla muestra todas las entradas de datos recopiladas para ese esquema.

![Lista de envíos (tabla de datos) de un esquema de formulario](../imgs/forms/index-list.png)

La lista incluye una **barra de filtros** que te permite buscar por palabra clave, rango de fechas, métricas, estado, uso

### Exportar

Usa el botón **exportar** para descargar los envíos en formato CSV o XLSX.

![Diálogo de exportación para descargar envíos de formularios](../imgs/forms/index-export.png)

El diálogo de exportación te permite especificar algunos parámetros importantes para la exportación:

1) Cuántos formularios exportar.   
   1) *Formularios en la página*. Exporta solo los formularios que se mostraban en la página anterior, potencialmente filtrados y divididos en páginas.   
   2) *Agregar filtros* o *Todos los elementos/1 filtro*. Si ya has aplicado un filtro a tu lista de formularios, solo se puede exportar el formulario filtrado (segunda opción). Si aún no has aplicado ningún filtro, se muestra la primera opción y te permite agregar más filtros.   
   3) *Todos los formularios*. Todos los formularios, sin filtrado ni paginación.   
2) Formato.   
    1) *CSV*. Los datos se exportarán a un archivo CSV. Cada formulario extraído será una fila en un archivo donde los campos serán las columnas.   
    2) *XLSX*. Exportación en formato Excel.  
    3) *XLSX dividido*. Exportación a formato Excel donde cada diapositiva es una hoja diferente.   
3) Opciones de campos  
    1) *Seleccionar todos los campos del formulario*. Te permite exportar todos los campos del formulario.  
    2) *Valores de etiquetas*. Para los campos que tienen valores predefinidos (campos de selección única o múltiple), el valor exportado es el valor mostrado, no el código interno utilizado para representar ese valor.   
    3) *Formato de análisis de datos*. Los formularios que contienen diapositivas repetitivas y opción múltiple se exportan en varias filas, donde cada fila contiene solo una diapositiva repetitiva y solo una opción múltiple; los demás campos permanecen iguales. Se agrega una columna adicional llamada *conta*. Esta columna toma el valor 1 solo en la primera fila del grupo de repetición, y 0 en las demás.  
    4) *Columnas separadas*. Las opciones múltiples se exportan como varias columnas 
4) *Diapositiva de selección*. Te permite ver la lista de campos en cada diapositiva, si deseas exportar solo algunos de los campos y no todos.   
5) *Selección de campos*. Puedes seleccionar/deseleccionar campos individuales.   

Algunas columnas del archivo exportado no se pueden deseleccionar. Estas son:

- ID del formulario
- Fecha de creación
- Fecha de actualización
- Datos del usuario DINO (nombre e ID)
- Datos de métricas (id, nombre, etc...)
- Dinoinvalid

### Acciones de fila

Haz clic en una fila para expandir sus detalles, o usa las acciones de fila (ver, editar, eliminar, imprimir como PDF, descargar como DOCX, imprimir credencial). Las acciones disponibles dependen de tus permisos y de la configuración del formulario.

### Crear un nuevo envío

Haz clic en el botón flotante **+** en la página de la lista para abrir un formulario en blanco para la entrada de datos.

![Formulario en blanco abierto para enviar una nueva entrada de datos](../imgs/forms/index-create.png)

Completa los campos y envía. El nuevo envío aparecerá en la lista.

### Operaciones masivas

Selecciona varios envíos usando las casillas de verificación para realizar **eliminaciones** o **ediciones** masivas (cambiar el mismo valor de campo en todas las entradas seleccionadas).

## Vistas adicionales

- **Mapa**: visualiza los envíos con coordenadas geográficas en un mapa interactivo. Obtén más información en [Mapa de formularios](forms-map.md).
- **DataChat**: consulta los datos de tu formulario usando lenguaje natural. Consulta [DataChat](datachat.md) para más detalles.

!!! warning
    La función DataChat puede consumir créditos. Verifica el saldo de créditos de tu cuenta antes de usarla.