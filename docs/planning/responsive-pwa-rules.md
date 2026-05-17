# Responsive and PWA UI Rules

## Standing Rule

Every future frontend change must preserve the responsive and PWA-ready standards added during the responsive UI overhaul.

## Required Checks Before UI Changes

- Audit the affected component, parent layout, global CSS, Tailwind config, breakpoint behavior, overflow risk, and docs.
- Confirm the design works from 320px mobile through tablet, desktop, large desktop, and ultra-wide screens.
- Use Tailwind responsive prefixes intentionally: `sm:`, `md:`, `lg:`, `xl:`, and `2xl:`.
- Prefer `w-full`, `max-w-screen-*`, `section-shell`, responsive grids, flex wrapping, and `minmax(0,...)`.
- Avoid accidental horizontal scroll, especially from fixed/absolute positioning, negative offsets, and `w-screen`.

## Interaction Rules

- Touch targets must be at least 44px, usually `min-h-11 min-w-11`.
- Interactive elements should use `cursor-pointer`, `transition-all`, and `active:scale-95` unless there is a clear component-specific reason.
- Scrollbars stay visually hidden while scrolling remains enabled.

## PWA Rules

- Keep the viewport meta tag as `width=device-width, initial-scale=1.0, viewport-fit=cover`.
- Use safe-area utilities (`pt-safe`, `pb-safe`, `px-safe`) or `env(safe-area-inset-*)` for page edges.
- Keep root horizontal overflow protection in place.

## Auth Screen Rule

Auth screens should keep the approved centered card reference structure unless the user explicitly asks for a different layout.
