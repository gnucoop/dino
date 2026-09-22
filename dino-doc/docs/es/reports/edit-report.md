---
title: Editar report
description: Aprende a editar un report existente en Dino, incluida la actualización de métricas y detalles.
---

# Editar report

La página Editar report te permite modificar un report existente. Puedes actualizar sus métricas, detalles y otra información después de haberlo creado.

![Vista principal de la página Editar report](../imgs/reports/edit-report.png)

## Acceder a la página de edición

Puedes navegar a la página Editar report de dos maneras:

* Desde la lista principal de [reports](index.md), haz clic en el título de un report o en la acción **Editar** (a menudo representada por un icono de lápiz).
* Desde la vista detallada de un report (después de hacer clic en **Ver el report**), busca un botón o enlace **Editar**.

## Editar la información del report

Una vez en la página Editar report, verás un formulario similar al utilizado para crear un report. El formulario está rellenado previamente con los datos actuales del report.

### Pasos para editar un report

1. **Revisa los datos precargados** en los campos del formulario.
2. **Realiza tus cambios** en cualquiera de los campos disponibles:
   - **Métricas principales:** Actualiza los valores numéricos principales del report.
   - **Métricas secundarias:** Edita puntos de datos adicionales (si están configurados para tu form schema).
   - **Detalles:** Modifica el texto descriptivo, las fechas u otra información de apoyo.
3. **Guarda tus cambios** haciendo clic en el botón **Guardar** o **Actualizar** en la parte inferior del formulario.

!!! tip "Campos opcionales"
    Según la configuración de tu organización, algunos campos de métricas pueden ser opcionales. Normalmente se marcan como tales. Puedes dejar los campos opcionales en blanco si no hay datos disponibles.

## Ver el report renderizado

Después de guardar tus cambios, puedes ver el report con formato. Haz clic en el botón o enlace **Ver el report** para ver una versión limpia y renderizada de los datos del report.

![Vista del report renderizado tras hacer clic en Ver el report](../imgs/reports/edit-report-view.png)

## Entender el form schema

La estructura y los campos disponibles en la página Editar report vienen determinados por el **form schema** configurado por tu administrador. Esto garantiza que los datos se recopilen de forma consistente.

![Vista principal de la página Editar report schema](../imgs/reports/edit-report-schema.png)

Si necesitas editar información que no aparece como campo, contacta con tu administrador; es posible que haya que actualizar el form schema. Puedes obtener más información sobre la estructura subyacente en la documentación de [Editar report schema](edit-report-schema.md).

!!! warning "Integridad de los datos"
    Ten cuidado al editar datos históricos de reports, ya que los cambios pueden afectar al análisis de tendencias y a los registros históricos. Asegúrate de que tus actualizaciones sean precisas.