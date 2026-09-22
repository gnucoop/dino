---
title: Editar report schema
description: Crea o modifica un report schema para definir la estructura, el diseño y las fuentes de datos de los report en Dino.
---

# Editar report schema

La página **Editar report schema** te permite crear un nuevo report schema o modificar uno existente. Un report schema define la estructura, el diseño y las fuentes de datos de un report en Dino.

![Vista principal de la página Editar report schema](../imgs/reports/edit-report-schema.png)

En esta página, configuras el nombre del report, su descripción y los campos de datos específicos que aparecerán en el report a partir de tus datos de form.

## Crear un nuevo report schema

Para crear un nuevo report schema:

1. Ve a la sección **Reports** en el menú principal.
2. Haz clic en **Create Report Schema**.
3. Se te llevará a la página Editar report schema.
4. Introduce un **Name** descriptivo para tu report.
5. (Opcional) Proporciona una **Description** para explicar el propósito del report.
6. Importa un archivo XLSReport
7. Haz clic en **Save** para crear el schema.

## Editar un report schema existente

Para modificar un report schema que ya has creado:

1. Ve a la sección **Reports**.
2. Busca en la lista el report schema que deseas editar y haz clic en él.
3. Haz clic en el botón **Edit** (a menudo representado por un icono de lápiz).
4. Se te llevará a la página Editar report schema con la configuración actual cargada.
5. Realiza los cambios que desees en el nombre, la descripción o la configuración de datos.
6. Haz clic en **Save** para actualizar el schema.

!!! tip "Guardar tu trabajo"
    Recuerda siempre hacer clic en **Save** después de realizar cambios. Tus modificaciones no se aplican hasta que guardes el schema.

## Configurar los datos del report

El núcleo del report schema es definir qué datos de tus datos de form aparecerán en el report. Normalmente puedes:

* **Seleccionar la fuente de datos:** Elige el form schema que contiene los datos sobre los que quieres generar el report.
* **Seleccionar campos de datos:** Elige campos específicos de tus form schema conectados para incluirlos como columnas en el report.
* **Establecer nombres para mostrar:** Personaliza el encabezado de columna que se muestra en el report para cada campo seleccionado.
* **Definir filtros:** Establece condiciones para incluir solo los datos específicos que cumplan tus criterios (por ejemplo, datos de un rango de fechas determinado).

!!! warning "Fuente de datos"
    Un report schema debe estar conectado al menos a un form schema para tener datos que mostrar. Asegúrate de que el form correspondiente existe antes de crear tu report.

## Próximos pasos

Después de guardar tu report schema, puedes:

* Ir a la página [Reports](index.md) para ver y ejecutar tu nuevo report.
* Volver a esta página para realizar más ajustes según sea necesario.