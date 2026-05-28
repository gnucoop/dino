---
title: Editar Esquema de Formulario
description: Aprenda cómo crear y editar esquemas de formularios en Dino para definir la estructura de sus formularios de recolección de datos.
---

# Editar Esquema de Formulario

La página **Editar Esquema de Formulario** le permite diseñar o modificar la estructura de un formulario: los campos, sus tipos, reglas de validación y cómo se relacionan entre sí. Puede crear un esquema completamente nuevo o actualizar uno existente.

![Vista principal de la página Editar Esquema de Formulario](../imgs/forms/edit-form-schema.png)

## Crear un Nuevo Esquema de Formulario

1. Desde la sección **Formularios**, haga clic en **Crear Esquema de Formulario**.
2. Ingrese un **Nombre** y opcionalmente una **Descripción** para el esquema.
3. Agregue campos usando el botón **Agregar Campo**. Para cada campo puede configurar:
   - **Etiqueta del Campo** – la pregunta o indicación que se muestra a los recolectores de datos.
   - **Tipo de Campo** – por ejemplo, texto, número, fecha, selección, geolocalización.
   - **Obligatorio** – activa o desactiva para hacer el campo obligatorio.
   - **Reglas de Validación** – como valores mín/máx, extensiones de archivo permitidas, etc.
4. Reordene los campos arrastrándolos al orden deseado.
5. Haga clic en **Guardar** para crear el esquema.

## Editar un Esquema de Formulario Existente

1. Navegue a la página **Formularios** y haga clic en el esquema que desea modificar.
2. Haga clic en el botón **Editar** (o abra el menú de acciones del esquema y seleccione **Editar**).
3. Se abrirá el editor con todos los campos existentes cargados. Puede:
   - Agregar nuevos campos.
   - Editar la configuración de un campo existente haciendo clic sobre él.
   - Eliminar un campo usando su ícono de papelera.
   - Reordenar campos mediante arrastrar y soltar.
4. Haga clic en **Guardar** para aplicar los cambios.

!!! warning "Editar un esquema que ya tiene envíos"
    Cambiar tipos de campo o eliminar campos puede afectar los envíos existentes. Dino le advertirá antes de guardar si se detectan incompatibilidades.

## Definir Relaciones entre Campos (Dependencias)

Puede configurar lógica condicional para que ciertos campos solo aparezcan cuando se selecciona un valor específico en otro campo.

1. Mientras edita un esquema, seleccione el campo que desea que sea condicional.
2. Haga clic en la pestaña o botón **Relaciones**.
3. En el cuadro de diálogo que se abre, elija el **campo padre** y el **valor** que debe seleccionarse para que este campo se muestre. También puede agregar múltiples condiciones (lógica Y/O).
4. Haga clic en **Aplicar** para guardar la relación.

![Cuadro de diálogo del editor de relaciones (dependencias) de formularios](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Probar las dependencias"
    Después de guardar el esquema, puede probar la lógica condicional abriendo el formulario en la vista [Editar Formulario](edit-form.md) y verificando que los campos dependientes aparezcan u oculten correctamente.

## Pasos Siguientes

Una vez que su esquema de formulario esté listo, puede [crear una instancia de formulario](edit-form.md) basada en él, o usar el esquema en un [Mapa de Formularios](forms-map.md) para asignarlo a áreas y recolectores específicos.