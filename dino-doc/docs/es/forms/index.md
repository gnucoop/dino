---
title: Formularios
description: Accede y gestiona todos tus esquemas de formulario y envíos en Dino. Este es el punto de partida para ingresar, visualizar y analizar los datos recopilados.
---

# Formularios

La página de Formularios es tu espacio de trabajo central para todos los datos estructurados en Dino. Aquí puedes acceder a cada esquema de formulario, enviar nuevos datos, revisar envíos anteriores y explorar tus datos en un mapa o mediante análisis conversacional.

![Vista principal de la página de Formularios](../imgs/forms/index.png)

Al abrir esta página, ves una lista de todos los esquemas de formulario disponibles. Cada elemento muestra el nombre del formulario y su icono.

---

## Navegando por la página

La página principal enumera todos los esquemas de formulario a los que tienes permiso de acceso. Puedes interactuar con esta lista de varias maneras:

1.  **Abrir un esquema de formulario**: Haz clic en cualquier formulario de la lista para ir a su página dedicada, donde puedes ver todos sus envíos.
2.  **Buscar**: Usa la barra de búsqueda en la parte superior para encontrar un formulario específico por nombre.
3.  **Filtrar y ordenar**: Usa los controles disponibles para filtrar la lista u ordenarla por diferentes columnas.

!!! tip "Punto de partida"
    Esta lista es tu plataforma de lanzamiento. Cada esquema de formulario representa un tipo diferente de informe, encuesta o tarea de recolección de datos para tu proyecto.

---

## Trabajando con un esquema de formulario

Después de hacer clic en un esquema de formulario, accedes a su página principal. Desde aquí puedes:

1.  **Ver envíos**: Consulta una tabla con todos los datos enviados anteriormente para este formulario.
2.  **Crear un nuevo envío**: Haz clic en el botón de acción flotante **Crear** (icono "+") para abrir un formulario en blanco y enviar nuevos datos.
3.  **Importar envíos**: Haz clic en el botón **Importar** (icono de carga en la nube) para importar múltiples envíos desde un archivo.
4.  **Explorar datos**:
    *   Ve a la pestaña [Mapa](forms-map.md) para ver todos los envíos representados en un mapa.
    *   Ve a la pestaña [DataChat](datachat.md) para hacer preguntas sobre tus datos recopilados mediante IA.

En la lista de envíos de un formulario, puedes realizar acciones sobre entradas individuales:
*   **Ver**: Consulta los detalles completos de un envío.
*   **Editar**: Modifica un envío existente (si tienes permiso).
*   **Imprimir/Exportar**: Genera un informe en PDF o DOCX del envío.
*   **Duplicar**: Crea una copia de un envío para usarla como base para uno nuevo.
*   **Eliminar**: Elimina un envío (si tienes permiso).

También puedes seleccionar varios envíos para realizar acciones masivas como eliminar o editar.

![Diálogo de exportación para descargar envíos de formularios](../imgs/forms/index-export.png)

---

## Flujos de trabajo clave

### Para enviar nuevos datos:
1.  Desde la página principal de Formularios, haz clic en el esquema de formulario deseado.
2.  En la página del formulario, haz clic en el botón de acción flotante **Crear**.
3.  Completa todos los campos obligatorios en el formulario que se abre.
4.  Haz clic en **Enviar** para guardar tu entrada.

### Para revisar o editar datos existentes:
1.  Desde la página principal de Formularios, haz clic en el esquema de formulario correspondiente.
2.  Navega por la lista de envíos. Haz clic en cualquier entrada individual para **Ver** sus detalles completos.
3.  Si tienes permiso, puedes hacer clic en **Editar** para modificar un envío.

### Para importar datos:
1.  Ve a la página del esquema de formulario deseado.
2.  Haz clic en el botón **Importar** (icono de carga en la nube).
3.  Sigue las instrucciones en pantalla para seleccionar y cargar tu archivo de datos.

### Para exportar datos:
1.  Ve a la página del esquema de formulario deseado.
2.  Usa los filtros para reducir la lista de envíos que deseas exportar.
3.  Haz clic en el botón **Exportar** en la barra de filtros.
4.  Elige el formato de exportación que prefieras.

!!! note "Gestión de esquemas de formulario"
    La creación de nuevos esquemas de formulario o la edición de su estructura (agregar/eliminar campos) requiere permisos de administrador. Si necesitas configurar un nuevo tipo de formulario, contacta al administrador de tu proyecto. Puedes obtener más información sobre cómo editar la estructura de un formulario en la guía [Editar esquema de formulario](edit-form-schema.md).

!!! warning "Permisos"
    Las acciones que ves (Crear, Editar, Eliminar, Importar, Exportar) dependen de tus permisos de usuario. Si un botón o acción no aparece, es posible que no tengas el acceso requerido.