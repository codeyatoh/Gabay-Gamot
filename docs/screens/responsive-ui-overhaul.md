# Responsive UI Overhaul

## Scope

This pass audits and improves the current frontend for mobile, tablet, desktop, large desktop, and ultra-wide rendering. It is focused on layout safety, touch targets, safe-area handling, scroll behavior, and responsive Tailwind structure.

## Audit Findings

- The viewport meta tag did not include `viewport-fit=cover`, so notched and standalone mobile displays had no safe-area signal.
- Global styles did not hide scrollbars across browsers while preserving scroll functionality.
- Root-level wrappers did not consistently prevent accidental horizontal overflow.
- Button, navigation, and tab primitives used 36px or 40px heights, below the 44px mobile touch target recommendation.
- The mobile navbar dropdown must align with the outer navbar pill while staying contained by the navbar's viewport padding.
- Footer links and social icons were visually small touch targets.
- Several sections used fixed max-width utilities and large static spacing without full breakpoint coverage.
- Auth pages matched the requested reference structure but needed safer small-screen padding and stacked fields at 320px.
- Technology marquee text and logo spacing needed more fluid sizing to reduce overflow risk.

## Changes Applied

- Added `viewport-fit=cover` to the viewport meta tag.
- Added global horizontal overflow protection to `html`, `body`, and `#root`.
- Added hidden scrollbar behavior for WebKit, Firefox, and legacy Microsoft engines while keeping scroll enabled.
- Added safe-area utility classes for top, bottom, and horizontal insets.
- Added `popover` tokens used by navigation menu primitives.
- Raised base touch targets for buttons, tabs, and navigation triggers to at least 44px.
- Added `cursor-pointer`, `transition-all`, and `active:scale-95` interaction feedback to core interactive primitives.
- Updated section shell sizing to use `max-w-screen-xl` and `2xl:max-w-screen-2xl`.
- Updated auth pages with responsive safe-area padding while preserving the provided centered card structure.
- Updated landing sections with responsive spacing, typography, grid collapse behavior, and contained media sizing.
- Updated navbar and footer to avoid viewport bleed and improve mobile touch interaction.
- Corrected mobile dropdown alignment so the menu panel matches the outer navbar pill edges instead of the inner content padding.

## Validation Targets

- 320px mobile portrait
- 390px mobile portrait
- 768px tablet
- 1024px desktop
- 1440px large desktop
- 2560px ultra-wide

## Notes

Firebase behavior is still intentionally not connected. These changes are visual and structural only.
