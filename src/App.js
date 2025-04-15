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
      <nav className="app-navbar">
        <div className="navbar-brand">
          <h1>A* Algorithm Graph Visualizer</h1>
        </div>
        <div className="navbar-tabs">
          <button
            className={`navbar-tab ${activeTab === "visualizer" ? "active" : ""}`}
            onClick={() => setActiveTab("visualizer")}
          >
            Visualizer
          </button>
          <button
            className={`navbar-tab ${activeTab === "instructions" ? "active" : ""}`}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </button>
          <button className={`navbar-tab ${activeTab === "info" ? "active" : ""}`} onClick={() => setActiveTab("info")}>
            Algorithm Info
          </button>
        </div>
      </nav>

      <div className="container">
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
      </div>
    </div>
  )
}

export default App
