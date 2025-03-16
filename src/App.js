"use client"

import { useState } from "react"
import GraphVisualizer from "./components/GraphVisualizer"
import AlgorithmInfo from "./components/AlgorithmInfo"
import Instructions from "./components/Instructions"
import "./App.css"

function App() {
  const [activeTab, setActiveTab] = useState("visualizer")

  return (
    <div className="app">
      <header className="app-header">
        <h1>A* Algorithm Graph Visualizer</h1>
        <p>Create a graph, set start and end nodes, and visualize the A* pathfinding algorithm</p>
      </header>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "visualizer" ? "active" : ""}`}
          onClick={() => setActiveTab("visualizer")}
        >
          Visualizer
        </button>
        <button
          className={`tab ${activeTab === "instructions" ? "active" : ""}`}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </button>
        <button className={`tab ${activeTab === "info" ? "active" : ""}`} onClick={() => setActiveTab("info")}>
          Algorithm Info
        </button>
      </div>

      <main className="container">
        {activeTab === "visualizer" ? (
          <GraphVisualizer />
        ) : activeTab === "instructions" ? (
          <div className="info-container">
            <Instructions />
          </div>
        ) : (
          <div className="info-container">
            <AlgorithmInfo />
          </div>
        )}
      </main>
    </div>
  )
}

export default App

