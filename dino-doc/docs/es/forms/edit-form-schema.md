---
title: Editar Esquema de Formulario
description: Aprende a crear y editar esquemas de formularios en Dino para definir la estructura de tus formularios de recolección de datos.
---

# Editar Esquema de Formulario

La página **Editar Esquema de Formulario** te permite diseñar o modificar la estructura de un formulario: los campos, sus tipos, reglas de validación y cómo se relacionan entre sí. Puedes crear un esquema completamente nuevo o actualizar uno existente.

![Vista principal de la página Editar Esquema de Formulario](../imgs/forms/edit-form-schema.png)

## Crear un Nuevo Esquema de Formulario

1. Desde la sección **Formularios**, haz clic en **Crear Esquema de Formulario**.
2. Ingresa un **Nombre** y, opcionalmente, una **Descripción** para el esquema.
3. Añade campos usando el botón **Añadir Campo**. Para cada campo puedes configurar:
   - **Etiqueta del Campo** – la pregunta o indicación que verán los recolectores de datos.
   - **Tipo de Campo** – p. ej., texto, número, fecha, selección, geolocalización.
   - **Obligatorio** – activa esta opción para que el campo sea obligatorio.
   - **Reglas de Validación** – como valores mín./máx., extensiones de archivo permitidas, etc.
4. Reordena los campos arrastrándolos al orden deseado.
5. Haz clic en **Guardar** para crear el esquema.

## Editar un Esquema de Formulario Existente

1. Ve a la página **Formularios** y haz clic en el esquema que deseas modificar.
2. Haz clic en el botón **Editar** (o abre el menú de acciones del esquema y selecciona **Editar**).
3. El editor se abre con todos los campos existentes cargados. Puedes:
   - Añadir nuevos campos.
   - Editar la configuración de un campo existente haciendo clic sobre él.
   - Eliminar un campo usando su icono de papelera.
   - Reordenar campos mediante arrastrar y soltar.
4. Haz clic en **Guardar** para aplicar los cambios.

!!! warning "Editar un esquema que ya tiene envíos"
    Cambiar tipos de campo o eliminar campos puede afectar a los envíos existentes. Dino te advertirá antes de guardar si detecta alguna incompatibilidad.

## Definir Relaciones entre Campos (Dependencias)

Puedes configurar lógica condicional para que ciertos campos solo aparezcan cuando se seleccione un valor específico en otro campo.

1. Mientras editas un esquema, selecciona el campo que deseas que sea condicional.
2. Haz clic en la pestaña o botón **Relaciones**.
3. En el cuadro de diálogo que se abre, elige el **campo padre** y el **valor** que debe seleccionarse para que este campo se muestre. También puedes añadir múltiples condiciones (lógica Y/O).
4. Haz clic en **Aplicar** para guardar la relación.

![Cuadro de diálogo del editor de relaciones (dependencias) del formulario](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Probar dependencias"
    Después de guardar el esquema, puedes probar tu lógica condicional abriendo el formulario en la vista [Editar Formulario](edit-form.md) y verificando que los campos dependientes aparezcan o se oculten correctamente.

## Próximos Pasos

Una vez que tu esquema de formulario esté listo, puedes [crear una instancia de formulario](edit-form.md) basada en él, o usar el esquema en un [Mapa de Formularios](forms-map.md) para asignarlo a áreas y recolectores específicos.