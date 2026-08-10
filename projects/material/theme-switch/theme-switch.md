The `@dino/material/theme-switch` module provides a segmented light/dark theme control.

The component renders two adjacent buttons (light and dark) and highlights the active one.
It reads and writes the theme through `ThemeService`, so it stays in sync with any other
place that changes the theme (such as the User Area dialog).
