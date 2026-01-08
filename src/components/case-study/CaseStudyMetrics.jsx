import './CaseStudyMetrics.css'

const CaseStudyMetrics = ({ metrics }) => {
  if (!metrics || metrics.length === 0) return null

  return (
    <div className="case-study-metrics">
      {metrics.map((metric, index) => (
        <div key={index} className="case-study-metrics__item">
          <div className="case-study-metrics__value">{metric.value}</div>
          <div className="case-study-metrics__label">{metric.label}</div>
          {metric.context && (
            <div className="case-study-metrics__context">{metric.context}</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CaseStudyMetrics
