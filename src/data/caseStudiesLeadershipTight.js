/**
 * Tight Leadership Variant Case Studies
 * Condensed versions for comparison testing - same structure but more concise content.
 * Replaces detailed stakeholder descriptions with role → metric format.
 * Replaces "What I'd Do Differently" with "Leadership Takeaways".
 */

export const tightLeadershipCaseStudies = {
  'doordash-doubledash': {
    impactHook: `Doubledash grew from a scrappy MVP to a $1.7B revenue channel over 3 years. This work transformed order tracking from a passive status view into a core commerce platform, driving 8% of marketplace growth and 22% lift in new vertical adoption.`,

    strategicContext: {
      content: `DoorDash was evolving from a restaurant delivery company into a multi-vertical platform. The New Verticals team noticed a signal: ~20% of customers were placing a second order within 10 minutes of their primary delivery. This revealed latent demand for bundling despite significant friction, and led to [[our initial MVPs|doordash-doubledash--mvp]] to validate bundling demand.`,
      insight: `**The opportunity post-MVP**
Transform order tracking - a utility surface - into a shopping platform without disrupting customers tracking orders.`
    },

    leadershipChallenge: {
      content: `This wasn't a single-team problem. Doubledash sat at the intersection of multiple organizations with different metrics and competing roadmaps. Each team could optimize their metrics at the expense of the others.`,
      contentAfter: `As the design leader, I had to create alignment mechanisms that let these teams build together without degrading each other's outcomes, while keeping delivery tracking protected as the foundation.`,
      stakeholders: [
        {
          title: 'Delivery Tracking',
          description: 'Owned the surface. Measured reliability and task completion.'
        },
        {
          title: 'Commerce / Doubledash',
          description: 'Measured GMV and attach rates. Wanted maximum visibility and real estate.'
        },
        {
          title: 'New Verticals',
          description: 'Needed cross-category trials to prove platform expansion. Bundling was their key lever.'
        }
      ]
    },

    howILed: {
      intro: null,
      actions: [
        {
          text: `**I introduced governance early.** I partnered with Delivery leadership to create a tiered priority system that protected tracking while enabling commerce.`,
          goDeeper: {
            to: 'doordash-doubledash--governance',
            variant: 'chip',
            label: 'Go deeper on governance',
            returnTo: 'how-i-led'
          }
        },
        {
          text: `**I established a planning rhythm that gave design strategic leverage.** Semi-annual vision sprints ahead of each planning cycle meant fully-prototyped ideas had organizational commitment before roadmap discussions began.`,
          goDeeper: {
            to: 'doordash-doubledash--sprints',
            variant: 'chip',
            label: 'Go deeper on sprints',
            returnTo: 'how-i-led'
          }
        },
        `**I redirected the roadmap to unblock scale.** Early experiments showed cart-based bundling required significant engineering work. I pushed the organization to focus on cart refactoring and drove sprints to redefine the vision for cart, enabling Doubledash to move up-funnel and serve more use cases.`,
        `**I scaled the team to match the ambition.** I promoted my senior designer to Staff and hired DoorDash's first Principal Designer to lead our most complex systems challenge.`,
        `**I turned experiment failures into strategy.** Shifted approach when early wins hurt core metrics.`
      ]
    },

    keyMoment: {
      title: 'Turning Failure Into Strategy',
      situation: `The senior director of consumer product wanted to expand Doubledash visibility. For 8 weeks we met twice weekly to workshop approaches. The hypothesis was that embedding cross-merchant options earlier in the flow, on store pages, would increase bundling visibility and adoption.`,
      stakes: `The technical constraints led to heavy UI treatments: nearby stores that changed based on which page you visited, a tab system replacing natural scrolling. The risk was shipping something that felt forced and degraded the core ordering experience.`,
      stakesLabel: 'The Constraints',
      myRead: `**The results were clear.** Attach rate increased but cart spend dropped. We were creating friction in the primary shopping journey to boost visibility. I needed to translate failure into strategic insight.`,
      action: `**I reframed the findings.** The experiment proved that the most effective growth comes from amplifying existing behaviors, not interrupting them for greater visibility. I advocated for shifting toward contextual, in-moment merchandising, integrating Doubledash where customers already had intent.`,
      outcome: `Leadership aligned, experiments rolled back, and we pivoted to a behavior-aligned platform strategy. This marked the transition from feature team to platform team.`,
      goDeeper: {
        to: 'doordash-doubledash--experiment-story',
        variant: 'chip',
        label: 'See the experiments',
        returnTo: 'key-moment'
      }
    },

    whatWeShipped: {
      content: null,
      comparison: {
        noCard: true,
        before: {
          type: 'image',
          src: '/images/DeliveryExperienceBefore.webp',
          alt: 'Delivery tracking before Doubledash',
          label: 'Before',
          caption: 'Delivery Tracking'
        },
        after: {
          type: 'video',
          src: '/images/DoubledashWalkthroughFinal02.mp4',
          label: 'After',
          caption: 'Core Commerce Platform'
        },
        goDeeper: {
          to: 'doordash-doubledash--evolution',
          variant: 'chip',
          label: 'See the product evolution',
          returnTo: 'what-we-shipped'
        }
      }
    },

    impactReflection: {
      combinedLayout: true,
      impactIntro: 'Over three years, Doubledash evolved from a single-merchant MVP to a full multi-store shopping experience within order tracking, driving compounding results.',
      metrics: [
        { value: '$1.7B', label: 'Annual GMV' },
        { value: '8%', label: 'Marketplace growth' },
        { value: '+22%', label: 'New vertical orders' },
        { value: '+35%', label: 'Conversion' }
      ],
      tradeoffs: [
        {
          title: 'Governance enabled speed',
          content: 'Gave teams clear guidance and prevented surface degradation.'
        },
        {
          title: 'Continued pushing for the cart',
          content: 'Although it required engineering work we couldn\'t justify early, I worked in the background to re-envision & refactor so we could relaunch in the cart.'
        },
        {
          title: 'Unified UI over separate modules',
          content: 'This work not only improved the product experience but established a more scalable technical and design foundation for future growth.'
        }
      ],
      narrative: null,
      organizationalImpact: null,
      reflectionLabel: 'Leadership Takeaways',
      reflection: [
        {
          title: 'Governance enables scale on shared surfaces'
        },
        {
          title: 'Behavior > visibility for sustainable growth'
        },
        {
          title: 'Design leadership = systems + structure, not just UX'
        }
      ],
      closing: null
    }
  },

  'doordash-metab': {
    impactHook: `Launched in 7 weeks to 100% of US users, driving $148M incremental GOV and 4% of marketplace orders.`,

    strategicContext: {
      content: `The home page drove ~50% of orders—but relied heavily on reorders, conflicting with a push toward discovery.

The ask: move reorders off Home.`,
      insight: `This wasn't a feature problem—it was a **missing customer layer.** Reorders, loyalty, identity, and settings were fragmented.`
    },

    leadershipChallenge: {
      content: `I led a cross-org initiative spanning 6 teams with competing priorities. The challenge: resolve competing priorities without hurting core revenue.`,
      stakeholders: [
        {
          title: 'DashPass',
          description: '→ visibility & growth'
        },
        {
          title: 'Discovery',
          description: '→ reduce reorder dominance'
        },
        {
          title: 'Social',
          description: '→ persistent identity'
        },
        {
          title: 'Delivery',
          description: '→ owned Orders surface'
        }
      ]
    },

    howILed: {
      intro: null,
      actions: [
        `**Reframed the problem** — From "move reorders" → "build a unified customer layer"`,
        `**Defined principles upfront** — Enabled faster decisions without constant debate`,
        `**Aligned on success metrics** — Prioritized reorder GOV over engagement or subscriptions`,
        `**Coordinated across 6 teams** — Maintained alignment while protecting the core bet`,
        `**Developed leadership within the team** — Scoped a senior designer into cross-org ownership`,
        `**Held scope under pressure** — Prevented V1 from expanding beyond what we could ship`
      ]
    },

    keyMoment: {
      title: 'DashPass Conflict',
      situation: `DashPass leadership pushed to expand scope mid-sprint.`,
      stakes: `A top priority stakeholder could derail or bloat the launch.`,
      myRead: null,
      action: `Aligned 1:1:
• Validated long-term vision
• Anchored on V1 success criteria (protect reorder revenue)
• Committed to a V2 sprint`,
      outcome: `Gained support, later became an advocate, and enabled both V1 success and V2 expansion.`
    },

    whatWeShipped: {
      content: `A unified "Me" surface organizing:
• Reordering (primary driver)
• Identity (DashPass, profile)
• Key actions (orders, settings)

With:
• Smart reorder ranking
• Visual carts
• Governance + integration model`,
      tradeoffs: null,
      comparison: {
        noCard: true,
        before: {
          type: 'image',
          src: '/images/metab-orders-tab.webp',
          alt: 'Orders Tab before Me Tab',
          label: 'Before',
          caption: 'Orders Tab'
        },
        after: {
          type: 'image',
          src: '/images/metab-after-shot.webp',
          alt: 'Me Tab final release',
          label: 'After',
          caption: 'Me Tab'
        }
      }
    },

    impactReflection: {
      metrics: [
        { value: '$148M', label: 'Incremental GOV' },
        { value: '4M', label: 'Incremental orders' },
        { value: '180K', label: 'DashPass subscribers' },
        { value: '4%', label: 'Of marketplace orders' }
      ],
      narrative: null,
      organizationalImpact: null,
      reflection: [
        {
          title: 'Reframing creates leverage across orgs'
        },
        {
          title: 'Clear principles reduce alignment overhead'
        },
        {
          title: 'Protect the core metric first—expand later'
        }
      ],
      closing: null
    }
  }
}
