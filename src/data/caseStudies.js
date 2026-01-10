/**
 * Case Studies Data
 * Add your flagship projects here following the Problem → Solution → Impact format
 */

export const caseStudies = [
  {
    id: 'groupon-cx90',
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
