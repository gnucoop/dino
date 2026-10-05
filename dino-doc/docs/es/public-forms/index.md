---
title: Formularios públicos
description: Cómo acceder, completar y enviar un formulario público en Dino sin necesidad de tener una cuenta.
---

# Formularios públicos

Los formularios públicos permiten que cualquier persona con un enlace envíe datos a Dino sin necesidad de iniciar sesión ni tener una cuenta. Se utilizan habitualmente para encuestas, registros o recopilación de comentarios. Si has recibido un enlace público a un formulario, puedes usar esta página para completarlo.

Las direcciones de los formularios públicos siguen el patrón `/f/` seguido de un identificador único (por ejemplo, `https://your-dino-instance.com/f/963f643f-ad55-4b85-a3d6-100b113f2e9a`). El identificador es el ID del form schema. Si se debe añadir algún valor de métrica a los datos del formulario, se puede incluir en la URL usando la siguiente sintaxis (por ejemplo, para el caso de una métrica): `https://your-dino-instance.com/f/963f643f-ad55-4b85-a3d6-100b113f2e9a?case=a6408e72-c60c-4d54-ad2f-44fd4a90cdb2`
donde el ID del valor de la métrica es de nuevo el ID de la métrica asignado por Dino.

No es necesario recordar esta sintaxis, ya que Dino genera el enlace automáticamente al hacer clic en el icono de compartir del form schema. Una vez generado, el enlace se puede compartir por correo electrónico, WhatsApp o cualquier otro medio.

---

## Acceder a un formulario público

1.  Haz clic en el enlace del formulario público que has recibido (por ejemplo, por correo electrónico o en un mensaje compartido). El enlace te dirigirá a `/f/...` en tu instancia de Dino.
2.  El formulario se abrirá directamente en tu navegador web. No necesitas iniciar sesión.
3.  Revisa el título del formulario y cualquier texto introductorio para confirmar que es el formulario correcto.

Un selector de idioma en la barra superior de la pantalla te permite elegir el idioma del formulario. Úsalo para cambiar el formulario al idioma que prefieras antes de empezar a completarlo.

Si el formulario incluye varias secciones, se muestra una barra de progreso debajo del título para que puedas ver cuánto te queda por completar.

!!! tip
    Los enlaces de los formularios públicos contienen un identificador largo (como `/f/abc123def`). Si la página no carga, asegúrate de que se haya copiado el enlace completo correctamente.

---

## Completar y enviar

1.  Rellena todos los campos del formulario. Los campos marcados con un asterisco (*) son **requerido**.
2.  Si el formulario tiene varias secciones, usa los botones **Siguiente** y **Anterior** en la parte inferior del formulario para navegar entre ellas. El título de la sección se muestra en la parte superior de cada paso.
3.  A medida que rellenas los campos, el formulario valida tu información. Las entradas no válidas suelen aparecer resaltadas.
4.  Una vez que todos los campos requeridos son válidos, el botón **Enviar** se activa.
5.  Haz clic en **Enviar** para enviar tus datos.

!!! warning
    El botón **Siguiente** permanece deshabilitado si la sección actual aún no es válida, y el botón **Enviar** permanece deshabilitado (en gris) si algún campo requerido está vacío o contiene datos no válidos. Revisa la sección actual, o navega hacia atrás por las secciones anteriores, para encontrar y corregir cualquier problema resaltado.

---

## Después del envío

Tras un envío correcto, verás una pantalla de confirmación con una marca de verificación y el mensaje: **"El formulario se ha enviado correctamente."**

También aparece una notificación en la parte inferior de la pantalla durante unos segundos. Haz clic en **Rellenar otro** en ella para recargar la página con una copia nueva y vacía del mismo formulario, lo que te permitirá realizar otro envío.

---

## Solución de problemas

### El botón Siguiente o Enviar está deshabilitado.
Esto significa que la sección actual o el formulario en su conjunto aún no es válido. Comprueba lo siguiente:

*   **Campos requeridos vacíos**: Asegúrate de que todos los campos marcados con un asterisco (*) estén rellenos.
*   **Datos no válidos**: Busca los campos resaltados en rojo y corrige la información (por ejemplo, un formato de correo electrónico no válido).

### "This form cannot be opened because some required information is missing from the link."
El enlace que has usado está incompleto. Algunos formularios requieren información de métricas (como un caso, una posizione o una organización) que debe incluirse en la dirección.

*   Ponte en contacto con la persona que te envió el enlace del formulario y pídele que comparta el enlace completo.

### "Unable to save form."
Tu envío encontró un error temporal, a menudo relacionado con tu conexión a internet.

1.  Comprueba tu conexión a internet.
2.  Haz clic en **"Try again"** en la notificación de la parte inferior de la pantalla. Dino envía el formulario de nuevo con las respuestas que escribiste: no necesitas rellenarlo otra vez.
3.  Si sigue fallando, ponte en contacto con la persona que te envió el enlace del formulario.

### "Oops! We could not find this Form Schema."
El enlace que estás usando es incorrecto o el formulario ha sido eliminado.

*   Verifica que tienes la URL completa y correcta.
*   Ponte en contacto con la persona que compartió el enlace contigo para obtener uno actualizado.

### El formulario no carga (página en blanco).

*   Actualiza la página de tu navegador.
*   Asegúrate de que tu conexión a internet sea estable.
*   Confirma que el enlace esté completo y no se haya truncado.

---

## Páginas relacionadas

*   [Formularios](../forms/index.md)
*   [Editar Form Schema](../forms/edit-form-schema.md)
*   [Idiomas](../administration/languages.md)
*   [Métricas](../metrics/index.md)