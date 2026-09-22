---
title: Formularios públicos
description: Cómo acceder, completar y enviar un formulario público en Dino sin necesidad de tener una cuenta.
---

# Formularios públicos

Los formularios públicos permiten que cualquier persona con un enlace envíe datos a Dino sin necesidad de iniciar sesión ni tener una cuenta. Se utilizan habitualmente para encuestas, inscripciones o recopilación de comentarios. Si has recibido un enlace público a un formulario, puedes usar esta página para completarlo.

Las direcciones de los formularios públicos siguen el patrón `/f/` seguido de un identificador único (por ejemplo, `https://your-dino-instance.com/f/963f643f-ad55-4b85-a3d6-100b113f2e9a`). El identificador es el ID del form schema. Si se debe añadir algún valor de métrica a los datos del formulario, se puede incluir en la URL utilizando la siguiente sintaxis (por ejemplo, para el caso de métrica): `https://your-dino-instance.com/f/963f643f-ad55-4b85-a3d6-100b113f2e9a?case=a6408e72-c60c-4d54-ad2f-44fd4a90cdb2`
donde el ID del valor de métrica es de nuevo el ID de la métrica asignado por Dino.

No es necesario recordar esta sintaxis, ya que el enlace lo genera automáticamente Dino cuando haces clic en el icono de compartir del form schema. Una vez generado, el enlace se puede compartir por correo electrónico, WhatsApp o cualquier otro medio.

---

## Acceder a un formulario público

1.  Haz clic en el enlace del formulario público que hayas recibido (por ejemplo, por correo electrónico o en un mensaje compartido). El enlace te dirigirá a `/f/...` en tu instancia de Dino.
2.  El formulario se abrirá directamente en tu navegador web. No necesitas iniciar sesión.
3.  Revisa el título del formulario y cualquier texto introductorio para confirmar que es el formulario correcto.

!!! tip
    Los enlaces de los formularios públicos contienen un identificador largo (como `/f/abc123def`). Si la página no carga, asegúrate de que se haya copiado el enlace completo correctamente.

---

## Completar y enviar

1.  Rellena todos los campos del formulario. Los campos marcados con un asterisco (*) son **obligatorios**.
2.  Si el formulario tiene varias secciones, utiliza las pestañas o los botones de navegación de la parte superior del formulario para moverte entre ellas.
3.  A medida que rellenas los campos, el formulario valida tu información. Las entradas no válidas suelen aparecer resaltadas.
4.  Una vez que todos los campos obligatorios sean válidos, el botón principal de envío (normalmente un botón circular con un icono de enviar) se activará.
5.  Haz clic en el botón de envío para enviar tus datos.

!!! warning
    El botón de envío permanecerá deshabilitado (atenuado) si algún campo obligatorio está vacío o contiene datos no válidos. Recorre el formulario para localizar y corregir los problemas resaltados.

---

## Después del envío

Tras un envío correcto, verás una pantalla de confirmación con una marca de verificación y el mensaje: **"The form has been successfully submitted."**

También aparecerá una notificación en la parte inferior de la pantalla. Desde esta notificación, puedes:

*   **Fill out another one**: Haz clic aquí para recargar la página con una copia nueva y vacía del mismo formulario, lo que te permite realizar otro envío.
*   **Close**: Descarta la notificación.

---

## Solución de problemas

### El botón de envío está deshabilitado.
Esto significa que el formulario aún no es válido. Comprueba lo siguiente:

*   **Campos obligatorios vacíos**: Asegúrate de que todos los campos marcados con un asterisco (*) estén rellenos.
*   **Datos no válidos**: Busca los campos resaltados en rojo y corrige la información (por ejemplo, un formato de correo electrónico no válido).

### "Unable to save form."
Tu envío ha encontrado un error temporal, a menudo relacionado con tu conexión a internet.

1.  Haz clic en **"Try again"** en la notificación de la parte inferior de la pantalla.
2.  Si el error persiste, comprueba tu conexión a internet y prueba a actualizar la página.
3.  Si sigue fallando, ponte en contacto con la persona que te envió el enlace del formulario.

### "Oops! We could not find this Form Schema."
El enlace que estás utilizando es incorrecto o el formulario se ha eliminado.

*   Verifica que tienes la URL completa y correcta.
*   Ponte en contacto con la persona que compartió el enlace contigo para obtener uno actualizado.

### El formulario no carga (página en blanco).

*   Actualiza la página de tu navegador.
*   Asegúrate de que tu conexión a internet sea estable.
*   Confirma que el enlace esté completo y no se haya truncado.