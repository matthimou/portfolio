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
          poster: '/images/DoubledashWalkthroughFinal02-poster.jpg',
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
          title: 'Compounding growth is a game of inches',
          content: 'Each increment built on the last. Small wins created leverage for larger bets.'
        },
        {
          title: 'Post-purchase before moving up funnel',
          content: 'Although it required engineering work we couldn\'t justify early, I continued in the background to re-envision & refactor so we could relaunch in the cart.'
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
          title: 'Governance enables scale & quality'
        },
        {
          title: 'Behavior > visibility for sustainable growth'
        },
        {
          title: 'Vision ahead of planning gives design leverage'
        }
      ],
      closing: null
    }
  },

  'doordash-metab': {
    impactHook: `Launched in 7 weeks to 100% of US users, driving $148M incremental GOV and 4% of marketplace orders.`,

    strategicContext: {
      content: `DoorDash's home page drove ~50% of orders, and a significant portion were reorders. But new merchant discovery was becoming the strategic priority. We needed to shift impressions from repeat behavior to new merchant trial.

The proposal was to move reorders to a dedicated surface, but I saw a bigger opportunity. Customers had no single place to understand their relationship with DoorDash. Reordering, loyalty, account settings, and identity were fragmented across surfaces.

I reframed the problem: not a reorder feature, but a unified customer layer that could house multiple product needs while solving the home page tension.`,
      insight: `By expanding the frame, we could solve this problem while **creating a platform for multiple teams.**`
    },

    leadershipChallenge: {
      content: `Multiple teams were shifting strategy simultaneously, each needing priority placement to hit their metrics.

Any solution would need to resolve competing priorities, not simply reorganize them. Each team had different success metrics, and all would benefit from, or be threatened by, a unified surface.`,
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
        },
        {
          title: 'New Verticals',
          description: '→ different reorder patterns'
        },
        {
          title: 'Order Experience',
          description: '→ owned Cart & Store pages'
        }
      ]
    },

    fullBleedImage: {
      src: '/images/fullbleed-org-alignment-02.png',
      alt: 'Multiple teams converging on the identity layer'
    },

    howILed: {
      intro: `I drove the work by defining the problem, creating alignment frameworks, and making the calls that kept scope focused.`,
      actions: [
        `**I reframed the problem before anyone started designing.** From "move reorders" → "build a unified customer layer"`,
        {
          text: `**I wrote the sprint brief & established shared metrics & principles.** Enabled faster decisions without constant debate.`,
          goDeeper: {
            to: 'doordash-metab--sprint',
            variant: 'chip',
            label: 'See how principles & metrics shaped the sprint',
            returnTo: 'how-i-led'
          }
        },
        `**I coordinated design and execution across 6 product teams.** Each had unique goals and conflicting needs.`,
        `**I mentored a senior designer to lead.** I provided structure and coaching to ensure success.`,
        `**I held scope under pressure when stakeholders pushed.** Prevented V1 from expanding beyond what we could ship with high quality.`
      ]
    },

    keyMoment: {
      title: 'Resolving the DashPass Conflict',
      situation: `Mid-sprint, the Senior Product Director for DashPass was concerned that reorder was getting too much weight. He pushed for identity and subscription features that were outside V1 scope.`,
      stakes: `DashPass was a top company priority, and this leader had significant organizational influence. The sprint was moving fast, and this could derail the strategy.`,
      myRead: `His concerns were valid long-term. DashPass needed a permanent home, and this surface was the right place for it. But V1 had to prove the concept by maintaining reorder performance.`,
      action: `I needed to acknowledge his vision while keeping the sprint focused. I asked to meet privately, acknowledged his vision, but grounded the conversation in V1 constraints. We were replacing meaningful revenue, and failure would prevent any future investment.

I got his support by committing to a follow-on sprint once we'd proven the foundation.`,
      outcome: `He aligned on the V1 approach and later became an advocate for the work. When Me Tab launched successfully, he referenced our conversation as an example of how cross-org collaboration should work.`
    },

    whatWeShipped: {
      content: null,
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
        },
        goDeeper: {
          to: 'doordash-metab--launched',
          variant: 'chip',
          label: 'See more about what we shipped',
          returnTo: 'what-we-shipped'
        }
      }
    },

    impactReflection: {
      combinedLayout: true,
      impactIntro: 'Launched in 7 weeks to 100% of US users, Me Tab drove $148M incremental GOV and became the foundation for DoorDash\'s customer identity layer.',
      metrics: [
        { value: '$148M', label: 'Incremental GOV' },
        { value: '4M', label: 'Incremental orders' },
        { value: '180K', label: 'DashPass subscribers' },
        { value: '4%', label: 'Of marketplace orders' }
      ],
      narrative: `The lift in order frequency came entirely from reorders - new merchant trial remained neutral. This validated our core bet: we could increase repeat behavior without cannibalizing discovery.

The impact compounded over time. A 5-month holdout showed order frequency lift growing from +0.25% to +0.29% as customers built new habits. At scale, Me Tab drove ~4% of total marketplace orders - representing ~$2.1B in annual GOV on iOS alone.`,
      tradeoffs: [
        {
          title: 'Reorder dominated V1',
          content: 'Replacing significant revenue. DashPass earned visibility but not a full hub yet.'
        },
        {
          title: 'Replaced Orders Tab',
          content: 'Adding a new nav element would add complexity. Orders matched existing mental model.'
        },
        {
          title: 'Identity deferred',
          content: 'Social got a foundation, not a destination.'
        }
      ],
      reflectionLabel: 'Leadership Takeaways',
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
