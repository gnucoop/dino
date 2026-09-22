---
title: Informe automático
description: Crear o modificar un informe generado automáticamente
---

# Informes automáticos

Un informe automático es un informe que Dino crea para ti a partir de un form schema. No lo
escribes tú mismo: lo activas mientras editas el form schema, y Dino crea
el report schema y un primer informe para ti.

Usa un informe automático cuando quieras ver los datos que recopila un form sin diseñar un
informe primero. Cuando necesites control total sobre el diseño, los cálculos o las
gráficas, crea el informe con el [formato XLSReport](xlsreport.md) en su lugar.

## Activar un informe automático

1. Abre la sección **Forms** y selecciona el form schema para el que quieres el informe.
2. Ve a la pestaña **Settings**.
3. Establece **Generate Report** en **Yes**.
4. Guarda el form schema.

Dino crea el informe unos segundos después de guardar. Puedes encontrarlo en la
sección [Reports](index.md), listado como cualquier otro informe.

## Qué crea Dino

Guardar un form schema con **Generate Report** establecido en **Yes** produce dos cosas:

| Elemento | Detalles |
|---|---|
| Un report schema | Con el nombre del form, con la etiqueta **&lt;form label&gt; Auto Report** y el mismo icono que el form. Permanece vinculado al form schema del que se generó. |
| Un primer informe | Creado unos segundos después, con la fecha del día actual y atribuido a ti. No tiene filtro de área, caso, location, organización ni proyecto, por lo que abarca todos los datos que el form ha recopilado. |

Puedes abrir el informe generado y trabajar con él como con cualquier otro: el informe que
produce es un punto de partida, no un resultado fijo.

## Desactivar un informe automático

Una vez que existe un informe automático, el campo **Generate Report** del form schema se bloquea en
**Yes** y muestra una sugerencia que lo indica. No hay forma de retirar el informe desde esa
pantalla.

Para eliminarlo, ve a la sección **Reports** y borra el report schema del informe generado
junto con sus datos. El campo del form schema se desbloquea en cuanto el informe
desaparece, y puedes volver a establecerlo en **No**.

## Páginas relacionadas

- [Edit Form Schema](../forms/edit-form-schema.md) — donde se encuentra la opción **Generate Report**
- [El formato XLSReport](xlsreport.md) — para informes que diseñas tú mismo
- [Reports](index.md) — la sección donde aparecen los informes generados