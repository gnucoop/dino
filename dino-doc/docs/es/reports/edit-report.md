---
title: Editar Informe
description: Aprenda a editar un informe existente en Dino, incluyendo la actualización de métricas y detalles.
---

# Editar Informe

La página Editar Informe le permite modificar un informe existente. Puede actualizar sus métricas, detalles y otra información después de haber sido creado.

![Main view of the Edit Report page](../imgs/reports/edit-report.png)

## Acceso a la Página de Edición

Puede navegar a la página Editar Informe de dos maneras:

* Desde la lista principal de [Informes](index.md), haga clic en el título de un informe o en la acción **Editar** (a menudo representada por un icono de lápiz).
* Desde la vista detallada de un informe (después de hacer clic en **Ver el Informe**), busque un botón o enlace **Editar**.

## Editar Información del Informe

Una vez en la página Editar Informe, verá un formulario similar al utilizado para crear un informe. El formulario está rellenado previamente con los datos actuales del informe.

### Pasos para Editar un Informe

1. **Revise los datos previamente rellenados** en los campos del formulario.
2. **Realice sus cambios** en cualquiera de los campos disponibles:
   - **Métricas Principales:** Actualice los valores numéricos principales del informe.
   - **Métricas Secundarias:** Edite puntos de datos adicionales (si están configurados en su esquema de formulario).
   - **Detalles:** Modifique texto descriptivo, fechas u otra información de apoyo.
3. **Guarde sus cambios** haciendo clic en el botón **Guardar** o **Actualizar** en la parte inferior del formulario.

!!! tip "Campos Opcionales"
    Dependiendo de la configuración de su organización, algunos campos de métricas pueden ser opcionales. Por lo general, están marcados en consecuencia. Puede dejar los campos opcionales en blanco si no hay datos disponibles.

## Visualización del Informe Renderizado

Después de guardar sus cambios, puede ver el informe formateado. Haga clic en el botón o enlace **Ver el Informe** para ver una versión limpia y renderizada de los datos del informe.

![Rendered report view after clicking View the Report](../imgs/reports/edit-report-view.png)

## Comprensión del Esquema del Formulario

La estructura y los campos disponibles en la página Editar Informe están determinados por el **esquema de formulario** configurado por su administrador. Esto garantiza que los datos se recopilen de manera consistente.

![Main view of the Edit Report Schema page](../imgs/reports/edit-report-schema.png)

Si necesita editar información que no aparece como campo, contacte a su administrador – es posible que sea necesario actualizar el esquema del formulario. Puede obtener más información sobre la estructura subyacente en la documentación de [Esquema de Edición de Informes](edit-report-schema.md).

!!! warning "Integridad de los Datos"
    Tenga cuidado al editar datos históricos del informe, ya que los cambios pueden afectar el análisis de tendencias y los registros históricos. Asegúrese de que sus actualizaciones sean precisas.