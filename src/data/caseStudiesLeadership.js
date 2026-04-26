/**
 * Leadership Variant Case Studies
 * Concise format focusing on strategic thinking, organizational navigation,
 * decision quality, and business impact for design leadership hiring managers.
 */

export const leadershipCaseStudies = {
  'doordash-doubledash': {
    impactHook: `Doubledash grew from a scrappy MVP to a $1.7B revenue channel over 3 years. This work transformed order tracking from a passive status view into a core commerce platform, driving 8% of marketplace growth and 22% lift in new vertical adoption.`,

    strategicContext: {
      content: `DoorDash was evolving from a restaurant delivery company into a multi-vertical platform. The New Verticals team noticed a signal: ~20% of customers were placing a second order within 10 minutes of their primary delivery. This revealed latent demand for bundling despite significant friction, and led to [[our initial MVPs|doordash-doubledash--mvp]] to validate bundling demand.

The strategic question wasn't whether bundling could work, it was how to scale it without degrading the core delivery tracking experience that customers relied on.

Order tracking was one of DoorDash's highest-traffic surfaces. Any commerce integration risked cannibalizing the functional value that made customers return. I needed to design a system that captured bundling demand while protecting the integrity of order tracking.`,
      insight: `The opportunity wasn't to add a feature, it was to **transform a utility into a platform without disrupting what was already working.**`
    },

    leadershipChallenge: {
      content: `This wasn't a single-team problem. Doubledash sat at the intersection of multiple organizations with different metrics and competing roadmaps.

Delivery Tracking owned the surface and measured reliability. Commerce teams cared about attach rates and GMV. New Verticals needed cross-category trials. Each team could optimize their metrics at the expense of the others.

As the design leader, I had to create alignment mechanisms that let these teams build together without degrading each other's outcomes, while keeping delivery tracking protected as the foundation.`,
      stakeholders: [
        {
          title: 'Delivery Tracking',
          description: 'Owned the surface. Measured reliability and task completion. Any commerce felt like scope creep.'
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
      intro: `I established the structures and made the calls that enabled this work to scale.`,
      actions: [
        {
          text: `**I introduced governance early.** I partnered with the Senior Director of Delivery to create a tiered priority system that protected order tracking while creating space for commerce. This framework prevented the surface from degrading as teams added to it.`,
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
        `**I drove the work that got us back into the cart.** Early experiments showed cart-based bundling required significant engineering work. I pushed the organization to focus on cart refactoring and drove sprints to redefine the vision for cart, enabling Doubledash to move up-funnel and serve more use cases.`,
        `**I scaled the team to match the ambition.** I promoted my senior designer to Staff and hired DoorDash's first Principal Designer to lead our most complex systems challenge.`,
        `**I escalated failed experiments into strategy shifts.** When high-funnel experiments increased attach rate but dropped cart spend, I worked with leadership to translate those learnings into a behavior-aligned strategy.`
      ]
    },

    keyMoment: {
      title: 'Translating Failure Into Strategy',
      situation: `Our senior director of consumer product took particular interest in expanding Doubledash visibility. For 8 weeks we met twice weekly to workshop approaches with several cross-functional senior product directors. The hypothesis was that embedding cross-merchant options earlier in the flow, on store pages, would increase bundling adoption.`,
      stakes: `This was high-visibility executive attention. The technical constraints led to heavy UI treatments: nearby stores that changed based on which page you visited, a tab system replacing natural scrolling. The risk was shipping something that felt forced and degraded the core ordering experience.`,
      myRead: `The data was clear: attach rate increased but cart spend dropped. We were creating friction in the primary flow to boost a secondary behavior. I needed to translate failure into strategic insight rather than just bad results.`,
      action: `In our final review, I reframed the findings. The experiment proved that the most effective growth comes from amplifying existing behaviors, not interrupting them for greater visibility. I advocated for shifting toward contextual, in-moment merchandising, integrating Doubledash where customers already had intent.

I committed to specific next steps: contextual merchandising for occasions, personalized recommendations, and a "For You" feed. These built on the learning while maintaining momentum.`,
      outcome: `The leaders aligned on the strategy shift. What could have been a failed initiative became the foundation for our platform approach. We rolled back the store page experiments and invested in behavior-aligned surfaces that compounded over time. This marked the transition from feature team to platform team.`,
      goDeeper: {
        to: 'doordash-doubledash--experiment-story',
        variant: 'chip',
        label: 'See the experiments',
        returnTo: 'key-moment'
      }
    },

    whatWeShipped: {
      content: `Over three years, Doubledash evolved from a single-merchant MVP to a full multi-store shopping experience within order tracking.

The final system included: a half-sheet shopping experience that transformed the map into browsable commerce, incremental ETAs per merchant, a personalized "For You" feed, cross-merchant search, contextual bundling for occasions, and full cross-merchant shopping in the cart.`,
      goDeeper: {
        to: 'doordash-doubledash--evolution',
        variant: 'chip',
        label: 'See the product evolution',
        returnTo: 'what-we-shipped'
      },
      tradeoffs: [
        `Governance enabled speed: I prioritized building a tiered review system before scaling, which gave teams clear guidance and prevented surface degradation as more teams built on the surface.`,
        `Post-purchase first, then cart: After the MVPs it was clear the cart option required engineering work we couldn't justify early in the project. Order tracking gave us a faster path to validation. I worked separately with the cart team to redesign & refactor so we could relaunch in the cart.`,
        `Unified interface over separate modules: The architectural complexity of separate surfaces was creating technical debt. I made the call to invest in unification despite the higher initial cost, and hired the talent necessary to make it successful.`
      ],
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
        }
      }
    },

    impactReflection: {
      metrics: [
        { value: '$1.7B', label: 'Annual GMV by 2025' },
        { value: '8%', label: 'Of total marketplace volume growth' },
        { value: '22%', label: 'Increase in new vertical orders' },
        { value: '+35%', label: 'Conversion improvement' }
      ],
      narrative: `By shifting to a behavior-aligned strategy, we scaled Doubledash effectively. The governance framework enabled multiple teams to build on the surface without degrading core tracking. The planning rhythm gave design strategic influence over roadmap decisions.`,
      organizationalImpact: `The team grew from 1 designer to 3 (including DoorDash's first Principal Designer). I promoted my senior designer to Staff and transitioned ownership of sprint planning to them, freeing myself to focus on strategy and cross-org alignment. The governance framework I established became the model for how other high-traffic surfaces were managed.`,
      reflection: [
        {
          title: 'Establishing a forum earlier would have saved cycles',
          content: `I introduced governance without a forum initially. In hindsight, a set of standards without a mechanism that empowered teams to use them could have prevented some early conflicts and set clearer expectations with partner teams from the start.`
        },
        {
          title: 'Principal hire should have come sooner',
          content: `I recognized the need for systems-level design expertise, but didn't build a strong enough case with design leadership, and other requests were prioritized first. Bringing in principle capacity earlier would have raised the quality bar faster and given me more leverage for strategic work.`
        }
      ],
      closing: `This work demonstrated that sustainable growth comes from transforming existing behaviors, not interrupting them, and that design leadership is as much about building organizational structures as it is about crafting experiences.`
    }
  },

  'doordash-metab': {
    impactHook: `Me Tab launched to 100% of US customers in 7 weeks, generating $148M in incremental GMV and driving 4% of total marketplace orders. But when the project started, it wasn't even on the roadmap. It started with a narrower request to "move reorders off the home page."`,

    strategicContext: {
      content: `DoorDash's home page faced a strategic tension: ~50% of orders came from it, and a significant portion were reorders. But new merchant discovery was becoming the strategic priority. The home page team needed to shift impressions from repeat behavior to trial.

The proposed solution was to move reorders to a dedicated surface. But I saw a bigger opportunity: customers had no single place to understand their relationship with DoorDash. Reordering, loyalty, account settings, and identity were fragmented across surfaces.

I reframed the problem: not a reorder feature, but a unified customer layer that could house multiple product needs while solving the home page tension.`,
      insight: `The home page team's problem was real, but their solution was too narrow. **By expanding the frame, we could solve their need while creating a platform for multiple teams.**`
    },

    leadershipChallenge: {
      content: `Multiple teams were shifting strategy simultaneously, each needing priority placement to hit their metrics.

Any solution would need to resolve competing priorities, not simply reorganize them. Each team had different success metrics, and all would benefit from, or be threatened by, a unified surface.`,
      stakeholders: [
        {
          title: 'DashPass',
          description: 'Top company priority, but buried and dependent on home page placements. Needed a permanent home.'
        },
        {
          title: 'Social',
          description: 'Growing content types with no durable presence. Reviews disappeared quickly, contributors had no profile.'
        },
        {
          title: 'Discovery (Home)',
          description: 'Wanted to shift reorder impressions elsewhere without impacting business metrics.'
        },
        {
          title: 'Delivery',
          description: 'Owned the Orders Tab surface but had never thought of it as more than transaction history.'
        },
        {
          title: 'New Verticals',
          description: 'Grocery, alcohol, and convenience needed reorder patterns that differed from restaurant ordering.'
        },
        {
          title: 'Order Experience',
          description: 'Reordering included interactions with Cart and Store pages this team owned.'
        }
      ]
    },

    fullBleedImage: {
      src: '/images/fullbleed-org-alignment-02.png',
      alt: 'Multiple teams converging on the identity layer'
    },

    howILed: {
      intro: `I drove the work by defining the problem, creating alignment mechanisms, and making the calls that kept scope focused.`,
      actions: [
        `**I reframed the problem before anyone started designing.** Instead of "where should reorders live," I shifted to "what should the customer layer be." This expanded the opportunity while maintaining the original goal.`,
        {
          text: `**I wrote the sprint brief and established shared principles.** Principles defined upfront meant tradeoffs could be resolved by framework rather than by whoever argued loudest. Sprint time went to solutions, not priority debates.`,
          goDeeper: {
            to: 'doordash-metab--sprint',
            variant: 'chip',
            label: 'See how principles and metrics shaped the sprint',
            returnTo: 'how-i-led'
          }
        },
        `**I defined success metrics with the Product Director.** GOV as primary metric ensured we optimized for reorder behavior, not just engagement. DashPass subscriptions were secondary - important but not dominant.`,
        `**I coordinated a solution across 6 design & product teams** with unique goals and needs, working across teams to gain alignment in the sprint while maintaining our core bet.`,
        `**I asked a senior designer to lead as a growth opportunity.** Stepping into cross-org leadership was a stretch, but the right development path. I provided structure and coaching to ensure success.`,
        `**I made the call on scope when stakeholders pushed.** When the DashPass PM pushed for ideas outside V1 scope, I met privately, acknowledged his vision, but grounded in V1 goals. I committed to a V2 sprint post-launch to secure his support.`
      ]
    },

    keyMoment: {
      title: 'Resolving the DashPass Conflict',
      situation: `Mid-sprint, the Senior Product Director for DashPass was concerned that reorder was getting too much weight. He pushed for identity and subscription features that were outside V1 scope. The sprint was moving fast, and this could derail the strategy.`,
      stakes: `DashPass was a top company priority, and this leader had significant organizational influence. If he didn't support the direction, the work could stall or the scope could expand beyond what we could ship. We were replacing significant reorder revenue and failure would limit future investment in the surface.`,
      myRead: `His concerns were valid long-term. DashPass needed a permanent home, and this surface was the right place for it. But V1 had to prove the concept by maintaining reorder performance. I needed to acknowledge his vision while keeping the sprint focused.`,
      action: `I asked to meet privately rather than debating in the group. I started by acknowledging his strategic vision. He was right that this surface should eventually be a DashPass hub. But I grounded the conversation in V1 constraints: we were replacing meaningful revenue, and failure would prevent any future investment.

I committed to a dedicated sprint post-launch to explore his ideas for V2. I asked him to support a reorder-focused V1 with the explicit promise that DashPass would get proper attention once we'd proven the foundation.`,
      outcome: `He aligned on the V1 approach and later became an advocate for the work. When Me Tab launched successfully, he referenced our conversation as an example of how cross-org collaboration should work. The V2 sprint delivered on my commitment, and DashPass integration became a core part of the surface.`
    },

    whatWeShipped: {
      content: `We shipped in 7 weeks. The final design organized around three principles: find what I care about (reorder), build my identity (DashPass, profile), and access key flows (orders, settings).

Go-to stores ranked by time, recency, and frequency. Visual carts showing past orders. DashPass anchored the identity layer with recognition and savings. A governance framework and weekly forum for how partner teams integrate without fragmenting the experience.`,
      tradeoffs: [
        `**Reorder dominated V1** We were replacing significant revenue. DashPass earned visibility but not a full hub yet - that came in V2.`,
        `**Replaced Orders Tab** Adding a new nav element would add complexity everywhere. Orders matched existing mental model and gave us a foundation.`,
        `**Identity deferred** Social got a foundation, not a destination. Contributor profiles were easily accessible.`
      ],
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
      },
      goDeeper: {
        to: 'doordash-metab--launched',
        variant: 'chip',
        label: 'See more of what we shipped',
        returnTo: 'what-we-shipped'
      }
    },

    impactReflection: {
      metrics: [
        { value: '$148M', label: 'Incremental GOV (holdout validated)' },
        { value: '4M', label: 'Incremental orders driven' },
        { value: '180K', label: 'Incremental DashPass subscribers' },
        { value: '4%', label: 'Of total marketplace orders' }
      ],
      narrative: `The lift in order frequency came entirely from reorders-new merchant trial remained neutral. This validated our core bet: we could increase repeat behavior without cannibalizing discovery.

In a 5-month holdout, we observed +0.25% lift in 28-day order frequency, growing to +0.29% by day 84. Me Tab accounted for ~4% of total marketplace orders, representing ~$2.1B in annual GOV on iOS.`,
      organizationalImpact: `The sprint model became a template for cross-org initiatives. The governance framework established how partner teams integrated.`,
      reflection: [
        {
          title: 'Align leadership earlier on cross-org tradeoffs',
          content: `I anticipated the need for cross-org alignment but addressed it indirectly through principles and metrics rather than confronting it head-on. When tension surfaced mid-sprint, I had to course-correct. I would have escalated earlier and aligned leaders explicitly on tradeoffs before the sprint began.`
        },
        {
          title: 'Provide more structure when stretching leaders',
          content: `I asked a senior designer to lead the initiative as a growth opportunity. While they succeeded, stepping into cross-org leadership required more upfront structure and coaching than I planned for. I would add clearer expectations and support earlier.`
        }
      ],
      closing: `This work established a durable foundation for how DoorDash organizes customer identity, turning a fragmented set of features into a cohesive system. The reframe - from "move reorders" to "unified customer layer" - was the insight that created space for multiple teams to build together.`
    }
  }
}
