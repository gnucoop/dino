---
title: Agregación
description: Cómo usar la vista de Agregación en Dino para explorar y gestionar envíos de formularios de múltiples esquemas en una sola lista.
---

# Agregación

La página de Agregación proporciona una vista unificada de todos los envíos de formularios en su organización. En lugar de ver los envíos de un esquema de formulario a la vez, puede ver entradas de múltiples esquemas juntas en una sola lista filtrable.

![Agregación](../imgs/aggregation/index.png)

## Explorando la Lista

La lista muestra todos los envíos que tiene permiso para ver. Cada fila representa un único envío. Las siguientes columnas se muestran por defecto:

*   **Esquema del Formulario**: El nombre del esquema de formulario al que pertenece este envío.
*   **Estado**: El estado actual del flujo de trabajo del envío.
*   También pueden aparecer columnas adicionales para métricas como **Proyecto**, **Ubicación** u **Organización**, dependiendo de la configuración de su sistema.

Puede hacer clic en cualquier fila para seleccionarla o expandirla para ver más detalles.

## Filtrando la Lista

Una barra de filtros se encuentra encima de la lista. Úsela para reducir los envíos mostrados. Puede filtrar por:

*   Proyecto
*   Ubicación
*   Área
*   Caso
*   Código de Caso
*   Organización
*   Estado del Formulario
*   Usuario

!!! tip "Consejos de Filtrado"
    La barra de filtros de Agregación está diseñada para un filtrado rápido y entre esquemas. Para funciones avanzadas como presets de filtros guardados o exportación de datos, navegue a la lista de envíos para un esquema de formulario específico.

## Acciones de Fila

Al pasar el cursor sobre una fila, aparece un conjunto de iconos de acción a la derecha. Las acciones disponibles para un envío específico dependen de sus permisos para su esquema de formulario.

*   **Ver** (![icono de ojo]()): Abre el envío en una vista de solo lectura.
*   **Editar** (![icono de lápiz]()): Abre el envío para editarlo.
*   **Imprimir** (![icono de impresora]()): Genera y abre una versión en PDF del envío. Se le pedirá confirmación antes de crear el PDF.
*   **Eliminar** (![icono de eliminar]()): Elimina el envío permanentemente. Se le pedirá confirmar esta acción.

## Creando un Nuevo Envío

Puede iniciar un nuevo envío de formulario directamente desde la página de Agregación.

1.  Haga clic en el botón **+** (Agregar) en la esquina inferior derecha de la pantalla.
2.  Se abre un cuadro de diálogo que muestra una lista de esquemas de formulario para los que tiene permiso para crear envíos.
3.  Seleccione el esquema de formulario deseado de la lista.
4.  Haga clic en **Crear Formulario**. Será llevado al formulario para comenzar a completarlo.