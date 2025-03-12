const AlgorithmInfo = () => {
    return (
      <div className="algorithm-info">
        <h2 className="mb-4" style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}>
          What is A* Algorithm?
        </h2>
        <p className="mb-4">
          A* (pronounced "A-star") is a graph traversal and path search algorithm that is often used in many fields of
          computer science due to its completeness, optimality, and efficiency.
        </p>
        <p className="mb-4">
          It's an informed search algorithm, meaning it uses a heuristic function to guide its search. A* is formulated
          with weighted graphs: starting from a specific starting node, it aims to find a path to the given goal node
          having the smallest cost (least distance traveled, shortest time, etc.).
        </p>
  
        <h3 className="mb-2" style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "24px" }}>
          How A* Works
        </h3>
        <p className="mb-2">
          A* uses a best-first search approach and finds the least-cost path from a given start node to the goal node. It
          uses:
        </p>
        <ul style={{ listStyleType: "disc", paddingLeft: "24px", marginBottom: "16px" }}>
          <li className="mb-2">
            <strong>g(n)</strong>: The exact cost of the path from the starting point to any node n
          </li>
          <li className="mb-2">
            <strong>h(n)</strong>: The heuristic estimated cost from node n to the goal
          </li>
          <li className="mb-2">
            <strong>f(n) = g(n) + h(n)</strong>: The total estimated cost of the path through node n to the goal
          </li>
        </ul>
  
        <h3 className="mb-2" style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "24px" }}>
          Algorithm Steps
        </h3>
        <ol style={{ listStyleType: "decimal", paddingLeft: "24px", marginBottom: "16px" }}>
          <li className="mb-2">
            Initialize the OPEN list with the starting node. The OPEN list contains nodes that need to be examined.
          </li>
          <li className="mb-2">Initialize the CLOSED list as empty. The CLOSED list contains nodes already examined.</li>
          <li className="mb-2">
            While the OPEN list is not empty:
            <ol style={{ listStyleType: "decimal", paddingLeft: "24px", marginTop: "8px" }}>
              <li className="mb-1">
                Find the node with the lowest f(n) value in the OPEN list. Call it the current node.
              </li>
              <li className="mb-1">If the current node is the goal, reconstruct and return the path.</li>
              <li className="mb-1">Move the current node from the OPEN list to the CLOSED list.</li>
              <li className="mb-1">
                For each neighbor of the current node:
                <ol style={{ listStyleType: "decimal", paddingLeft: "24px", marginTop: "4px" }}>
                  <li className="mb-1">If the neighbor is in the CLOSED list, skip it.</li>
                  <li className="mb-1">
                    Calculate the tentative g value (g value of current node + cost to reach neighbor).
                  </li>
                  <li className="mb-1">
                    If the neighbor is not in the OPEN list, add it. If it is, check if the new path is better (lower g
                    value). If so, update its g and f values and its parent.
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <li className="mb-2">If the OPEN list is empty and the goal was never reached, there is no path.</li>
        </ol>
  
        <h3 className="mb-2" style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "24px" }}>
          Heuristic Function
        </h3>
        <p className="mb-2">
          The heuristic function h(n) estimates the cost to reach the goal from node n. For the A* algorithm to find the
          optimal path, the heuristic must be admissible, meaning it never overestimates the actual cost to reach the
          goal.
        </p>
        <p className="mb-2">Common heuristic functions include:</p>
        <ul style={{ listStyleType: "disc", paddingLeft: "24px", marginBottom: "16px" }}>
          <li className="mb-2">
            <strong>Manhattan distance</strong>: Sum of absolute differences in coordinates (useful for grid-based maps)
          </li>
          <li className="mb-2">
            <strong>Euclidean distance</strong>: Straight-line distance between two points
          </li>
          <li className="mb-2">
            <strong>Diagonal distance</strong>: Maximum of absolute differences in coordinates (useful for 8-direction
            movement)
          </li>
        </ul>
      </div>
    )
  }
  
  export default AlgorithmInfo
  
  