"use client"

import { useRef, useEffect } from "react"

const SpanningTreeVisualizer = ({ nodes, treeData, currentStep }) => {
  const canvasRef = useRef(null)

  // Calculate node positions in the tree layout
  const calculateTreeLayout = (treeData) => {
    if (!treeData || !treeData.root) return { nodes: [], edges: [] }

    const treeNodes = []
    const treeEdges = []

    // Get canvas dimensions
    const canvasWidth = canvasRef.current ? canvasRef.current.width : 500
    const canvasHeight = canvasRef.current ? canvasRef.current.height : 500

    // Calculate the maximum depth of the tree
    const getMaxDepth = (node, depth = 0) => {
      if (!node.children || node.children.length === 0) return depth

      let maxChildDepth = depth
      for (const child of node.children) {
        const childDepth = getMaxDepth(child, depth + 1)
        maxChildDepth = Math.max(maxChildDepth, childDepth)
      }

      return maxChildDepth
    }

    const maxDepth = getMaxDepth(treeData.root)

    // Calculate the width needed for each level
    const levelWidths = {}
    const countNodesAtLevel = (node, level = 0) => {
      if (!levelWidths[level]) levelWidths[level] = 0
      levelWidths[level]++

      if (node.children) {
        for (const child of node.children) {
          countNodesAtLevel(child, level + 1)
        }
      }
    }

    countNodesAtLevel(treeData.root)

    // Position nodes using a breadth-first approach
    const nodePositions = {}
    const levelPositions = {}

    // Initialize level positions
    for (let i = 0; i <= maxDepth; i++) {
      levelPositions[i] = 0
    }

    // BFS to position nodes
    const queue = [{ node: treeData.root, level: 0 }]
    while (queue.length > 0) {
      const { node, level } = queue.shift()

      // Calculate horizontal position
      const levelWidth = levelWidths[level]
      const spacing = canvasWidth / (levelWidth + 1)
      const position = ++levelPositions[level]
      const x = spacing * position

      // Calculate vertical position
      const y = ((level + 1) * canvasHeight) / (maxDepth + 2)

      // Store position
      nodePositions[node.id] = { x, y }

      // Add node to the list
      treeNodes.push({
        id: node.id,
        x,
        y,
        isStart: node.isStart,
        isEnd: node.isEnd,
        isVisited: node.isVisited,
        isPath: node.isPath,
        isCurrent: node.isCurrent,
        isOpen: node.isOpen,
        f: node.f,
        g: node.g,
        h: node.h,
      })

      // Add children to queue
      if (node.children && node.children.length > 0) {
        for (const child of node.children) {
          queue.push({ node: child, level: level + 1 })

          // Add edge
          treeEdges.push({
            id: `${node.id}_${child.id}`,
            source: node.id,
            target: child.id,
            sourceX: x,
            sourceY: y,
            targetX: null, // Will be filled when child is processed
            targetY: null,
            isPath: node.isPath && child.isPath,
          })
        }
      }
    }

    // Fill in edge target positions
    for (const edge of treeEdges) {
      if (nodePositions[edge.target]) {
        edge.targetX = nodePositions[edge.target].x
        edge.targetY = nodePositions[edge.target].y
      }
    }

    return { nodes: treeNodes, edges: treeEdges }
  }

  // Draw the tree on canvas
  useEffect(() => {
    if (!canvasRef.current || !treeData || !treeData.root) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const { nodes: treeNodes, edges: treeEdges } = calculateTreeLayout(treeData)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw edges
    treeEdges.forEach((edge) => {
      if (edge.sourceX !== null && edge.targetX !== null) {
        ctx.beginPath()
        ctx.moveTo(edge.sourceX, edge.sourceY)
        ctx.lineTo(edge.targetX, edge.targetY)
        ctx.strokeStyle = edge.isPath ? "#fbbf24" : "#9ca3af"
        ctx.lineWidth = edge.isPath ? 3 : 2
        ctx.stroke()

        // Draw arrow at the end of the edge
        const angle = Math.atan2(edge.targetY - edge.sourceY, edge.targetX - edge.sourceX)
        const arrowSize = 8

        ctx.beginPath()
        ctx.moveTo(edge.targetX, edge.targetY)
        ctx.lineTo(
          edge.targetX - arrowSize * Math.cos(angle - Math.PI / 6),
          edge.targetY - arrowSize * Math.sin(angle - Math.PI / 6),
        )
        ctx.lineTo(
          edge.targetX - arrowSize * Math.cos(angle + Math.PI / 6),
          edge.targetY - arrowSize * Math.sin(angle + Math.PI / 6),
        )
        ctx.closePath()
        ctx.fillStyle = edge.isPath ? "#fbbf24" : "#9ca3af"
        ctx.fill()
      }
    })

    // Draw nodes
    treeNodes.forEach((node) => {
      ctx.beginPath()
      ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI)

      // Set node color based on state
      if (node.isStart) ctx.fillStyle = "var(--node-start)"
      else if (node.isEnd) ctx.fillStyle = "var(--node-end)"
      else if (node.isPath) ctx.fillStyle = "var(--node-path)"
      else if (node.isCurrent) ctx.fillStyle = "var(--node-current)"
      else if (node.isVisited) ctx.fillStyle = "var(--node-visited)"
      else if (node.isOpen) ctx.fillStyle = "var(--node-open)"
      else ctx.fillStyle = "var(--node-default)"

      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw node ID
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(node.id, node.x, node.y - 5)

      // Draw f, g, h values if they exist
      if (node.f !== undefined && node.f !== Number.POSITIVE_INFINITY) {
        ctx.font = "10px Arial"
        ctx.fillText(`f:${node.f.toFixed(1)}`, node.x, node.y + 10)
      }
      if (node.g !== undefined && node.g !== Number.POSITIVE_INFINITY) {
        ctx.font = "10px Arial"
        ctx.fillText(`g:${node.g.toFixed(1)}`, node.x, node.y + 20)
      }
    })
  }, [treeData, currentStep])

  return (
    <div className="spanning-tree-container">
      <h3 className="card-title-text mb-2">A* Search Tree</h3>
      {treeData && treeData.root ? (
        <canvas ref={canvasRef} width={500} height={500} className="spanning-tree-canvas" />
      ) : (
        <div className="tree-placeholder">
          <p>Run the A* algorithm to generate the search tree</p>
        </div>
      )}
    </div>
  )
}

export default SpanningTreeVisualizer
