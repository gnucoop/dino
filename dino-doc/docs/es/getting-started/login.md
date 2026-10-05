---
title: Iniciar sesión
description: Cómo iniciar sesión en Dino, restablecer tu Contraseña, crear una cuenta y usar proveedores de inicio de sesión externos.
---

# Iniciar sesión en Dino

La página de inicio de sesión es el punto de partida para acceder a Dino. Desde aquí puedes iniciar sesión en tu cuenta, crear una cuenta nueva o recuperar el acceso si has olvidado tu Contraseña. Según cómo haya configurado tu organización Dino, es posible que algunas de las opciones descritas a continuación no estén visibles.

![Vista principal de la página de inicio de sesión](../imgs/getting-started/login.png)

La página tiene tres partes:

- un **encabezado**, con el logotipo, el selector de idioma y un enlace al código fuente de Dino en GitHub;
- la **tarjeta de inicio de sesión**, junto a una breve introducción a la plataforma y sus módulos. En un teléfono la tarjeta aparece primero y la introducción después, para que puedas iniciar sesión sin desplazarte;
- un **pie de página**, con el conmutador de tema claro/oscuro y la versión de la aplicación.

---

## Iniciar sesión

Usa tus credenciales para acceder a la plataforma. Si tu instalación no te permite crear una cuenta por tu cuenta, la tarjeta te recuerda que uses la cuenta que tu administrador creó para ti.

1.  En la página de inicio de sesión, introduce tu **nombre de usuario o dirección de correo electrónico** en el primer campo.
2.  Introduce tu **Contraseña** en el segundo campo.
3.  Haz clic en **Iniciar sesión**. Mientras Dino comprueba tus credenciales, el botón muestra **Iniciando sesión…**.

Si tus credenciales son correctas, se te llevará automáticamente al [Panel](../dashboard/index.md).

Si el inicio de sesión falla, aparecerá un mensaje de error debajo del formulario. Comprueba que tu correo electrónico y tu Contraseña sean correctos, asegurándote de que no haya espacios adicionales, y vuelve a intentarlo.

!!! tip "Mantener la sesión iniciada"
    Si tu sesión caduca, Dino no cierra tu sesión y conserva los datos en el dispositivo, pero la sincronización se detiene: el botón de sincronización muestra una advertencia. Haz clic en él: Dino intenta renovar la sesión y, si no puede, ofrece **Ir a la página de inicio de sesión**, conservando los datos en este dispositivo, o **Más tarde**. Inicia sesión de nuevo con la misma cuenta para sincronizar los datos.

!!! warning "Datos aún no sincronizados"
    Si los datos recopilados en este dispositivo aún no se han sincronizado, la página de inicio de sesión te lo indica, nombrando la cuenta que los recopiló cuando es posible. Inicia sesión con esa cuenta para sincronizar los datos: **iniciar sesión con una cuenta diferente los elimina**.

---

## Restablecer tu Contraseña

Si has olvidado tu Contraseña, puedes solicitar un enlace de restablecimiento por correo electrónico.

!!! note "Función opcional"
    Esta opción puede no estar disponible en tu instalación. Si no ves el enlace "¿Has olvidado tu Contraseña?", ponte en contacto con tu administrador.

1.  En la página de inicio de sesión, haz clic en **"¿Has olvidado tu Contraseña?"** debajo del formulario de inicio de sesión.
2.  Introduce la **dirección de correo electrónico** asociada a tu cuenta.
3.  Haz clic en **Enviar** para enviar la solicitud.

Recibirás un mensaje de confirmación en la parte superior de la pantalla. Revisa tu bandeja de entrada para ver si hay un correo electrónico con un enlace para establecer una nueva Contraseña. Si el correo electrónico no llega en unos minutos, revisa tu carpeta de spam.

Para volver al formulario de inicio de sesión sin restablecer tu Contraseña, haz clic en **"En realidad, sí recuerdo mi Contraseña"**.

Para más detalles, consulta la página [Restablecer Contraseña](reset-password.md).

---

## Crear una cuenta nueva

