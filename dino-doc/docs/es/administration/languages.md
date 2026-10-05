---
title: Gestión de idiomas
description: "Cómo gestionar las traducciones de Dino: encontrar una clave, traducirla en todos los idiomas, añadir o renombrar claves e importar o exportar un archivo de idioma."
---

# Gestión de idiomas

La página **Idiomas** permite a los administradores gestionar todos los textos traducidos que se usan en Dino. Cada texto tiene una **Clave de traducción** — normalmente el propio texto en inglés — y un valor para cada idioma disponible. Desde aquí puedes encontrar una clave, traducirla, añadir claves nuevas e importar o exportar todo el diccionario de un idioma.

![Vista principal de la página Idiomas](../imgs/administration/languages.png)

El encabezado de la página muestra un resumen de la cobertura de traducción: el número total de claves de traducción y el porcentaje completado. Debajo del encabezado, la página se divide en dos áreas: la lista de claves de traducción a la izquierda y el detalle de la clave seleccionada a la derecha.

!!! warning "Solo para administradores"
    Esta área solo es visible para los usuarios con el rol de Administrador. Si no la ves en la navegación, ponte en contacto con el administrador de tu sistema.

---

## Explorar las claves de traducción

Cada fila de la lista muestra una clave y, en un anillo a su izquierda, el porcentaje de idiomas que ya la traducen. Si el texto contiene marcadores dinámicos, como `{{language}}`, aparecen listados bajo la clave.

### Buscar y filtrar la lista

- Escribe en el campo **Buscar clave o texto…** para encontrar una clave. La búsqueda examina tanto las claves como sus traducciones.
- Usa los dos botones junto al campo de búsqueda para elegir qué se muestra:
    - **Todas** — todas las claves de traducción.
    - **Por traducir** — solo las claves que aún faltan en al menos un idioma.

La búsqueda y el filtro funcionan juntos: con **Por traducir** seleccionado, la búsqueda solo examina las claves que aún quedan por traducir.

---

## Traducir una clave

1. Haz clic en una clave de la lista. Su detalle se abre a la derecha.
2. El detalle muestra una tarjeta por idioma, marcada como **Traducido** o **Falta**, con un cuadro de texto que contiene su valor.
3. Escribe la traducción en el cuadro de cada idioma que quieras completar.

No hay botón de guardado: cada cambio se guarda automáticamente un momento después de que dejes de escribir. El encabezado del detalle muestra **Guardando…** mientras se almacena y **Guardado** cuando ha terminado; si algo va mal, muestra **Error al guardar**. Una barra de progreso junto a él indica en cuántos idiomas está traducida la clave.

!!! tip "Marcadores"
    Mantén los marcadores de la clave, como `{{language}}`, sin cambios en todas las traducciones: Dino los sustituye por el valor real cuando muestra el texto. Aparecen resaltados en la clave que se muestra en la parte superior del detalle.

### Renombrar o eliminar una clave

En la parte superior del detalle, junto a la clave:

- **Renombrar clave** (icono de lápiz) — convierte la clave en un campo editable. Escribe la nueva clave y pulsa **Enter**, o haz clic fuera del campo, para aplicarla; pulsa **Esc** para cancelar.
- **Eliminar** (icono de papelera) — borra la clave y todas sus traducciones, tras confirmar con **Sí**.

!!! warning "La aplicación usa las claves"
    Dino busca los textos por su clave. Si renombras o eliminas una clave que usa la aplicación, ese texto aparecerá sin traducir, así que cambia las claves solo cuando sepas dónde se usan.

---

## Añadir una nueva clave de traducción

1. Haz clic en **Traducción** (icono de más) en el encabezado de la página. Se abre el diálogo **Nueva traducción**.
2. Escribe la **Clave**. Es obligatoria. Usa `{{` y `}}` alrededor de un nombre, como `{{name}}`, para los marcadores dinámicos.
3. Opcionalmente, rellena las traducciones: el diálogo lista todos los idiomas disponibles y un contador muestra cuántos has rellenado. Los idiomas que dejes vacíos permanecen marcados como faltantes y podrás completarlos más tarde desde el detalle.
4. Haz clic en **Guardar traducción**, o en **Deshacer** para cerrar el diálogo sin añadir la clave.

---

## Trabajar con un idioma completo

Haz clic en **Todos los idiomas** en el encabezado de la página para abrir el diálogo que muestra el diccionario completo de cada idioma.

1. A la izquierda, elige un idioma en **Idiomas**. Usa **Buscar idioma…** para encontrarlo en una lista larga. Un punto de color junto a cada idioma indica lo completo que está; pasa el cursor sobre un idioma para ver cuántos valores tiene.
2. A la derecha, el diálogo muestra una vista previa de solo lectura del idioma seleccionado: cada clave con su valor, o *Falta*. Usa **Buscar en el archivo…** para buscar una clave o un valor. Las traducciones individuales se editan desde la página principal, no aquí.
3. El pie de página muestra cuántos valores hay del total.

### Exportar un idioma

Haz clic en **Exportar** seguido del código del idioma (por ejemplo **Exportar ITA**). Dino descarga un archivo JSON con el nombre del idioma, como `ita.json`, con las claves que ese idioma traduce. Las claves que aún faltan se omiten.

### Importar un archivo de idioma

1. Selecciona el idioma que quieras actualizar.
2. Haz clic en **Importar archivo** y elige un archivo `.json`. El diálogo lo comprueba y muestra **JSON válido** o **JSON no válido**; un archivo válido se muestra en la vista previa con su nombre y número de filas.
3. Haz clic en **Guardar** para almacenarlo. **Guardar** solo se activa después de haber importado un archivo.

Los valores del archivo sustituyen a los valores existentes con la misma clave; las claves que no están en el archivo conservan sus valores actuales. No se almacena nada hasta que hagas clic en **Guardar**: **Cerrar** descarta el archivo importado.

!!! tip "Traducir fuera de Dino"
    Para que alguien sin acceso a Dino traduzca un idioma, expórtalo, haz que completen el archivo JSON y vuelve a importarlo en el mismo idioma.

---

## Páginas relacionadas

- [Interfaz](../interface/index.md) — cómo cambiar el idioma en el que usas Dino.
- [Lista de usuarios](users-list.md) — gestiona los usuarios que pueden acceder a esta página.