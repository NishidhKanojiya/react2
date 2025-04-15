const AlgorithmLists = ({ openList, closedList }) => {
    // Format node for display
    const formatNode = (node) => {
      return `${node.id}(f=${node.f.toFixed(1)}, g=${node.g.toFixed(1)}, h=${node.h.toFixed(1)})`
    }
  
    return (
      <div className="card">
        <div className="collapsible-header">
          <h3 className="card-title-text">Algorithm Lists</h3>
        </div>
  
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
    )
  }
  
  export default AlgorithmLists
  