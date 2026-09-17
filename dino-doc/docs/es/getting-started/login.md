---
title: Iniciar sesión
description: Cómo iniciar sesión en Dino, restablecer tu contraseña, crear una cuenta y usar proveedores de inicio de sesión externos.
---

# Iniciar sesión en Dino

La página de inicio de sesión es el punto de partida para acceder a Dino. Desde aquí puedes iniciar sesión en tu cuenta, crear una cuenta nueva o recuperar el acceso si has olvidado tu contraseña. Según cómo tu organización haya configurado Dino, es posible que algunas de las opciones descritas a continuación no estén visibles.

![Main view of the Login page](../imgs/getting-started/login.png)

---

## Iniciar sesión

Usa tus credenciales para acceder a la plataforma.

1.  En la página de inicio de sesión, introduce tu **nombre de usuario o dirección de correo electrónico** en el primer campo.
2.  Introduce tu **contraseña** en el segundo campo.
3.  Haz clic en el **botón de flecha** para iniciar sesión.

Si tus credenciales son correctas, accederás automáticamente al [Panel de control](../dashboard/index.md).

Si el inicio de sesión falla, aparecerá un mensaje de error debajo del formulario. Vuelve a comprobar que tu correo electrónico y contraseña sean correctos, asegurándote de que no haya espacios adicionales, e inténtalo de nuevo.

---

## Restablecer tu contraseña

Si has olvidado tu contraseña, puedes solicitar un enlace de restablecimiento por correo electrónico.

!!! note "Característica opcional"
    Esta opción puede no estar disponible en tu instalación. Si no ves el enlace «¿Olvidaste tu contraseña?», ponte en contacto con tu administrador.

1.  En la página de inicio de sesión, haz clic en **«¿Olvidaste tu contraseña?»** debajo del formulario de inicio de sesión.
2.  Introduce la **dirección de correo electrónico** asociada a tu cuenta.
3.  Haz clic en el **botón de flecha** para enviar la solicitud.

Recibirás un mensaje de confirmación en la parte superior de la pantalla. Revisa tu bandeja de entrada para ver un correo electrónico con un enlace para establecer una nueva contraseña. Si el correo no llega en unos minutos, revisa la carpeta de spam.

Para volver al formulario de inicio de sesión sin restablecer tu contraseña, haz clic en **«En realidad, sí recuerdo mi contraseña»**.

Para más detalles, consulta la página [Restablecer contraseña](reset-password.md).

---

## Crear una cuenta nueva

Si aún no tienes una cuenta, es posible que puedas registrarte directamente desde la página de inicio de sesión.

!!! note "Característica opcional"
    Esta opción puede no estar disponible en tu instalación. Si no ves el enlace «¿Nuevo usuario? Crear cuenta nueva», ponte en contacto con tu administrador para que te cree una cuenta.

1.  En la página de inicio de sesión, haz clic en **«¿Nuevo usuario? Crear cuenta nueva»**.
2.  Introduce tu **nombre completo**.
3.  Introduce tu **dirección de correo electrónico**.
4.  Elige una **contraseña** (de al menos 9 caracteres).
5.  Vuelve a introducir tu contraseña en el campo **Confirmar contraseña** para asegurarte de que coincida.
6.  Si se muestra una **Política de privacidad**, lee el texto y marca la casilla para aceptar los términos y condiciones. Debes aceptarlos para continuar.
7.  Haz clic en el **botón de flecha** para crear tu cuenta.

Una vez creada tu cuenta, se iniciará sesión automáticamente y accederás al [Panel de control](../dashboard/index.md).

Si ya tienes una cuenta, haz clic en **«¿Ya tienes una cuenta? Iniciar sesión»** para volver al formulario de inicio de sesión.

---

## Iniciar sesión con una cuenta externa

Tu organización puede permitirte iniciar sesión con tu cuenta existente de Microsoft o Google, en lugar de una contraseña de Dino independiente.

!!! note "Característica opcional"
    Esta opción puede no estar disponible en tu instalación. Los botones solo aparecerán si tu administrador ha habilitado el inicio de sesión externo.

1.  En la página de inicio de sesión, haz clic en **«Iniciar sesión con Microsoft»** o **«Iniciar sesión con Google»**, según la cuenta que quieras usar.
2.  Serás redirigido a Microsoft o Google para confirmar tu identidad.
3.  Después de autorizar el acceso, volverás a Dino y se iniciará sesión automáticamente.

---

## Configuración de la página

Hay un pequeño conjunto de preferencias de visualización disponibles directamente en la página de inicio de sesión.

### Tema claro / oscuro

Hay un interruptor en la parte inferior del formulario, entre un icono de sol y un icono de luna. Haz clic en él o deslízalo para alternar entre **modo claro** y **modo oscuro**. Este ajuste se aplica de inmediato.

### Selección de plataforma

!!! note "Característica opcional"
    Esta opción puede no estar disponible en tu instalación. Solo se muestra en despliegues multiplataforma.

Si hay un menú desplegable **«Elige tu plataforma»**, selecciona la plataforma a la que quieres conectarte antes de iniciar sesión. El menú desplegable mostrará los entornos que tu administrador ha configurado.

---

## Solución de problemas

### «Hubo un problema al conectarse con el servidor de autenticación o tu token ha caducado.»

!!! warning
    Tu sesión anterior ha caducado o se interrumpió la conexión con el servidor de autenticación. Esto no es un error por tu parte. Simplemente introduce tus credenciales e inicia sesión de nuevo.

### «Hubo un problema durante el proceso de sincronización.»

!!! warning
    Se produjo un error al sincronizar tus datos, que puede estar relacionado con una importación reciente de formularios. Revisa los formularios que estabas importando para detectar posibles problemas y, a continuación, inicia sesión de nuevo. Si el problema persiste, ponte en contacto con tu administrador.

### «Cargando autenticación externa…» sin redirección

!!! warning
    Este mensaje aparece brevemente al completar un inicio de sesión a través de Microsoft o Google. Si la página no avanza automáticamente después de unos segundos, intenta iniciar sesión de nuevo. Si el problema se repite, ponte en contacto con tu administrador para comprobar que el servicio de autenticación externo está configurado correctamente.