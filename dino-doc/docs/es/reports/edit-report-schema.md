---
title: Editar esquema del informe
description: Crea o modifica un esquema de informe importando un archivo XLSReport y, a continuación, compruébalo en la vista previa antes de guardarlo.
---

# Editar esquema del informe

La página **Editar esquema del informe** te permite crear un nuevo esquema de informe o modificar uno existente. Un esquema de informe define la estructura, el diseño y las fuentes de datos de un informe en Dino. Su contenido proviene de un archivo [XLSReport](xlsreport.md) que importas en esta página.

![Vista principal de la página Editar esquema del informe](../imgs/reports/edit-report-schema.png)

## Campos de la página

| Campo | Descripción |
|-------|-------------|
| **Nombre de informe** | Obligatorio. Debe ser único: si ya está en uso, la página muestra *Este nombre ya se utiliza.* |
| **Etiqueta del informe** | Obligatorio. El nombre que se muestra en las listas y las tarjetas. |
| **Conjunto de iconos** | **Por defecto** o **Humanitarian**. |
| **Icono del formulario** | Elige un icono de la lista de autocompletado. La vista previa se actualiza en tiempo real. |
| **Métricas requeridas** | Las métricas que deben elegirse cuando se genera un informe a partir de este esquema. |

Debajo de los campos, la página muestra:

- **Esquemas de formulario asociados** – los form schema que utiliza el informe, solo lectura. Se toman del archivo XLSReport importado cuando guardas.
- **Vista previa del informe** – el informe generado a partir del esquema importado o guardado.

Las fuentes de datos, las columnas y los filtros se definen todos en el archivo XLSReport: la página no tiene controles para elegirlos.

## Crear un nuevo esquema de informe

1. Abre la sección **Informes** en el menú principal.
2. Haz clic en el botón **+** (*Add new Reports schema*) en la esquina inferior derecha.
3. Introduce el **Nombre de informe** y la **Etiqueta del informe** y, opcionalmente, el icono y las **Métricas requeridas**.
4. Haz clic en **Importar** y luego en **Escoge un archivo** y selecciona tu archivo XLSReport (.xls o .xlsx).
5. Haz clic en **Aplicar**: el archivo se carga en la página y se muestra en la **Vista previa del informe**.
6. Haz clic en **Guardar** para almacenar el esquema. **Guardar** permanece deshabilitado hasta que los campos obligatorios sean válidos.

!!! warning "Importa antes de guardar"
    Un nuevo esquema de informe no se puede guardar sin un archivo importado: guardarlo vacío muestra *Oops! Something went wrong saving the Report*. **Aplicar** solo carga el archivo en la página; no se almacena nada hasta que hagas clic en **Guardar**.

## Editar un esquema de informe existente

1. Abre la sección **Informes**.
2. En la tarjeta del esquema de informe, haz clic en el icono del lápiz (*Editar esquema del informe*).
3. Cambia los campos o importa un nuevo archivo XLSReport para reemplazar el contenido del informe.
4. Haz clic en **Guardar** para actualizar el esquema.

Para eliminar un esquema de informe, haz clic en el icono de la papelera (*Borrar esquema del informe*) en su tarjeta. Un esquema que todavía tiene informes no se puede eliminar: elimina primero sus informes.

## Próximos pasos

Después de guardar tu esquema de informe, puedes:

* Ir a la página [Informes](index.md) para ver y ejecutar tu nuevo informe.
* Usar [Editar informe](edit-report.md) para trabajar con el propio informe una vez que el esquema esté listo.
* Volver a esta página para hacer más ajustes según sea necesario.