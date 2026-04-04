/**
 * Case Studies Data
 * Add your flagship projects here following the Problem → Solution → Impact format
 */

export const caseStudies = [
  {
    id: 'doordash-doubledash',
    protected: false,
    meta: {
      title: 'Doubledash: Multi-Store Shopping',
      client: 'DoorDash',
      timeline: '2021-2025',
      role: 'Director of Design, Core Consumer',
      team: {
        size: null, // e.g., 12
        composition: null // e.g., 'Product design, engineering, data science, product management'
      }
    },
    hero: {
      src: '/images/doubledash-hero.png', // Replace with actual image
      video: null, // Optional: '/images/doubledash-hero-video.mp4'
      alt: 'Doubledash multi-store shopping experience',
      caption: null, // Optional caption below hero
      overlay: null // Optional: { title: 'Doubledash', text: 'Bundle across multiple stores' }
    },
    introduction: {
      heading: 'Introduction',
      content: 'How I approach product evolution over a longer time horizon as a design leader is highly variable. I believe in flexible frameworks over processes. This case study takes a 0-1 example from inception through evolution into a mature product ecosystem to demonstrate how my approach evolves as products mature.',
      contentSecondary: 'Amazing products that customers love don\'t emerge from a single moment of brilliance. They are built piece by piece, brick by brick as teams learn what works with customers and solve complex business problems. With relentless focus and execution, each opportunity to address a new customer need or pain point compounds over time to drive business value.',
            contentQuaternary: 'Vision gives teams a clear strategy to rally behind, makes alignment simpler, and enables teams to work backwards to break down efforts into smaller milestones. This is one of design\'s superpowers, but focussing on vision too early, before teams have a clear understanding of business and customer needs, can easily lead to building the wrong product. It\'s not an either/or proposition, it\'s more of a "yes, and…".',
      videoHeading: 'Understanding Doubledash',
      closing: 'Have you ever craved boba tea after lunch? Wanted to order sushi while the kids demanded McDonalds? Wanted to add a protein to a salad you order, or needed comfort soup and NyQuil to nurse a bad cold?',
      video: {
        src: '/images/doubledash-combos.mov',
        caption: null
      },
      closingAfterVideo: 'Doubledash\'s mission was to make it easy for consumers to discover and bundle across multiple stores.',
      videoAfterClosing: {
        src: '/images/doubledash-bundling.mov?v=2',
        caption: null,
        noShadow: true
      },
      closingFinal: 'The DoorDash marketplace in 2021 was pretty simple. Customers picked a store, added items to their cart, and placed a delivery order. But the marketplace was expanding to support multiple new vertical businesses.',
      closingFinalSecondary: 'Our data science team identified a compelling initial signal that spawned this initiative: approximately 20% of customers were opting to place a secondary order from 7-Eleven within a 30-minute window of their primary meal delivery.',
      imageFinal: {
        src: '/images/ExpandedCategories.png',
        alt: 'DoorDash expanded categories'
      },
      opportunity: 'If we made bundling easier for customers, we could ease the friction of placing a second order, drive attachment rates & gross marketplace volume.'
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
          sectionContent: 'During this phase of product development, we didn\'t have validation of the customer needs, so we optimized for learning velocity. To rapidly validate our hypothesis, we designed 2 minimal effort tests aimed at gauging customer reaction. One placement explored bundling within the cart prior to checkout, while the other utilized the order tracking surface post-purchase. To maintain learning velocity, we launched with 7-Eleven; they were the source of our initial data signal and a key partner whose national footprint enabled us to scale testing across markets with ease.',
          sectionContentSecondary: 'We leveraged our existing store surfaces for the MVP shopping experience despite the lack of optimization. We designed a streamlined 2-step checkout flow for the secondary order and integrated a countdown timer to emphasize the bundling window and drive customer urgency.',
          sectionImages: [
            {
              src: '/images/DoubledashMVP01.png',
              alt: 'Doubledash MVP cart placement',
              label: 'Cart'
            },
            {
              src: '/images/DoubleDashMVP02.png',
              alt: 'Doubledash MVP order tracking placement',
              label: 'Order Tracking'
            }
          ],
          sectionImageFlow: {
            images: [
              { src: '/images/DoubleDashMVPStoreFlow01.png', alt: 'MVP Shopping Experience step 1' },
              { src: '/images/DoubleDashMVPStoreFlow02.png', alt: 'MVP Shopping Experience step 2' },
              { src: '/images/DoubleDashMVPStoreFlow03.png', alt: 'MVP Shopping Experience step 3' },
              { src: '/images/DoubleDashMVPStoreFlow04.png', alt: 'MVP Shopping Experience step 4' }
            ],
            label: 'MVP Shopping Experience'
          },
          sectionContentAfterFlow: 'After running the MVPs we worked with our research partners to reach out to customers who had been exposed to the test and found they were excited about the new feature, but they also had a range of concerns.',
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
          concernsLearnings: [
            {
              title: 'Selection',
              description: 'At DoorDash the importance of selection can\'t be overstated. Taste is highly personal, and it was top concern for customers. If we didn\'t have the right selection customers wouldn\'t use the product. This pointed us towards expanding merchant selection as a key variable for success.'
            },
            {
              title: 'Affordability',
              description: 'We learned customers were confused about what extra fees they would be charged, which caused them to hesitate about placing a second order.'
            },
            {
              title: 'Setting clear Expectations',
              description: 'Bundling was new, and some customers were still struggling to understand how it worked. It was clear our content strategy needed more work.'
            }
          ],
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
          challenges: {
            heading: null,
            description: 'Furthermore, our exploration of the cart-based integration uncovered several nuanced frictions that necessitated a more substantive engineering investment and a longer development horizon to resolve.',
            items: [
              {
                icon: '/images/person-user-line.svg',
                label: 'Cart Disruption'
              },
              {
                icon: '/images/merchant-line.svg',
                label: 'Merchant Concerns'
              },
              {
                icon: '/images/vehicle-bike-line.svg',
                label: 'Delivery Quality'
              }
            ]
          },
          challengesLearnings: [
            {
              title: 'Cart Disruption',
              description: 'We had concerns this would distract customers from placing orders. It also required a high engineering investment because we would have to refactor the code to handle more complex interactions.'
            },
            {
              title: 'Merchant Concerns',
              description: 'We heard from Merchants that customers might get enticed by other products and not order as much. They also raised objections to specific types of selection (from competitors for example).'
            },
            {
              title: 'Delivery Quality',
              description: 'Operating without a committed first order made it significantly harder to forecast the bundle\'s downstream impact on the delivery experience. We realized that having a confirmed order in place provided a much cleaner signal for our logistics models.'
            }
          ],
          sectionClosing: 'Although we felt both MVP options had merit, these insights informed our decision to move forward with the post-purchase approach, and were foundational to the vision for the product we developed next. Getting signal fast had taught us what customers wanted. Informed with data and research insights, we were ready to move to the next stage of product evolution.'
        },
        {
          date: '8 Months',
          title: 'Foundations',
          description: 'Lay robust foundation for shopping',
          sectionHeading: 'Foundations',
          sectionContent: 'With a foundational understanding of customer pain points and a validated strategic path ahead, it was time to pivot toward assembling a cross-functional team capable of sustaining momentum. Unlike our initial phase, which optimized for learning velocity, we shifted our focus to collaborating with product partners to codify the success metrics that would define our impact as the product matured.',
          successMetrics: {
            heading: 'Measuring Success',
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
          sectionContentAfterMetrics: 'Gross Marketplace Volume (GMV) served as our primary success metric—representing the total sales value generated—to keep the team laser-focused on scaling the channel. We also prioritized Conversion and New Vertical Trials as secondary metrics to monitor. While Conversion offered a clear signal on the performance of the shopping experience, New Vertical Trials were a core strategic priority, particularly as we learned that a customer\'s initial trial of a new vertical fundamentally increased their overall DoorDash LTV.',
          sectionHeadingSecondary: 'Planning cycle',
          sectionImageSecondary: {
            src: '/images/PlanningCycleTransparent.png',
            alt: 'Planning cycle diagram'
          },
          sectionContentTertiary: 'As the product ecosystem matured, we integrated our development process into a formalized semi-annual planning cadence. Operating in half-year cycles enabled us to maintain a balance between long-term strategic goals and tactical execution. I spearheaded cross-functional vision sprints ahead of these Q1 and Q3 windows, ensuring that our product trajectory was clearly defined before being integrated into broader roadmaps. A critical component of this evolution was the active participation of product partners; this collaborative approach ensured organizational alignment on the vision, allowing our sprint outcomes to flow seamlessly into the planning process.',
          sectionHeadingTertiary: 'Defining the Product Vision',
          sectionContentQuaternary: 'I initiated a cross-functional vision sprint to define a strategic trajectory for the product, anchored in a brief I authored and refined through collaborative alignment with my product partners. We focused on illuminating the path forward across 3 core workstreams: discovery, the shopping experience, and order tracking.',
          visionQuestions: {
            items: [
              {
                category: 'Discovery',
                question: 'HMW help customers discover, understand & engage with bundling?'
              },
              {
                category: 'ShopEx',
                question: 'HMW make cross-merchant shopping seamless?'
              },
              {
                category: 'Order Tracking',
                question: 'HMW ensure customers can track their order while shopping?'
              }
            ]
          },
          sectionContentAfterVision: 'We began our collaboration by deconstructing the operational mechanics of the delivery timeline, as analyzing core logistics often illuminates hidden strategic opportunities. This deep dive clarified the specific sequence of events leading to secondary dasher assignments. While our workflow requests that the original dasher fulfill the bundled order, this requires a manual acceptance within the dasher experience; though this occurred for 80% of orders, the remaining 20% necessitated the intervention of an additional dasher.',
          sectionImageAfterVision: {
            src: '/images/DoubleDashDeliveryTimeline.png',
            alt: 'Doubledash delivery timeline diagram'
          },
          sectionContentAfterTimeline: 'This deep dive yielded further insights into the orchestration of the experience, enabling us to envision a more integrated consumer journey.\n\nFollowing order placement, Doubledash would trigger its approximately ten-minute countdown window, yet we recognized that the map interface lacked significant utility during this nascent stage of the delivery lifecycle. Because the assignment of the primary dasher and their subsequent transit to the merchant often spanned several minutes, the map remained essentially static—displaying only the store and delivery locations. A dynamic route would only surface once the dasher reached the restaurant and initiated the pickup process.',
          sectionImageMapInsight: {
            src: '/images/DoorDashMapoInsight.png',
            alt: 'Map insight showing limited utility during early delivery stage'
          },
          sectionContentBeforeVideo: 'This foundational insight, surfaced during the early stages of our vision sprint, served as the bedrock for a redefined shopping journey. We envisioned a paradigm that facilitated seamless cross-merchant discovery natively within the half-sheet to address the customer concerns about selection. By the conclusion of the sprint cycle, we had produced high-fidelity prototypes to socialize the vision and galvanize organizational support for the strategic trajectory.',
          phoneVideo: {
            video: '/images/Doubledash01.mov?v=2',
            alt: 'Doubledash experience on mobile',
            caption: 'Post-order Transition'
          },
          sectionContentAfterVideo: 'The half-sheet facilitated an optimal equilibrium, ensuring prominent visibility for discovery without compromising the utility of the delivery tracking experience. This paradigm enabled customers with shopping intent to intuitively expand the component, natively signaling their interest while maintaining the flow of the primary consumer journey.',
          phoneVideoSecondary: {
            video: '/images/Doubledash02.mov',
            alt: 'Doubledash half-sheet shopping experience',
            caption: 'Setting Expectations'
          },
          sectionContentAfterVideoSecondary: 'This refined approach enabled us to iterate on our content strategy, directly addressing customer feedback regarding expectation setting without compromising the core utility of the initial view. By delegating these contextual details to a secondary interaction, we successfully maintained a streamlined primary journey while ensuring that the specific cohort of customers seeking additional clarity had an intuitive path to the information they required.',
          phoneVideoTertiary: {
            video: '/images/Doubledash03.mov',
            alt: 'Doubledash integrated checkout experience',
            caption: 'Integrated Checkout'
          },
          sectionContentAfterVideoTertiary: 'We also conceptualized a natively integrated checkout experience within the half-sheet, facilitating seamless completion of the transaction without necessitating a departure from the core order tracking experience.',
          sectionHeadingQuaternary: 'Customer Reactions',
          sectionContentQuinary: 'Following the completion of the vision sprint, we collaborated with our research partners to conduct concept testing of the proposed designs. The response was overwhelmingly positive, yielding critical insights that directly addressed the foundational frictions identified during our initial MVPs and providing the validation needed to advance our product trajectory.',
          customerQuotesSecondary: [
            {
              category: 'Selection',
              quote: 'With multiple stores to choose from, I\'d be much more likely to try this.',
              author: 'Fuad M'
            },
            {
              category: 'Affordability',
              quote: 'I love that your waving the delivery fee. I\'m always looking for new ways to save.',
              author: 'Nia S'
            },
            {
              category: 'Expectations',
              quote: 'Breaking down how it works really helps. I wonder if I\'d even try it without this.',
              author: 'Jennifer F'
            }
          ],
          sectionHeadingScoping: 'Scoping',
          sectionContentScoping: `Architecting a new and comprehensive shopping and purchase ecosystem presented a substantial developmental effort. While our engineering partners shared the strategic enthusiasm, their excitement was tempered by legitimate technical considerations regarding scope.

The delivery tracking module had evolved into a sophisticated but rigid codebase, having historically accommodated disparate status messaging from multiple product teams. This architectural complexity raised valid concerns that integrating a native shopping experience would necessitate a systemic refactor of the existing tracking logic.

Bolstered by compelling customer resonance and a shared organizational conviction shared by leadership, product and engineering partners we transitioned to deconstructing our long-term vision into a sequence of actionable, manageable milestones.

Consequently, we orchestrated a strategic roadmap to converge on the north star articulated during our vision sprint, deconstructing the effort into three discrete developmental phases.`,
          sectionHeadingMilestone1: 'Milestone 1',
          sectionContentMilestone1: 'Our initial focus centered on a comprehensive redesign of the order tracking module, prioritized to safeguard the integrity of existing JTBD while enhancing the underlying information architecture. Simultaneously, we codified a set of governing principles and integration guidelines to ensure architectural scalability for future product teams as we matured the native shopping experience.',
          sectionImageMilestone1: {
            src: '/images/OrderTrackerRedesign.png',
            alt: 'Order tracking interface redesign'
          },
          sectionHeadingMilestone2: 'Milestone 2',
          sectionImageMilestone2: {
            src: '/images/Milestone2.png',
            alt: 'Milestone 2 bottom-sheet interface'
          },
          sectionContentMilestone2: 'Milestone 2 facilitated the introduction of a refined bottom-sheet interface, featuring a curated "popular carousel" for each merchant; while this strategic decision initially limited selection, it afforded our engineering partners the necessary latitude to architect a robust engine for full inventory display without compromising the experience through added latency.\n\nThis milestone provided a critical early read on post-purchase merchandising opportunities, illuminating the specific categories customers sought to augment their primary orders. We observed that beverages—frequently unavailable at the initial merchant—alongside desserts, treats, and snacks, emerged as the most compelling additions, offering foundational insights into consumer behavior.',
          sectionHeadingMilestone3: 'Milestone 3',
          sectionImageMilestone3: {
            src: '/images/Milestone3.png',
            alt: 'Milestone 3 integrated shopping journey'
          },
          sectionContentMilestone3: `Milestone 3 represented the culmination of our strategic trajectory, as we integrated the comprehensive shopping journey natively within the order tracker, realizing our initial sprint vision.

Our engineering partners successfully architected a performant and scalable system, effectively overcoming the technical constraints of the legacy codebase.

Through each discrete milestone, we delivered significant customer and business value while codifying critical learnings that informed the product's ongoing maturity.`,
          sectionImageCrossPlatform: {
            src: '/images/DoubleDashCrossPlatform.png',
            alt: 'Doubledash cross-platform experience',
            caption: 'Cross Platform Doubledash'
          },
          desktopVideo: {
            src: '/images/DoubledashDesktop.mov',
            caption: 'Desktop Experience'
          },
          sectionHeadingImpact: 'Impact',
          sectionContentImpact: 'After rolling out all 3 milestones, we realized significant impact that validated our strategic trajectory and demonstrated the efficacy of our iterative approach.',
          impactImage: {
            src: '/images/ImpactPhase2.png',
            alt: 'Impact Phase 2'
          },
          impactMetrics: [
            { value: '+35%', label: 'lift in conversion' },
            { value: '+400%', label: 'top of funnel engagement' },
            { value: '+20%', label: 'New Vertical Trials' }
          ]
        },
        {
          date: '1 Year',
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
      heading: 'Platform',
      headingAccent: true,
      metrics: [
        // Add metrics:
        // { label: 'Metric Name', value: '+XX%', context: 'Additional context' }
      ],
      narrative: `To effectively scale the ecosystem and habituate consumers to cross-merchant discovery, we sustained our investment in refining the shopping journey. Our initial results provided a compelling signal that continued focus here would yield substantive compounding returns for the business.

Our initial focus centered on expanding the ecosystem of contextual merchandising to address special occasions and personalized preferences derived from historical order frequency. This evolution enabled us to surface nascent offerings—such as package delivery and alcohol—at high-intent moments within the shopping journey.`, // Results narrative paragraph
      platformImages: [
        { src: '/images/DbDOccasionPlatform.png', alt: 'Occasion-based merchandising', label: 'Occasions' },
        { src: '/images/DbDDidYouForgetPlatform.png', alt: 'Did you forget feature', label: 'Did You Forget?' },
        { src: '/images/DbDPackagesPlatform.png', alt: 'Package delivery', label: 'Package Delivery' },
        { src: '/images/DbDAlcoholPlatform.png', alt: 'Alcohol delivery', label: 'Alcohol' }
      ],
      narrativeAfterImages: 'To streamline the orchestration of disparate order tracking and bottom-sheet modules, we executed a substantive initiative to unify both into a singular, cohesive interface, leveraging this transition as a strategic opportunity to perform a systemic refactor and further optimize performance. Concurrent with this evolution, we codified a set of rigorous guidelines and integration guardrails to maintain architectural integrity as demand for the surface intensified across the organization.',
      narrativeBeforeTwoUp: 'To directly address customer feedback regarding the perceived impact on delivery logistics, we integrated incremental ETAs for each merchant, leveraging this data to enhance transparency and mitigate concerns surrounding arrival expectations.',
      platformTwoUp: [
        { src: '/images/DbDSingleSheetPlatform.png', alt: 'Unified single sheet interface', label: 'Combined UI' },
        { src: '/images/DbDETAsPlatform.png', alt: 'ETAs platform', label: 'Incremental ETAs' }
      ],
      narrativeAfterTwoUp: 'To substantively enhance the relevance of the default view, we architected a personalized, cross-merchant "For You" feed. Furthermore, to accommodate "spearfishers" exhibiting high-intent shopping behaviors, we integrated a robust cross-merchant search.',
      platformTwoUpSecond: [
        { src: '/images/DbDforyouPlatform.png', alt: 'For You feed', label: 'For You Feed' },
        { src: '/images/DbDSearchPlatform.png', alt: 'Search', label: 'Search' }
      ],
      narrativeFinal: `A final set of optimizations within this phase of product evolution involved the native integration of merchants within the map. This paradigm enabled customers to intuitively navigate the multi-merchant landscape, visually contextualizing the spatial proximity of disparate offerings and facilitating a seamless transition to selection through a direct tap interaction.

We revisited our initial MVPs to reintegrate the cross-merchant shopping paradigm natively within the cart surface, identifying a strategic opportunity to address high-intent occasions like Mother's Day. This evolution facilitated the discovery of complimentary selection not previously available on the primary menu, leveraging this high-intent surface to further optimize the consumer journey.`,
      platformTwoUpThird: [
        { src: '/images/dBdMerchantsInMapPlatform.png', alt: 'Merchants on map interface', label: 'Merchants on Map' },
        { src: '/images/DbDinCartPlatform.png', alt: 'Doubledash in cart', label: 'Doubledash In Cart' }
      ],
      impactHeading: 'Impact',
      impactNarrative: 'By constructing our impact piece by piece, we realized a series of substantive outcomes. Across these diverse platform initiatives, Doubledash delivered transformative results that validated our strategy and yielded compounding business value.',
      impactImage02: {
        src: '/images/Impact02.png',
        alt: 'Impact results'
      },
      impactMetrics02: [
        { value: '1.7B', label: 'Gross Merchandising Value' },
        { value: '8%', label: 'of total marketplace volume growth' },
        { value: '22%', label: 'increase in order volume for new verticals' }
      ],
      businessImpact: null, // Business impact statement
      testimonial: null // Optional: { quote: '...', author: 'Name', role: 'Title' }
    }
  },
  {
    id: 'doordash-evidence',
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
