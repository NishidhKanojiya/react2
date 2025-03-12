const GraphLegend = () => {
    return (
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: "var(--node-start)" }}></div>
          <span>Start Node</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: "var(--node-end)" }}></div>
          <span>End Node</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: "var(--node-visited)" }}></div>
          <span>Visited Node</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: "var(--node-open)" }}></div>
          <span>Open List</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: "var(--node-current)" }}></div>
          <span>Current Node</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: "var(--node-path)" }}></div>
          <span>Path</span>
        </div>
      </div>
    )
  }
  
  export default GraphLegend
  
  