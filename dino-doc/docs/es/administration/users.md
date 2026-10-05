---
title: Usuarios
description: Gestiona las cuentas de usuario de Dino y los grupos de permisos desde un área de administración central.
---

# Usuarios

El área **Usuarios** es el centro principal para gestionar quién puede acceder a Dino y qué puede hacer. Da acceso a dos secciones de administración: **Usuarios** para cuentas individuales y **Grupos** para conjuntos de permisos que controlan el acceso a form, report y datos.

![Vista principal de la página Usuarios](../imgs/administration/users.png)

La página muestra un menú con un mosaico para cada sección. Haz clic en un mosaico para abrir esa sección.

## Secciones disponibles

### Usuarios

El mosaico **Usuarios** abre la página [Gestionar usuarios](users-list.md). Úsala para crear cuentas nuevas, revisar las existentes, actualizar los datos de los usuarios y desactivar las cuentas que ya no sean necesarias.

![Vista principal de la página Lista de usuarios](../imgs/administration/users-list.png)

### Grupos

El mosaico **Grupos** abre la página [Grupos](groups-list.md). Los grupos agrupan permisos para que puedas asignar los mismos derechos de acceso a varios usuarios a la vez. Usa esta sección para crear grupos y ajustar sus permisos. Los usuarios se asignan a los grupos desde el editor de cada usuario, en el campo **User Permission Groups**.

## Abrir una sección

1. Abre la página **Usuarios** desde la navegación principal.
2. Haz clic en el mosaico de la sección en la que quieras trabajar: **Usuarios** o **Grupos**.
3. Dino te lleva a la lista de esa sección, donde puedes trabajar con cuentas individuales o definiciones de grupos.

!!! tip "Empieza por los grupos"
    Si varias personas necesitan el mismo nivel de acceso, crea primero un grupo y luego asígnalo a cada una de ellas en el campo **User Permission Groups** del editor de usuario. Así los permisos se mantienen consistentes y te ahorras editar cada cuenta por separado.

!!! warning "Se requiere acceso de administrador"
    El área Usuarios solo es visible para los usuarios con el rol de Administrador. Si no puedes ver esta página, ponte en contacto con el administrador de tu sistema.

## Páginas relacionadas

*   [Gestionar usuarios](users-list.md): Crea, edita y gestiona cuentas de usuario individuales.
*   [Grupos](groups-list.md): Crea y gestiona grupos de permisos que controlan el acceso a form, report y datos.