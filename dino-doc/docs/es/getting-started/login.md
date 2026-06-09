---
title: Inicio de sesión
description: Cómo iniciar sesión en Dino, restablecer la contraseña, crear una cuenta y usar proveedores de inicio de sesión externos.
---

# Iniciar sesión en Dino

La página de inicio de sesión es el punto de partida para acceder a Dino. Desde aquí puedes iniciar sesión en tu cuenta, crear una cuenta nueva o recuperar el acceso si has olvidado tu contraseña. Dependiendo de cómo tu organización haya configurado Dino, es posible que algunas de las opciones descritas a continuación no estén visibles.

![Vista principal de la página de inicio de sesión](../imgs/getting-started/login.png)

---

## Iniciar sesión

Usa tus credenciales para acceder a la plataforma.

1.  En la página de inicio de sesión, ingresa tu **nombre de usuario o dirección de correo electrónico** en el primer campo.
2.  Ingresa tu **contraseña** en el segundo campo.
3.  Haz clic en el **botón de flecha** para iniciar sesión.

Si tus credenciales son correctas, serás redirigido automáticamente al [Panel de control](../dashboard/index.md).

Si el inicio de sesión falla, aparecerá un mensaje de error debajo del formulario. Verifica que tu correo electrónico y contraseña sean correctos, asegurándote de que no haya espacios adicionales, e inténtalo de nuevo.

---

## Restablecer tu contraseña

Si has olvidado tu contraseña, puedes solicitar un enlace de restablecimiento por correo electrónico.

!!! note "Función opcional"
    Esta opción puede no estar disponible en tu instalación. Si no ves el enlace "¿Olvidaste tu contraseña?", contacta a tu administrador.

1.  En la página de inicio de sesión, haz clic en **"¿Olvidaste tu contraseña?"** debajo del formulario de inicio de sesión.
2.  Ingresa la **dirección de correo electrónico** asociada a tu cuenta.
3.  Haz clic en el **botón de flecha** para enviar la solicitud.

Recibirás un mensaje de confirmación en la parte superior de la pantalla. Revisa tu bandeja de entrada para encontrar un correo electrónico con un enlace para establecer una nueva contraseña. Si el correo no llega en unos minutos, revisa tu carpeta de spam.

Para volver al formulario de inicio de sesión sin restablecer tu contraseña, haz clic en **"En realidad, sí recuerdo mi contraseña"**.

Para más detalles, consulta la página [Restablecer contraseña](reset-password.md).

---

## Crear una nueva cuenta

Si aún no tienes una cuenta, es posible que puedas registrarte directamente desde la página de inicio de sesión.

!!! note "Función opcional"
    Esta opción puede no estar disponible en tu instalación. Si no ves el enlace "¿Nuevo usuario? Crear nueva cuenta", contacta a tu administrador para que te cree una cuenta.

1.  En la página de inicio de sesión, haz clic en **"¿Nuevo usuario? Crear nueva cuenta"**.
2.  Ingresa tu **nombre completo**.
3.  Ingresa tu **dirección de correo electrónico**.
4.  Elige una **contraseña** (al menos 9 caracteres de longitud).
5.  Vuelve a ingresar tu contraseña en el campo **Confirmar contraseña** para asegurarte de que coincida.
6.  Si se muestra una **Política de privacidad**, lee el texto y marca la casilla para aceptar los términos y condiciones. Debes aceptar para continuar.
7.  Haz clic en el **botón de flecha** para crear tu cuenta.

Una vez creada tu cuenta, iniciarás sesión y serás redirigido al [Panel de control](../dashboard/index.md) automáticamente.

Si ya tienes una cuenta, haz clic en **"¿Ya tienes una cuenta? Iniciar sesión"** para volver al formulario de inicio de sesión.

---

## Iniciar sesión con una cuenta externa

Tu organización puede permitirte iniciar sesión usando tu cuenta existente de Microsoft o Google, en lugar de una contraseña separada de Dino.

!!! note "Función opcional"
    Esta opción puede no estar disponible en tu instalación. Los botones aparecerán solo si tu administrador ha habilitado el inicio de sesión externo.

1.  En la página de inicio de sesión, haz clic en **"Iniciar sesión con Microsoft"** o **"Iniciar sesión con Google"**, según la cuenta que quieras usar.
2.  Serás redirigido a Microsoft o Google para confirmar tu identidad.
3.  Después de autorizar el acceso, volverás a Dino y se iniciará sesión automáticamente.

---

## Configuración de la página

Un pequeño conjunto de preferencias de visualización está disponible directamente en la página de inicio de sesión.

### Tema claro / oscuro

Hay un interruptor en la parte inferior del formulario, entre un icono de sol y un icono de luna. Haz clic o deslízalo para cambiar entre el **modo claro** y el **modo oscuro**. Este ajuste surte efecto de inmediato.

### Selección de plataforma

!!! note "Función opcional"
    Esta opción puede no estar disponible en tu instalación. Solo se muestra en implementaciones con múltiples plataformas.

Si aparece un menú desplegable **"Elige tu plataforma"**, selecciona la plataforma a la que deseas conectarte antes de iniciar sesión. El menú desplegable mostrará los entornos que tu administrador ha configurado.

---

## Solución de problemas

### "Hubo un problema al conectar con el servidor de autenticación o tu token ha expirado."

!!! warning
    Tu sesión anterior ha expirado o la conexión con el servidor de autenticación se interrumpió. Esto no es un error de tu parte. Simplemente ingresa tus credenciales e inicia sesión nuevamente.

### "Hubo un problema durante el proceso de sincronización."

!!! warning
    Ocurrió un error al sincronizar tus datos, que puede estar relacionado con una importación reciente de formularios. Revisa los formularios que estabas importando en busca de posibles problemas y luego inicia sesión nuevamente. Si el problema persiste, contacta a tu administrador.

### "Cargando autenticación externa…" sin redirección

!!! warning
    Este mensaje aparece brevemente al completar un inicio de sesión a través de Microsoft o Google. Si la página no avanza automáticamente después de unos segundos, intenta iniciar sesión nuevamente. Si el problema se repite, contacta a tu administrador para verificar que el servicio de autenticación externa esté configurado correctamente.