Si aún no tienes una cuenta, es posible que puedas registrarte directamente desde la página de inicio de sesión.

!!! note "Función opcional"
    Esta opción puede no estar disponible en tu instalación. Si no ves el enlace "¿Eres nuevo? Crear cuenta nueva", ponte en contacto con tu administrador para que te cree una cuenta.

1.  En la página de inicio de sesión, haz clic en **"¿Eres nuevo? Crear cuenta nueva"**.
2.  Introduce tu **Nombre completo**.
3.  Introduce tu **dirección de correo electrónico**.
4.  Elige una **Contraseña** (de al menos 9 caracteres).
5.  Vuelve a introducir tu Contraseña en el campo **confirmar Contraseña** para asegurarte de que coincida.
6.  Si se muestra una **política de privacidad**, lee el texto y marca la casilla para aceptar los términos y condiciones. Debes aceptar para continuar.
7.  Haz clic en **Crear cuenta**.

Una vez creada tu cuenta, se iniciará sesión automáticamente y se te llevará al [Panel](../dashboard/index.md).

Si ya tienes una cuenta, haz clic en **"¿Ya tienes una cuenta? Iniciar sesión"** para volver al formulario de inicio de sesión.

!!! tip "Elegir una Contraseña segura"
    Usa una Contraseña que no reutilices en otros sitios web. Una combinación de letras mayúsculas y minúsculas, números y símbolos dificulta que otros la adivinen.

---

## Iniciar sesión con una cuenta externa

Tu organización puede permitirte iniciar sesión con tu cuenta de Microsoft o Google existente, en lugar de una Contraseña de Dino aparte.

!!! note "Función opcional"
    Esta opción puede no estar disponible en tu instalación. Los botones solo aparecerán si tu administrador ha habilitado el inicio de sesión externo.

1.  En la página de inicio de sesión, haz clic en **"Iniciar sesión con Microsoft"** o **"Iniciar sesión con Google"**, según la cuenta que quieras usar.
2.  Se te redirigirá a Microsoft o Google para confirmar tu identidad.
3.  Tras autorizar el acceso, se te devolverá a Dino y se iniciará sesión automáticamente.

---

## Ajustes de la página

Hay un pequeño conjunto de preferencias de visualización disponibles directamente en la página de inicio de sesión.

### Idioma

El selector de idioma del encabezado, que muestra el código del idioma actual (por ejemplo, **ENG**), cambia el idioma de la página antes de que inicies sesión. Dino recuerda tu elección en este dispositivo.

### Tema claro / oscuro

Dos botones en el pie de página, un sol (*Modo claro*) y una luna (*Modo oscuro*), cambian entre **Modo claro** y **Modo oscuro**. El ajuste surte efecto de inmediato.

### Selección de plataforma

!!! note "Función opcional"
    Esta opción puede no estar disponible en tu instalación. Solo se muestra en implementaciones multiplataforma.

Si aparece un menú desplegable **"Elige tu plataforma"**, selecciona la plataforma a la que quieres conectarte antes de iniciar sesión. El menú desplegable mostrará los entornos que tu administrador haya configurado.

---

## Solución de problemas

### "Hubo un problema al conectar con el servidor de autenticación o tu token ha caducado."

!!! warning
    Tu sesión anterior ha caducado o la conexión con el servidor de autenticación se ha interrumpido. Esto no es un error por tu parte. Simplemente introduce tus credenciales e inicia sesión de nuevo.

### "Hubo un problema durante el proceso de sincronización."

!!! warning
    Se produjo un error al sincronizar tus datos, que puede estar relacionado con una importación de formularios reciente. Revisa los formularios que estuvieras importando por si hubiera problemas, y luego inicia sesión de nuevo. Si el problema persiste, ponte en contacto con tu administrador.

### "Cargando autenticación externa…" sin redirección

!!! warning
    Este mensaje aparece brevemente al completar un inicio de sesión mediante Microsoft o Google. Si la página no continúa automáticamente después de unos segundos, intenta iniciar sesión de nuevo. Si el problema se repite, ponte en contacto con tu administrador para comprobar que el servicio de autenticación externa esté configurado correctamente.