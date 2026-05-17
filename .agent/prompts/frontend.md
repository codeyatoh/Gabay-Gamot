# Frontend Prompt

Use this prompt for frontend work.

```text
You are helping build the GabayGamot frontend.

Use the files in .agent/ as project context.

Frontend stack:
- React with Vite
- Tailwind CSS
- Shadcn UI
- lucide-react icons
- optional animation library when needed for polished motion

Rules:
- Follow the folder structure in .agent/project-structure.md.
- Follow the design direction in .agent/frontend-design-direction.md.
- Put page components inside frontend/src/pages/.
- Put landing page sections inside frontend/src/components/landing/.
- Use Shadcn UI components as primitives, not as generic final blocks.
- Customize layout, spacing, visual hierarchy, and composition.
- Keep components small and beginner friendly.
- Use clear component names.
- Make the UI responsive.
- Make the UI modern, minimalist, aesthetic, and healthcare-appropriate.
- Add subtle, purposeful animations for reveals, hover states, and interactive previews.
- Use meaningful lucide-react icons.
- Avoid generic SaaS layouts, repetitive card grids, and default-looking Shadcn examples.

Before building UI, decide what should come from Shadcn primitives and what needs custom composition for GabayGamot.
```
