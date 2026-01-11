# Plan: Modular Case Study System

## Overview
Refactor the case study system from a fixed section structure (problem → solution → features → impact) to a **modular, composable architecture** where each case study defines which modules it needs and in what order.

---

## Current vs. Proposed Architecture

### Current (Fixed Structure)
```javascript
{
  id: 'case-study',
  meta: {...},
  hero: {...},
  problem: {...},      // Always in this position
  solution: {...},     // Always follows problem
  features: [...],     // Always follows solution
  impact: {...}        // Always at the end
}
```

### Proposed (Modular Structure)
```javascript
{
  id: 'case-study',
  meta: {...},
  hero: {...},
  modules: [
    { type: 'body-copy', heading: 'The Challenge', content: '...' },
    { type: 'pain-points', items: [...] },
    { type: 'body-copy', heading: 'The Approach', content: '...' },
    { type: 'feature-highlights', features: [...] },
    { type: 'metrics', heading: 'Results', metrics: [...] },
    { type: 'testimonial', quote: '...', author: '...' }
  ]
}
```

---

## Identified Module Types

Based on analyzing your two case studies, here are the atomic module types to support:

| Module Type | Purpose | Key Props |
|-------------|---------|-----------|
| `body-copy` | Text block with optional heading | `heading?`, `content`, `contentSecondary?`, `contentTertiary?` |
| `callout` | Highlighted text block (opportunity, collaboration) | `label?`, `content`, `variant: 'info' | 'highlight'` |
| `pain-points` | Bulleted list with accent styling | `heading?`, `description?`, `items[]` |
| `image` | Single image with optional caption | `src`, `alt`, `caption?` |
| `media-gallery` | Grid of images | `heading?`, `description?`, `items[]`, `columns?: 2|3` |
| `video` | Auto-playing video with caption | `src`, `caption?`, `autoplay?: true` |
| `execution-phases` | Timeline of phases | `phases[]` with `name`, `description`, `duration?` |
| `feature-highlights` | Clickable card grid with lightbox | `features[]` with `title`, `description`, `thumbnail?`, `image?` |
| `metrics` | Stats display | `heading?`, `metrics[]` with `value`, `label`, `context?` |
| `testimonial` | Quote block | `quote`, `author`, `role?` |

---

## Implementation Plan

### Phase 1: Create Module Components
Create individual React components for each module type.

**New files to create:**
```
src/components/case-study/modules/
├── index.js              # Module registry/exports
├── BodyCopy.jsx          # Text blocks
├── Callout.jsx           # Highlighted callouts
├── PainPoints.jsx        # Bulleted lists
├── ImageBlock.jsx        # Single images
├── MediaGallery.jsx      # Image grids
├── VideoBlock.jsx        # Videos
├── ExecutionPhases.jsx   # Phase timelines
├── FeatureHighlights.jsx # Feature cards (extract from CaseStudyContent)
├── Metrics.jsx           # Stats (use existing CaseStudyMetrics)
├── Testimonial.jsx       # Quotes (use existing CaseStudyTestimonial)
└── modules.css           # Shared module styles
```

### Phase 2: Create Module Renderer
A component that maps module types to their components.

**File:** `src/components/case-study/ModuleRenderer.jsx`
```jsx
import { BodyCopy, Callout, PainPoints, ... } from './modules'

const MODULE_REGISTRY = {
  'body-copy': BodyCopy,
  'callout': Callout,
  'pain-points': PainPoints,
  'image': ImageBlock,
  'media-gallery': MediaGallery,
  'video': VideoBlock,
  'execution-phases': ExecutionPhases,
  'feature-highlights': FeatureHighlights,
  'metrics': Metrics,
  'testimonial': Testimonial,
}

const ModuleRenderer = ({ modules }) => (
  <div className="case-study-modules">
    {modules.map((module, index) => {
      const Component = MODULE_REGISTRY[module.type]
      if (!Component) return null
      return <Component key={index} {...module} />
    })}
  </div>
)
```

### Phase 3: Update CaseStudyContent
Modify to support both legacy format and new modular format.

