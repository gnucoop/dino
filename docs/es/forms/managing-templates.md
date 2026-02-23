---
title: Gestión de esquemas de formulario
description: Cómo crear y editar esquemas de formulario en Dino, incluido el constructor de formularios, estados, métricas y opciones de importación.
---

# Gestión de esquemas de formulario

Los esquemas de formulario definen la estructura y los campos que se utilizan al recopilar datos. Los administradores y usuarios con los permisos adecuados pueden crear nuevos esquemas, editar los existentes y configurar su comportamiento.

![Gestión de esquemas de formulario](../imgs/forms/managing-templates.png)

!!! warning "Permiso requerido"
    Gestionar esquemas de formulario requiere permisos específicos. Si no puede ver las opciones de crear o editar, contacte a su administrador.

---

## Acceso a la gestión de esquemas

Desde el centro de Recopilación de datos, navegue al esquema que desea editar y haga clic en su acción **editar**, o use la navegación para llegar a la opción **Crear** para un nuevo esquema. Ambos caminos abren el mismo editor de esquemas.

---

## Configuración del esquema

En la parte superior del editor, complete los siguientes campos antes de diseñar la estructura del formulario:

- **Nombre del formulario** — un identificador interno único para este esquema. Aparecerá un error si el nombre ya está en uso.
- **Etiqueta del formulario** — el nombre que se muestra a los usuarios en la interfaz.
- **Conjunto de iconos** — elija entre *Predeterminado* (iconos estándar) y *Humanitario* (iconos específicos para contextos humanitarios).
- **Identificador del icono** — escriba para buscar y seleccionar el icono que representa este formulario.
- **Estados del formulario** — seleccione uno o más estados de flujo de trabajo por los que pueden pasar las entradas creadas con este esquema. También puede crear nuevos estados o editar los existentes en línea: haga clic en el icono **editar** junto a un estado, o seleccione **Crear nuevo estado** en la parte inferior del menú desplegable.
- **Métricas del formulario** — seleccione los tipos de métricas (como proyecto, ubicación u organización) a los que se vincularán las entradas creadas con este esquema.
- **Visibilidad** — configúrela como *Privada* (accesible solo para usuarios autorizados) o *Pública* (compartible mediante un enlace público).
- **Comportamiento del conjunto de métricas** — *Predeterminado* permite múltiples entradas con la misma combinación de métricas; *Único* evita conjuntos de métricas duplicados para este formulario.
- **Generar informe** — si se establece en *Sí*, se generará un informe automático y se vinculará a este esquema cuando se guarde. Esta opción solo se muestra si aún no existe un informe automático para el esquema.

---

## Construcción de la estructura del formulario

La sección inferior de la página contiene el constructor de formularios, donde puede agregar, organizar y configurar los campos que aparecerán cuando los usuarios completen este formulario.

Use los controles del constructor de formularios para:

- Agregar nuevos campos (texto, número, fecha, archivo, opción y más)
- Organizar campos en páginas o secciones
- Establecer etiquetas, sugerencias y reglas de validación de campos

El botón **Guardar** permanece deshabilitado si el constructor de formularios reporta algún error de validación. Resuelva todos los errores antes de intentar guardar.

---

## Importación de una estructura de formulario

Si tiene una definición de formulario existente en formato XLSForm, puede importarla en lugar de construir la estructura manualmente.

1. Haga clic en el botón **Importar** en la barra de herramientas.
2. Seleccione su archivo XLSForm desde su dispositivo.
3. Revise la estructura importada en el constructor de formularios.
4. Realice los ajustes necesarios y luego guarde.

---

## Configuración de relaciones

!!! note "Solo esquemas existentes"
    El botón Relaciones solo está disponible al editar un esquema existente, no al crear uno nuevo.

Haga clic en el botón **Relaciones** para abrir el editor de relaciones. Esto le permite vincular campos en este formulario con datos de otros formularios, de modo que ciertos valores de campo o opciones de menú desplegable puedan completarse previamente en función de datos de formularios relacionados.

---

## Guardado del esquema

Haga clic en **Guardar** para guardar el esquema. Aparecerá un mensaje de confirmación brevemente en la parte inferior de la pantalla.

Después de guardar, volverá al centro de Recopilación de datos.

!!! warning "¡Ups! Algo salió mal al guardar el formulario"
    Si aparece un mensaje de error al guardar, verifique que los campos **Nombre del formulario** y **Etiqueta del formulario** estén completos y que el Nombre del formulario no esté ya en uso por otro esquema. Si el problema persiste, contacte a su administrador.