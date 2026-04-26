/**
 * Case Studies Data
 * Add your flagship projects here following the Problem → Solution → Impact format
 */

import { leadershipCaseStudies } from './caseStudiesLeadership'
import { tightLeadershipCaseStudies } from './caseStudiesLeadershipTight'

export const caseStudies = [
  // Leadership variant case studies (concise, scannable in <5 minutes)
  {
    id: 'doordash-doubledash',
    variant: 'leadership',
    status: 'published',
    protected: true,
    hiddenFromNav: true,
    meta: {
      title: 'Doubledash',
      client: 'DoorDash',
      cardSummary: 'Grew from scrappy MVP to $1.7B revenue channel, transforming order tracking into a commerce platform.',
      timeline: '2022-2025',
      role: 'Director of Design, Core Consumer',
      team: null,
      impact: {
        heading: 'Impact',
        items: [
          'Grew from MVP → $1.7B revenue channel',
          'Transformed order tracking into a core platform surface',
          'Drove cross-vertical adoption + increased AOV'
        ],
        closing: 'Led E2E delivery experience design across multiple teams, shaping product strategy, team structure, and execution over a 3-year horizon.'
      }
    },
    hero: {
      src: '/images/doubledash-hero.png',
      video: null,
      alt: 'Doubledash multi-store shopping experience',
      caption: null,
      overlay: null
    },
    leadership: tightLeadershipCaseStudies['doordash-doubledash']
  },
  {
    id: 'doordash-metab',
    variant: 'leadership',
    status: 'published',
    protected: true,
    hiddenFromNav: true,
    meta: {
      title: 'Me Tab',
      client: 'DoorDash',
      cardSummary: 'Built a unified customer surface driving $2.1B annual GOV and 4% of marketplace orders.',
      timeline: '2024',
      role: 'Director of Design, Core Consumer',
      team: null,
      impact: {
        heading: 'Impact',
        items: [
          '4% of marketplace orders',
          '$2.1B annual GOV',
          '7 weeks to launch'
        ],
        closing: 'Built a unified customer surface to increase repeat behavior without compromising discovery.'
      }
    },
    hero: {
      src: '/images/metab-hero-yellow.png',
      video: null,
      alt: 'Me Tab experience',
      caption: null,
      overlay: null
    },
    leadership: leadershipCaseStudies['doordash-metab']
  },
  // Detail pages - sub-pages linked from leadership case studies
  {
    id: 'doordash-doubledash--governance',
    variant: 'detail',
    parentId: 'doordash-doubledash',
    status: 'published',
    protected: true,
    meta: {
      title: 'The Governance Framework',
      subtitle: 'How we protected order tracking while enabling commerce'
    },
    content: {
      sections: [
        {
          type: 'text',
          content: `As Doubledash scaled, the delivery tracking surface became increasingly contested. Multiple teams wanted to surface their features - commerce, occasions, messaging, referrals - and without a framework, the experience would degrade into noise.

I partnered with the Senior Director and PM for delivery tracking to establish a tiered priority system. The goal was simple: protect the core job of order tracking while creating structured space for commerce and other use cases.`
        },
        {
          type: 'text',
          heading: 'The Tiered Priority System',
          content: `We organized messaging and features into three tiers based on their relationship to the current order:

**Tier 1: Affects receiving the current order.** Grocery substitutions, delays, cancellations, messages from dashers. These always took priority.

**Tier 2: Enhances receiving the current order.** Adding something extra to the current order, fee refunds. Important but secondary to core tracking.

**Tier 3: Enhances a future order.** Occasions like Mother's Day, referrals, brand campaigns. Valuable but lowest priority on this surface.`
        },
        {
          type: 'callout',
          content: '**High-traffic surfaces degrade as teams add to them.** Protecting the experience from bloat is as critical as designing it well.'
        },
        {
          type: 'text',
          heading: 'Impression Weighting',
          content: `Priority alone wasn't enough. There were too many competing priorities for a simple stack-ranked system. Instead, we built an impression-weighted system that ensured everything got appropriate visibility.

Lower-priority messages were personalized and impression-capped. This meant the right units were shown to the right customer at the right time, without overwhelming the experience or degrading the core tracking job.`
        },
        {
          type: 'text',
          heading: 'The Forum',
          content: `As more teams built on the surface, we evolved guidelines into a comprehensive framework with a regular review forum. Teams would propose new features or placements, and we'd evaluate them against the tier system.

This governance model became the template for how other high-traffic surfaces at DoorDash were managed. It enabled us to scale commerce without compromising the reliability customers depended on.

The image below shows how we documented the system. Module types, ownership, tier definitions, configuration rules, and visual specs that teams could reference when building on the surface.`
        },
        {
          type: 'image',
          src: '/images/delivery-surface-guidelines.png',
          alt: 'Delivery surface guidelines framework',
          caption: 'Delivery Surface Guidelines',
          small: true
        }
      ]
    }
  },
  {
    id: 'doordash-doubledash--experiment-story',
    variant: 'detail',
    parentId: 'doordash-doubledash',
    status: 'published',
    protected: true,
    meta: {
      title: 'The Store Page Experiments',
      subtitle: 'What we learned in testing'
    },
    content: {
      sections: [
        {
          type: 'text',
          content: `Over 8 weeks of twice-weekly working sessions, we iterated on approaches to surface Doubledash earlier in the shopping flow. These sessions produced three distinct experiments to test.`
        },
        {
          type: 'text',
          heading: 'The Experiments',
          content: `**Inline Bundling:** Embedded cross-merchant options directly in the store experience. Nearby stores would appear based on which store page customers visited, with a dedicated store page tab system.

**Item-Level Pairing:** Contextual pairing menus that suggested complementary items from other merchants.

**Contextual Bottom Sheet:** A bottom sheet surfaced in-flow, showing bundling opportunities at key moments in the shopping journey.`
        },
        {
          type: 'media-row',
          items: [
            {
              type: 'image',
              src: '/images/S4Efailure.jpg',
              alt: 'Inline bundling high funnel experiment',
              caption: 'Inline Bundling',
              myTake: "I raised concerns early that tab patterns historically underperform because customers rarely switch from defaults. But leadership was invested, so I focused on ensuring we had clear success criteria and a rollback plan before launch."
            },
            {
              type: 'video',
              src: '/images/PairingmenuFailure.mp4',
              poster: '/images/PairingmenuFailure-poster.jpg',
              alt: 'Item-level pairing experiment',
              caption: 'Item-Level Pairing',
              myTake: "I disagreed with the approach but recognized the value in letting data resolve the debate. I negotiated a limited rollout to manage risk. Testing in two markets meant we could learn fast without broad exposure if it failed."
            },
            {
              type: 'video',
              src: '/images/BottomSheetOnStoreFailure.mp4',
              poster: '/images/BottomSheetOnStoreFailure-poster.jpg',
              alt: 'Contextual bottom sheet in-flow experiment',
              caption: 'Bottom Sheet',
              myTake: "This leveraged existing patterns which made it attractive to eng, but I advocated against it. Interrupting the primary flow to boost a secondary behavior rarely works. The data confirmed this, and I used it to build the case for our eventual shift to behavior-aligned surfaces."
            }
          ]
        },
        {
          type: 'callout',
          content: 'The most effective growth comes from amplifying existing behaviors, not interrupting them in the service of visibility.'
        }
      ]
    }
  },
  {
    id: 'doordash-doubledash--mvp',
    variant: 'detail',
    parentId: 'doordash-doubledash',
    status: 'published',
    protected: true,
    meta: {
      title: 'The Scrappy MVP',
      subtitle: 'How we validated bundling demand before building the platform'
    },
    content: {
      sections: [
        {
          type: 'text',
          content: `We launched the initial bundling tests with 7-Eleven because they were our data signal source and had a national footprint that let us test across markets quickly.

We tested two entry points: pre-checkout (cart) and post-purchase (order tracking). The goal was to identify where bundling behavior naturally occurred.`
        },
        {
          type: 'media-row',
          items: [
            {
              type: 'image',
              src: '/images/DoubledashMVP01.png',
              alt: 'Doubledash MVP cart placement',
              caption: 'Cart Entry Point'
            },
            {
              type: 'image',
              src: '/images/DoubleDashMVP02.png',
              alt: 'Doubledash MVP order tracking placement',
              caption: 'Order Tracking Entry Point'
            }
          ]
        },
        {
          type: 'text',
          heading: 'The Shopping Experience',
          content: `Once customers opted in, they could browse nearby stores and add items to their delivery. The experience was intentionally minimal—we prioritized learning over polish.`
        },
        {
          type: 'media-row',
          items: [
            {
              type: 'image',
              src: '/images/DoubleDashMVPStoreFlow01.png',
              alt: 'MVP Shopping Experience step 1',
              caption: 'Browse Stores'
            },
            {
              type: 'image',
              src: '/images/DoubleDashMVPStoreFlow02.png',
              alt: 'MVP Shopping Experience step 2',
              caption: 'Select Items'
            },
            {
              type: 'image',
              src: '/images/DoubleDashMVPStoreFlow03.png',
              alt: 'MVP Shopping Experience step 3',
              caption: 'Review Cart'
            },
            {
              type: 'image',
              src: '/images/DoubleDashMVPStoreFlow04.png',
              alt: 'MVP Shopping Experience step 4',
              caption: 'Confirm Order'
            }
          ]
        },
        {
          type: 'text',
          heading: 'What We Learned',
          content: `Building the MVP revealed that the cart entry point required significant engineering work to fix friction issues. We focused ongoing investment on order tracking as the primary entry point—it had a faster path to validation and let us learn without blocking on infrastructure changes.`
        },
        {
          type: 'text',
          heading: 'Customer Concerns',
          content: `I partnered with research to ground each phase in customer signal. Customers exposed to the MVP were excited, but had concerns that fell into three categories:

**{{Selection}} (52%):** Low perceived relevance of merchant. Customers wanted to bundle from places they actually cared about, not just what was nearby.

**{{Affordability}} (25%):** Unclear and potentially high incremental cost. The pricing model wasn't transparent enough.

**{{Expectations}} (10%):** Lack of clarity on how multi-store delivery works. Customers worried about cold food or delays.`,
          inlinePopups: {
            'Selection': {
              content: '"I wanted something from 7-Eleven the first time I tried the feature, but the next time I didn\'t. I wished I could have gotten dessert from the awesome bakery next door though." — Julia W.'
            },
            'Affordability': {
              content: '"DoorDash is already expensive, I feel guilty adding a second location and more fees." — Sarah H.'
            },
            'Expectations': {
              content: '"I watched them pick up my pizza first, and wondered if the extra time it would take to deliver meant cold pizza?" — Gregory P.'
            }
          }
        },
        {
          type: 'callout',
          content: '**These insights shaped the foundation of the product.** They drove how we approached selection, pricing, and clarity in our first vision sprint.'
        }
      ]
    }
  },
  {
    id: 'doordash-doubledash--sprints',
    variant: 'detail',
    parentId: 'doordash-doubledash',
    status: 'published',
    protected: true,
    meta: {
      title: 'Vision Sprints Before Planning',
      subtitle: 'How design earned a seat at the strategy table'
    },
    content: {
      sections: [
        {
          type: 'text',
          content: `Traditional planning cycles often leave design reacting to decisions already made. I flipped this by establishing semi-annual vision sprints that ran ahead of each planning cycle.

The model was simple: before teams committed to roadmaps, we'd run a focused sprint to explore the problem space, prototype solutions, and build cross-functional alignment. By the time planning discussions started, we had validated concepts and stakeholder buy-in. Design wasn't pitching ideas, we were presenting direction.`
        },
        {
          type: 'callout',
          content: 'Sprint outputs fed directly into H1 and H2 plans, ensuring **design vision had organizational commitment** before execution began.'
        },
        {
          type: 'text',
          heading: 'The First Vision Sprint',
          content: `To illustrate how this worked, I'll walk through the first Doubledash vision sprint that established our foundational UX.

The sprint brief I wrote focused the team on four key problems identified in our MVP research: how customers would discover bundling, how we would set proper expectations, how we would support cross-merchant shopping, and how we would ensure order tracking was protected.`
        },
        {
          type: 'text',
          heading: 'The Key Insight',
          content: `We started with an interactive session mapping bundling mechanics with our engineering partners. This revealed a critical insight: after placing an order, customers had a ~10-minute window to add items, but the map provided little value until a dasher was assigned.

This meant we could transform the tracker from a passive status view into an active shopping surface without impacting the visibility of delivery tracking. The half-sheet pattern emerged from this insight, prominent for those who wanted to browse, ignorable for those who didn't.`
        },
        {
          type: 'image',
          src: '/images/DoubleDashDeliveryTimeline.png',
          alt: 'Doubledash delivery timeline diagram',
          caption: 'Bundled Delivery Mechanics'
        },
        {
          type: 'text',
          heading: 'High-Fidelity Prototypes',
          content: `By sprint end, we had high-fidelity prototypes that aligned stakeholders and set direction for planning. The half-sheet transformed order tracking into a lightweight shopping surface—prominent for those who wanted to browse, ignorable for those who didn't. It communicated how bundling worked and what fees to expect, with streamlined checkout that kept order tracking visible throughout.`
        },
        {
          type: 'media-row',
          items: [
            {
              type: 'video',
              src: '/images/Doubledash01.mp4',
              poster: '/images/Doubledash01-poster.jpg',
              alt: 'Doubledash experience on mobile',
              caption: 'Post-order Transition'
            },
            {
              type: 'video',
              src: '/images/Doubledash02.mp4',
              poster: '/images/Doubledash02-poster.jpg',
              alt: 'Doubledash half-sheet shopping experience',
              caption: 'Setting Expectations'
            },
            {
              type: 'video',
              src: '/images/Doubledash03.mp4',
              poster: '/images/Doubledash03-poster.jpg',
              alt: 'Doubledash integrated checkout experience',
              caption: 'Integrated Checkout'
            }
          ]
        },
        {
          type: 'text',
          heading: 'Validating with Customers',
          content: `After the sprint, our research partner tested the concepts. The response validated we were addressing the core concerns from our MVPs. Customers valued the {{increased selection}}, responded positively to the {{perceived savings}}, and found the experience {{easier to understand}}.`,
          inlinePopups: {
            'increased selection': {
              content: '"With multiple stores to choose from, I\'d be much more likely to try this." — Fuad M.'
            },
            'perceived savings': {
              content: '"I love that you\'re waiving the delivery fee. I\'m always looking for new ways to save." — Nia S.'
            },
            'easier to understand': {
              content: '"Breaking down how it works really helps. I wonder if I\'d even try it without this." — Jennifer F.'
            }
          }
        },
        {
          type: 'callout',
          content: 'Bringing cross-functional partners into the sprint led to a critical insight, and concept testing validated we were solving the key problems.'
        }
      ]
    }
  },
  {
    id: 'doordash-doubledash--evolution',
    variant: 'detail',
    parentId: 'doordash-doubledash',
    status: 'published',
    protected: true,
    meta: {
      title: 'Product Evolution',
      subtitle: 'From single-merchant MVP to multi-store commerce platform'
    },
    content: {
      sections: [
        {
          type: 'text',
          content: `Over three years, Doubledash evolved through distinct phases, each expanding capabilities while compounding business impact. What started as a single-merchant [[bundling MVP|doordash-doubledash--mvp]] grew into a full commerce platform within order tracking.`
        },
        {
          type: 'text',
          heading: 'Building the Foundation',
          content: `With customer validation from the MVP and cross-functional alignment around our high-fidelity prototypes from the [[vision sprint|doordash-doubledash--sprints]], I partnered with product and engineering to break the vision into incremental milestones, delivering value early while building toward a scalable end-state.`
        },
        {
          type: 'milestone-row',
          items: [
            {
              image: { src: '/images/OrderTrackerRedesign.png', alt: 'Order tracking interface redesign' },
              heading: 'Milestone 1 — Foundation',
              content: 'Redesigned order tracking information architecture. Established governance for the surface.'
            },
            {
              image: { src: '/images/Milestone2.png', alt: 'Milestone 2 bottom-sheet interface' },
              heading: 'Milestone 2 — Discovery',
              content: 'Launched bottom sheet with limited "popular items" to validate interest while engineering built inventory systems.'
            },
            {
              image: { src: '/images/Milestone3.png', alt: 'Milestone 3 integrated shopping journey' },
              heading: 'Milestone 3 — Full Experience',
              content: 'Expanded to complete multi-merchant shopping within order tracking.'
            }
          ]
        },
        {
          type: 'text',
          content: `Within 18 months, we scaled the full experience across platforms, delivering a consistent and cohesive shopping journey.`
        },
        {
          type: 'image',
          src: '/images/DoubleDashCrossPlatform.jpg',
          alt: 'Doubledash cross-platform experience',
          caption: 'Cross-platform Doubledash',
          clickable: true
        },
        {
          type: 'text',
          heading: 'Expanding Use Cases',
          content: `With [[governance|doordash-doubledash--governance]] in place, we expanded into contextual merchandising. Occasions like Mother's Day, "Did You Forget?" prompts, and category-specific experiences gave customers relevant bundling opportunities without interrupting their primary flow.`
        },
        {
          type: 'media-row',
          items: [
            { type: 'image', src: '/images/DbDOccasionPlatform.png', alt: 'Occasion-based merchandising', caption: 'Occasions' },
            { type: 'image', src: '/images/DbDDidYouForgetPlatform.png', alt: 'Did you forget feature', caption: 'Did You Forget?' },
            { type: 'image', src: '/images/DbDPackagesPlatform.png', alt: 'Package delivery', caption: 'Package Delivery' },
            { type: 'image', src: '/images/DbDAlcoholPlatform.png', alt: 'Alcohol delivery', caption: 'Alcohol' }
          ]
        },
        {
          type: 'text',
          heading: 'Unification',
          content: `I proposed unifying order tracking and Doubledash into a single interface, our most complex systems challenge. Separate modules had introduced architectural complexity; unifying them simplified the codebase, improved scalability, and allowed customers control over when to give the map view priority.

This work not only improved the product experience but established a more scalable technical and design foundation for future growth.`
        },
        {
          type: 'image',
          src: '/images/DbDSingleSheetPlatform.png',
          alt: 'Unified single sheet interface',
          caption: 'Unified Half Sheet',
          phoneMockup: true,
          clickable: true
        },
        {
          type: 'text',
          heading: 'Scaling the Platform',
          content: `After unification we continued to scale the platform: incremental ETAs per merchant so customers knew exactly when each store's items would arrive, a personalized "For You" feed that surfaced relevant merchants, and cross-merchant search to find items across stores.`
        },
        {
          type: 'media-row',
          items: [
            { type: 'image', src: '/images/DbDETAsPlatform.png', alt: 'Incremental ETAs', caption: 'Incremental ETAs' },
            { type: 'image', src: '/images/DbDforyouPlatform.png', alt: 'For You feed', caption: 'For You Feed' },
            { type: 'image', src: '/images/DbDSearchPlatform.png', alt: 'Cross-merchant search', caption: 'Search' }
          ]
        },
        {
          type: 'text',
          content: `Finally, we introduced contextual bundling for occasions, merchants on the map for location context, and full cross-merchant shopping in the cart, completing the transformation from utility to platform.`
        },
        {
          type: 'media-row',
          items: [
            { type: 'image', src: '/images/doubledash-mother-day.png', alt: 'Mothers Day promotion', caption: 'Mother\'s Day' },
            { type: 'image', src: '/images/doubledash-deserts.png', alt: 'Desserts promotion', caption: 'Desserts' },
            { type: 'image', src: '/images/dBdMerchantsInMapPlatform.jpg', alt: 'Merchants on map', caption: 'Merchants on Map' },
            { type: 'image', src: '/images/DbDinCartPlatform.png', alt: 'Doubledash in cart', caption: 'In Cart' }
          ]
        },
        {
          type: 'text',
          heading: 'Leading With Design',
          content: `I push teams to stay ahead of product capabilities, using design to define what's possible before engineering constraints set the boundary. The concepts below explored what the future could look like for Doubledash if we brought it to the home page.`
        },
        {
          type: 'media-row',
          constrain: true,
          caption: 'Discovery Concepts',
          items: [
            { type: 'image', src: '/images/Future01.png', alt: 'Future exploration concept 1' },
            { type: 'image', src: '/images/Future02.png', alt: 'Future exploration concept 2' },
            { type: 'image', src: '/images/Future03.png', alt: 'Future exploration concept 3' },
            { type: 'image', src: '/images/Future04.png', alt: 'Future exploration concept 4' }
          ]
        },
        {
          type: 'text',
          content: `This last concept envisions DoorDash as a natively multi-store shopping destination.`
        },
        {
          type: 'media-row',
          items: [
            { type: 'image', src: '/images/FutureCart.png', alt: 'Future cart concept', caption: 'Multi-store Cart' },
            { type: 'video', src: '/images/FutureDelivery.mp4', poster: '/images/FutureDelivery-poster.jpg', alt: 'Future delivery concept', caption: 'Multi-store Delivery' }
          ]
        },
        {
          type: 'callout',
          content: '**Teams that stay ahead of product don\'t just design experiences—they shape the roadmap.**'
        }
      ]
    }
  },
  // Tight leadership variants (for comparison testing)
  {
    id: 'doordash-doubledash-tight',
    variant: 'leadership',
    status: 'published',
    protected: true,
    hiddenFromNav: false,
    meta: {
      title: 'Doubledash',
      client: 'DoorDash',
      cardSummary: 'Grew from scrappy MVP to $1.7B revenue channel, transforming order tracking into a commerce platform.',
      timeline: '2022-2025',
      role: 'Director of Design, Core Consumer',
      team: null,
      impact: {
        heading: 'Impact',
        items: [
          'Grew from MVP → $1.7B revenue channel',
          'Transformed order tracking into a core platform surface',
          'Drove cross-vertical adoption + increased AOV'
        ],
        closing: 'Led E2E delivery experience design across multiple teams, shaping product strategy, team structure, and execution over a 3-year horizon.'
      }
    },
    hero: {
      src: '/images/doubledash-hero.png',
      video: null,
      alt: 'Doubledash multi-store shopping experience',
      caption: null,
      overlay: null
    },
    leadership: tightLeadershipCaseStudies['doordash-doubledash']
  },
  {
    id: 'doordash-metab-tight',
    variant: 'leadership',
    status: 'published',
    protected: true,
    hiddenFromNav: false,
    meta: {
      title: 'Me Tab',
      client: 'DoorDash',
      cardSummary: 'Built a unified customer surface driving $2.1B annual GOV and 4% of marketplace orders.',
      timeline: '2024',
      role: 'Director of Design, Core Consumer',
      team: null,
      impact: {
        heading: 'Impact',
        items: [
          '4% of marketplace orders',
          '$2.1B annual GOV',
          '7 weeks to launch'
        ],
        closing: 'Built a unified customer surface to increase repeat behavior without compromising discovery.'
      }
    },
    hero: {
      src: '/images/metab-hero-yellow.png',
      video: null,
      alt: 'Me Tab experience',
      caption: null,
      overlay: null
    },
    leadership: tightLeadershipCaseStudies['doordash-metab']
  },
  // Detailed case studies (comprehensive, for deep-dive reading)
  {
    id: 'doordash-doubledash-detailed',
    status: 'draft',
    protected: true,
    meta: {
      title: 'Doubledash (Detailed)',
      client: 'DoorDash',
      cardSummary: 'Grew from scrappy MVP to $1.7B revenue channel, transforming order tracking into a commerce platform.',
      timeline: '2022-2025',
      role: 'Director of Design, Core Consumer',
      team: null,
      impact: {
        heading: 'Impact',
        items: [
          'Grew from MVP → $1.7B revenue channel',
          'Transformed order tracking into a core platform surface',
          'Drove cross-vertical adoption + increased AOV'
        ],
        closing: 'Led E2E delivery experience design across multiple teams, shaping product strategy, team structure, and execution over a 3-year horizon.'
      }
    },
    hero: {
      src: '/images/doubledash-hero.png',
      video: null,
      alt: 'Doubledash multi-store shopping experience',
      caption: null,
      overlay: null
    },
    introduction: {
      heading: '3 Years From Utility to Platform',
      microline: null,
      content: 'Doubledash grew from a scrappy MVP into a $1.7B revenue channel over 3 years. This case study traces that journey, from initial hypothesis through validated product-market fit to a mature platform, to show how I led key product and organizational decisions that transformed order tracking into a core surface platform.',
      keyHighlights: null,
      contentSecondary: null,
      introHighlights: [
        {
          heading: 'Why It Mattered',
          content: 'Shifted a functional tool to a primary engagement surface that drove cross-vertical adoption and increased revenue while protecting the primary job of order tracking.'
        }
      ],
      beforeAfterHeading: null,
      beforeAfterContent: 'The shift is most visible in how the experience evolved:',
      beforeAfterImages: [
        { src: '/images/DeliveryExperienceBefore.png', alt: 'Delivery experience before', label: 'Before', scale: 1.05 },
        { src: '/images/dBdMerchantsInMapPlatform.jpg', alt: 'Delivery experience after', label: 'After' }
      ],
      contentQuaternary: null,
      videoHeading: 'Doubledash: One delivery, multiple stores',
      closing: null,
      video: {
        src: '/images/doubledash-combos.mp4',
        poster: '/images/doubledash-combos-poster.jpg',
        caption: null
      },
      closingAfterVideo: `Doubledash enabled customers to order from multiple stores in one bundled delivery. This capability was critical to DoorDash's expansion beyond restaurants into new verticals.`,
      videoAfterClosing: null,
      closingFinalHeading: null,
      closingFinal: 'The New Verticals team noticed ~20% of customers were placing a second order within 10 minutes of their primary delivery. This revealed clear demand for bundling when there was significant friction. What would happen if we reduced it?',
      closingFinalBelowVideo: true,
      closingFinalSecondary: null,
      imageFinal: null,
      opportunity: `**DoorDash was evolving into a multi-vertical platform.**

Doubledash was a key lever in that strategy, enabling cross-vertical adoption while increasing order value through bundled delivery. I led the design effort to translate this signal into a platform post the MVP.`,
      opportunityCallout: true
    },
    problem: null,
    solution: {
      heading: 'The Approach',
      strategy: null,
      timeline: [
        {
          date: '3 Months',
          title: 'Validate bundling demand',
          description: 'Test MVPs across key surfaces to identify where bundling behavior naturally occurs',
          sectionHeading: 'Validating Bundling Demand',
          sectionContent: 'The initial tests to validate bundling demand launched with 7-Eleven because they were our data signal source and had a national footprint that let us test across markets quickly.',
          sectionContentSecondary: null,
          sectionImages: {
            images: [
              { src: '/images/DoubledashMVP01.png', alt: 'Doubledash MVP cart placement' },
              { src: '/images/DoubleDashMVP02.png', alt: 'Doubledash MVP order tracking placement' }
            ],
            label: 'MVP Entry Points',
            labelInfoContent: 'We tested two entry points for bundling: pre-checkout (cart) and post-purchase (order tracking).',
            small: true
          },
          sectionImageFlow: {
            images: [
              { src: '/images/DoubleDashMVPStoreFlow01.png', alt: 'MVP Shopping Experience step 1' },
              { src: '/images/DoubleDashMVPStoreFlow02.png', alt: 'MVP Shopping Experience step 2' },
              { src: '/images/DoubleDashMVPStoreFlow03.png', alt: 'MVP Shopping Experience step 3' },
              { src: '/images/DoubleDashMVPStoreFlow04.png', alt: 'MVP Shopping Experience step 4' }
            ],
            label: 'MVP Shopping Experience'
          },
          sectionContentAfterImageFlow: 'Building the MVP revealed friction with the option in the cart that would require significant engineering work and a longer timeline to fix. We focused ongoing investment on the order tracking experience as the primary entry point.',
          sectionHeadingAfterFlow: 'Foundations',
          sectionContentAfterFlow: 'I introduced a number of changes to how the team was operating to ensure the success of the product as we shifted from the MVP to building the foundations.',
          foundationsHighlight: {
            heading: 'My Leadership Contributions',
            items: [
              'Grounded decisions in customer insights',
              'Aligned success criteria and established planning rhythm',
              'Introduced cross-functional vision sprints ahead of planning',
              'Mentored designer to increase ownership and autonomy',
              'Collaborated with XFN leadership to sequence work',
              'Introduced governance to protect order tracking'
            ]
          },
          sectionContentAfterFlowSecondary: null,
          sectionContentAfterFlowTertiary: null,
          concerns: {
            heading: 'Grounding Decisions in Customer Insights',
            intro: 'I partnered with research to ground each phase in customer signal. Customers exposed to the MVP were excited, but had concerns that fell into three categories.',
            items: [
              {
                category: 'Selection',
                percentage: '52%',
                description: 'Low perceived relevance of merchant',
                quoteIcon: '/images/24/chat-default-line.png',
                quotePopup: {
                  quote: 'I wanted something from 7-Eleven the first time I tried the feature, but the next time I didn\'t. I wished I could have gotten dessert from the awesome bakery next door though.',
                  author: 'Julia W.'
                }
              },
              {
                category: 'Affordability',
                percentage: '25%',
                description: 'Unclear and potentially high incremental cost',
                quoteIcon: '/images/24/chat-default-line.png',
                quotePopup: {
                  quote: 'DoorDash is already expensive, I feel guilty adding a second location and more fees.',
                  author: 'Sarah H.'
                }
              },
              {
                category: 'Expectations',
                percentage: '10%',
                description: 'Lack of clarity on how multi-store delivery works',
                quoteIcon: '/images/24/chat-default-line.png',
                quotePopup: {
                  quote: 'I watched them pick up my pizza first, and wondered if the extra time it would take to deliver meant cold pizza?',
                  author: 'Gregory P.'
                }
              }
            ]
          },
          concernsLearnings: null,
          customerQuotes: [],
          sectionClosing: 'These insights shaped the foundation of the product. They drove how we approached selection, pricing, and clarity in our first vision sprint.'
        },
        {
          date: '1.5 Years',
          title: 'Build the multi-merchant foundation',
          description: 'Develop the systems, UX patterns, and infrastructure required for cross-store ordering',
          sectionContent: null,
          successMetrics: {
            heading: 'Aligning Metrics & Establishing Planning Rhythm',
            intro: 'Where our initial phase focused on learning fast, we now shifted to defining the success metrics that would measure our impact as the product matured.',
            items: [
              {
                type: 'Primary Metric',
                title: 'GMV (Total Sales Value)',
                description: 'Ensured we were growing the overall marketplace'
              },
              {
                type: 'Secondary Metric',
                title: 'Conversion',
                description: 'Measured how effectively the experience drove adoption'
              },
              {
                type: 'Secondary Metric',
                title: 'New Vertical Trials',
                description: 'Captured whether bundling increased New Verticals trials'
              }
            ]
          },
          sectionContentAfterMetrics: 'These metrics became the decision framework for prioritization, guiding where we invested, what we scaled, and what we deprioritized.',
          sectionHeadingSecondary: null,
          sectionImageSecondary: {
            src: '/images/PlanningCycleTransparent.png',
            alt: 'Planning cycle diagram'
          },
          sectionContentTertiary: 'I established a semi-annual planning model with cross-functional vision sprints ahead of each cycle. Sprint outputs fed directly into H1 and H2 plans, ensuring design vision had organizational commitment before execution began.',
          sectionContentAfterPlanning: null,
          planningHighlight: {
            heading: 'Establishing the Planning Rhythm',
            content: 'This structure enabled design to directly shape product strategy - bringing fully prototyped ideas into planning and securing cross-functional alignment before roadmap commitments.'
          },
          sectionHeadingCrossOrg: 'Introducing Governance',
          sectionContentCrossOrg: 'As we moved toward scaling, I partnered with the Senior Director and PM for delivery tracking to establish a tiered priority system that protected order tracking while creating space for commerce.',
          priorityTiers: [
            {
              tier: 1,
              title: 'Messaging that affects receiving the current order',
              examples: 'Grocery substitutions, delays, cancellations, messages from dashers'
            },
            {
              tier: 2,
              title: 'Messaging that enhances receiving the current order',
              examples: 'Adding something extra to the current order, fee refunds'
            },
            {
              tier: 3,
              title: 'Messaging that enhances a future order',
              examples: 'Occasions like Mother\'s Day, referrals, brand campaigns'
            }
          ],
          sectionContentAfterTiers: {
            text: 'Messaging units in all tiers were ranked using {{impression weighting}} to resolve competition and ensure order tracking remained the priority. This framework became the foundation for the governance model we later expanded.',
            inlinePopups: {
              'impression weighting': {
                content: 'There were too many competing priorities for messaging to be a simple stack ranked priority system, so instead we built a system that ensured everything got some visibility by personalizing and impression-capping lower priority messages to ensure the right units were shown to the right customer at the right time.'
              }
            }
          },
          governanceHighlight: {
            heading: 'Why Governance Matters',
            content: 'High-traffic surfaces degrade as teams add to them. Protecting the experience from bloat is as critical as designing it well.'
          },
          sectionContentTeamBuilding: null,
          sectionHeadingTertiary: 'Introducing Cross-Functional Sprints',
          sectionContentQuaternary: 'I used cross-functional vision sprints to align teams before each planning cycle. To illustrate how this worked in practice, I\'ll walk through the key insight from the first vision sprint that established our foundational UX.',
          visionQuestions: null,
          sectionHeadingFirstSprint: null,
          sectionContentQuaternarySecondary: null,
          sprintBriefHighlight: {
            heading: 'Sprint Focus',
            intro: 'The sprint brief I wrote ensured the team focused on a tight scope of key problems identified in our research.',
            items: [
              'How customers would discover bundling',
              'How we would set proper expectations',
              'How we would support cross-merchant shopping',
              'How we would ensure order tracking was protected'
            ]
          },
          sectionContentAfterBrief: 'We started the sprint with an interactive session where we mapped the bundling mechanics with our engineering partners to reveal hidden opportunities that led to the key insight.',
          sectionContentAfterVision: null,
          sectionImageAfterVision: {
            src: '/images/DoubleDashDeliveryTimeline.png',
            alt: 'Doubledash delivery timeline diagram',
            label: 'Bundled Delivery Mechanics'
          },
          sectionHeadingAfterTimeline: null,
          sectionContentAfterTimeline: `After placing an order, customers had a 10-minute window to add items, but the map provided little value until a dasher was assigned. This insight meant we could transform the tracker from passive status view into an active shopping surface without impacting delivery tracking.`,
          sectionImageMapInsight: {
            src: '/images/DoorDashMapoInsight.png',
            alt: 'Map insight showing limited utility during early delivery stage'
          },
          sectionContentBeforeVideo: 'This insight became the foundation for a new shopping experience. By sprint end, we had high-fidelity prototypes that aligned stakeholders and set direction for planning.',
          phoneVideosRowHeading: 'High-Fidelity Prototypes',
          phoneVideosRowInfoContent: 'The half-sheet transformed order tracking into a lightweight shopping surface.\n\nProminent for those who wanted to browse, ignorable for those who didn\'t.\n\nIt communicated how bundling worked and what fees to expect, with streamlined checkout that kept order tracking visible throughout.',
          phoneVideosRow: [
            {
              video: '/images/Doubledash01.mp4',
              poster: '/images/Doubledash01-poster.jpg',
              alt: 'Doubledash experience on mobile',
              caption: 'Post-order Transition'
            },
            {
              video: '/images/Doubledash02.mp4',
              poster: '/images/Doubledash02-poster.jpg',
              alt: 'Doubledash half-sheet shopping experience',
              caption: 'Setting Expectations'
            },
            {
              video: '/images/Doubledash03.mp4',
              poster: '/images/Doubledash03-poster.jpg',
              alt: 'Doubledash integrated checkout experience',
              caption: 'Integrated Checkout'
            }
          ],
          phoneVideo: null,
          sectionContentAfterVideo: 'This pattern became the foundation for how we scaled cross-merchant shopping.',
          sprintInsightHighlight: null,
          phoneVideoSecondary: null,
          sectionContentAfterVideoSecondary: null,
          phoneVideoTertiary: null,
          sectionContentAfterVideoTertiary: null,
          sectionHeadingQuaternary: null,
          sectionContentQuinary: {
            text: 'Our research partner tested the concepts. The response validated that we were addressing core concerns from our MVPs. Customers valued the {{increased selection}}, responded positively to the {{perceived savings}}, and found the experience {{easier to understand}}.',
            inlinePopups: {
              'increased selection': {
                category: 'Selection',
                quote: 'With multiple stores to choose from, I\'d be much more likely to try this.',
                author: 'Fuad M.'
              },
              'perceived savings': {
                category: 'Affordability',
                quote: 'I love that you\'re waiving the delivery fee. I\'m always looking for new ways to save.',
                author: 'Nia S.'
              },
              'easier to understand': {
                category: 'Expectations',
                quote: 'Breaking down how it works really helps. I wonder if I\'d even try it without this.',
                author: 'Jennifer F.'
              }
            }
          },
          customerQuotesSecondary: [],
          conceptTestingHighlight: {
            heading: 'Cross-function Sprints',
            content: 'Bringing cross-functional partners into the sprint led to a critical insight, and concept testing validated we were solving the key problems.'
          },
          sectionHeadingScoping: 'Sequencing',
          sectionContentScoping: 'With customer validation and cross-functional alignment, I partnered with product and engineering to break the vision into incremental milestones - delivering value early while building toward a scalable end-state.',
          sectionHeadingMilestone1: 'Milestone 1 — Foundation',
          sectionContentMilestone1: 'Redesigned order tracking information architecture. Established governance for the surface.',
          sectionImageMilestone1: {
            src: '/images/OrderTrackerRedesign.png',
            alt: 'Order tracking interface redesign'
          },
          sectionHeadingMilestone2: 'Milestone 2 — Discovery',
          sectionImageMilestone2: {
            src: '/images/Milestone2.png',
            alt: 'Milestone 2 bottom-sheet interface'
          },
          sectionContentMilestone2: 'Launched bottom sheet with limited "popular items" to validate interest while engineering built inventory systems.',
          sectionHeadingMilestone3: 'Milestone 3 — Full experience',
          sectionImageMilestone3: {
            src: '/images/Milestone3.png',
            alt: 'Milestone 3 integrated shopping journey'
          },
          sectionContentMilestone3: 'Expanded to complete multi-merchant shopping within order tracking.',
          sectionContentAfterMilestones: 'Within 18 months, we scaled the full experience across platforms, delivering a consistent and cohesive shopping journey.',
          sectionContentCrossPlatform: null,
          sectionImageCrossPlatform: {
            src: '/images/DoubleDashCrossPlatform.jpg',
            alt: 'Doubledash cross-platform experience',
            caption: 'Cross Platform Doubledash'
          },
          sectionHeadingImpact: 'Impact',
          sectionContentImpact: {
            text: 'This phased approach drove {{meaningful impact}} across key business and customer metrics:',
            inlinePopups: {
              'meaningful impact': {
                content: 'These results validated that integrating shopping into the delivery experience increased engagement, drove incremental revenue, and expanded customer behavior beyond core ordering.'
              }
            }
          },
          impactImage: {
            src: '/images/ImpactPhase2.png',
            alt: 'Impact Phase 2'
          },
          impactMetrics: [
            { value: '+35%', label: 'increase in conversion' },
            { value: '+400%', label: 'increase in customers browsing items and stores' },
            { value: '+20%', label: 'lift in new vertical trials' }
          ],
          sectionContentAfterImpactMetrics: null,
          myContributions: null
        },
        {
          date: '1.5 Years',
          title: 'Scale cross-vertical behavior',
          description: 'Evolve the experience into a habitual, high-frequency engagement surface'
        }
      ],
      execution: [
        // Optional execution phases:
        // { phase: 'Phase Name', description: 'Description', duration: 'X weeks' }
      ],
      collaboration: null, // Optional collaboration note
      mediaHeading: null, // Optional: 'Design Vision' or similar
      mediaDescription: null, // Optional description for media section
      media: [
        // Optional media gallery:
        // { src: '/images/...', alt: '...', caption: '...' }
      ],
      mediaFooterHeading: null, // Optional footer section heading
      mediaFooterDescription: null, // Optional footer description
      mediaFooterDescriptionSecondary: null, // Optional second paragraph
      mediaFooterMedia: null, // Optional: { src: '/images/...', caption: '...' }
      video: null // Optional: { src: '/images/...mp4', caption: '...' }
    },
    features: [
      // Optional feature highlights:
      // {
      //   id: 'feature-1',
      //   title: 'Feature Title',
      //   description: 'Feature description',
      //   thumbnail: '/images/feature-thumb.png',
      //   image: '/images/feature-full.png',
      //   details: 'Additional details shown in lightbox'
      // }
    ],
    impact: {
      fullBleedImage: {
        src: '/images/fullbleed-platform.png',
        alt: 'Platform phase overview'
      },
      heading: 'Platform',
      headingAccent: true,
      metrics: [],
      narrative: `As the product matured, the challenge shifted from proving the concept to scaling it, making cross-merchant shopping a habit rather than a novelty.`,
      scalingMyselfHighlight: {
        heading: 'Scaling Myself',
        content: 'Through mentoring and promotion I was able to delegate more to my designer, freeing myself to focus on strategy, team scaling, and alignment.'
      },
      platformImagesHeading: 'Scaling the Platform',
      platformImagesInfoContent: 'As the team grew to 3 PMs and 15 engineers, more of my time shifted toward resolving cross-team prioritization and scaling the team.\n\nTo prioritize across 3 sub-teams and PMs I worked with their skip-level, the Senior Director of consumer product to resolve conflicts.\n\nI scaled the team by promoting a senior designer into Staff, and transitioning ownership of key activities like sprint planning.',
      platformImages: [
        { src: '/images/DbDOccasionPlatform.png', alt: 'Occasion-based merchandising', label: 'Occasions' },
        { src: '/images/DbDDidYouForgetPlatform.png', alt: 'Did you forget feature', label: 'Did You Forget?' },
        { src: '/images/DbDPackagesPlatform.png', alt: 'Package delivery', label: 'Package Delivery' },
        { src: '/images/DbDAlcoholPlatform.png', alt: 'Alcohol delivery', label: 'Alcohol' }
      ],
      headingAfterImages: 'Driving Feature Direction & Raising Quality Bars',
      narrativeAfterImages: 'One product feature I proposed during this phase was unifying order tracking and Doubledash into a single interface, our most complex systems challenge.\n\nTo execute, I hired a Principal Designer with deep systems expertise to lead the effort and expand team capacity. This work not only improved the product experience but established a more scalable technical and design foundation for future growth.',
      imageAfterFirstParaHeading: 'Unification',
      imageAfterFirstParaInfoContent: 'Separate modules had introduced architectural complexity; unifying them simplified the codebase, improved scalability, and allowed customers control over when to give the map view priority.',
      imageAfterFirstPara: {
        src: '/images/DbDSingleSheetPlatform.png',
        alt: 'Unified single sheet interface',
        small: true
      },
      narrativeAfterCombinedUI: 'As more teams built on the surface, we evolved guidelines into a comprehensive framework with a regular review forum to evaluate proposals and ensure consistency, enabling us to scale the surface without degrading the core experience.',
      imageAfterNarrative: {
        src: '/images/delivery-surface-guidelines.png',
        alt: 'Delivery surface guidelines',
        label: 'Delivery Surface Guidelines',
        half: true
      },
      principalDesignerHighlight: {
        heading: 'Setting Direction and Raising Quality Bars',
        content: 'After proposing the new feature I expanded the team to take on even more ambitious work and added capacity to keep the quality bar high as we scaled to more use cases.'
      },
      headingExpandingUseCases: 'Scaling the Product to New Use Cases',
      narrativeExpandingUseCases: 'With governance in place, we expanded into new use cases: incremental ETAs per merchant, a personalized "For You" feed, and cross-merchant search. Each feature addition expanded capabilities while compounding business impact.',
      platformThreeUp: [
        { src: '/images/DbDETAsPlatform.png', alt: 'ETAs platform', label: 'Incremental ETAs' },
        { src: '/images/DbDforyouPlatform.png', alt: 'For You feed', label: 'For You Feed' },
        { src: '/images/DbDSearchPlatform.png', alt: 'Search', label: 'Search' }
      ],
      platformThreeUpSmall: true,
      narrativeFinal: 'We also introduced contextual bundling for occasions, merchants on the map for location context, and full cross-merchant shopping in the cart.',
      platformTwoUpThird: [
        { src: '/images/doubledash-mother-day.png', alt: 'Mothers Day promotion', label: 'Mothers Day' },
        { src: '/images/doubledash-deserts.png', alt: 'Deserts promotion', label: 'Deserts' },
        { src: '/images/dBdMerchantsInMapPlatform.jpg', alt: 'Merchants on map interface', label: 'Merchants on Map' },
        { src: '/images/DbDinCartPlatform.png', alt: 'Doubledash in cart', label: 'Doubledash In Cart' }
      ],
      scalingProductHighlight: {
        heading: 'Scaling the Product',
        content: 'A strong governance model and growing the team gave us the capacity to provide regular guidance and scale the product without compromising quality or coherence.'
      },
      lessonsHeading: 'Translating Failed Experiments',
      lessonsNarrative: 'Not all experiments worked. To increase Doubledash visibility, we embedded cross-merchant options in the store experience. Attach rate increased but cart spend dropped because it introduced friction in the core ordering flow.',
      lessonsMediaRow: [
        {
          type: 'image',
          src: '/images/S4Efailure.jpg',
          alt: 'Inline bundling high funnel experiment',
          caption: 'Inline Bundling (High Funnel)'
        },
        {
          type: 'video',
          src: '/images/PairingmenuFailure.mp4',
          poster: '/images/PairingmenuFailure-poster.jpg',
          alt: 'Item-level pairing experiment',
          caption: 'Item-Level Pairing'
        },
        {
          type: 'video',
          src: '/images/BottomSheetOnStoreFailure.mp4',
          poster: '/images/BottomSheetOnStoreFailure-poster.jpg',
          alt: 'Contextual bottom sheet in-flow experiment',
          caption: 'Contextual Bottom Sheet (In-Flow)'
        }
      ],
      lessonsImage: null,
      lessonsNarrativeAfterImage: `Our COO took particular interest in this effort. For 4 weeks we met twice weekly to workshop approaches with senior product directors. The technical constraints led to heavy UI treatments—nearby stores changed based on which store page customers visited, and a tab system replaced natural scrolling.

Results were mixed: attach rate increased, but cart spend dropped. We rolled it back.

A separate experiment tested item-level pairing menus. I felt it lacked prominence, but the PM pushed to test. We agreed to limit blast radius by launching in only two markets. Testing can resolve disagreements efficiently when exposure is controlled.`,
      lessonsVideo: null,
      lessonsNarrativeAfterVideo: null,
      lessonsVideo02: null,
      lessonsNarrativeAfterVideo02: null,
      lessonsNarrativeConclusion: null,
      lessonsImageConclusion: null,
      lessonsKeyLearning: {
        heading: 'Key Learning',
        content: 'The most effective growth comes from amplifying existing behaviors, not interrupting them in the service of visibility.',
        infoContent: 'This insight directly informed our shift toward contextual, in-moment merchandising, integrating Doubledash where customers already had intent.'
      },
      lessonsNarrativeAfterHighlight: 'We expanded into contextual merchandising for occasions and personalized recommendations after these tests. This marked the transition from feature team to platform team.',
      impactHeading: 'Impact',
      impactNarrative: 'By shifting to an in-flow, behavior-aligned strategy, we were able to scale Doubledash effectively, driving meaningful results at each stage and compounding impact over time.',
      impactImage02: {
        src: '/images/Impact02.jpg',
        alt: 'Impact results'
      },
      impactMetrics02: [
        { value: '$1.7B', label: 'annual GMV by 2025' },
        { value: '8%', label: 'of total marketplace volume growth' },
        { value: '22%', label: 'increase in order volume for new verticals' }
      ],
      impactMyContributions: {
        heading: 'My Leadership Contributions',
        categories: [
          {
            title: null,
            items: [
              'Translating failed experiments into product strategy shifts',
              'Delegating ownership & scaling the team',
              'Driving feature direction and raising quality bars',
              'Scaling the product to new use cases',
              'Leading with design'
            ]
          },
          {
            title: 'Team Health',
            items: [
              'Promoting my Senior designer to Staff',
              'Hiring Doordash\'s first Principal designer'
            ]
          },
          {
            title: 'Managing Priorities',
            items: [
              'Delegating tasks to my team at the right time',
              'Work with skip-level leaders to manage priority conflicts across teams'
            ]
          },
          {
            title: 'Quality & Craft',
            items: [
              'Establish governance forum to get in front of problems early',
              'Providing teams guidelines and components to extend the surface'
            ]
          }
        ]
      },
      futureExplorationsHeading: 'Leading With Design',
      futureExplorationsNarrative: 'I push teams to stay ahead of product capabilities, using design to define what\'s possible before engineering constraints set the boundary. The concepts below explored what the future could look like for Doubledash if we brought it to the home page.',
      futureExplorationsImages: [
        { src: '/images/Future01.png', alt: 'Future exploration concept 1' },
        { src: '/images/Future02.png', alt: 'Future exploration concept 2' },
        { src: '/images/Future03.png', alt: 'Future exploration concept 3' },
        { src: '/images/Future04.png', alt: 'Future exploration concept 4' }
      ],
      futureExplorationsImagesLabel: 'Discovery Concepts',
      futureTwoUpNarrative: 'This last concept envisions Doordash as a natively multi-store shopping destination.',
      futureTwoUp: [
        { src: '/images/FutureCart.png', alt: 'Future cart concept', type: 'image', label: 'Multi-store Cart' },
        { src: '/images/FutureDelivery.mp4', poster: '/images/FutureDelivery-poster.jpg', alt: 'Future delivery concept', type: 'video', label: 'Multi-store Delivery' }
      ],
      leadingWithDesignHighlight: {
        heading: 'Leading with Design',
        content: 'Teams that stay ahead of the product don\'t just design experiences, they shape the roadmap.'
      },
      futureBeforeAfterHeading: null,
      futureBeforeAfterContent: null,
      futureBeforeAfterImages: null,
      businessImpact: null,
      testimonial: null
    }
  },
  {
    id: 'doordash-metab-detailed',
    status: 'draft',
    protected: true,
    hiddenFromNav: false,
    meta: {
      title: 'Me Tab (Detailed)',
      client: 'DoorDash',
      cardSummary: 'Built a unified customer surface driving $2.1B annual GOV and 4% of marketplace orders.',
      timeline: '2024',
      role: 'Director of Design, Core Consumer',
      team: null,
      impact: {
        heading: 'Impact',
        items: [
          '4% of marketplace orders',
          '$2.1B annual GOV',
          '7 weeks to launch'
        ],
        closing: 'Built a unified customer surface to increase repeat behavior without compromising discovery.'
      }
    },
    hero: {
      src: '/images/metab-hero-yellow.png',
      video: null,
      alt: 'Me Tab experience',
      caption: null,
      overlay: null
    },
    introduction: {
      heading: 'The Problem',
      content: null,
      keyHighlights: null,
      contentSecondary: `Customers had no single place to understand their relationship with DoorDash:

• Reordering, loyalty, and account were fragmented

• Teams optimized for different metrics

• No shared system for identity

We reframed the problem: not a reorder feature, but a unified customer layer.`,
      contentQuaternary: null,
      videoHeading: null,
      closing: null,
      video: null,
      closingAfterVideo: null,
      videoAfterClosing: null,
      closingFinalHeading: 'The Tension',
      closingFinal: `Discovery vs. Repeat Behavior

• The Home page drove ~50% of orders

• A significant portion came from reorders

• Reorder modules were ranked and unpredictable

• But new merchant discovery was becoming the strategic priority

The home page team needed to shift impressions from ordering at the same store (reorder) to trialing new merchants. The proposed solution was to move reorders off the home page by creating a dedicated surface. But this raised a bigger question: **Where should customers go to manage everything about them?**`,
      closingFinalBelowVideo: true,
      closingFinalImage: {
        images: [
          { src: '/images/metab-business-context-01.jpg', alt: 'Reorder modules ranked' },
          { src: '/images/metab-business-context-02.jpg', alt: 'Unpredictable placement' }
        ],
        label: 'Reorder modules on Home lacked predictable placement'
      },
      closingFinalImageInline: true,
      closingFinalSecondary: null,
      imageFinal: null,
      opportunity: null,
      opportunityCallout: false
    },
    problem: null,
    solution: {
      heading: 'The Approach',
      strategy: null,
      neutralHeadings: true,
      timeline: [
        {
          date: null,
          title: null,
          description: null,
          sectionHeading: 'Auditing the Existing Experience',
          sectionContent: 'To ground the opportunity, I audited reorder behavior across the app to understand how customers were currently reordering. Reordering existed in logical places, but without a system. Usage data - 45% on Store Page, 35% on Home Page, 20% on Orders Tab.',
          sectionImagesThreeUp: [
            { src: '/images/metab-home-modules.png', alt: 'Home page reorder modules', label: 'Home: High visibility, low predictability' },
            { src: '/images/metab-store-page-reorder.jpg', alt: 'Store page reorder', label: 'Store: Contextual, not scalable' },
            { src: '/images/metab-orders-tab-reorder.png', alt: 'Orders tab reorder', label: 'Orders: Complete, but passive' }
          ],
          sectionContentSecondary: null,
          decisionHighlight: {
            heading: 'Decision - Replace the Orders tab',
            intro: 'Why',
            items: [
              'Adding a new navigation element meant adding complexity everywhere',
              'A new surface would be unfamiliar',
              'Orders matched existing customer mental model',
              'Provided a foundation to enhance beyond transaction'
            ],
            closing: 'We anchored on existing behavior to introduce a new system.'
          },
          sectionImages: null,
          sectionClosing: null
        },
        {
          date: null,
          title: null,
          description: null,
          sectionHeading: 'The Real Constraint',
          sectionContent: `As we explored the opportunity, it became clear this wasn't a single-team problem. Multiple teams were shifting strategy at the same time, each needing priority placement to drive visibility and results.`,
          sectionConstraints: [
            { title: 'DashPass', subhead: 'High-value system without a home', items: ['Top company strategic priority', 'Buried in account settings', 'Relied on brittle home page placements for discovery'] },
            { title: 'Social', subhead: 'Growing system without persistence', items: ['Expanding content types', 'Reviews were scattered and sorted by recency, disappearing quickly', 'No singular place for contributors to view contributions'] },
            { title: 'Account & Settings', subhead: 'Account management fragmented across surfaces', items: ['Unnecessary friction for customers', 'Opportunity to consolidate to improve UX'] }
          ],
          sectionConstraintImages: [
            { src: '/images/metab-dashpass-buried02.png', alt: 'DashPass buried in settings', label: 'High-value, buried' },
            { src: '/images/metab-social-noprofile03.png', alt: 'Social on store page', label: 'No durable presence' },
            {
              grouped: true,
              label: 'Fragmented management',
              images: [
                { src: '/images/metab-settings.png', alt: 'Settings screen' },
                { src: '/images/metab-account.png', alt: 'Account screen' }
              ]
            }
          ],
          sectionContentAfterFourUp: `These systems weren't just fragmented, they were competing for ownership of the customer. Any solution would need to resolve competing priorities, not simply reorganize them. We shifted from asking "where should this live?" to "what should this system be?"`,
          sectionImagesTwoUp: null,
          sectionContentAfterImages: null,
          sectionImagesThreeUp: null,
          sectionContentAfterThreeUp: null,
          sectionOpportunity: 'A unified system for the customer\n\nNot just another destination for reordering, but one that could unify fragmented experiences, give customers a persistent sense of self and scale across multiple product needs.',
          fullBleedImage: {
            src: '/images/fullbleed-org-alignment-02.png',
            alt: 'Cross-org alignment'
          },
          sectionHeadingSecondary: 'Multiple Teams, Conflicting Goals',
          sectionContentTertiary: `DashPass and Social needed visibility; Discovery and Orders needed better reorder; Delivery cared about active tracking. Each had different metrics, but all would benefit from a unified surface.`,
          alignmentHighlights: [
            { title: 'Alignment before sprinting', items: ['Principles defined upfront', 'Tradeoffs resolved early', 'Sprint focused on execution'] },
            { title: 'My role', items: ['Defined the problem', 'Created shared principles', 'Established decision frameworks'] }
          ],
          sectionHeadingTeam: 'The Team',
          sectionTeamImage: {
            src: '/images/metab-team-all.png',
            alt: 'Me Tab sprint team',
            caption: 'Design • Research • Content • Product'
          },
          sectionContentAfterTeam: `Cross-functional team across design, product, research, and content (10+ contributors). Before the sprint, I wrote a brief to reframe the problem, and led a working session to align on context and constraints. This session built shared understanding before the sprint clock started.`,
          sectionImageAfterTeam: {
            src: '/images/metab-sprint-brainstorm.jpg',
            alt: 'Sprint brainstorm session',
            label: 'Worksession & sprint brief',
            small: true
          },
          sectionContentAfterBrainstorm: `We defined principles based on user needs upfront to establish a shared framework for evaluating concepts and making tradeoffs, so sprint time could go to solutions, not priority debates.`,
          designPrinciples: [
            {
              microHeader: 'Surface Intent',
              image: '/images/metab-ddesign-principle01.png',
              title: 'Find what I care about',
              description: 'A surface to find my go-to stores, reorder my favorite meals or items and find deals from my favorite places.'
            },
            {
              microHeader: 'Reinforce Identity',
              image: '/images/metab-ddesign-principle02.png',
              title: 'Build my identity',
              description: 'A place to build and manage my identity and see how DoorDash has made my life 1% better.'
            },
            {
              microHeader: 'Enable Action',
              image: '/images/metab-ddesign-principle03.png',
              title: 'Access to key flows',
              description: 'A predictable surface to find core app features like order history, settings and my profile.'
            }
          ],
          measuringSuccessHeading: 'Measuring Success',
          measuringSuccessContent: `I defined success metrics with the Product Director. Without guardrails, we risked over-indexing on identity at the expense of reorder, the core business driver.`,
          measuringSuccessMetrics: [
            {
              type: 'Primary Metric',
              title: 'GOV',
              description: 'Anchored the work in business impact and ensured we optimized for reorder behavior, not just engagement.'
            },
            {
              type: 'Secondary Metric',
              title: 'Incremental DashPass Signups',
              description: 'Created space for subscription growth while keeping it secondary to core reorder performance.'
            },
            {
              type: 'Secondary Metric',
              title: 'Orders',
              description: "Ensured we maintained continuity with the existing Orders Tab and didn't regress core behavior."
            }
          ],
          sprintFullBleedImage: {
            src: '/images/fullbleed-sprint-day02.png',
            alt: 'Sprint overview'
          },
          sprintHeading: 'A 3-Day Sprint',
          sprintDay01Subheading: null,
          sprintDay01Content: `Three days isn't much time, but speed was the point. We needed alignment before teams could retreat to their corners.

Day one built shared context: data science presented analytics, research shared findings, partner teams outlined strategies. Groups organized by principle defined problems before exploring solutions.`,
          sprintDay01Image: {
            src: '/images/metab-sprint-day01.png',
            alt: 'Sprint Day 01',
            small: true,
            label: 'Building shared context'
          },
          sprintDay01ContentAfterImage: `Day two explored solutions in rapid cycles. Two hours on concepts, regroup, feedback, repeat. One example:`,
          sprintDay01TwoColumnText: null,
          sprintDay01TwoColumnImage: null,
          sprintDay01Summary: null,
          sprintDay02Subheading: null,
          sprintDay02Content: null,
          sprintDay02ContentAfterImage: null,
          sprintDay02ProblemOpportunity: {
            problem: 'Past orders use a generic item image, and do a poor job of helping me understand what I\'m reordering.',
            problemImage: '/images/metab-prob-02.png',
            opportunity: 'Visual carts showing items with useful metadata about my order.',
            opportunityImage: '/images/metab-oppo-02.jpg'
          },
          sprintDay02ProblemOpportunity02: null,
          sprintDay02ProblemOpportunity03: null,
          sprintDay02ContentAfterImageSecondary: `When stakeholders reviewed the explorations that afternoon, the breadth of ideas gave us early signals on directions to pursue and built alignment with leadership on the core concept. But it also surfaced a conflict I needed to address.`,
          leadershipHeading: 'Navigating Leadership Tension',
          leadershipContent: `The Senior Product Director for DashPass felt reorder was getting too much weight and pushed for ideas outside V1 scope. This could derail the strategy; missing the launch window or failing our primary metric.

I asked to meet privately. I acknowledged his long-term vision but grounded the conversation in V1 goals. We were replacing significant reorder revenue, and failure would limit future investment. I committed to a follow-up sprint post-launch to explore his ideas to get his support. He aligned on focusing on reorder for V1, and later became an advocate for the work.`,
          sprintDay03Subheading: null,
          sprintDay03Content: `Day three converged on architecture. Because work was organized around shared principles, solutions were modular and it was clear how the system would come together.`,
          sprintDay03Image: {
            src: '/images/metab-architecture.png',
            alt: 'Page architecture',
            small: true
          },
          sprintDay03ContentAfterImage: `We left with clear architecture, prioritized modules, and alignment to move into build.`,
          customerFeedbackHeading: 'Customer Validation',
          customerFeedbackContent: `After the sprint, we collapsed to a core group - myself, the design lead, and two PMs - to synthesize the work into a cohesive direction.

We partnered with research to validate the concepts with customers.`,
          customerFeedbackQuotesIntro: 'Three themes consistently emerged:',
          customerFeedbackQuotes: [
            {
              theme: 'DashPass Visibility',
              quote: 'This makes sense. I never knew DashPass had all these benefits—I guess I never really knew where to look.',
              author: 'Maria P.'
            },
            {
              theme: 'Reorder Clarity',
              quote: 'This enables me to quickly scan my past orders visually. I order from the same places a lot, but my carts match my mood that day. Now I can tell them apart.',
              author: 'George W.'
            },
            {
              theme: 'Personalization',
              quote: `I'm usually at the office weekdays, but evenings and weekends I'm ordering at home, so the stores updating like this would save me time.`,
              author: 'Wanda D.'
            }
          ],
          customerFeedbackClosing: `The signal was clear: customers understood DashPass value, could scan and reorder past purchases, and responded to personalization. We kept scope focused and had specs ready within a week.`,
          whatWeReleasedHeading: 'What We Released',
          whatWeReleasedImage: {
            src: '/images/metab-release-01.png',
            alt: 'Me Tab release',
            small: true
          },
          whatWeReleasedContent: `The final design reflected deliberate trade-offs. Reorder dominated (replacing significant revenue). DashPass earned visibility but not a full hub yet. Social got a foundation, not a destination. Organized around the three core user needs from the sprint.`,
          whatWeReleasedPrinciple1Heading: 'Find what I care about',
          whatWeReleasedPrinciple1Image: {
            src: '/images/metab-find.jpg',
            alt: 'Find what I care about',
            small: true
          },
          whatWeReleasedPrinciple1Content: `Go-to stores ranked by time of day, recency, and frequency with active deals. Top Orders made past purchases visual and scannable. Reordering became a single action.`,
          whatWeReleasedPrinciple2Heading: 'Build my identity',
          whatWeReleasedPrinciple2Image: {
            src: '/images/metab-idenity.jpg',
            alt: 'Build my identity',
            small: true
          },
          whatWeReleasedPrinciple2Content: `DashPass anchored the identity layer with customer recognition, membership status and dynamic savings messaging. In-page navigation provided access to profile and social contributions.`,
          whatWeReleasedPrinciple3Heading: 'Access to key flows',
          whatWeReleasedPrinciple3Image: {
            src: '/images/metab-maintain-access.jpg',
            alt: 'Maintain access to key flows',
            small: true
          },
          whatWeReleasedPrinciple3Content: `The surface unified DashPass management, order history, and account settings all from a single, predictable entry point.`,
          operationalFrameworkHeading: 'Operational Playbook',
          operationalFrameworkContent: `Launching required more than design; it required a clear operating playbook. I worked with the PM and designer to define a framework establishing what belongs on the surface, how content is organized, and how partner teams integrate without fragmenting the experience.`,
          operationalFrameworkItems: null,
          operationalFrameworkContentAfter: `We established a weekly forum where teams could propose ideas, get feedback, and align on how their work fit into the system.`,
          operationalFrameworkImage: {
            src: '/images/metab-framework.png',
            alt: 'Me Tab Framework',
            small: true
          }
        }
      ],
      execution: [],
      collaboration: null,
      mediaHeading: null,
      mediaDescription: null,
      media: [],
      mediaFooterHeading: null,
      mediaFooterDescription: null,
      mediaFooterDescriptionSecondary: null,
      mediaFooterMedia: null,
      video: null
    },
    features: [],
    impact: {
      heading: 'Impact',
      headingAccent: false,
      narrative: `The Me Tab drove a measurable increase in repeat ordering, compounding over time.

In a 5-month holdout, we observed a +0.25% lift in 28-day order frequency, growing to +0.29% by day 84.

Me Tab accounts for ~4% of total marketplace orders, representing ~$2.1B in annual GOV on iOS.`,
      metrics: [
        { value: '$148M', label: 'Incremental GOV (holdout validated)' },
        { value: '4M', label: 'Incremental Orders Driven' },
        { value: '180K', label: 'Incremental DashPass Subscribers' },
        { value: '12%', label: 'MAU engaging in reorder from Me Tab' }
      ],
      businessImpactHeading: 'Business Impact',
      businessImpact: `The lift in order frequency came entirely from reorders - new merchant trial remained neutral. This validated our core bet: we could increase repeat behavior without cannibalizing discovery.

For DashPass, the surface also improved retention, reducing annual cancellations by 2.4% and increasing member savings through fees and promotions.

This positioned Me Tab as a durable driver of repeat behavior - capturing high-intent demand while preserving the top-of-funnel for discovery impressions.`,
      testimonial: null,
      reflectionHeading: "What I'd Do Differently",
      reflectionItems: [
        {
          title: 'Align leadership earlier on cross-org tradeoffs',
          content: `I anticipated the need for cross-org alignment, but addressed it indirectly through principles and success metrics rather than confronting it head-on. When tension surfaced mid-sprint, I had to course-correct. In hindsight, I would have escalated earlier and aligned leaders explicitly on tradeoffs before the sprint began.`
        },
        {
          title: 'Provide more structure when stretching leaders',
          content: `I asked a senior designer to lead the initiative as a growth opportunity. While they ultimately succeeded, stepping into a cross-org leadership role required more upfront structure and coaching than I planned for. I would add clearer expectations and support earlier to reduce ramp time and increase early momentum.`
        }
      ],
      closing: 'This work established a durable foundation for how DoorDash organizes, personalizes, and scales customer identity & management, turning a fragmented set of features into a cohesive system.'
    }
  },
  // Me Tab detail sub-pages
  {
    id: 'doordash-metab--sprint',
    variant: 'detail',
    parentId: 'doordash-metab',
    status: 'published',
    protected: true,
    meta: {
      title: 'Principles, Metrics & Sprint',
      subtitle: 'How shared frameworks enabled a 3-day sprint to succeed'
    },
    content: {
      sections: [
        {
          type: 'section-heading',
          content: 'The Team'
        },
        {
          type: 'image',
          src: '/images/metab-team-all.png',
          alt: 'Me Tab sprint team',
          caption: 'Design • Research • Content • Product'
        },
        {
          type: 'text',
          content: `Cross-functional team across design, product, research, and content (10+ contributors). Before the sprint, I wrote a brief to reframe the problem, and led a working session to align on context and constraints. This session built shared understanding before the sprint clock started.`
        },
        {
          type: 'section-heading',
          content: 'Design Principles'
        },
        {
          type: 'text',
          content: `We defined principles based on user needs upfront to establish a shared framework for evaluating concepts and making tradeoffs.`
        },
        {
          type: 'principles-row',
          items: [
            {
              microHeader: 'Surface Intent',
              image: '/images/metab-ddesign-principle01.png',
              title: 'Find what I care about',
              description: 'A surface to find my go-to stores, reorder my favorite meals or items and find deals from my favorite places.'
            },
            {
              microHeader: 'Reinforce Identity',
              image: '/images/metab-ddesign-principle02.png',
              title: 'Build my identity',
              description: 'A place to build and manage my identity and see how DoorDash has made my life better.'
            },
            {
              microHeader: 'Enable Action',
              image: '/images/metab-ddesign-principle03.png',
              title: 'Access to key flows',
              description: 'A predictable surface to find core app features like order tracking, history, settings and my profile.'
            }
          ]
        },
        {
          type: 'text',
          content: `I defined success metrics with the Product Director. Without guardrails, we risked over-indexing on identity at the expense of reorder, the core business driver.`
        },
        {
          type: 'list',
          items: [
            `**Primary Metric: GOV** — Anchored the work in business impact and ensured we optimized for reorder behavior, not just engagement.`,
            `**Secondary: Incremental DashPass Signups** — Created space for subscription growth while keeping it secondary to core reorder performance.`,
            `**Secondary: Orders** — Ensured we maintained continuity with the existing Orders Tab and didn't regress core behavior.`
          ]
        },
        {
          type: 'callout',
          content: '**GOV as primary metric ensured we optimized for reorder behavior, not just engagement.** DashPass subscriptions were important but not dominant.'
        },
        {
          type: 'text',
          heading: 'A 3-Day Sprint',
          content: `Three days isn't much time, but speed was the point. We needed alignment before teams could retreat to their corners.

**Day one** built shared context: data science presented analytics, research shared findings, partner teams outlined strategies. Groups organized by principle defined clear customer problems before exploring solutions.

**Day two** explored solutions in rapid cycles. Two hours on concepts, regroup, feedback, repeat. When stakeholders reviewed explorations that afternoon, the breadth of ideas gave us early signals on directions to pursue and built alignment with leadership on the core concept.

**Day three** converged on architecture. Because work was organized around shared principles, solutions were modular and it was clear how the system would come together. We left with clear architecture, prioritized modules, and alignment to move into build.`
        },
        {
          type: 'image',
          src: '/images/metab-architecture.png',
          alt: 'Page architecture showing modular system',
          caption: 'Final architecture from sprint',
          small: true,
          clickable: true
        },
        {
          type: 'callout',
          content: '**Principles and metrics defined upfront meant tradeoffs could be resolved by framework.** Sprint time went to solutions, not priority debates.'
        }
      ]
    }
  },
  {
    id: 'doordash-metab--launched',
    variant: 'detail',
    parentId: 'doordash-metab',
    status: 'published',
    protected: true,
    meta: {
      title: 'What We Shipped',
      subtitle: 'The final design organized around three core user needs'
    },
    content: {
      sections: [
        {
          type: 'text',
          content: `The final design reflected deliberate trade-offs. Reorder dominated V1 because we were replacing significant revenue. DashPass earned visibility but not a full hub yet. Social got a foundation, not a destination. Everything organized around the three core user needs from the sprint.`
        },
        {
          type: 'section-heading',
          content: 'Find what I care about'
        },
        {
          type: 'image',
          src: '/images/metab-find.jpg',
          alt: 'Find what I care about',
          small: true,
          clickable: true,
          align: 'left'
        },
        {
          type: 'text',
          content: `Go-to stores ranked by time of day, recency, and frequency with active deals. Top Orders made past purchases visual and scannable. Reordering became a single action.`
        },
        {
          type: 'section-heading',
          content: 'Build my identity'
        },
        {
          type: 'image',
          src: '/images/metab-idenity.jpg',
          alt: 'Build my identity',
          small: true,
          clickable: true,
          align: 'left'
        },
        {
          type: 'text',
          content: `DashPass anchored the identity layer with customer recognition, membership status and dynamic savings messaging. In-page navigation provided access to profile and social contributions.`
        },
        {
          type: 'section-heading',
          content: 'Access to key flows'
        },
        {
          type: 'image',
          src: '/images/metab-maintain-access.jpg',
          alt: 'Maintain access to key flows',
          small: true,
          clickable: true,
          align: 'left'
        },
        {
          type: 'text',
          content: `The surface unified DashPass management, order history, and account settings all from a single, predictable entry point.`
        },
        {
          type: 'section-heading',
          content: 'Customer Validation'
        },
        {
          type: 'text',
          content: `After the sprint, we partnered with research to validate the concepts with customers. Three themes consistently emerged: {{DashPass visibility}}, {{reorder clarity}}, and {{personalization}}.`,
          inlinePopups: {
            'DashPass visibility': {
              content: '"This makes sense. I never knew DashPass had all these benefits—I guess I never really knew where to look." — Maria P.'
            },
            'reorder clarity': {
              content: '"This enables me to quickly scan my past orders visually. I order from the same places a lot, but my carts match my mood that day. Now I can tell them apart." — George W.'
            },
            'personalization': {
              content: '"I\'m usually at the office weekdays, but evenings and weekends I\'m ordering at home, so the stores updating like this would save me time." — Wanda D.'
            }
          }
        },
        {
          type: 'callout',
          content: `**Customers understood DashPass value, could scan and reorder past purchases, and responded to personalization.** We kept scope focused and had specs ready within a week.`
        }
      ]
    }
  },
  {
    id: 'doordash-evidence',
    status: 'draft',
    protected: false,
    meta: {
      title: 'Contextual Store Evidence',
      client: 'DoorDash',
      timeline: '2025',
      role: null,
      team: null
    },
    hero: {
      src: '/images/doordash-evidence-hero.png',
      alt: 'Evidence types and ranking system showing priority from high to low',
      caption: 'A systematic approach to surfacing the right information at the right time'
    },
    problem: {
      heading: 'The Challenge',
      context: 'Customers have trouble deciding what restaurant or dish to choose among relevant options. They\'re often overwhelmed by options and are looking for help to compare.',
      contextSecondary: 'Over time DoorDash started to get cluttered as new indicators popped up across the broader system of products. To much diversity overwhelms customers and the user experience degrades. Instead of helping customers differentiate between options, it feels like the UI is screaming at them everywhere "notice me!"',
      contextTertiary: 'Design took the lead on this initiative, proposing the approach to product in a design review and gaining alignment to get the work funded. We worked closely with our Ux Research partner both to understand the highest value items to highlight (based on existing research), as well as to run some quick tests of our concepts once we refined the scope.',
      userPainPoints: [
        'Too many options with no clear way to differentiate quality',
        'Lack of contextual information to support decision-making',
        'Generic presentation that doesn\'t adapt to customer intent',
        'No visibility into why certain restaurants might be a good fit'
      ],
      businessOpportunity: 'Surface contextual evidence and badges that help customers make confident decisions faster, reducing choice paralysis and improving conversion.'
    },
    solution: {
      heading: 'The Approach',
      strategy: 'Developed a systematic evidence ranking framework that prioritizes contextual information based on relevance and customer intent. The system adapts what information surfaces based on query type, customer history, and merchant attributes.'
    },
    features: [
      {
        id: 'dish-evidence',
        title: 'Broad Query Intelligence',
        description: 'Highlight the top dish each merchant is known for when customers search broad categories like "thai", "italian", or "breakfast".',
        thumbnail: '/images/doordash-evidence-small-card-hero.png',
        image: '/images/doordash-evidence-dish.webp',
        details: 'Leaderboard-style ranking helps surface customer favorites and trending items.'
      },
      {
        id: 'budget-evidence',
        title: 'Great Value Badges',
        description: 'Badging high-value stores for budget-conscious customers with "Great value" leaderboards.',
        thumbnail: '/images/doordash-evidence-hero02.png',
        image: '/images/doordash-evidence-budget.webp',
        details: 'Works in conjunction with updated price-per-person metadata to help value-seekers find the right fit.'
      },
      {
        id: 'dietary-evidence',
        title: 'Personalized Dietary Preferences',
        description: 'Prioritize showing dietary tags when we detect certain dietary preferences based on past orders and browsing.',
        thumbnail: '/images/doordash-evidence-hero03.png',
        image: '/images/doordash-evidence-dietary.webp',
        details: 'Dishes must meet criteria before being counted as an option. Storepage organization reflects customer preferences.'
      },
      {
        id: 'speed-evidence',
        title: 'Fastest Delivery Indicators',
        description: 'Testing different color treatments to call out speedy stores near the customer.',
        thumbnail: '/images/doordash-evidence-hero04.png',
        image: '/images/doordash-evidence-speed.webp',
        details: '"Fastest" designation based on dayparting, district, and selection algorithms.'
      }
    ],
    impact: {
      heading: 'The Framework',
      metrics: [
        { label: 'Evidence Types', value: '8+', context: 'Categories in ranking system' },
        { label: 'Priority Levels', value: 'Dynamic', context: 'Adapts to context and intent' },
        { label: 'Use Cases', value: '4 key areas', context: 'Dish, budget, dietary, speed' }
      ],
      narrative: 'The evidence ranking framework provides a systematic way to determine what contextual information surfaces on store cards. From legal requirements (sponsored badges) at highest priority to closing-soon indicators at lowest, each evidence type has a clear place in the hierarchy.',
      businessImpact: 'Reducing decision fatigue leads to faster conversions and higher customer satisfaction with their choices.'
    }
  },
  {
    id: 'groupon-cx90',
    status: 'draft',
    protected: false,
    meta: {
      title: 'CX90: Groupon Homepage Transformation',
      client: 'Groupon',
      timeline: '90-day initiative, 2019-2020',
      role: 'Director, Consumer & Merchant Experience',
      team: {
        size: 15,
        composition: 'Product design, UX research, engineering, merchandising'
      }
    },
    hero: {
      src: '/images/groupon-cx90-hero.png',
      video: '/images/groupon-cx90-hero-video.mp4',
      videoPoster: '/images/groupon-cx90-hero-video-poster.jpg',
      alt: 'Groupon CX90 redesigned homepage on mobile and desktop',
      caption: 'Building systems instead of features',
      overlay: {
        title: 'Cx 90',
        text: 'Transforming Groupon in 90 days'
      }
    },
    problem: {
      heading: 'The Challenge',
      context: 'Groupon\'s homepage had become a "thrift store" experience—cluttered, poorly personalized, and failing to showcase the breadth of local experiences available. Customers were stuck in category silos, unaware of offerings beyond their first purchase.',
      contextSecondary: 'Senior leadership challenged the product and design organization to get radical and see how far we could push and launch an experience overhaul in 90 days. Challenge accepted.',
      userPainPointsDescription: 'We already knew key pain points we wanted to solve for from our existing UX research.',
      userPainPoints: [
        'Overwhelming, cluttered interface that felt like "digging through junk"',
        'Poor personalization that pigeonholed users based on single purchases',
        'Lack of awareness about delivery, local services, and experience breadth',
        'Random-seeming deal presentation that forced users to rely on search'
      ],
      businessOpportunity: 'Reposition Groupon as the premier local experiences marketplace while building scalable systems that could adapt to changing business needs.'
    },
    solution: {
      heading: 'The Approach',
      strategy: 'Rather than shipping features, we built capabilities—a modular design system with clear ownership, configuration rules, and merchandising tools that could be composed and reconfigured without engineering work.',
      execution: [
        {
          phase: 'Research & Competitive Analysis',
          description: 'Studied AirBnb, DoorDash, Yelp, and Jet to understand marketplace patterns. Established ongoing UX research cadence.',
          duration: '2 weeks'
        },
        {
          phase: 'Design System Foundation',
          description: 'Created design tokens and theming system. Developed module playbook defining ownership, configuration, and specs for each component type.',
          duration: '4 weeks'
        },
        {
          phase: 'Cross-Platform Implementation',
          description: 'Delivered unified experience across mobile and desktop with new category navigation, personalized modules, and merchandising placements.',
          duration: '6 weeks'
        }
      ],
      collaboration: 'Partnered closely with merchandising, product management, and engineering to ensure the system could be operated by non-designers.',
      mediaHeading: 'A New Design Vision',
      mediaDescription: 'The team produced a new design vision in 3 weeks and built rich prototypes demonstrating the impact across the end-to-end consumer experience.',
      media: [
        {
          src: '/images/groupon-cx90-light.gif',
          alt: 'Groupon CX90 light mode animated walkthrough',
          caption: 'Light Mode'
        },
        {
          src: '/images/groupon-cx90-dark.gif',
          alt: 'Groupon CX90 dark mode animated walkthrough',
          caption: 'Dark Mode'
        }
      ],
      mediaFooterHeading: 'Managing Scope',
      mediaFooterDescription: 'After the vision work was complete we worked with engineering and product to scope the effort down to something we could launch within our 90 day window, and decided to focus on the home page surface and global navigation as the most impactful areas to tackle first.',
      mediaFooterDescriptionSecondary: 'The design below represents where we landed after scoping. We went with a bolder header setup that transitioned to the updated and cleaner look of the design vision as the customer scrolled, and finalized our modular designs for a variety of home page carousels.',
      mediaFooterMedia: {
        src: '/images/groupon-cx90-launch-state.mp4',
        poster: '/images/groupon-cx90-launch-state-poster.jpg',
        caption: 'Launch state designs'
      },
      video: {
        src: '/images/groupon-cx90-overview.mp4',
        poster: '/images/groupon-cx90-overview-poster.jpg',
        caption: 'The modular widget system enabled merchandising teams to configure and target content without engineering work.'
      }
    },
    impact: {
      heading: 'The Results',
      metrics: [
        { label: 'Launch Timeline', value: '90 days', context: 'Delivered on aggressive timeline as promised' },
        { label: 'Local Billings Growth', value: '+20%', context: 'North America Q2 following launch' },
        { label: 'Category Page Views', value: '+110%', context: 'Customers exploring beyond homepage' },
        { label: 'Bounce Rate', value: '-8%', context: 'Homepage engagement improved' },
        { label: 'Ad Revenue', value: '2x', context: 'Sponsorship placements doubled projections' },
        { label: 'Dev Cycle Time', value: 'Weeks→Days', context: 'Module system enabled rapid iteration' }
      ],
      narrative: 'The CX90 initiative proved that investing in systems over features pays dividends. When the pandemic hit months later, the foundations we built enabled Groupon to pivot rapidly—capitalizing on organizational urgency while competitors scrambled.',
      businessImpact: 'Share successfully shifted from goods back to local experiences, aligning with brand strategy and improving profitability.',
      testimonial: {
        quote: 'It\'s clean. It\'s not overwhelming...there\'s a lot more engaging photography. It feels more like an actual shopping experience versus listing after listing.',
        author: 'Laura',
        role: 'NYC, Research Participant'
      }
    }
  },
  {
    id: 'fintech-platform',
    status: 'draft',
    protected: true,
    meta: {
      title: 'Enterprise Fintech Platform Redesign',
      client: 'FinTech Corp',
      timeline: '18-month initiative, 2022-2023',
      role: 'Design Director',
      team: {
        size: 6,
        composition: '2 product designers, 2 UX researchers, 1 content strategist, 1 design systems lead'
      }
    },
    hero: {
      src: '/images/fintech-hero.svg',
      alt: 'Dashboard showing unified design system implementation',
      caption: 'Unified dashboard bringing consistency to 14 disparate products'
    },
    problem: {
      heading: 'The Challenge',
      context: 'A series of acquisitions left FinTech Corp with 14 products using different design languages, causing confusion for users managing multiple accounts.',
      userPainPoints: [
        'Users reported spending 40% more time completing tasks across different products',
        'Support tickets increased 23% year-over-year due to UI inconsistencies',
        'New user onboarding took 2x longer than industry benchmarks'
      ],
      businessOpportunity: 'Unifying the experience could reduce churn by an estimated 15% and cut support costs by $2M annually.'
    },
    solution: {
      heading: 'The Approach',
      strategy: 'Led a cross-functional team to create a unified design system while maintaining each product\'s unique value proposition.',
      execution: [
        {
          phase: 'Research & Alignment',
          description: 'Conducted 40+ user interviews across all products, mapped user journeys, identified common pain points and opportunities.',
          duration: '3 months'
        },
        {
          phase: 'Design System Foundation',
          description: 'Built component library with 120+ components, established design tokens, created comprehensive documentation.',
          duration: '5 months'
        },
        {
          phase: 'Pilot & Iteration',
          description: 'Implemented in 2 flagship products, gathered feedback, refined based on real-world usage.',
          duration: '4 months'
        },
        {
          phase: 'Enterprise Rollout',
          description: 'Scaled to all 14 products with dedicated implementation teams, provided training and support.',
          duration: '6 months'
        }
      ],
      collaboration: 'Worked closely with 8 product teams, engineering leadership, and C-suite stakeholders. Established bi-weekly design reviews and created a design champion program to embed design thinking across the organization.'
    },
    impact: {
      heading: 'The Results',
      metrics: [
        { label: 'Task completion time', value: '-31%', context: 'Across all products' },
        { label: 'Support tickets', value: '-42%', context: 'Year-over-year reduction' },
        { label: 'User satisfaction', value: '4.6/5', context: 'Up from 3.2/5' },
        { label: 'Design-to-dev time', value: '-60%', context: 'Using new system' }
      ],
      narrative: 'The unified design system not only improved user experience but transformed how teams worked together. Cross-product feature development accelerated by 40%, and designers reported spending 70% less time on UI decisions and more time solving user problems.',
      businessImpact: 'Contributed to 12% reduction in churn and $1.8M annual support cost savings.',
      testimonial: {
        quote: 'This wasn\'t just a visual refresh—it fundamentally changed how our users experience our entire product ecosystem. The attention to detail and user empathy drove results beyond what we imagined.',
        author: 'Sarah Chen',
        role: 'VP of Product, FinTech Corp'
      }
    }
  },
  {
    id: 'healthcare-app',
    status: 'draft',
    protected: true,
    meta: {
      title: 'Patient Care Mobile App',
      client: 'HealthCare Plus',
      timeline: '12-month project, 2023',
      role: 'Design Director',
      team: {
        size: 5,
        composition: '3 product designers, 1 UX researcher, 1 accessibility specialist'
      }
    },
    hero: {
      src: '/images/healthcare-hero.svg',
      alt: 'Mobile app showing patient care dashboard',
      caption: 'Simplified patient care through mobile-first design'
    },
    problem: {
      heading: 'The Challenge',
      context: 'Healthcare providers struggled with outdated tools that slowed down patient care and created frustration for both staff and patients.',
      userPainPoints: [
        'Nurses spent 45 minutes per shift navigating complex interfaces',
        'Patient wait times increased due to system inefficiencies',
        'Critical information was buried 5+ clicks deep'
      ],
      businessOpportunity: 'Streamlining workflows could improve patient outcomes and increase provider capacity by 20%.'
    },
    solution: {
      heading: 'The Approach',
      strategy: 'Conducted extensive field research in healthcare settings to understand real workflows. Designed mobile-first experience prioritizing critical information and quick actions.',
      execution: [
        {
          phase: 'Ethnographic Research',
          description: 'Shadowed nurses and doctors for 80+ hours, documented workflows, identified pain points in real clinical settings.',
          duration: '2 months'
        },
        {
          phase: 'Prototype & Testing',
          description: 'Built interactive prototypes, tested with 25+ healthcare providers, iterated based on hands-on feedback.',
          duration: '3 months'
        },
        {
          phase: 'Pilot Program',
          description: 'Deployed to 3 hospital units, gathered usage data and feedback, refined for scale.',
          duration: '4 months'
        },
        {
          phase: 'Full Rollout',
          description: 'Scaled to all departments with comprehensive training program and ongoing support.',
          duration: '3 months'
        }
      ],
      collaboration: 'Partnered with clinical staff, IT department, and hospital administration. Led weekly check-ins with frontline users to ensure solution met real needs.'
    },
    impact: {
      heading: 'The Results',
      metrics: [
        { label: 'Time savings', value: '35 min/shift', context: 'Per healthcare provider' },
        { label: 'Patient wait time', value: '-28%', context: 'Average reduction' },
        { label: 'User satisfaction', value: '4.8/5', context: 'From healthcare staff' },
        { label: 'Error rate', value: '-45%', context: 'In data entry' }
      ],
      narrative: 'The mobile-first design transformed how healthcare providers interacted with patient information. Critical data was now accessible in 1-2 taps, and the intuitive interface required minimal training.',
      businessImpact: 'Enabled providers to see 15% more patients per day while maintaining quality of care.',
      testimonial: {
        quote: 'This app gives me back time to actually care for patients instead of fighting with technology. It feels like it was designed BY healthcare workers, not just FOR us.',
        author: 'Dr. Maria Rodriguez',
        role: 'Chief Medical Officer, HealthCare Plus'
      }
    }
  },
  {
    id: 'ecommerce-platform',
    status: 'draft',
    protected: true,
    meta: {
      title: 'E-commerce Checkout Optimization',
      client: 'RetailCo',
      timeline: '6-month sprint, 2023',
      role: 'Design Director',
      team: {
        size: 4,
        composition: '2 product designers, 1 UX researcher, 1 conversion specialist'
      }
    },
    hero: {
      src: '/images/ecommerce-hero.svg',
      alt: 'Streamlined checkout flow on mobile and desktop',
      caption: 'Simplified checkout increased conversion by 34%'
    },
    problem: {
      heading: 'The Challenge',
      context: 'RetailCo\'s checkout process had a 68% abandonment rate, significantly higher than industry average, costing millions in lost revenue.',
      userPainPoints: [
        '7-step checkout process created friction and confusion',
        'Mobile users abandoned at 2x the rate of desktop users',
        'Form errors weren\'t clear, leading to repeated failed attempts'
      ],
      businessOpportunity: 'Reducing abandonment by even 10% would generate $8M+ in additional annual revenue.'
    },
    solution: {
      heading: 'The Approach',
      strategy: 'Analyzed user behavior data, conducted usability testing, and redesigned checkout as a single-page flow with smart defaults and progressive disclosure.',
      execution: [
        {
          phase: 'Data Analysis',
          description: 'Reviewed 6 months of analytics, session recordings, and cart abandonment data to identify drop-off points.',
          duration: '1 month'
        },
        {
          phase: 'Redesign & Testing',
          description: 'Created 3 design concepts, tested with 50+ users, refined based on conversion impact and user feedback.',
          duration: '2 months'
        },
        {
          phase: 'A/B Testing',
          description: 'Launched gradual rollout with A/B tests, monitored metrics daily, made real-time optimizations.',
          duration: '2 months'
        },
        {
          phase: 'Full Launch',
          description: 'Deployed winning variant to 100% of traffic, documented learnings for future optimization.',
          duration: '1 month'
        }
      ],
      collaboration: 'Worked directly with marketing, engineering, and analytics teams. Coordinated with payment processing and logistics to ensure technical feasibility.'
    },
    impact: {
      heading: 'The Results',
      metrics: [
        { label: 'Conversion rate', value: '+34%', context: 'Overall improvement' },
        { label: 'Mobile conversion', value: '+52%', context: 'Largest gains on mobile' },
        { label: 'Checkout time', value: '-67%', context: 'Average completion time' },
        { label: 'Form errors', value: '-81%', context: 'User-reported issues' }
      ],
      narrative: 'The streamlined checkout removed friction at every step. Single-page flow, smart defaults, and clear error handling transformed the experience from frustrating to effortless.',
      businessImpact: 'Generated $12M in additional annual revenue and reduced customer service calls by 35%.',
      testimonial: {
        quote: 'We\'ve tried optimizing checkout for years with minimal gains. This redesign delivered results beyond our most optimistic projections. The ROI was evident within the first month.',
        author: 'James Park',
        role: 'VP of E-commerce, RetailCo'
      }
    }
  }
]
