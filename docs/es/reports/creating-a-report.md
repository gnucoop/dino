---
title: Crear un informe
description: Cómo generar un nuevo informe a partir de un esquema de informe en Dino, incluyendo la selección de métricas y la configuración de un rango de fechas.
---

# Crear un informe

Para generar un nuevo informe, navega al centro de Informes, abre un esquema de informe y haz clic en el **botón +** (el botón circular flotante en la parte inferior derecha de la página).

![Crear un informe](../imgs/reports/creating-a-report.png)

!!! note "Permiso requerido"
    El botón de agregar solo es visible si tienes permiso para crear informes para este esquema.

---

## Paso 1 — Métricas del informe

Si el esquema de informe requiere métricas, el primer paso te pide que selecciones los valores de métrica que cubrirá este informe (por ejemplo: proyecto, ubicación u organización).

1.  Completa todos los campos de métrica obligatorios.
2.  Haz clic en **Siguiente** para continuar.

---

## Paso 2 — Datos del informe

En el segundo paso, completa los siguientes campos:

- **Nombre del informe** *(obligatorio)* — Un nombre para identificar este informe.
- **Recopilado desde** *(opcional)* — El inicio del rango de fechas para los datos incluidos en el informe.
- **Recopilado hasta** *(opcional)* — El final del rango de fechas.

El rango de fechas es opcional. Si se deja en blanco, el informe incluirá todos los datos disponibles para las métricas seleccionadas.

!!! tip "Esquemas sin métricas"
    Si el esquema de informe no utiliza métricas, verás directamente solo los campos del nombre del informe y el rango de fechas, sin un asistente por pasos.

---

## Guardar el informe

Haz clic en el botón **Guardar informe** (el botón circular flotante) para generar y guardar el informe.

- Si el informe se genera correctamente, aparecerá un mensaje de confirmación y volverás a la lista de informes.

!!! warning "Informes con IA"
    Algunos esquemas de informe utilizan IA para generar contenido. Crear un informe a partir de estos esquemas consume créditos de IA. El costo en créditos se muestra en la información sobre herramientas del botón de agregar antes de comenzar. Si tu cuenta no tiene suficientes créditos, aparecerá un mensaje y no se podrá crear el informe.