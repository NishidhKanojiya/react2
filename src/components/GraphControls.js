"use client"

import { useState } from "react"

const GraphControls = ({
  isRunning,
  isPaused,
  animationSpeed,
  onRunAlgorithm,
  onTogglePause,
  onStepForward,
  onReset,
  onCreateCustomGraph,
  onSpeedChange,
  onAddNode,
  onAddEdge,
  onSetStartNode,
  onSetEndNode,
  onDeleteNode,
  onDeleteEdge,
  onSetHeuristic,
  onToggleTreeView,
  treeView,
  nodes,
  edges,
}) => {
  const [source, setSource] = useState("")
  const [target, setTarget] = useState("")
  const [weight, setWeight] = useState(1)
  const [startNode, setStartNode] = useState("")
  const [endNode, setEndNode] = useState("")
  const [nodeToDelete, setNodeToDelete] = useState("")
  const [edgeToDelete, setEdgeToDelete] = useState("")
  const [showNodeControls, setShowNodeControls] = useState(true)
  const [showEdgeControls, setShowEdgeControls] = useState(true)
  const [showHeuristicControls, setShowHeuristicControls] = useState(true)
  const [nodeHeuristic, setNodeHeuristic] = useState("")
  const [heuristicValue, setHeuristicValue] = useState(0)

  const handleAddEdge = () => {
    if (source && target && weight > 0) {
      onAddEdge(source, target, weight)
      setSource("")
      setTarget("")
      setWeight(1)
    }
  }

  const handleSetStartNode = () => {
    if (startNode) {
      onSetStartNode(startNode)
      setStartNode("")
    }
  }

  const handleSetEndNode = () => {
    if (endNode) {
      onSetEndNode(endNode)
      setEndNode("")
    }
  }

  const handleDeleteNode = () => {
    if (nodeToDelete) {
      onDeleteNode(nodeToDelete)
      setNodeToDelete("")
    }
  }

  const handleDeleteEdge = () => {
    if (edgeToDelete) {
      onDeleteEdge(edgeToDelete)
      setEdgeToDelete("")
    }
  }

  // Update the handleSetHeuristic function to handle the goal node case better
  const handleSetHeuristic = () => {
    if (nodeHeuristic) {
      const selectedNode = nodes.find((n) => n.id === nodeHeuristic)

      // If this is the goal node, always set h to 0
      if (selectedNode && selectedNode.isEnd) {
        onSetHeuristic(nodeHeuristic, 0)
        setHeuristicValue(0)
      } else if (heuristicValue >= 0) {
        onSetHeuristic(nodeHeuristic, heuristicValue)
        setHeuristicValue(0)
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 mb-2" style={{ flexWrap: "wrap" }}>
        <button className="btn btn-primary" onClick={onRunAlgorithm} disabled={isRunning} style={{ flex: 1 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "4px" }}
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          Run A* Algorithm
        </button>
      </div>

      <div className="flex gap-2 mb-2" style={{ flexWrap: "wrap" }}>
        <button className="btn btn-outline" onClick={onTogglePause} disabled={!isRunning} style={{ flex: 1 }}>
          {isPaused ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "4px" }}
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "4px" }}
            >
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          )}
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button className="btn btn-outline" onClick={onStepForward} disabled={!isRunning} style={{ flex: 1 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "4px" }}
          >
            <polygon points="5 4 15 12 5 20 5 4"></polygon>
            <line x1="19" y1="5" x2="19" y2="19"></line>
          </svg>
          Step
        </button>
      </div>

      <div className="flex gap-2 mb-2" style={{ flexWrap: "wrap" }}>
        <button className="btn btn-outline" onClick={onCreateCustomGraph} disabled={isRunning} style={{ flex: 1 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "4px" }}
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          New Graph
        </button>
        <button className="btn btn-danger" onClick={onReset} style={{ flex: 1 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "4px" }}
          >
            <path d="M23 4v6h-6"></path>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
          </svg>
          Reset
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          className={`btn ${treeView ? "btn-primary" : "btn-outline"}`}
          onClick={onToggleTreeView}
          style={{ flex: 1 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "4px" }}
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          {treeView ? "Graph View" : "Tree View"}
        </button>
      </div>

      <div className="slider-container mb-4">
        <label htmlFor="speed" className="form-label" style={{ minWidth: "80px" }}>
          Speed:
        </label>
        <input
          id="speed"
          type="range"
          min="100"
          max="1000"
          step="100"
          value={animationSpeed}
          onChange={(e) => onSpeedChange(Number.parseInt(e.target.value))}
          style={{ flex: 1 }}
        />
        <span className="slider-value">{animationSpeed}ms</span>
      </div>

      {/* Node Controls */}
      <div className="card" style={{ margin: 0 }}>
        <div className="collapsible-header" onClick={() => setShowNodeControls(!showNodeControls)}>
          <h3 className="card-title-text">Node Controls</h3>
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
            {showNodeControls ? (
              <polyline points="18 15 12 9 6 15"></polyline>
            ) : (
              <polyline points="6 9 12 15 18 9"></polyline>
            )}
          </svg>
        </div>

        <div className="collapsible-content" style={{ maxHeight: showNodeControls ? "1000px" : "0" }}>
          <div className="mb-4">
            <button className="btn btn-primary" onClick={onAddNode} disabled={isRunning} style={{ width: "100%" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "4px" }}
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add New Node
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="startNode" className="form-label">
              Set Start Node:
            </label>
            <div className="flex gap-2">
              <select
                id="startNode"
                value={startNode}
                onChange={(e) => setStartNode(e.target.value)}
                className="form-control"
                disabled={isRunning}
                style={{ flex: 1 }}
              >
                <option value="">Select Node</option>
                {nodes.map((node) => (
                  <option key={`start-${node.id}`} value={node.id}>
                    {node.id}
                  </option>
                ))}
              </select>
              <button className="btn btn-outline" onClick={handleSetStartNode} disabled={!startNode || isRunning}>
                Set
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="endNode" className="form-label">
              Set End Node:
            </label>
            <div className="flex gap-2">
              <select
                id="endNode"
                value={endNode}
                onChange={(e) => setEndNode(e.target.value)}
                className="form-control"
                disabled={isRunning}
                style={{ flex: 1 }}
              >
                <option value="">Select Node</option>
                {nodes.map((node) => (
                  <option key={`end-${node.id}`} value={node.id}>
                    {node.id}
                  </option>
                ))}
              </select>
              <button className="btn btn-outline" onClick={handleSetEndNode} disabled={!endNode || isRunning}>
                Set
              </button>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="deleteNode" className="form-label">
              Delete Node:
            </label>
            <div className="flex gap-2">
              <select
                id="deleteNode"
                value={nodeToDelete}
                onChange={(e) => setNodeToDelete(e.target.value)}
                className="form-control"
                disabled={isRunning}
                style={{ flex: 1 }}
              >
                <option value="">Select Node</option>
                {nodes.map((node) => (
                  <option key={`delete-${node.id}`} value={node.id}>
                    {node.id}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-danger"
                onClick={handleDeleteNode}
                disabled={!nodeToDelete || isRunning}
                style={{ padding: "8px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Heuristic Controls */}
      <div className="card" style={{ margin: 0 }}>
        <div className="collapsible-header" onClick={() => setShowHeuristicControls(!showHeuristicControls)}>
          <h3 className="card-title-text">Heuristic Controls</h3>
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
            {showHeuristicControls ? (
              <polyline points="18 15 12 9 6 15"></polyline>
            ) : (
              <polyline points="6 9 12 15 18 9"></polyline>
            )}
          </svg>
        </div>

        <div className="collapsible-content" style={{ maxHeight: showHeuristicControls ? "1000px" : "0" }}>
          <div className="form-group">
            <label htmlFor="nodeHeuristic" className="form-label">
              Set Node Heuristic:
            </label>
            <div className="flex gap-2 mb-2">
              <select
                id="nodeHeuristic"
                value={nodeHeuristic}
                onChange={(e) => setNodeHeuristic(e.target.value)}
                className="form-control"
                disabled={isRunning}
                style={{ flex: 1 }}
              >
                <option value="">Select Node</option>
                {nodes.map((node) => (
                  <option key={`heuristic-${node.id}`} value={node.id}>
                    {node.id} {node.isEnd ? "(Goal - h=0)" : node.isStart ? "(Start)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <input
                id="heuristicValue"
                type="number"
                min="0"
                step="0.1"
                value={heuristicValue}
                onChange={(e) => setHeuristicValue(Number.parseFloat(e.target.value))}
                className="form-control"
                disabled={isRunning || (nodeHeuristic && nodes.find((n) => n.id === nodeHeuristic)?.isEnd)}
                placeholder="Heuristic value"
                style={{ flex: 1 }}
              />
              <button
                className="btn btn-primary"
                onClick={handleSetHeuristic}
                disabled={
                  !nodeHeuristic || isRunning || (nodeHeuristic && nodes.find((n) => n.id === nodeHeuristic)?.isEnd)
                }
              >
                Set H-Value
              </button>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Note: The goal node's heuristic value is automatically set to 0. The start node's g-value is set to 0.
            </p>
          </div>
        </div>
      </div>

      {/* Edge Controls */}
      <div className="card" style={{ margin: 0 }}>
        <div className="collapsible-header" onClick={() => setShowEdgeControls(!showEdgeControls)}>
          <h3 className="card-title-text">Edge Controls</h3>
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
            {showEdgeControls ? (
              <polyline points="18 15 12 9 6 15"></polyline>
            ) : (
              <polyline points="6 9 12 15 18 9"></polyline>
            )}
          </svg>
        </div>

        <div className="collapsible-content" style={{ maxHeight: showEdgeControls ? "1000px" : "0" }}>
          <div className="form-group">
            <label htmlFor="source" className="form-label">
              Add Edge - From:
            </label>
            <select
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="form-control mb-2"
              disabled={isRunning}
            >
              <option value="">Select Source Node</option>
              {nodes.map((node) => (
                <option key={`source-${node.id}`} value={node.id}>
                  {node.id}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              <label htmlFor="target" className="sr-only">
                To:
              </label>
              <select
                id="target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="form-control"
                disabled={isRunning}
                style={{ flex: 1 }}
              >
                <option value="">Select Target Node</option>
                {nodes.map((node) => (
                  <option key={`target-${node.id}`} value={node.id}>
                    {node.id}
                  </option>
                ))}
              </select>
            </div>

            <label htmlFor="weight" className="form-label">
              Weight:
            </label>
            <div className="flex gap-2">
              <input
                id="weight"
                type="number"
                min="0.1"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(Number.parseFloat(e.target.value))}
                className="form-control"
                disabled={isRunning}
                style={{ flex: 1 }}
              />
              <button
                className="btn btn-primary"
                onClick={handleAddEdge}
                disabled={!source || !target || weight <= 0 || isRunning}
              >
                Add Edge
              </button>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="deleteEdge" className="form-label">
              Delete Edge:
            </label>
            <div className="flex gap-2">
              <select
                id="deleteEdge"
                value={edgeToDelete}
                onChange={(e) => setEdgeToDelete(e.target.value)}
                className="form-control"
                disabled={isRunning}
                style={{ flex: 1 }}
              >
                <option value="">Select Edge</option>
                {edges.map((edge) => (
                  <option key={`delete-${edge.id}`} value={edge.id}>
                    {edge.source} → {edge.target} (Weight: {edge.weight})
                  </option>
                ))}
              </select>
              <button
                className="btn btn-danger"
                onClick={handleDeleteEdge}
                disabled={!edgeToDelete || isRunning}
                style={{ padding: "8px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GraphControls
