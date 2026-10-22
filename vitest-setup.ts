/**
 * Browser APIs that jsdom does not implement and that the components under test use.
 * Loaded by the `test` targets of core, material and dinoapp (`setupFiles`).
 */

// A 2D context for <canvas>, which jsdom leaves to `null`: Chart.js draws on it.
import 'vitest-canvas-mock';

if (typeof window.matchMedia !== 'function') {
  // The CDK BreakpointObserver asks it about the screen size: no query matches.
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as MediaQueryList);
}

if (typeof globalThis.ResizeObserver !== 'function') {
  // Nothing is laid out in jsdom, so there is never a resize to report.
  globalThis.ResizeObserver = class {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  };
}
