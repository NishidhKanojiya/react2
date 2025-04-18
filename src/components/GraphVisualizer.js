"use client"

import { useState, useRef, useEffect } from "react"
import GraphNode from "./GraphNode"
import GraphEdge from "./GraphEdge"
import GraphControls from "./GraphControls"
import GraphLegend from "./GraphLegend"
import AlgorithmSteps from "./AlgorithmSteps"
import { createDefaultGraph } from "../utils/graph-utils"
import AlgorithmLists from "./AlgorithmLists"

const GraphVisualizer = () => {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [selectedNode, setSelectedNode] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [algorithmSteps, setAlgorithmSteps] = useState([])
  const [animationSpeed, setAnimationSpeed] = useState(500)
  const [pathEdges, setPathEdges] = useState([])
  const [nextNodeId, setNextNodeId] = useState(0)

  const animationTimeoutRef = useRef(null)
  const graphContainerRef = useRef(null)

  // Initialize with default graph
  useEffect(() => {
    const { nodes: defaultNodes, edges: defaultEdges } = createDefaultGraph()
    setNodes(defaultNodes)
    setEdges(defaultEdges)
    setNextNodeId(6) // Start from G (index 6)
  }, [])

  // Auto-advance steps
  useEffect(() => {
    if (isRunning && !isPaused && currentStep < algorithmSteps.length - 1) {
      animationTimeoutRef.current = setTimeout(() => {
        setCurrentStep(currentStep + 1)
      }, animationSpeed)
    }

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [isRunning, isPaused, currentStep, algorithmSteps, animationSpeed])

  // Update path edges when current step changes
  useEffect(() => {
    if (algorithmSteps.length > 0 && currentStep < algorithmSteps.length) {
      const step = algorithmSteps[currentStep]
      if (step.path) {
        const pathEdgeIds = []
        for (let i = 0; i < step.path.length - 1; i++) {
          const source = step.path[i].id
          const target = step.path[i + 1].id
          const edge = edges.find(
            (e) => (e.source === source && e.target === target) || (e.source === target && e.target === source),
          )
          if (edge) {
            pathEdgeIds.push(edge.id)
          }
        }
        setPathEdges(pathEdgeIds)
      }
    }
  }, [currentStep, algorithmSteps, edges])

  // Get start and end nodes
  const getStartNode = () => nodes.find((node) => node.isStart)
  const getEndNode = () => nodes.find((node) => node.isEnd)

  // Handle node click
  const handleNodeClick = (id) => {
    if (isRunning) return
    setSelectedNode(id === selectedNode ? null : id)
  }

  // Handle node drag
  const handleNodeDragEnd = (id, x, y) => {
    setNodes((prevNodes) => prevNodes.map((node) => (node.id === id ? { ...node, x, y } : node)))
  }

  // Add a new node
  const handleAddNode = () => {
    if (isRunning) return

    const containerRect = graphContainerRef.current?.getBoundingClientRect()
    if (!containerRect) return

    const centerX = containerRect.width / 2
    const centerY = containerRect.height / 2

    // Find a position that's not too close to existing nodes
    const newX = centerX + Math.random() * 100 - 50
    const newY = centerY + Math.random() * 100 - 50

    // Generate the next letter (A=65, B=66, etc.)
    const nextLetter = String.fromCharCode(65 + nextNodeId)

    const newNode = {
      id: nextLetter,
      x: newX,
      y: newY,
      isStart: false,
      isEnd: false,
      isVisited: false,
      isPath: false,
      isCurrent: false,
      isOpen: false,
      f: Number.POSITIVE_INFINITY,
      g: Number.POSITIVE_INFINITY,
      h: Number.POSITIVE_INFINITY,
      userDefinedH: false,
      previousNode: null,
    }

    setNodes([...nodes, newNode])
    setNextNodeId(nextNodeId + 1)
  }

  // Add an edge between nodes
  const handleAddEdge = (source, target, weight) => {
    if (isRunning) return

    // Check if edge already exists
    const edgeExists = edges.some(
      (edge) =>
        (edge.source === source && edge.target === target) || (edge.source === target && edge.target === source),
    )

    if (edgeExists) {
      alert("An edge already exists between these nodes")
      return
    }

    const newEdge = {
      id: `${source}_${target}`,
      source,
      target,
      weight,
    }

    setEdges([...edges, newEdge])
  }

  // Set start node
  const handleSetStartNode = (id) => {
    if (isRunning) return

    setNodes(
      nodes.map((node) => ({
        ...node,
        isStart: node.id === id,
      })),
    )
  }

  // Set end node
  const handleSetEndNode = (id) => {
    if (isRunning) return

    setNodes(
      nodes.map((node) => ({
        ...node,
        isEnd: node.id === id,
        // If this is the new end node, set h to 0
        h: node.id === id ? 0 : node.h,
        userDefinedH: node.id === id ? true : node.userDefinedH,
      })),
    )
  }

  // Delete a node
  const handleDeleteNode = (id) => {
    if (isRunning) return

    // Remove the node
    setNodes(nodes.filter((node) => node.id !== id))

    // Remove all edges connected to this node
    setEdges(edges.filter((edge) => edge.source !== id && edge.target !== id))
  }

  // Delete an edge
  const handleDeleteEdge = (id) => {
    if (isRunning) return
    setEdges(edges.filter((edge) => edge.id !== id))
  }

  // Add this function after handleDeleteEdge
  const handleSetHeuristicValue = (id, value) => {
    if (isRunning) return

    setNodes(
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            h: value,
            userDefinedH: true,
          }
        }
        return node
      }),
    )
  }

  // Calculate Euclidean distance heuristic
  const calculateHeuristic = (node, endNode) => {
    // If this is the end node, heuristic is always 0
    if (node.id === endNode.id) {
      return 0
    }

    // If user has defined a heuristic value, use it
    if (node.userDefinedH) {
      return node.h
    }

    // Otherwise calculate using Euclidean distance
    const dx = node.x - endNode.x
    const dy = node.y - endNode.y
    return Math.sqrt(dx * dx + dy * dy) / 100 // Scale down for better visualization
  }

  // Get neighbors of a node
  const getNeighbors = (nodeId) => {
    const neighbors = []

    // Find all edges connected to this node
    edges.forEach((edge) => {
      if (edge.source === nodeId) {
        const targetNode = nodes.find((n) => n.id === edge.target)
        if (targetNode) {
          neighbors.push({ node: targetNode, weight: edge.weight })
        }
      } else if (edge.target === nodeId) {
        const sourceNode = nodes.find((n) => n.id === edge.source)
        if (sourceNode) {
          neighbors.push({ node: sourceNode, weight: edge.weight })
        }
      }
    })

    return neighbors
  }

  // Run A* algorithm
  const runAStar = () => {
    const startNode = getStartNode()
    const endNode = getEndNode()

    if (!startNode || !endNode) {
      alert("Please select both start and end nodes")
      return
    }

    // Reset nodes
    const resetNodes = nodes.map((node) => ({
      ...node,
      isVisited: false,
      isPath: false,
      isCurrent: false,
      isOpen: false,
      f: Number.POSITIVE_INFINITY,
      g: Number.POSITIVE_INFINITY,
      h: node.userDefinedH ? node.h : Number.POSITIVE_INFINITY,
      previousNode: null,
    }))

    setNodes(resetNodes)
    setPathEdges([])

    // Initialize algorithm
    const steps = []
    const openList = []
    const closedList = []

    // Find start and end nodes in the reset nodes array
    const start = resetNodes.find((n) => n.id === startNode.id)
    const end = resetNodes.find((n) => n.id === endNode.id)

    // Initialize start node
    start.g = 0
    start.h = start.userDefinedH ? start.h : calculateHeuristic(start, end)
    start.f = start.g + start.h
    start.isOpen = true
    openList.push(start)

    // Add initial step
    steps.push({
      nodes: JSON.parse(JSON.stringify(resetNodes)),
      openList: [...openList],
      closedList: [...closedList],
      currentNode: null,
      description: `Initialized A* algorithm. Added start node ${start.id} to the OPEN list with f = ${start.f.toFixed(1)} (g = 0, h = ${start.h.toFixed(1)}).`,
    })

    // Main algorithm loop
    while (openList.length > 0) {
      // Sort open list by f value
      openList.sort((a, b) => {
        // First compare by f value
        if (a.f !== b.f) {
          return a.f - b.f
        }
        // If f values are equal, prefer the one with lower h value
        // (this is a common tie-breaking strategy for A*)
        return a.h - b.h
      })

      // Get node with lowest f value
      const current = openList.shift()
      current.isVisited = true
      current.isCurrent = true
      current.isOpen = false
      closedList.push(current)

      // Add step
      steps.push({
        nodes: JSON.parse(JSON.stringify(resetNodes)),
        openList: [...openList],
        closedList: [...closedList],
        currentNode: current,
        description: `Selected node ${current.id} from OPEN list with lowest f value (${current.f.toFixed(1)}) and moved it to CLOSED list.`,
      })

      // Check if we reached the end node
      if (current.id === end.id) {
        // Reconstruct path
        let curr = current
        const path = []

        while (curr) {
          path.unshift(curr)
          curr = curr.previousNode
        }

        // Mark path nodes
        path.forEach((node) => {
          const nodeInResetNodes = resetNodes.find((n) => n.id === node.id)
          if (nodeInResetNodes) {
            nodeInResetNodes.isPath = true
          }
        })

        // Format the path as a string
        const pathString = path.map((node) => node.id).join(" → ")

        // Add final step
        steps.push({
          nodes: JSON.parse(JSON.stringify(resetNodes)),
          openList: [...openList],
          closedList: [...closedList],
          currentNode: current,
          path: path,
          description: `Found path to target node ${end.id}! Path length: ${path.length - 1} steps. Path: ${pathString}`,
        })

        setAlgorithmSteps(steps)
        setCurrentStep(0)
        setIsRunning(true)
        return
      }

      // Get neighbors
      const neighbors = getNeighbors(current.id)
      let neighborDescription = `Exploring neighbors of node ${current.id}:`

      // Process each neighbor
      for (const { node: neighbor, weight } of neighbors) {
        const neighborInResetNodes = resetNodes.find((n) => n.id === neighbor.id)

        if (!neighborInResetNodes) continue

        // Skip if neighbor is in closed list
        if (closedList.some((n) => n.id === neighbor.id)) {
          neighborDescription += ` ${neighbor.id} (skipped, already in CLOSED list);`
          continue
        }

        // Calculate g score
        const tentativeG = current.g + weight

        // Check if neighbor is in open list
        const neighborInOpenList = openList.find((n) => n.id === neighbor.id)

        if (!neighborInOpenList) {
          // Neighbor not in open list, add it
          neighborInResetNodes.g = tentativeG

          // Use user-defined heuristic if available, otherwise calculate
          if (!neighborInResetNodes.userDefinedH) {
            neighborInResetNodes.h = calculateHeuristic(neighborInResetNodes, end)
          }

          neighborInResetNodes.f = neighborInResetNodes.g + neighborInResetNodes.h
          neighborInResetNodes.previousNode = current
          neighborInResetNodes.isOpen = true
          openList.push(neighborInResetNodes)

          neighborDescription += ` Added ${neighbor.id} to OPEN list with f = ${neighborInResetNodes.f.toFixed(1)} (g = ${tentativeG.toFixed(1)}, h = ${neighborInResetNodes.h.toFixed(1)});`
        } else if (tentativeG < neighborInOpenList.g) {
          // Found a better path to neighbor
          neighborDescription += ` Updated ${neighbor.id} in OPEN list with better path (g: ${neighborInOpenList.g.toFixed(1)} → ${tentativeG.toFixed(1)});`
          neighborInOpenList.g = tentativeG
          neighborInOpenList.f = tentativeG + neighborInOpenList.h
          neighborInOpenList.previousNode = current

          // Also update the node in resetNodes
          neighborInResetNodes.g = tentativeG
          neighborInResetNodes.f = tentativeG + neighborInResetNodes.h
          neighborInResetNodes.previousNode = current
        } else {
          neighborDescription += ` ${neighbor.id} (already in OPEN list with better or equal path);`
        }
      }

      // Reset current node flag
      current.isCurrent = false

      // Add step for neighbor exploration
      steps.push({
        nodes: JSON.parse(JSON.stringify(resetNodes)),
        openList: [...openList],
        closedList: [...closedList],
        currentNode: null,
        description: neighborDescription,
      })
    }

    // If open list is empty and we didn't reach the end node
    steps.push({
      nodes: JSON.parse(JSON.stringify(resetNodes)),
      openList: [],
      closedList: [...closedList],
      currentNode: null,
      description: `No path found from ${startNode.id} to ${endNode.id}.`,
    })

    setAlgorithmSteps(steps)
    setCurrentStep(0)
    setIsRunning(true)
  }

  // Reset graph
  const handleReset = () => {
    const { nodes: defaultNodes, edges: defaultEdges } = createDefaultGraph()
    setNodes(defaultNodes)
    setEdges(defaultEdges)
    setNextNodeId(defaultNodes.length + 1)
    setIsRunning(false)
    setIsPaused(false)
    setCurrentStep(0)
    setAlgorithmSteps([])
    setPathEdges([])
    setSelectedNode(null)

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
    }
  }

  // Create a custom graph
  const handleCreateCustomGraph = () => {
    // Create a blank graph with just two nodes
    const customNodes = [
      {
        id: "A",
        x: 150,
        y: 150,
        isStart: true,
        isEnd: false,
        isVisited: false,
        isPath: false,
        isCurrent: false,
        isOpen: false,
        f: Number.POSITIVE_INFINITY,
        g: Number.POSITIVE_INFINITY,
        h: Number.POSITIVE_INFINITY,
        userDefinedH: false,
        previousNode: null,
      },
      {
        id: "B",
        x: 450,
        y: 150,
        isStart: false,
        isEnd: true,
        isVisited: false,
        isPath: false,
        isCurrent: false,
        isOpen: false,
        f: Number.POSITIVE_INFINITY,
        g: Number.POSITIVE_INFINITY,
        h: Number.POSITIVE_INFINITY,
        userDefinedH: false,
        previousNode: null,
      },
    ]

    const customEdges = []

    setNodes(customNodes)
    setEdges(customEdges)
    setNextNodeId(2) // Start from C (index 2)
    setIsRunning(false)
    setIsPaused(false)
    setCurrentStep(0)
    setAlgorithmSteps([])
    setPathEdges([])
    setSelectedNode(null)

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
    }
  }

  // Step forward in the algorithm
  const handleStepForward = () => {
    if (currentStep < algorithmSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsRunning(false)
    }
  }

  // Toggle pause/resume
  const handleTogglePause = () => {
    setIsPaused(!isPaused)
  }

  // Update nodes based on current algorithm step
  useEffect(() => {
    if (!isRunning || currentStep >= algorithmSteps.length) return

    const step = algorithmSteps[currentStep]
    setNodes(step.nodes)
  }, [currentStep, isRunning, algorithmSteps])

  // Modify the createDefaultGraph import to set default heuristic values
  // Add this after the useEffect that initializes with default graph
  useEffect(() => {
    // Set heuristic value of end node to 0
    const endNode = getEndNode()
    if (endNode) {
      handleSetHeuristicValue(endNode.id, 0)
    }
  }, [nodes])

  // Get current step data for the algorithm lists
  const getCurrentStepData = () => {
    if (!isRunning || algorithmSteps.length === 0 || currentStep >= algorithmSteps.length) {
      return { openList: [], closedList: [] }
    }

    const step = algorithmSteps[currentStep]
    return {
      openList: step.openList || [],
      closedList: step.closedList || [],
    }
  }

  return (
    <div className="three-column-layout">
      {/* Left column - Controls */}
      <div className="controls-column">
        <h2 className="column-title">Controls</h2>
        <GraphControls
          isRunning={isRunning}
          isPaused={isPaused}
          animationSpeed={animationSpeed}
          onRunAlgorithm={runAStar}
          onTogglePause={handleTogglePause}
          onStepForward={handleStepForward}
          onReset={handleReset}
          onCreateCustomGraph={handleCreateCustomGraph}
          onSpeedChange={setAnimationSpeed}
          onAddNode={handleAddNode}
          onAddEdge={handleAddEdge}
          onSetStartNode={handleSetStartNode}
          onSetEndNode={handleSetEndNode}
          onDeleteNode={handleDeleteNode}
          onDeleteEdge={handleDeleteEdge}
          onSetHeuristic={handleSetHeuristicValue}
          nodes={nodes}
          edges={edges}
        />
      </div>

      {/* Middle column - Graph Visualization */}
      <div className="graph-column">
        <h2 className="column-title">Graph Visualization</h2>
        <GraphLegend />

        <div ref={graphContainerRef} className="graph-container">
          {/* Render edges */}
          {edges.map((edge) => (
            <GraphEdge key={edge.id} edge={edge} nodes={nodes} isPath={pathEdges.includes(edge.id)} />
          ))}

          {/* Render nodes */}
          {nodes.map((node) => (
            <GraphNode
              key={node.id}
              node={node}
              isSelected={node.id === selectedNode}
              onClick={() => handleNodeClick(node.id)}
              onDragEnd={handleNodeDragEnd}
            />
          ))}
        </div>
      </div>

      {/* Right column - Algorithm Steps and Lists */}
      <div className="algorithm-column">
        <h2 className="column-title">Algorithm Steps and Lists</h2>

        {isRunning && algorithmSteps.length > 0 && (
          <>
            <AlgorithmSteps steps={algorithmSteps} currentStep={currentStep} onStepClick={setCurrentStep} />
            <AlgorithmLists {...getCurrentStepData()} />
          </>
        )}

        {!isRunning && (
          <div className="card">
            <p className="text-center">Run the A* algorithm to see the steps and lists</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default GraphVisualizer
