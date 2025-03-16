const Instructions = () => {
    return (
      <div className="instructions-container">
        <h2 className="mb-4" style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}>
          How to Use the A* Algorithm Visualizer
        </h2>
  
        <h3 className="mb-2" style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "24px" }}>
          Basic Controls
        </h3>
        <ul className="instructions">
          <li>Click "Add New Node" to add a node to the graph</li>
          <li>Drag nodes to position them on the graph</li>
          <li>Use the "Set Start Node" and "Set End Node" dropdowns to designate start and end points</li>
          <li>Set heuristic values for each node (goal node will have h=0 by default)</li>
          <li>Add edges between nodes by selecting source and target nodes and specifying a weight</li>
          <li>Click "Run A* Algorithm" to visualize the pathfinding process</li>
          <li>Use the controls to pause, step through, or reset the visualization</li>
        </ul>
  
        <h3 className="mb-2" style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "24px" }}>
          Understanding the Visualization
        </h3>
        <ul className="instructions">
          <li>
            <strong>Green Node</strong>: Start node (g-value is always 0)
          </li>
          <li>
            <strong>Red Node</strong>: Goal node (h-value is always 0)
          </li>
          <li>
            <strong>Blue Node</strong>: Visited node (already processed)
          </li>
          <li>
            <strong>Light Blue Node</strong>: Node in the open list (to be processed)
          </li>
          <li>
            <strong>Purple Node</strong>: Current node being processed
          </li>
          <li>
            <strong>Yellow Node/Edge</strong>: Part of the final path
          </li>
          <li>
            <strong>Gray Node</strong>: Default node state
          </li>
        </ul>
  
        <h3 className="mb-2" style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "24px" }}>
          Working with Heuristics
        </h3>
        <ul className="instructions">
          <li>The heuristic value (h) represents the estimated cost from a node to the goal</li>
          <li>You can set custom heuristic values for each node using the Heuristic Controls</li>
          <li>The f-value is calculated as f = g + h, where g is the cost from start to the current node</li>
          <li>A* algorithm always selects the node with the lowest f-value from the open list</li>
          <li>For admissible heuristics, the h-value should never overestimate the actual cost to the goal</li>
        </ul>
  
        <h3 className="mb-2" style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "24px" }}>
          Tips
        </h3>
        <ul className="instructions">
          <li>Use the "Create Custom Graph" button to start with a minimal graph</li>
          <li>You can adjust the animation speed to slow down or speed up the visualization</li>
          <li>Click on a step in the Algorithm Steps section to jump to that specific step</li>
          <li>Experiment with different heuristic values to see how they affect the path finding</li>
        </ul>
      </div>
    )
  }
  
  export default Instructions
  
  