**File:** `src/components/case-study/CaseStudyContent.jsx`
```jsx
const CaseStudyContent = ({ problem, solution, impact, features, modules }) => {
  // New modular format
  if (modules) {
    return <ModuleRenderer modules={modules} />
  }

  // Legacy format - keep existing rendering for backwards compatibility
  return (
    <div className="case-study-content">
      {/* existing problem/solution/features/impact rendering */}
    </div>
  )
}
```

### Phase 4: Migrate Existing Case Studies (Optional)
Convert existing case studies to the new format, or leave them using the legacy structure.

**Migration example - DoorDash Evidence:**
```javascript
{
  id: 'doordash-evidence',
  meta: { title: 'Contextual Store Evidence', client: 'DoorDash', timeline: '2025' },
  hero: { src: '/images/doordash-evidence-hero.png', ... },
  modules: [
    {
      type: 'body-copy',
      heading: 'The Challenge',
      content: 'Customers have trouble deciding...',
      contentSecondary: 'Over time DoorDash started to get cluttered...',
      contentTertiary: 'Design took the lead on this initiative...'
    },
    {
      type: 'pain-points',
      items: [
        'Too many options with no clear way to differentiate quality',
        'Lack of contextual information to support decision-making',
        ...
      ]
    },
    {
      type: 'callout',
      label: 'Opportunity',
      content: 'Surface contextual evidence and badges...'
    },
    {
      type: 'body-copy',
      heading: 'The Approach',
      content: 'Developed a systematic evidence ranking framework...'
    },
    {
      type: 'feature-highlights',
      features: [
        { id: 'dish-evidence', title: 'Broad Query Intelligence', ... },
        ...
      ]
    },
    {
      type: 'metrics',
      heading: 'The Framework',
      metrics: [
        { label: 'Evidence Types', value: '8+', context: 'Categories in ranking system' },
        ...
      ]
    }
  ]
}
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/case-study/modules/` | New directory with module components |
| `src/components/case-study/ModuleRenderer.jsx` | New file - module type → component mapper |
| `src/components/case-study/CaseStudyContent.jsx` | Add modules support with legacy fallback |
| `src/data/caseStudies.js` | Optionally migrate to new format |

---

## Benefits

1. **Flexibility** - Each case study picks exactly which modules it needs
2. **Reusability** - Modules work across all case studies
3. **Order independence** - Modules can appear in any sequence
4. **Easy extension** - Add new module types without touching existing code
5. **Backwards compatible** - Legacy format still works during migration
6. **Cleaner data** - Case studies become more declarative and readable

---

## Workflow After Implementation

When building a new case study:
```
"I need a body copy block for the challenge,
 then a pain points list,
 then a callout for the opportunity,
 then feature highlights,
 then metrics"

→ You provide the content
→ I assemble the modules array in caseStudies.js
```

---

## Verification

1. Run dev server: `npm run dev`
2. Test existing case studies still render correctly (legacy format)
3. Create a test case study using new modular format
4. Verify all module types render correctly
5. Test lightbox functionality in feature-highlights module
6. Check responsive behavior on mobile

---

## Design Decisions

1. **Migration strategy**: ✅ Migrate all existing case studies to the new modular format
2. **Module variants**: ✅ Add variant support for different visual treatments
3. **Lightbox behavior**: ✅ Per-module lightbox (each feature-highlights has its own)

---

## Variant Support

Modules will accept an optional `variant` prop for visual variations:

```javascript
// Body copy variants
{ type: 'body-copy', variant: 'lead', ... }     // Larger intro text
{ type: 'body-copy', variant: 'standard', ... } // Default paragraph

// Callout variants
{ type: 'callout', variant: 'info', ... }       // Subtle background
{ type: 'callout', variant: 'highlight', ... }  // Bold accent border

// Metrics variants
{ type: 'metrics', variant: 'grid', ... }       // Card grid layout
{ type: 'metrics', variant: 'inline', ... }     // Horizontal row
```

---

## Status: READY FOR APPROVAL
