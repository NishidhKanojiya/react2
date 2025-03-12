const GraphEdge = ({ edge, nodes, isPath }) => {
    const sourceNode = nodes.find((node) => node.id === edge.source)
    const targetNode = nodes.find((node) => node.id === edge.target)
  
    if (!sourceNode || !targetNode) return null
  
    const dx = targetNode.x - sourceNode.x
    const dy = targetNode.y - sourceNode.y
    const angle = Math.atan2(dy, dx) * (180 / Math.PI)
    const length = Math.sqrt(dx * dx + dy * dy)
  
    return (
      <div
        className={`edge ${isPath ? "path" : ""}`}
        style={{
          left: sourceNode.x,
          top: sourceNode.y,
          width: `${length}px`,
          height: "3px",
          transform: `rotate(${angle}deg)`,
        }}
      >
        <div
          className="edge-weight"
          style={{
            left: length / 2 - 10,
            top: "-12px",
          }}
        >
          {edge.weight}
        </div>
      </div>
    )
  }
  
  export default GraphEdge
  
  