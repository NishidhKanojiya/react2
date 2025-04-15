"use client"

import React from "react"

const AlgorithmLists = ({ openList, closedList }) => {
  // Add state for expanded/collapsed
  const [expanded, setExpanded] = React.useState(true)

  // Format node for display
  const formatNode = (node) => {
    return `${node.id}(f=${node.f.toFixed(1)}, g=${node.g.toFixed(1)}, h=${node.h.toFixed(1)})`
  }

  return (
    <div className="card">
      <div className="collapsible-header" onClick={() => setExpanded(!expanded)}>
        <h3 className="card-title-text">Algorithm Lists</h3>
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

      <div className="collapsible-content" style={{ maxHeight: expanded ? "1000px" : "0" }}>
        <div className="algorithm-lists">
          <div className="list-section">
            <h4 className="list-title">OPEN List:</h4>
            <div className="list-content">
              {openList.length === 0 ? (
                <span className="empty-list">Empty</span>
              ) : (
                <div className="node-list">
                  {openList.map((node, index) => (
                    <div key={`open-${node.id}-${index}`} className="list-node">
                      {formatNode(node)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="list-section">
            <h4 className="list-title">CLOSED List:</h4>
            <div className="list-content">
              {closedList.length === 0 ? (
                <span className="empty-list">Empty</span>
              ) : (
                <div className="node-list">
                  {closedList.map((node, index) => (
                    <div key={`closed-${node.id}-${index}`} className="list-node">
                      {formatNode(node)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlgorithmLists
