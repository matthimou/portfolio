/**
 * Case Studies Data
 * Add your flagship projects here following the Problem → Solution → Impact format
 */

export const caseStudies = [
  {
    id: 'doordash-doubledash',
    status: 'published',
    protected: true,
    meta: {
      title: 'Doubledash',
      client: 'DoorDash',
      timeline: '2022-2025',
      role: 'Director of Design, Core Consumer',
      team: {
        size: 'Led team of 2 designers, 1 researcher, 1 content designer supporting 3 PMs and 15 engineers at peak',
        composition: null
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
      heading: 'Introduction',
      content: 'Doubledash grew from a scrappy MVP into a $1.7B revenue channel over four years. This case study traces that journey, from initial hypothesis through validated product-market fit to a mature platform, to show how I build and lead design teams through ambiguous, high-stakes product challenges over a longer time horizon.',
      contentSecondary: null,
      introHighlights: [
        {
          heading: 'Why It Mattered',
          content: 'Transformed order tracking into one of DoorDash\'s most valuable surfaces while becoming central to DoorDash\'s platform strategy; driving new vertical adoption and increasing order value.'
        },
        {
          heading: 'My Role',
          content: 'Owned E2E delivery experience design.'
        }
      ],
      beforeAfterHeading: null,
      beforeAfterContent: 'While I led the delivery experience charter we transformed it from a simple tool for delivery tracking to a surface as important as the home page, without losing sight of its primary functional job as a tool for customers to track their deliveries.',
      beforeAfterImages: [
        { src: '/images/DeliveryExperienceBefore.png', alt: 'Delivery experience before', label: 'Before', scale: 1.05 },
        { src: '/images/dBdMerchantsInMapPlatform.png', alt: 'Delivery experience after', label: 'After' }
      ],
      contentQuaternary: null,
      videoHeading: 'So what exactly is Doubledash?',
      closing: null,
      video: {
        src: '/images/doubledash-combos.mov',
        caption: null
      },
      closingAfterVideo: `Doubledash made it easy for customers to discover and bundle items from multiple stores into a single delivery.`,
      videoAfterClosing: null,
      closingFinalHeading: 'Where It Started',
      closingFinal: 'In 2021, DoorDash was expanding beyond restaurant delivery into new verticals: convenience, grocery, alcohol. Our data science team identified a compelling signal: approximately 20% of customers were placing a secondary order from 7-Eleven within 30 minutes of their primary meal delivery.',
      closingFinalBelowVideo: true,
      closingFinalSecondary: 'This suggested latent demand for bundling. If we reduced the friction, we could capture orders that were already happening and grow overall marketplace volume.',
      imageFinal: null,
      opportunity: 'DoorDash was betting on becoming a platform, not just a restaurant delivery app. Doubledash was central to that strategy: it would drive adoption of new verticals while increasing order value.',
      opportunityCallout: true
    },
    problem: null,
    solution: {
      heading: 'The Approach',
      strategy: null,
      timeline: [
        {
          date: '3 Months',
          title: 'Discover user needs',
          description: 'Validate customer needs through MVPs',
          sectionHeading: 'Discovering User Needs',
          sectionContent: 'A designer on the New Verticals team proposed the initial test to gauge interest. One design placed bundling in the cart before checkout, the other appeared on the order tracking screen after purchase. We launched with 7-Eleven because they were our data signal source and had a national footprint that let them test across markets quickly. A simple 2-step checkout for the add-on order, and a countdown timer to create urgency around the bundling window.',
          sectionContentSecondary: null,
          sectionImages: {
            images: [
              { src: '/images/DoubledashMVP01.png', alt: 'Doubledash MVP cart placement' },
              { src: '/images/DoubleDashMVP02.png', alt: 'Doubledash MVP order tracking placement' }
            ],
            label: 'MVP Entry Points'
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
          sectionHeadingAfterFlow: 'Foundations',
          sectionContentAfterFlow: 'Responsibility for product design for Doubledash transitioned to my team after the MVP. This was an important opportunity for me to take what was previously a dasher logistics and customer support surface and transform it for commerce. I also started partnering closely with our research team from this point forward, ensuring each phase had the customer signal we needed to make confident decisions. The first thing we did was to reach out to customers who had been exposed to the MVP. Customers were excited about the feature, but they also had real concerns.',
          sectionContentAfterFlowSecondary: null,
          sectionContentAfterFlowTertiary: null,
          concerns: {
            heading: 'Top customer concerns',
            items: [
              {
                category: 'Selection',
                percentage: '52%',
                quotes: ['I don\'t need anything from 7-Eleven']
              },
              {
                category: 'Affordability',
                percentage: '25%',
                quotes: ['What are the fees?', 'How does tipping work?']
              },
              {
                category: 'Expectations',
                percentage: '10%',
                quotes: ['How does this new feature work?']
              }
            ]
          },
          concernsLearnings: null,
          customerQuotes: [
            {
              quote: 'DoorDash is already expensive, I feel guilty adding a second location and more fees.',
              author: 'Sarah H.'
            },
            {
              quote: 'I watched them pick up my pizza first, and wondered if the extra time it would take to deliver meant cold pizza?',
              author: 'Gregory P'
            }
          ],
          sectionClosing: 'Our cart-based test also revealed friction that would require significant engineering work and a longer timeline to fix. Both MVP options had merit, but these insights led us to move forward with the post-purchase approach. It became foundational to the product vision we developed next.'
        },
        {
          date: '1.5 Years',
          title: 'Foundations',
          description: 'Lay robust foundation for shopping',
          sectionContent: null,
          successMetrics: {
            heading: 'Measuring Success',
            intro: 'Where our initial phase focused on learning fast, we now shifted to defining the success metrics that would measure our impact as the product matured.',
            items: [
              {
                type: 'Primary Metric',
                title: 'GMV',
                description: '(Gross Marketplace Volume)'
              },
              {
                type: 'Secondary Metric',
                title: 'Conversion'
              },
              {
                type: 'Secondary Metric',
                title: 'New Verticals Trials'
              }
            ]
          },
          sectionContentAfterMetrics: 'GMV (total sales value) was our north star metric to keep the team focused on growing the channel. Conversion showed how well the shopping experience performed, while New Vertical Trials mattered strategically as we were trying to grow that business. We had learned that customers who tried a new vertical had significantly higher Doordash lifetime value.',
          sectionHeadingSecondary: 'Sprints before planning',
          sectionImageSecondary: {
            src: '/images/PlanningCycleTransparent.png',
            alt: 'Planning cycle diagram'
          },
          sectionContentTertiary: 'As the product was maturing, I moved into a semi-annual planning rhythm. Half-year cycles let us balance long-term goals with tactical execution. I planned and executed cross-functional vision sprints in advance of each Q1 and Q3 planning window. These sprints plugged into the detailed H1 and H2 plans I worked on in collaboration with the engineering and product leads to staff and sequence the work. Getting alignment early ensured our product direction was clear before it fed into broader roadmaps. Translating sprint outputs into funded initiatives required close partnership with product and engineering leadership. I worked directly with our XFN leads to shape the scope and sequencing of each half\'s plan before they were presented to executives. This alignment work happened before each planning cycle, ensuring our design vision had organizational commitment before we moved into detailed execution.',
          sectionContentAfterPlanning: null,
          planningHighlight: {
            heading: 'Sprints Before Planning',
            content: 'This structure enabled my teams to impact and drive product strategy. Having fully prototyped ideas going into formal planning enabled me to work with cross functional leaders to get design-led initiatives on the roadmap.'
          },
          sectionHeadingCrossOrg: 'Governance Before Scaling',
          sectionContentCrossOrg: 'My new partners priorities were to maintain a seamless delivery and support experience, goals we also had to align with. I worked directly with the Senior Director and PM from the delivery tracking team to establish a tiered priority system that protected the primary job-to-be-done (tracking your order) while creating space for commerce.',
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
          sectionContentAfterTiers: 'Placements that ranked in tiers 2 and 3 were ranked against company priority at runtime to ensure a maximum number of messages was never disruptive to order tracking. This framework became the foundation for the governance model we later expanded.',
          governanceHighlight: {
            heading: 'Governance Before Scaling',
            content: 'Without good governance surfaces degrade as more teams add to them. Protecting the surface from bloat is as important as designing it well.'
          },
          sectionContentTeamBuilding: null,
          sectionHeadingTertiary: 'Designing Product Vision',
          sectionContentQuaternary: 'Sprints were a frequent tool I used to help my teams collaborate on product vision. These were cross-functional gatherings to ensure what we produced was aligned with product leadership. I typically wrote the first sprint brief and refined it with my product partners, but over time I would work to transition this to my designers. Coaching them through the process was a mechanism to scale myself, and an opportunity for career development for the designers. Making my team self-sufficient to lead the products they worked on was always the focus.',
          visionQuestions: null,
          sectionHeadingFirstSprint: 'The First Doubledash Sprint',
          sectionContentQuaternarySecondary: 'To demonstrate how I leveraged cross-functional sprints to impact product strategy I\'ll walk through an example. The first sprint we did after the product transitioned to my org the brief focussed on:',
          sprintBriefHighlight: {
            heading: 'Sprint Brief',
            items: [
              'How customers would discover bundling',
              'How we would set proper expectations',
              'How we would support cross-merchant shopping',
              'How we would ensure order tracking was protected'
            ]
          },
          sectionContentAfterBrief: 'We started by mapping out how the delivery timeline was orchestrated with our engineering partner, to see if it revealed any hidden opportunities. This helped my designer get a clearer picture of how to design a more integrated customer journey.',
          sectionContentAfterVision: null,
          sectionImageAfterVision: {
            src: '/images/DoubleDashDeliveryTimeline.png',
            alt: 'Doubledash delivery timeline diagram'
          },
          sectionHeadingAfterTimeline: 'The Sprint Insight',
          sectionContentAfterTimeline: `After placing an order, customers had about ten minutes to add items from another store, but during this time the map wasn't very useful. The dasher hadn't been assigned yet, and even after assignment it took several minutes for them to reach the restaurant. Until then, the map just showed the store and delivery locations with no route.`,
          sectionImageMapInsight: {
            src: '/images/DoorDashMapoInsight.png',
            alt: 'Map insight showing limited utility during early delivery stage'
          },
          sectionContentBeforeVideo: 'This insight became the foundation for a new shopping experience concept. One where customers could browse multiple merchants without leaving the order tracking screen, directly addressing their concerns about selection. By the end of the sprint, we had high-fidelity prototypes to share with the broader team and build support for the direction moving into planning.',
          phoneVideosRow: [
            {
              video: '/images/Doubledash01.mov?v=2',
              alt: 'Doubledash experience on mobile',
              caption: 'Post-order Transition'
            },
            {
              video: '/images/Doubledash02.mov',
              alt: 'Doubledash half-sheet shopping experience',
              caption: 'Setting Expectations'
            },
            {
              video: '/images/Doubledash03.mov',
              alt: 'Doubledash integrated checkout experience',
              caption: 'Integrated Checkout'
            }
          ],
          phoneVideo: null,
          sectionContentAfterVideo: 'The half-sheet struck the right balance: it made discovery prominent without getting in the way of order tracking. Customers who wanted to shop could expand it naturally, while those who didn\'t could ignore it. Setting expectations for how bundling worked and what the fees were was added without cluttering the main view. A simple checkout happened within the half-sheet, so customers could complete their add-on purchase without ever losing visibility into their order. We had a concept coming out of the sprint that directly addressed customer feedback on selection and affordability while setting clear expectations around how the feature worked.',
          sprintInsightHighlight: {
            heading: 'Cross-function Sprints',
            content: 'Including all relevant teams in sprints ensured the design was solving real customer problems and wasn\'t unmoored from organizational priorities.'
          },
          phoneVideoSecondary: null,
          sectionContentAfterVideoSecondary: null,
          phoneVideoTertiary: null,
          sectionContentAfterVideoTertiary: null,
          sectionHeadingQuaternary: 'Concept Testing',
          sectionContentQuinary: 'After the vision sprint, we typically worked with our research team to test the concepts with customers and make adjustments if necessary. In this case the response was overwhelmingly positive and validated that we were solving the problems identified in our initial MVPs.',
          customerQuotesSecondary: [
            {
              category: 'Selection',
              quote: 'With multiple stores to choose from, I\'d be much more likely to try this.',
              author: 'Fuad M'
            },
            {
              category: 'Affordability',
              quote: 'I love that you\'re waiving the delivery fee. I\'m always looking for new ways to save.',
              author: 'Nia S'
            },
            {
              category: 'Expectations',
              quote: 'Breaking down how it works really helps. I wonder if I\'d even try it without this.',
              author: 'Jennifer F'
            }
          ],
          conceptTestingHighlight: {
            heading: 'Customer Research',
            content: 'Validating concepts with customers ensured our ideas solved the customer problems identified in our research while bringing stakeholders along.'
          },
          sectionHeadingScoping: 'Sequencing',
          sectionContentScoping: 'With strong customer validation and alignment across leadership, product, and engineering around the concepts, I would work with cross-functional leadership to break complex efforts like this down into multiple milestones. Walking through this example we planned for three milestones, with the goal to deliver customer value incrementally while building toward the full experience.',
          sectionHeadingMilestone1: 'Milestone 1',
          sectionContentMilestone1: 'Redesigned order tracking module, improving information architecture while preserving what worked. Established governance process to manage growing demand for the surface.',
          sectionImageMilestone1: {
            src: '/images/OrderTrackerRedesign.png',
            alt: 'Order tracking interface redesign'
          },
          sectionHeadingMilestone2: 'Milestone 2',
          sectionImageMilestone2: {
            src: '/images/Milestone2.png',
            alt: 'Milestone 2 bottom-sheet interface'
          },
          sectionContentMilestone2: 'Introduced bottom-sheet with "popular items" carousel per merchant. Limited selection gave engineering time to build scalable inventory system while learning customer preferences.',
          sectionHeadingMilestone3: 'Milestone 3',
          sectionImageMilestone3: {
            src: '/images/Milestone3.png',
            alt: 'Milestone 3 integrated shopping journey'
          },
          sectionContentMilestone3: 'Full vision realized: complete shopping experience in order tracking. Engineering built fast, scalable system working around legacy code constraints.',
          sectionContentCrossPlatform: 'A year and half later we had rolled out the full vision across all platforms, maintaining a consistent experience.',
          sectionImageCrossPlatform: {
            src: '/images/DoubleDashCrossPlatform.png',
            alt: 'Doubledash cross-platform experience',
            caption: 'Cross Platform Doubledash'
          },
          sectionHeadingImpact: 'Impact',
          sectionContentImpact: 'We delivered solid impact from the methodical buildout of the foundations relative to our MVP results.',
          impactImage: {
            src: '/images/ImpactPhase2.png',
            alt: 'Impact Phase 2'
          },
          impactMetrics: [
            { value: '+35%', label: 'lift in conversion' },
            { value: '+400%', label: 'customers browsing items and stores' },
            { value: '+20%', label: 'New Vertical Trials' }
          ],
          myContributions: {
            heading: 'Leadership Approach',
            items: [
              'Defining Success Criteria',
              'Introducing a Planning Rhythm',
              'Governance before scaling',
              'Mentoring Designers For Agency',
              'Sprints Before Planning',
              'Designing Product Strategy/Vision',
              'Customer Insights'
            ]
          }
        },
        {
          date: '1.5 Years',
          title: 'Platform',
          description: 'Scale the experience to habituate customers to cross merchant shopping'
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
      narrative: `The goal shifted from proving the concept to scaling it: making cross-merchant shopping a habit rather than a novelty. We started by expanding contextual merchandising for special occasions and personalized recommendations based on order history. By this point, the senior designer I had been mentoring was promoted to Staff, leading the merchandising expansion. Bringing him into the brief writing process and setting up the sprint cadence allowed me to scale myself and gave him the opportunity to set the strategic focus for each half year.

By this stage the team had grown to 3 PMs and 15 engineers, so helping my designer navigate timelines and priorities became a much bigger part of the challenge. I worked closely with the Senior Director of Consumer product to prioritize across the 3 PMs to ensure my designer had clear visibility into sequencing the work.`,
      scalingMyselfHighlight: {
        heading: 'Scaling Myself',
        content: 'By mentoring and promoting the designer who was leading the charter I was able to empower them to accomplish tasks I needed to own when we started.'
      },
      platformImages: [
        { src: '/images/DbDOccasionPlatform.png', alt: 'Occasion-based merchandising', label: 'Occasions' },
        { src: '/images/DbDDidYouForgetPlatform.png', alt: 'Did you forget feature', label: 'Did You Forget?' },
        { src: '/images/DbDPackagesPlatform.png', alt: 'Package delivery', label: 'Package Delivery' },
        { src: '/images/DbDAlcoholPlatform.png', alt: 'Alcohol delivery', label: 'Alcohol' }
      ],
      headingAfterImages: 'Unifying Order Tracker and Doubledash',
      narrativeAfterImages: 'Unifying the order tracking module and the Doubledash bottom-sheet into a single interface, an idea I proposed to the team, was our most ambitious technical design challenge because it would merge the work of multiple teams into one solution. Having separate modules was requiring more front-end challenges to keep the delivery route / map exposed, and this update would make it much simpler to manage.\n\nTo tackle it, I hired a Principal Designer with deep systems expertise to lead the effort and expand our team\'s capacity. Together with the PM for delivery tracking, we used the opportunity to refactor the code, improve performance, and codify guidelines to keep the architecture clean.',
      imageAfterFirstPara: {
        src: '/images/DbDSingleSheetPlatform.png',
        alt: 'Unified single sheet interface',
        label: 'Combined UI'
      },
      narrativeAfterCombinedUI: 'The governance forum I had established during the Foundations stage became increasingly vital as more teams wanted to build on this surface. We evolved the original guidelines into a comprehensive framework, and the forum met regularly to review proposals and maintain design coherence across a growing number of use cases. With a senior lead who could advise teams we could get in front of problems early, and help teams craft features that met the surface guidelines or explain why their ideas wouldn\'t work.',
      imageAfterNarrative: {
        src: '/images/delivery-surface-guidelines.png',
        alt: 'Delivery surface guidelines',
        label: 'Delivery Surface Guidelines',
        half: true
      },
      principalDesignerHighlight: {
        heading: 'Hiring A Principal Designer',
        content: 'This hire enabled the team to take on even more ambitious work and added capacity to focus on guidelines and governance.'
      },
      headingExpandingUseCases: 'Expanding Doubledash Use Cases',
      narrativeExpandingUseCases: 'To demonstrate the power of governance and guidelines I\'ll quickly walk through some of the additional features we launched to help visualize how we scaled the surface to address customer problems and compound the use cases it supported without compromising on craft or quality. We added incremental ETAs for each merchant, making it clear how the extra stop would affect arrival - a key customer concern we saw in research. To make the default view more relevant, we designed a personalized "For You" feed that pulled from multiple merchants, offering a highly merchandised and relevant default view. For customers who knew exactly what they wanted, we added cross-merchant search. Each new feature completed a new use case to expand the capabilities of the shopping experience compounding our business impact.',
      platformThreeUp: [
        { src: '/images/DbDETAsPlatform.png', alt: 'ETAs platform', label: 'Incremental ETAs' },
        { src: '/images/DbDforyouPlatform.png', alt: 'For You feed', label: 'For You Feed' },
        { src: '/images/DbDSearchPlatform.png', alt: 'Search', label: 'Search' }
      ],
      narrativeFinal: 'We also added merchants directly on the map, letting customers see nearby stores and tap to start shopping. Finally, we came back to our original MVP idea: showing bundling options in the cart. For high-intent moments like Mother\'s Day, this helped customers discover add-ons that weren\'t on the original menu.',
      platformTwoUpThird: [
        { src: '/images/doubledash-mother-day.png', alt: 'Mothers Day promotion', label: 'Mothers Day' },
        { src: '/images/doubledash-deserts.png', alt: 'Deserts promotion', label: 'Deserts' },
        { src: '/images/dBdMerchantsInMapPlatform.png', alt: 'Merchants on map interface', label: 'Merchants on Map' },
        { src: '/images/DbDinCartPlatform.png', alt: 'Doubledash in cart', label: 'Doubledash In Cart' }
      ],
      scalingProductHighlight: {
        heading: 'Scaling the Product',
        content: 'Having a surface governance forum and clear guidelines enabled us to scale the product without compromising on craft.'
      },
      lessonsHeading: 'Learning from Failure',
      lessonsNarrative: 'Not all of our tests worked. In fact, we spent significant effort trying to add bundling to the store page through a series of experiments. Getting creative with staffing I worked with my store page design team for these efforts to reduce the load on my Doubledash designers. Our COO took a particular interest at this stage, so we met twice weekly to workshop approaches directly with him and two senior product directors on the consumer team. These leaders were convinced that to increase Doubledash visibility we needed to get more aggressive higher in the funnel. All these attempts got mixed results: attach rate went up as customers discovered the capability, but cart spend went down due to the disruptive nature. Customers were ordering from multiple stores but spending less.',
      lessonsMediaRow: [
        {
          type: 'image',
          src: '/images/S4Efailure.png',
          alt: 'Something for Everyone store page experiment',
          caption: 'Something for Everyone'
        },
        {
          type: 'video',
          src: '/images/PairingmenuFailure.mov',
          alt: 'Pairing menu experiment',
          caption: 'Pairing Menu'
        },
        {
          type: 'video',
          src: '/images/BottomSheetOnStoreFailure.mov',
          alt: 'Bottom sheet on store page experiment',
          caption: 'Bottom Sheet'
        }
      ],
      lessonsImage: null,
      lessonsNarrativeAfterImage: `I worked with my store page design team for this effort to reduce the load on my Doubledash designer. Our COO took a particular interest in this effort, and wanted to get involved, so for 4 weeks we met twice weekly to workshop approaches directly with them, and two senior product directors on the consumer team. The technical constraints ultimately led to a heavy UI treatment trying to explain the limitation, because the set of nearby stores changed based on which store page the customer was visiting. The tab system meant customers needed to navigate the store content using a bottom nav instead of just scrolling as customers were used to.

We got mixed results: attach rate went up as customers discovered the capability, but cart spend went down. Customers were ordering from multiple stores but spending less, so we rolled it back.

Another experiment was a pairing menu on the menu item details page. I felt this approach lacked the prominence necessary, but the PM pushed to test it. We agreed to do so with guardrails in place to limit the number of customers exposed (by only launching in a couple markets). I'm open to being wrong, and flexible in cases like this. Testing can resolve disagreements efficiently, as long as we limit the blast radius.`,
      lessonsVideo: null,
      lessonsNarrativeAfterVideo: null,
      lessonsVideo02: null,
      lessonsNarrativeAfterVideo02: null,
      lessonsNarrativeConclusion: null,
      lessonsImageConclusion: null,
      lessonsKeyLearning: {
        heading: 'Key Learning',
        content: 'Don\'t disrupt existing customer behaviors in the service of visibility and awareness'
      },
      impactHeading: 'Impact',
      impactNarrative: 'By building incrementally, we delivered meaningful results at each stage. Doubledash achieved results that validated our strategy and compounded over time. By 2025 Doubledash was driving significant results.',
      impactImage02: {
        src: '/images/Impact02.png',
        alt: 'Impact results'
      },
      impactMetrics02: [
        { value: '$1.7B', label: 'annual GMV by 2025' },
        { value: '8%', label: 'of total marketplace volume growth' },
        { value: '22%', label: 'increase in order volume for new verticals' }
      ],
      impactMyContributions: {
        heading: 'Leadership Approach',
        categories: [
          {
            title: null,
            items: [
              'Contributing feature ideas',
              'Design direction and review',
              'Workshoping designs with company leadership',
              'Learning from failure'
            ]
          },
          {
            title: 'Team Health',
            items: [
              'Promoting my Senior designer to Staff',
              'Hiring Doordash\'s first Principal designer',
              'Staffing from other teams at the right time'
            ]
          },
          {
            title: 'Managing Priorities',
            items: [
              'Moving tasks from myself to my team at the right time',
              'Work with skip-level leaders to manage priority conflicts across teams',
              'Sequencing large efforts'
            ]
          },
          {
            title: 'Quality & Craft',
            items: [
              'Establishing a forum for external teams to get in front of problems early',
              'Establishing guidelines for every component on the surface',
              'Enforcing the tiering system we defined'
            ]
          }
        ]
      },
      futureExplorationsHeading: 'Leading With Design',
      futureExplorationsNarrative: 'I always push my teams to stay ahead of product capabilities. The concepts below from sprints I ran on my team before leaving Doordash explored what the future could look like for Doubledash if we brought it to the home page. Giving customers clear visibility into Doubledash and use cases it can serve before placing an order.',
      futureExplorationsImages: [
        { src: '/images/Future01.png', alt: 'Future exploration concept 1' },
        { src: '/images/Future02.png', alt: 'Future exploration concept 2' },
        { src: '/images/Future03.png', alt: 'Future exploration concept 3' },
        { src: '/images/Future04.png', alt: 'Future exploration concept 4' }
      ],
      futureExplorationsImagesLabel: 'Discovery Concepts',
      futureTwoUpNarrative: 'This last concept envisions Doordash as a natively multi-store shopping destination. A cart that can manage items from multiple stores, and a multi-store delivery experience where Doubledashing is just how customers shop.',
      futureTwoUp: [
        { src: '/images/FutureCart.png', alt: 'Future cart concept', type: 'image' },
        { src: '/images/FutureDelivery.mov', alt: 'Future delivery concept', type: 'video' }
      ],
      leadingWithDesignHighlight: {
        heading: 'Leading with Design',
        content: 'A design team that stays ahead of the product can lead rather than follow.'
      },
      futureBeforeAfterHeading: null,
      futureBeforeAfterContent: null,
      futureBeforeAfterImages: null,
      businessImpact: null,
      testimonial: null
    }
  },
  {
    id: 'doordash-metab',
    status: 'published',
    protected: true,
    hiddenFromNav: false,
    meta: {
      title: 'Me Tab',
      client: 'DoorDash',
      timeline: '2024',
      role: 'Director of Design, Core Consumer',
      team: {
        size: 'Led team of 7 designers, 2 researchers, 1 content strategist and 2 PMs to rapidly develop a new surface in 7 weeks',
        composition: null
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
      heading: 'Introduction',
      content: `Me Tab launched to 100% of US customers in 7 weeks and now accounts for 4% of marketplace orders and $2.1B in annual GOV.

DoorDash had no single place for customers to find everything about them: their favorite stores, their loyalty status, their order history, their contributions. These experiences were scattered across the app, each owned by different teams with different goals. When the Discovery team proposed a new surface to shift reorders off the home page, I pushed back: why would this be valuable to customers? That question led us to reframe the problem entirely, and ultimately to ship Me Tab.

This effort aligned with two key company priorities: accelerating DashPass subscriber growth and shifting the home page toward new merchant discovery.`,
      contentSecondary: null,
      contentQuaternary: null,
      videoHeading: null,
      closing: null,
      video: null,
      closingAfterVideo: null,
      videoAfterClosing: null,
      closingFinalHeading: 'The Business Context',
      closingFinal: `The home page was the primary way customers discovered new selection on DoorDash. 50% of purchases originated there, and half of those came from reorders.

But the business was evolving. Data showed a tipping point in customer stickiness after they purchased from 10 unique stores. The home page team's metrics were shifting from volume to new merchant trials, which meant reorder impressions were now competing with discovery.`,
      closingFinalBelowVideo: true,
      closingFinalImage: {
        src: '/images/metab-business-context.png',
        alt: 'Business context diagram showing metrics shift from volume to trials'
      },
      closingFinalSecondary: 'The Product Director for Discovery proposed we build a dedicated reorder surface to de-risk reducing reorder impressions on the home page. The hypothesis was sound from a business perspective, but I wanted to understand the customer value before committing design resources.',
      imageFinal: {
        src: '/images/metab-questioning-brief.png',
        alt: 'Questioning the brief'
      },
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
          sectionContent: 'I did a quick audit of reorder touchpoints across the app. Reordering was present in logical places, but fragmented by context. I partnered with the Product Director to analyze usage data: 45% of reorders happened on the Store Page, 35% on the Home Page, and 20% on the Orders Tab.',
          sectionImagesThreeUp: [
            { src: '/images/metab-home-modules.png', alt: 'Home page reorder modules', label: 'Home Page' },
            { src: '/images/metab-store-page-reorder.png', alt: 'Store page reorder', label: 'Store Page' },
            { src: '/images/metab-orders-tab-reorder.png', alt: 'Orders tab reorder', label: 'Orders Tab' }
          ],
          sectionContentSecondary: `If we wanted a new surface to succeed, it needed top-level access. That meant either adding to global navigation (making everywhere more complicated) or replacing something existing (requiring tests to account for lost prominence). Based on the data and strategy, we decided to try replacing the Orders Tab. Customers were already using it for reorder, but this opened new challenges: we'd need to account for active delivery status, settings and account, and order history.`,
          sectionImages: null,
          sectionClosing: null
        },
        {
          date: null,
          title: null,
          description: null,
          sectionHeading: 'Reframing the Problem',
          sectionContent: `As is often the case in larger organizations, other teams were navigating major shifts at the same time. DashPass, our loyalty program, was buried in account settings. It was the company's top strategic priority with aggressive subscriber growth goals that needed support, but customers couldn't find it. Discovery for non-members was brittle as we relied on ad placements on the home page which could be deprioritized due to other campaigns.`,
          sectionImagesTwoUp: [
            { src: '/images/metab-dashpass-buried01.png', alt: 'DashPass buried in settings', label: 'DashPass Signup' },
            { src: '/images/metab-dashpass-buried02.png', alt: 'DashPass visibility issue', label: 'DashPass Account' }
          ],
          sectionContentAfterImages: `My social team was also exploring a profile surface for content contributors. Another top priority, we were testing multiple social content formats, but contributors had no central place to see their work. Users could see their reviews on the store page, but they were sorted by recency so quickly disappeared.`,
          sectionImagesThreeUp: [
            { src: '/images/metab-social-noprofile01.png', alt: 'Review creation flow', label: 'Review Creation' },
            { src: '/images/metab-social-noprofile02.png', alt: 'Review images', label: 'Review Images' },
            { src: '/images/metab-social-noprofile03.png', alt: 'Store page review', label: 'Store Page Review' }
          ],
          sectionContentAfterThreeUp: `These conversations revealed a bigger opportunity. The problem wasn't just shifting reorder share. There was no single place for customers to go for everything about them. With this reframe, we could unify these disparate concerns under one effort. That's when we gave it the code name that stuck: Me Tab.`,
          sectionOpportunity: 'In today\'s experience there is no single place for customers to go for everything about them. Identity on platform was a growing concern, and we could build a highly personalized experience that solved multiple scaling challenges holistically.',
          fullBleedImage: {
            src: '/images/fullbleed-org-alignment.png',
            alt: 'Cross-org alignment'
          },
          sectionHeadingSecondary: 'Building Cross-Org Alignment',
          sectionContentTertiary: `Pulling this off quickly required support from multiple teams with conflicting goals. For the DashPass and Social teams, the key consideration was visibility, so they would need prominent placement on the new surface. For the Discovery, Orders, and New Vertical teams, it was improving the reorder experience. The Delivery team cared about how active delivery tracking would be handled. Each team had different success metrics, but all would benefit from a unified surface.

I was the DRI (Directly Responsible Individual), reporting to the Senior Director of Consumer Product Design. I had the autonomy to plan and execute this sprint. Leadership would join stakeholder reviews to provide input. I prepared a sprint brief to gain support across the org for a 3-day sprint. My product partner and I identified design and product leads and pulled them in to help shape the brief and plan the sprint.`,
          sectionHeadingTeam: 'The Team',
          sectionTeamImage: {
            src: '/images/metab-team-all.png',
            alt: 'Me Tab sprint team',
            caption: 'Design • Research • Content • Product'
          },
          sectionContentAfterTeam: `The team for the sprint included 6 designers representing each product team, 2 researchers, the consumer content strategy lead, and 2 product managers from the discovery team.

Before the formal sprint, I grabbed the cross-functional group for a few hours of brainstorming and to go over the brief. It can take time for teams with different contexts to develop shared understanding. These informal sessions helped us align before the sprint clock started.`,
          sectionImageAfterTeam: {
            src: '/images/metab-sprint-brainstorm.png',
            alt: 'Sprint brainstorm session'
          },
          sectionContentAfterBrainstorm: 'We emerged from this exercise with a set of principles to guide our work going forward. The principles became the foundational organizing framework for our sprint explorations and gave us an architecture to weigh trade-offs with. We organized them by priority for the new surface, which also helped us resolve early the relative importance of each use case.',
          designPrinciples: [
            {
              image: '/images/metab-ddesign-principle01.png',
              title: 'Find what I care about',
              description: 'A surface to find my go-to stores, reorder my favorite meals or items and find deals from my favorite places.'
            },
            {
              image: '/images/metab-ddesign-principle02.png',
              title: 'Build my identity',
              description: 'A place to build and manage my identity and see how DoorDash has made my life 1% better.'
            },
            {
              image: '/images/metab-ddesign-principle03.png',
              title: 'Access to key flows',
              description: 'A predictable surface to find core app features like order history, settings and my profile.'
            }
          ],
          measuringSuccessHeading: 'Measuring Success',
          measuringSuccessContent: `I defined success metrics with the Product Director before the sprint, specifically to give us negotiating leverage with partner teams. Because DashPass and Social needed prominence, we were concerned the team would be pushed to over-index on identity at the expense of reorder—which would risk our primary goals.`,
          measuringSuccessMetrics: [
            {
              type: 'Primary Metric',
              title: 'GOV',
              description: 'Total order value generated from the surface would keep the team focused on business results, and was the metric the home page team needed us to de-risk.'
            },
            {
              type: 'Secondary Metric',
              title: 'Incremental DashPass Signups',
              description: 'Setting this explicitly helped us negotiate effectively with DashPass and Social when priorities conflicted.'
            },
            {
              type: 'Secondary Metric',
              title: 'Orders Placed',
              description: 'Kept top-of-mind how we were performing relative to the Orders Tab we were replacing.'
            }
          ],
          sprintFullBleedImage: {
            src: '/images/fullbleed-sprint-day02.png',
            alt: 'Sprint overview'
          },
          sprintHeading: 'A 3-Day Sprint',
          sprintDay01Subheading: null,
          sprintDay01Content: `Three days seems fast for a new surface, but speed was the point. We needed alignment before teams could retreat to their corners.

I set up the sprint to build shared context quickly: data science presented reorder analytics, research shared relevant studies, and partner teams presented their strategies. We broke into teams organized by principle to define customer problems before exploring opportunities, resisting the temptation to jump straight to design.`,
          sprintDay01Image: {
            src: '/images/metab-sprint-day01.png',
            alt: 'Sprint Day 01',
            small: true
          },
          sprintDay01ContentAfterImage: `By day two, teams were exploring opportunities against the problems we'd defined. We ran rapid cycles. Two hours on concepts, regroup, brief feedback, return to exploration. One example of how we framed the work:`,
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
            opportunityImage: '/images/metab-oppo-02.png'
          },
          sprintDay02ProblemOpportunity02: null,
          sprintDay02ProblemOpportunity03: null,
          sprintDay02ContentAfterImageSecondary: `When stakeholders reviewed the explorations that afternoon, the breadth of ideas gave us early signals on directions to pursue and built alignment with leadership on the core concept. But it also surfaced a conflict I needed to address.`,
          leadershipHeading: 'Navigating Organizational Tension',
          leadershipContent: `In that first stakeholder review, it was clear the Senior Product Director for DashPass wasn't happy that reorder was getting so much weight. He was disruptive throughout, pushing for things I felt were outside V1 scope.

I recognized this could derail our strategy. If I let this play out, we'd either miss the window or ship something that failed its primary metric. The DashPass designers were being pushed to give identity even more weight, but the version of DashPass he was advocating for wouldn't exist in the product for months. We were launching in seven weeks.

At the end of the review, I asked him to meet privately. The Discovery PM hadn't noticed the conflict, but the DashPass PM confirmed my read. I reminded him we were replacing a significant source of reorder revenue, and if our tests failed we wouldn't get a chance for a V2. I agreed with his longer-term vision, but pointed out that both our metrics and principles reflected V1 priorities. To get him on board, I realized he needed assurance that he would get support for his longer term vision. I committed to run another sprint after initial release to go deeper on his ideas for the next iteration. This lowered the temperature. He agreed to focus on reorders for V1, and later became an advocate for the work.`,
          sprintDay03Subheading: null,
          sprintDay03Content: `On day three, one team focused on page architecture while others refined explorations based on stakeholder feedback. Because we'd organized problems by product category, the solutions were modular—we could see how the surface would come together.`,
          sprintDay03Image: {
            src: '/images/metab-architecture.png',
            alt: 'Page architecture',
            small: true
          },
          sprintDay03ContentAfterImage: `We emerged with key decisions on how the surface would work, a set of modules to flesh out, and aligned stakeholders ready to support the build.`,
          customerFeedbackHeading: 'Customer Validation',
          customerFeedbackContent: `After the sprint, I collapsed the team back to a core group: myself, the design lead, and two PMs. We synthesized the explorations into a cohesive design and worked with research to test the concepts with customers.`,
          customerFeedbackQuotes: [
            {
              quote: 'This makes sense. I never knew DashPass had all these benefits—I guess I never really knew where to look.',
              author: 'Maria P.'
            },
            {
              quote: 'This enables me to quickly scan my past orders visually. I order from the same places a lot, but my carts match my mood that day. Now I can tell them apart.',
              author: 'George W.'
            },
            {
              quote: `I'm usually at the office weekdays, but evenings and weekends I'm ordering at home, so the stores updating like this would save me time.`,
              author: 'Wanda D.'
            }
          ],
          customerFeedbackClosing: `Given the positive feedback, I worked with the design lead to finalize the designs. The reality was if we had uncovered major issues it would have stopped the momentum, which was another validation to keep the designs focussed for V1. We had specs ready for engineering within a week of completing user tests.

All consumer app launches went through the Consumer Product Review, where I served as design approver alongside the Senior Director of Consumer Product. This gave me the visibility to ensure Me Tab met the bar on the first review.`,
          whatWeReleasedHeading: 'What We Released',
          whatWeReleasedImage: {
            src: '/images/metab-release-01.png',
            alt: 'Me Tab release'
          },
          whatWeReleasedContent: `The final design reflected hard trade-offs. Reorder dominated the surface because the metrics demanded it—we were replacing a significant revenue source. DashPass got prominent visibility but not the full membership hub the team wanted; that would come in V2. Social got a foundation to build on, not a destination.`,
          whatWeReleasedPrinciple1Heading: 'Find what I care about',
          whatWeReleasedPrinciple1Image: {
            src: '/images/metab-find.png',
            alt: 'Find what I care about'
          },
          whatWeReleasedPrinciple1Content: `Go-to stores, ranked by time of day, recency, and order frequency, provided easy access to a customer's most frequented stores along with any deals or offers. A Top Orders module displayed previous orders visually so customers could eat with their eyes. Adding a prior order to cart let customers simply tap to keep the items they wanted and proceed.`,
          whatWeReleasedPrinciple2Heading: 'Build my identity',
          whatWeReleasedPrinciple2Image: {
            src: '/images/metab-idenity.png',
            alt: 'Build my identity'
          },
          whatWeReleasedPrinciple2Content: `DashPass membership was front and center, the brand color serving as a strong anchor for the overall surface. We recognized customers by name, communicated their tenure as members, and designed a dynamic messaging component focused on time and money customers saved by using DashPass. The unit used space efficiently while covering primary loyalty needs—and left plenty of room for reorder below. We provide easy access to customers social profile through the in page navigation module, which was expandable for the future.`,
          whatWeReleasedPrinciple3Heading: 'Access to key flows',
          whatWeReleasedPrinciple3Image: {
            src: '/images/metab-maintain-access.png',
            alt: 'Maintain access to key flows'
          },
          whatWeReleasedPrinciple3Content: 'Easy navigation to DashPass account settings for members or signup for non-members. Direct access to order history, and a combined settings/account surface.',
          operationalFrameworkHeading: 'Operational Framework',
          operationalFrameworkContent: `Because we were launching a new surface, it was important to develop guidelines and governance for the larger organization. I worked with the designer and PM to build out a framework, not just for designers, but for operators and product managers. This included surface principles, dos and don'ts, how the feed was structured, and how third-party teams could plug in to get the most out of the surface. We set up a weekly forum where teams could come learn about the new surface, propose features, and get feedback and direction on how to make them fit.`,
          operationalFrameworkImage: {
            src: '/images/metab-framework.png',
            alt: 'Me Tab Framework'
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
      narrative: `In a 5-month holdout, we observed a 0.25% increase in 28-day order frequency that compounded over time—reaching 0.29% by day 84. Me Tab now accounts for ~4% of total marketplace orders and $2.1B in annual GOV on iOS.`,
      metrics: [
        { value: '$148M', label: 'Incremental GOV (5-month holdout)' },
        { value: '4M', label: 'Orders' },
        { value: '180K', label: 'Incremental DashPass Signups' },
        { value: '12%', label: 'MAU placed at least 1 order from surface' }
      ],
      businessImpact: 'Critically, the increase in order frequency came entirely from reorders—new merchant trial rates stayed neutral. Me Tab drove repeat purchases without hurting discovery and exploration. For DashPass, we observed a 2.4% decrease in annual subscription cancellations, and customer savings from fees and exclusive promotions increased by 20 cents per DashPass member.',
      testimonial: null,
      reflectionHeading: 'What I\'d Do Differently',
      reflectionContent: `I recognized during planning that replacing a surface would require extra cross-org alignment. But I addressed it indirectly—through principles and success criteria—rather than confronting it head-on with leadership before the sprint. It wasn't until tension surfaced mid-sprint that I took direct action. My product partner was less tuned in to the political dynamics, so I should have trusted my gut sooner and escalated earlier.

Second, I assigned a senior product designer from the Discovery team to lead design—it was a growth opportunity, and they owned the initiative. But they were working alongside more senior designers from DashPass and Social, and the shift from collating others' work to truly driving the design took more coaching than I anticipated. We got there, but the extra cycles at the start were a cost I could have reduced with more structured support upfront.`
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
        image: '/images/doordash-evidence-dish.png',
        details: 'Leaderboard-style ranking helps surface customer favorites and trending items.'
      },
      {
        id: 'budget-evidence',
        title: 'Great Value Badges',
        description: 'Badging high-value stores for budget-conscious customers with "Great value" leaderboards.',
        thumbnail: '/images/doordash-evidence-hero02.png',
        image: '/images/doordash-evidence-budget.png',
        details: 'Works in conjunction with updated price-per-person metadata to help value-seekers find the right fit.'
      },
      {
        id: 'dietary-evidence',
        title: 'Personalized Dietary Preferences',
        description: 'Prioritize showing dietary tags when we detect certain dietary preferences based on past orders and browsing.',
        thumbnail: '/images/doordash-evidence-hero03.png',
        image: '/images/doordash-evidence-dietary.png',
        details: 'Dishes must meet criteria before being counted as an option. Storepage organization reflects customer preferences.'
      },
      {
        id: 'speed-evidence',
        title: 'Fastest Delivery Indicators',
        description: 'Testing different color treatments to call out speedy stores near the customer.',
        thumbnail: '/images/doordash-evidence-hero04.png',
        image: '/images/doordash-evidence-speed.png',
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
        caption: 'Launch state designs'
      },
      video: {
        src: '/images/groupon-cx90-overview.mp4',
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
