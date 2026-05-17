# Frontend Design Direction

## Design Goal

GabayGamot should feel modern, minimalist, trustworthy, and intentionally designed for healthcare operations.

The UI should not feel like a generic SaaS template. Shadcn UI is the component foundation, but the final layout, spacing, motion, section composition, and visual hierarchy should feel custom to GabayGamot.

## Visual Personality

- Minimalist and modern
- Clean healthcare aesthetic
- Calm, reliable, and professional
- Soft but not childish
- Operational, dashboard-ready, and practical
- Light interface with controlled color accents
- Aesthetic without being decorative-heavy

## Color Direction & Material

Use a restrained, highly readable palette:

- base: soft cream/white (`#fcfdfa`, `slate-50`), off-white, zinc, or neutral.
- primary accent: deep medical green (`#0b6b35`, `#083f24`) or teal.
- secondary accent: soft blue or cyan.
- alert/support accents: amber, red, and emerald only when meaningful.

Materials & Backgrounds:
- **NO Heavy Glassmorphism:** Never use extreme blurs (e.g., `bg-white/50 backdrop-blur-xl`) if it causes text underneath to bleed through and clash with the foreground text.
- Use near-opaque or solid backgrounds (`bg-white/95 backdrop-blur-md` or `bg-[#fcfdfa]`) for menus, overlays, and floating cards to guarantee 100% text readability.

Avoid:

- loud gradients everywhere
- overly saturated green
- one-note all-green layouts
- heavy purple/blue SaaS gradients
- dark mode as the default landing page style
- messy overlapping transparencies

## Shadcn UI Usage

Use Shadcn UI as building blocks, not as final design blocks.

Good use:

- `Button` for CTAs
- `Card` for compact feature items
- `Badge` for status labels
- `Tabs` for role-based previews
- `Table` for future dashboard data
- `Dialog` for future forms or confirmations
- `Alert` for stock warnings or expiry notices

Avoid:

- stacking many default Shadcn cards without custom layout
- using generic dashboard templates without adapting them
- making every section look like a card grid
- relying on default spacing and default examples

## Layout Rules

- Use generous whitespace, but keep sections useful and information-rich.
- Prefer full-width sections with constrained inner content.
- Avoid nested cards.
- Avoid oversized empty hero sections.
- Keep content scannable and focused.
- Use asymmetry lightly to make the layout feel custom.
- Use dashboard-inspired visuals such as inventory panels, stock status, referral previews, and scanning states.

## Animation Direction

Animations should feel smooth, subtle, and purposeful.

Use animation for:

- hero entrance
- section reveal on scroll
- feature card hover states
- active tab transitions
- dashboard preview micro-interactions
- status changes like stock low, expiring soon, referral created

Avoid:

- bouncing effects
- excessive delays
- random floating decorations
- animation that makes the page feel slow
- motion that distracts from the content

Preferred feel:

- fade + slight vertical movement
- smooth scale on hover
- soft staggered reveals
- subtle animated status indicators
- calm transitions under 300ms for interactions
- section reveals around 500ms to 700ms

## Landing Page Visual Ideas

The landing page should include at least one custom product-style visual, such as:

- medicine inventory dashboard preview
- OCR scan card preview
- nearby barangay referral flow
- expiry alert panel
- dispensing log preview
- AI recommendation insight card

These visuals can be built using Tailwind and Shadcn primitives instead of screenshots.

## Typography

- Use clear, readable typography.
- Keep headings confident and direct.
- Avoid overly large text inside compact UI panels.
- Do not use negative letter spacing.
- Keep paragraph widths readable.

## Icons

Use `lucide-react` icons when helpful.

Good icon choices:

- `ScanLine`
- `Pill`
- `Boxes`
- `MapPin`
- `FileText`
- `Bell`
- `Activity`
- `Brain`
- `ShieldCheck`

Icons should support meaning, not decorate randomly.

