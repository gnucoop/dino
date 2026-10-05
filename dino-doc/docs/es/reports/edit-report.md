---
title: Editar informe
description: Aprende a crear un informe a partir de un esquema de informe en Dino, abrir un informe guardado y exportar los resultados.
---

# Editar informe

Un informe se genera a partir de un [esquema de informe](edit-report-schema.md): aplica el esquema a los envíos que coinciden con las métricas y las fechas que elijas. Esta página explica cómo crear un informe nuevo y cómo abrir y exportar uno guardado.

![Un informe guardado abierto en su paso Métricas del informe](../imgs/reports/edit-report.png)

## Crear un informe

1. Ve a la página [Informes](index.md) y haz clic en la tarjeta del esquema de informe que quieras usar. Se abre la lista de sus informes.
2. Haz clic en **Agregar nuevo informe** encima de la tabla. Si el informe usa prompts de IA, el número de tokens DINO-AI que consumirá aparece en el botón.
3. Si tu Dino usa métricas, la página se abre en el paso **Métricas del informe**:
    1. Revisa la **Fecha de creación** y haz clic en **Cambiar** para elegir otra si es necesario.
    2. Opcionalmente, elige un **Estado del formulario**, entre los estados de formulario que tengas permitido usar. El campo solo se muestra cuando hay alguno disponible.
    3. Elige los valores de métrica sobre los que trata el informe, como una ubicación o un proyecto. Las métricas marcadas con un asterisco (*) son obligatorias según el esquema de informe; las demás son opcionales y acotan más los datos. Si un valor que necesitas aún no existe, haz clic en **Nuevo** junto a su campo para crearlo, cuando tengas permiso para hacerlo.
    4. Haz clic en **Continuar**.
4. En el paso **DATOS DEL INFORME**:
    1. Introduce el **Nombre de informe**. Es obligatorio.
    2. Opcionalmente, establece **Recolectado desde** y **Recopilado hasta**: solo se incluyen en el informe los envíos creados dentro de ese rango. Puedes establecer solo uno de los dos, o ninguno, en cuyo caso no se aplica ningún filtro de fecha.
5. Haz clic en el botón **Guardar informe** en la esquina inferior derecha. Se habilita una vez que las métricas obligatorias y el nombre estén completos.

Dino confirma que el documento fue creado y te lleva de vuelta a la lista de informes, donde aparece el nuevo informe.

!!! warning "Informes con prompts de IA"
    Crear un informe que usa prompts de IA consume tokens DINO-AI. Si no tienes suficientes, Dino no crea el informe y te pide que agregues más tokens.

!!! tip "Los valores de métrica no se pueden cambiar después"
    Las métricas, el estado y el rango de fechas se fijan cuando se crea el informe. Para ver el mismo esquema aplicado a otros valores, crea otro informe.

## Abrir un informe guardado

1. Ve a la página [Informes](index.md) y haz clic en la tarjeta del esquema de informe.
2. En la lista de informes, pasa el cursor sobre la fila del informe y haz clic en el icono **Ver** (ojo), o haz clic en la fila para seleccionarla y haz clic en **Ver** en la barra de acciones encima de la tabla.

Si tu Dino usa métricas, el informe se abre en el paso **Métricas del informe**, que muestra los valores con los que se creó el informe. No se pueden cambiar aquí. Haz clic en **Ver el informe** para pasar al paso **DATOS DEL INFORME**, donde se muestra el informe.

Mientras se carga el informe, Dino muestra un indicador giratorio. Un informe que usa prompts de IA muestra en su lugar una barra de progreso, con el mensaje *Generando prompt de informe X de Y*. Si ningún envío coincide con el informe, la página muestra *No se encontraron formularios para este informe*.

![Vista del informe renderizado después de hacer clic en Ver el informe](../imgs/reports/edit-report-view.png)

## Leer el informe

La parte superior del paso **DATOS DEL INFORME** muestra el título del esquema de informe, las fechas **Recolectado desde** y **Recopilado hasta** cuando el informe las tiene, y los valores de métrica con los que se creó. A continuación aparece el informe en sí, tal como se diseñó en su archivo [XLSReport](xlsreport.md): tablas, gráficos y texto.

Si el informe contiene widgets de filtro, puedes usarlos para acotar los datos mostrados, sin cambiar el informe guardado.

## Exportar un informe

Junto a **Exportar como:**, en la parte superior del paso **DATOS DEL INFORME**, elige un formato:

* **pdf portrait** / **pdf landscape** — un documento PDF en la orientación elegida.
* **docx portrait** / **docx landscape** — un documento de Word en la orientación elegida.
* **xlsx** — un archivo de Excel con los datos del informe.

!!! note "Dónde están los botones de exportación"
    Los botones de exportación pertenecen al paso **DATOS DEL INFORME**. Cuando tu Dino no tiene métricas activas, y en el [Dashboard](../dashboard/index.md), el informe se muestra directamente, sin los pasos y sin los botones de exportación.

## Páginas relacionadas

* [Informes](index.md) — explora esquemas de informe y sus informes.
* [Editar esquema de informe](edit-report-schema.md) — crea o cambia el esquema a partir del cual se genera un informe.
* [Informes automáticos](autoreports.md) — informes generados automáticamente a partir de un esquema de formulario.