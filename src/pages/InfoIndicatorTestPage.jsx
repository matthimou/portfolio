import InfoIndicator from '../components/ui/InfoIndicator'
import './InfoIndicatorTestPage.css'

/**
 * InfoIndicatorTestPage - Test page for evaluating InfoIndicator variants
 * Accessible at /dev/test/info-indicator (not linked in main navigation)
 */
const InfoIndicatorTestPage = () => {
  return (
    <div className="info-test">
      {/* Dev mode indicator */}
      <div className="info-test__dev-badge">
        DEV TEST
      </div>

      <div className="info-test__container">
        <header className="info-test__header">
          <h1 className="info-test__title">InfoIndicator Component</h1>
          <p className="info-test__subtitle">
            Testing four visual variants with different content types and positions
          </p>
        </header>

        {/* Section 1: Variant Comparison */}
        <section className="info-test__section">
          <h2 className="info-test__section-title">1. Variant Comparison</h2>
          <p className="info-test__description">
            Same content displayed with each variant style. Evaluate which feels most appropriate for the portfolio context.
          </p>

          <div className="info-test__grid">
            {/* Accent Variant */}
            <div className="info-test__card">
              <h3 className="info-test__card-title">
                Variant A: Accent Circle
                <InfoIndicator variant="accent" label="About accent variant">
                  <p><strong>High visibility design</strong></p>
                  <p>Terracotta filled circle with white "i". Best for important callouts that should draw attention.</p>
                </InfoIndicator>
              </h3>
              <p className="info-test__card-description">
                Bold, high-contrast style that draws immediate attention. Uses the primary accent color.
              </p>
            </div>

            {/* Minimal Variant */}
            <div className="info-test__card">
              <h3 className="info-test__card-title">
                Variant B: Minimal Outline
                <InfoIndicator variant="minimal" label="About minimal variant">
                  <p><strong>Subtle integration</strong></p>
                  <p>Outline circle with terracotta "i". Integrates well with body text without overwhelming.</p>
                </InfoIndicator>
              </h3>
              <p className="info-test__card-description">
                Refined, understated style that integrates smoothly with surrounding text.
              </p>
            </div>

            {/* Subtle Variant */}
            <div className="info-test__card">
              <h3 className="info-test__card-title">
                Variant C: Subtle Background
                <InfoIndicator variant="subtle" label="About subtle variant">
                  <p><strong>Maximum subtlety</strong></p>
                  <p>Soft background with muted text. Nearly invisible until needed, perfect for dense information.</p>
                </InfoIndicator>
              </h3>
              <p className="info-test__card-description">
                Nearly invisible until interaction, maximum subtlety for information-dense contexts.
              </p>
            </div>

            {/* Icon Variant */}
            <div className="info-test__card">
              <h3 className="info-test__card-title">
                Variant D: Line Icon
                <InfoIndicator variant="icon" label="About icon variant">
                  <p><strong>Clean line icon</strong></p>
                  <p>Uses custom SVG icon with no background. Ideal for inline use where you want the icon to feel like part of the text.</p>
                </InfoIndicator>
              </h3>
              <p className="info-test__card-description">
                Custom SVG line icon, transparent background. Clean and minimal, blends with text.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Size Variations */}
        <section className="info-test__section">
          <h2 className="info-test__section-title">2. Size Variations</h2>
          <p className="info-test__description">
            Each variant in small, medium, and large sizes.
          </p>

          <div className="info-test__size-row">
            <div className="info-test__size-group">
              <span className="info-test__size-label">Small (16px)</span>
              <div className="info-test__size-demos">
                <InfoIndicator variant="accent" size="sm" label="Small accent">
                  <p>Small size works well inline with body text.</p>
                </InfoIndicator>
                <InfoIndicator variant="minimal" size="sm" label="Small minimal">
                  <p>Small size works well inline with body text.</p>
                </InfoIndicator>
                <InfoIndicator variant="subtle" size="sm" label="Small subtle">
                  <p>Small size works well inline with body text.</p>
                </InfoIndicator>
                <InfoIndicator variant="icon" size="sm" label="Small icon">
                  <p>Small size works well inline with body text.</p>
                </InfoIndicator>
              </div>
            </div>

            <div className="info-test__size-group">
              <span className="info-test__size-label">Medium (20px)</span>
              <div className="info-test__size-demos">
                <InfoIndicator variant="accent" size="md" label="Medium accent">
                  <p>Medium is the default size, balanced for most contexts.</p>
                </InfoIndicator>
                <InfoIndicator variant="minimal" size="md" label="Medium minimal">
                  <p>Medium is the default size, balanced for most contexts.</p>
                </InfoIndicator>
                <InfoIndicator variant="subtle" size="md" label="Medium subtle">
                  <p>Medium is the default size, balanced for most contexts.</p>
                </InfoIndicator>
                <InfoIndicator variant="icon" size="md" label="Medium icon">
                  <p>Medium is the default size, balanced for most contexts.</p>
                </InfoIndicator>
              </div>
            </div>

            <div className="info-test__size-group">
              <span className="info-test__size-label">Large (24px)</span>
              <div className="info-test__size-demos">
                <InfoIndicator variant="accent" size="lg" label="Large accent">
                  <p>Large size for headings or prominent callouts.</p>
                </InfoIndicator>
                <InfoIndicator variant="minimal" size="lg" label="Large minimal">
                  <p>Large size for headings or prominent callouts.</p>
                </InfoIndicator>
                <InfoIndicator variant="subtle" size="lg" label="Large subtle">
                  <p>Large size for headings or prominent callouts.</p>
                </InfoIndicator>
                <InfoIndicator variant="icon" size="lg" label="Large icon">
                  <p>Large size for headings or prominent callouts.</p>
                </InfoIndicator>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Content Types */}
        <section className="info-test__section">
          <h2 className="info-test__section-title">3. Content Types</h2>
          <p className="info-test__description">
            Testing text-only, image-only, and mixed content in popups.
          </p>

          <div className="info-test__content-grid">
            {/* Text Only */}
            <div className="info-test__content-item">
              <h4>Text Only</h4>
              <p>
                Users wanted faster checkout
                <InfoIndicator variant="accent" label="Research insight">
                  <p><strong>Research Insight</strong></p>
                  <p>73% of users in our research sessions mentioned checkout speed as a primary pain point. Session recordings showed an average of 4.2 minutes spent on checkout, with 23% cart abandonment.</p>
                </InfoIndicator>
              </p>
            </div>

            {/* Image Only */}
            <div className="info-test__content-item">
              <h4>Image Only</h4>
              <p>
                The interaction pattern
                <InfoIndicator variant="minimal" maxWidth={400} label="View interaction diagram">
                  <img
                    src="/images/caseStudies/doubledash/before-after.png"
                    alt="Before and after comparison of the interface"
                  />
                </InfoIndicator>
              </p>
            </div>

            {/* Mixed Content */}
            <div className="info-test__content-item">
              <h4>Mixed Content</h4>
              <p>
                Team collaboration
                <InfoIndicator variant="subtle" maxWidth={360} label="Team details">
                  <p><strong>Cross-functional Team</strong></p>
                  <img
                    src="/images/caseStudies/doubledash/hero-image.png"
                    alt="Product screenshot"
                    style={{ marginBottom: '8px' }}
                  />
                  <p>Worked with 2 engineers, 1 PM, and stakeholders from marketing and ops to align on requirements and ship iteratively.</p>
                </InfoIndicator>
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Position Testing */}
        <section className="info-test__section">
          <h2 className="info-test__section-title">4. Position Testing</h2>
          <p className="info-test__description">
            Testing auto-positioning near viewport edges and manual position overrides.
          </p>

          <div className="info-test__position-grid">
            <div className="info-test__position-item info-test__position-item--top-left">
              <span>Top-left edge</span>
              <InfoIndicator variant="accent" position="auto" label="Auto-position test">
                <p>This popup should automatically position to avoid going off-screen. It detects available space and chooses the best direction.</p>
              </InfoIndicator>
            </div>

            <div className="info-test__position-item info-test__position-item--top-right">
              <span>Top-right edge</span>
              <InfoIndicator variant="minimal" position="auto" label="Auto-position test">
                <p>This popup should automatically position to avoid going off-screen. It detects available space and chooses the best direction.</p>
              </InfoIndicator>
            </div>

            <div className="info-test__position-item info-test__position-item--bottom-left">
              <span>Bottom-left edge</span>
              <InfoIndicator variant="subtle" position="auto" label="Auto-position test">
                <p>This popup should automatically position to avoid going off-screen. It detects available space and chooses the best direction.</p>
              </InfoIndicator>
            </div>

            <div className="info-test__position-item info-test__position-item--bottom-right">
              <span>Bottom-right edge</span>
              <InfoIndicator variant="accent" position="auto" label="Auto-position test">
                <p>This popup should automatically position to avoid going off-screen. It detects available space and chooses the best direction.</p>
              </InfoIndicator>
            </div>

            <div className="info-test__position-item info-test__position-item--center">
              <span>Center (manual positions)</span>
              <div className="info-test__manual-positions">
                <InfoIndicator variant="accent" position="top" label="Force top">
                  <p>Forced to appear above (position="top")</p>
                </InfoIndicator>
                <InfoIndicator variant="minimal" position="bottom" label="Force bottom">
                  <p>Forced to appear below (position="bottom")</p>
                </InfoIndicator>
                <InfoIndicator variant="subtle" position="left" label="Force left">
                  <p>Forced to appear left (position="left")</p>
                </InfoIndicator>
                <InfoIndicator variant="accent" position="right" label="Force right">
                  <p>Forced to appear right (position="right")</p>
                </InfoIndicator>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Integration Examples */}
        <section className="info-test__section">
          <h2 className="info-test__section-title">5. Integration Examples</h2>
          <p className="info-test__description">
            Real-world usage scenarios showing how the component integrates with typical content.
          </p>

          {/* In paragraph */}
          <div className="info-test__example">
            <h4>Inline with paragraph text</h4>
            <p className="info-test__example-paragraph">
              The redesign reduced checkout time by 47%
              <InfoIndicator variant="minimal" size="sm" label="Methodology">
                <p><strong>How we measured this</strong></p>
                <p>Compared median checkout completion times from 2,000 sessions before and after launch. Excluded outliers beyond 2 standard deviations.</p>
              </InfoIndicator>
              and increased conversion rate from 2.1% to 3.4%. We achieved this through progressive disclosure
              <InfoIndicator variant="minimal" size="sm" label="About progressive disclosure">
                <p>Progressive disclosure means showing only essential information upfront, with details available on demand. This reduces cognitive load while keeping information accessible.</p>
              </InfoIndicator>
              and streamlined form validation.
            </p>
          </div>

          {/* In heading */}
          <div className="info-test__example">
            <h4>Within section headings</h4>
            <h3 className="info-test__example-heading">
              Research Methodology
              <InfoIndicator variant="accent" size="md" label="Research details">
                <p><strong>12 participants</strong></p>
                <p>Mix of power users and new customers, recruited through our customer panel. 45-minute moderated sessions with think-aloud protocol.</p>
              </InfoIndicator>
            </h3>
            <p>We conducted usability testing across three rounds...</p>
          </div>

          {/* In stats */}
          <div className="info-test__example">
            <h4>With metrics and stats</h4>
            <div className="info-test__stats">
              <div className="info-test__stat">
                <span className="info-test__stat-value">47%</span>
                <span className="info-test__stat-label">
                  Faster checkout
                  <InfoIndicator variant="subtle" size="sm" label="Checkout metric details">
                    <p>Median time from cart to confirmation reduced from 4.2 to 2.2 minutes</p>
                  </InfoIndicator>
                </span>
              </div>
              <div className="info-test__stat">
                <span className="info-test__stat-value">62%</span>
                <span className="info-test__stat-label">
                  Less support tickets
                  <InfoIndicator variant="subtle" size="sm" label="Support metric details">
                    <p>Checkout-related support tickets dropped from 340/week to 130/week</p>
                  </InfoIndicator>
                </span>
              </div>
              <div className="info-test__stat">
                <span className="info-test__stat-value">+1.3%</span>
                <span className="info-test__stat-label">
                  Conversion lift
                  <InfoIndicator variant="subtle" size="sm" label="Conversion metric details">
                    <p>Absolute increase from 2.1% to 3.4% conversion rate (62% relative improvement)</p>
                  </InfoIndicator>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Accessibility Testing */}
        <section className="info-test__section">
          <h2 className="info-test__section-title">6. Accessibility Checklist</h2>
          <div className="info-test__checklist">
            <div className="info-test__check">
              <span className="info-test__check-icon">✓</span>
              <span>Keyboard navigation: Tab to focus, Enter/Space to toggle, Escape to close</span>
            </div>
            <div className="info-test__check">
              <span className="info-test__check-icon">✓</span>
              <span>ARIA attributes: aria-expanded, aria-haspopup, role="tooltip"</span>
            </div>
            <div className="info-test__check">
              <span className="info-test__check-icon">✓</span>
              <span>Focus management: Returns focus to trigger on Escape</span>
            </div>
            <div className="info-test__check">
              <span className="info-test__check-icon">✓</span>
              <span>Reduced motion: Animations disabled when prefers-reduced-motion is set</span>
            </div>
            <div className="info-test__check">
              <span className="info-test__check-icon">✓</span>
              <span>Touch support: Tap to open, tap outside to close</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default InfoIndicatorTestPage
