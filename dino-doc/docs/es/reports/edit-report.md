---
title: Editar informe
description: Aprende a editar un informe existente en Dino, incluida la actualización de métricas y detalles.
---

# Editar informe

La página Editar informe te permite modificar un informe existente. Puedes actualizar sus métricas, detalles y otra información después de que se haya creado.

![Main view of the Edit Report page](../imgs/reports/edit-report.png)

## Acceso a la página de edición

Puedes navegar a la página Editar informe de dos maneras:

* Desde la lista principal de [Informes](index.md), haz clic en el título de un informe o en la acción **Editar** (a menudo representada por un icono de lápiz).
* Desde la vista detallada de un informe (después de hacer clic en **Ver el informe**), busca un botón o enlace de **Editar**.

## Edición de la información del informe

Una vez en la página Editar informe, verás un formulario similar al que se usa para crear un informe. El formulario se rellena previamente con los datos actuales del informe.

### Pasos para editar un informe

1. **Revisa los datos pre-rellenados** en los campos del formulario.
2. **Realiza los cambios** en cualquiera de los campos disponibles:
   - **Métricas principales:** Actualiza los valores numéricos principales del informe.
   - **Métricas secundarias:** Edita puntos de datos adicionales (si están configurados en el esquema del formulario).
   - **Detalles:** Modifica texto descriptivo, fechas u otra información complementaria.
3. **Guarda los cambios** haciendo clic en el botón **Guardar** o **Actualizar** en la parte inferior del formulario.

!!! tip "Campos opcionales"
    Dependiendo de la configuración de tu organización, algunos campos de métricas pueden ser opcionales. Por lo general, están marcados en consecuencia. Puedes dejar los campos opcionales en blanco si no hay datos disponibles.

## Visualización del informe renderizado

Después de guardar los cambios, puedes ver el informe formateado. Haz clic en el botón o enlace **Ver el informe** para ver una versión limpia y renderizada de los datos del informe.

![Rendered report view after clicking View the Report](../imgs/reports/edit-report-view.png)

## Entendiendo el esquema del formulario

La estructura y los campos disponibles en la página Editar informe están determinados por el **esquema del formulario** configurado por tu administrador. Esto garantiza que los datos se recopilen de manera consistente.

![Main view of the Edit Report Schema page](../imgs/reports/edit-report-schema.png)

Si necesitas editar información que no aparece como campo, ponte en contacto con tu administrador: es posible que el esquema del formulario deba actualizarse. Puedes obtener más información sobre la estructura subyacente en la documentación de [Esquema de edición de informes](edit-report-schema.md).

!!! warning "Integridad de los datos"
    Ten cuidado al editar datos históricos de informes, ya que los cambios pueden afectar el análisis de tendencias y los registros históricos. Asegúrate de que tus actualizaciones sean precisas.