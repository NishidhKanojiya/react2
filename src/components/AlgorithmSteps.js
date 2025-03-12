"use client"

import { useState } from "react"

const AlgorithmSteps = ({ steps, currentStep, onStepClick }) => {
  const [expanded, setExpanded] = useState(true)

  if (steps.length === 0) return null

  return (
    <div className="card">
      <div className="collapsible-header" onClick={() => setExpanded(!expanded)}>
        <h3 className="card-title-text">
          Algorithm Steps ({currentStep + 1} of {steps.length})
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {expanded ? <polyline points="18 15 12 9 6 15"></polyline> : <polyline points="6 9 12 15 18 9"></polyline>}
        </svg>
      </div>

      {expanded && (
        <>
          <div className="step active mb-4">
            <p>{steps[currentStep].description}</p>
          </div>

          <h4 className="mb-2" style={{ fontWeight: 500 }}>
            All Steps:
          </h4>
          <div className="algorithm-steps">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`step ${index === currentStep ? "active" : ""}`}
                onClick={() => onStepClick(index)}
              >
                <span className="step-number">{index + 1}</span>
                <span>
                  {step.description.length > 100 ? `${step.description.substring(0, 100)}...` : step.description}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default AlgorithmSteps

