"use client"

import { useState, useEffect } from "react"
import Draggable from "react-draggable"

const GraphNode = ({ node, isSelected, onClick, onDragEnd }) => {
  const [position, setPosition] = useState({ x: node.x, y: node.y })

  useEffect(() => {
    setPosition({ x: node.x, y: node.y })
  }, [node.x, node.y])

  const getNodeClass = () => {
    let className = "node"
    if (node.isStart) className += " start"
    else if (node.isEnd) className += " end"
    else if (node.isPath) className += " path"
    else if (node.isCurrent) className += " current"
    else if (node.isVisited) className += " visited"
    else if (node.isOpen) className += " open"
    else className += " default"

    if (isSelected) className += " selected"

    return className
  }

  return (
    <Draggable
      position={{ x: position.x - 30, y: position.y - 30 }} // Center the node
      onStop={(e, data) => {
        const newX = data.x + 30 // Add offset back to get center
        const newY = data.y + 30 // Add offset back to get center
        setPosition({ x: newX, y: newY })
        onDragEnd(node.id, newX, newY)
      }}
      bounds="parent"
    >
      <div className={getNodeClass()} onClick={onClick}>
        <div className="node-content">
          <div className="node-id">{node.id}</div>
          {node.f !== Number.POSITIVE_INFINITY && node.f != null && (
            <div className="node-values">
              <span>f:{node.f.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </Draggable>
  )
}

export default GraphNode

