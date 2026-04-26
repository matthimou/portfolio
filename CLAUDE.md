# Portfolio Project Instructions

## Design Context

### Users
**Primary audience:** Hiring managers conducting deep research on design leadership candidates. They're evaluating not just skills, but leadership philosophy, strategic thinking, and cultural fit. They'll spend time reading case studies in full, looking for evidence of impact and decision-making quality.

**Context:** Likely viewing on desktop during work hours, potentially comparing against other candidates. They want to understand how you think, not just what you've shipped.

### Brand Personality
**Three words:** Refined, thoughtful, measured

**Voice:** Confident without being boastful. Shows rather than tells. Every design decision should feel intentional and earned, not decorative. The portfolio should demonstrate the same craft and care that would be expected in your actual design work.

**Emotional goal:** Trust and respect. Visitors should leave feeling they've encountered a serious design leader who sweats the details.

### Aesthetic Direction
**Visual tone:** Warm professionalism. The terracotta accent brings warmth to what could otherwise feel clinical. The design should feel approachable but not casual, sophisticated but not cold.

**Theme:** Light mode primary, dark mode as considered alternative. Both fully supported.

**Typography:** Outfit (display) + Inter (body) — established and working well. The pairing balances personality with readability.

**Color:** Warm neutrals with terracotta accent. Avoid cool/tech blues, avoid trendy gradients.

**Anti-references:**
- Trendy Dribbble portfolios (flashy gradients, 3D blobs, over-designed for screenshots)
- Corporate/enterprise templates (stock photos, generic layouts, impersonal)

### Design Principles

1. **Substance over style** — Every visual choice should serve comprehension or reinforce brand, never decoration for its own sake. Case studies are the hero; let the work speak.

2. **Earned confidence** — Show expertise through craft quality, not through self-promotion. The portfolio's execution IS the credential.

3. **Respectful of time** — Hiring managers are busy. Information hierarchy should make scanning easy while rewarding deeper reading. Don't hide key information behind animations or interactions.

4. **Warm precision** — Balance the terracotta warmth with measured, intentional spacing and typography. Professional doesn't mean sterile.

5. **Accessible by default** — WCAG AA minimum. Good contrast, keyboard navigation, reduced motion support. Accessibility is a design skill, demonstrate it.

### Technical Foundation
- React 19 + Vite + React Router
- CSS modules with BEM naming
- CSS custom properties for theming
- No CSS-in-JS
- Spacing scale: 8, 16, 24, 40, 64, 80, 96px
- Type scale: 12, 14, 16, 18, 20, 24, 30, 36, 48px

## Git Commit Practices

Before committing, always verify all related changes are staged:

1. **Run `git status`** to see all modified files
2. **Review the list** — if a feature touches multiple files (e.g., adding a data property AND a filter that uses it), ensure ALL related files are staged
3. **Run `git diff --staged`** to confirm the staged changes are complete
4. **If changes span data + logic** (like adding `hiddenFromNav` to data AND filtering by it in a component), double-check both files are included

Common mistake to avoid: Committing data/config changes without the corresponding code that uses them.

## Navigation & Scroll Restoration

### Architecture
- **GoDeeper**: Passes `parentScrollY` when navigating from case study to sub-page
- **InlineLink**: Passes full chain context `{scrollY, referrerId, referrerTitle, parentScrollY}`
- **Back button**: Restores `restoreScrollY` from navigation state
- **ScrollToTop**: Skips reset when `restoreScrollY` exists in state

### When Editing Case Studies
- Sub-pages must have `parentId` set to their parent case study
- GoDeeper links pass the current scroll position automatically
- InlineLink (for sub-page to sub-page) preserves the entire navigation chain
- The back button label shows the referring page title dynamically

### State Variables
- `parentScrollY`: Scroll position of the root case study (preserved through all navigation)
- `scrollY`: Scroll position when leaving a page (used for back navigation between sub-pages)
- `restoreScrollY`: Target scroll position to restore on arrival
- `referrerId` / `referrerTitle`: Which sub-page linked here (for dynamic back label)

## gstack

Use the `/browse` skill from gstack for all web browsing. Never use `mcp__claude-in-chrome__*` tools.

**Available skills:** /office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review, /design-consultation, /design-shotgun, /design-html, /review, /ship, /land-and-deploy, /canary, /benchmark, /browse, /connect-chrome, /qa, /qa-only, /design-review, /setup-browser-cookies, /setup-deploy, /retro, /investigate, /document-release, /codex, /cso, /autoplan, /plan-devex-review, /devex-review, /careful, /freeze, /guard, /unfreeze, /gstack-upgrade, /learn
