export const createDefaultGraph = () => {
  // Create default nodes
  const nodes = [
    {
      id: "A",
      x: 150,
      y: 100,
      isStart: true,
      isEnd: false,
      isVisited: false,
      isPath: false,
      isCurrent: false,
      isOpen: false,
      f: Number.POSITIVE_INFINITY,
      g: 0, // Start node g-value is 0
      h: Number.POSITIVE_INFINITY,
      userDefinedH: false,
      previousNode: null,
    },
    {
      id: "B",
      x: 300,
      y: 150,
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
    },
    {
      id: "C",
      x: 450,
      y: 100,
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
    },
    {
      id: "D",
      x: 150,
      y: 250,
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
    },
    {
      id: "E",
      x: 300,
      y: 300,
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
    },
    {
      id: "F",
      x: 450,
      y: 250,
      isStart: false,
      isEnd: true,
      isVisited: false,
      isPath: false,
      isCurrent: false,
      isOpen: false,
      f: Number.POSITIVE_INFINITY,
      g: Number.POSITIVE_INFINITY,
      h: 0, // End node h-value is 0
      userDefinedH: true,
      previousNode: null,
    },
  ]

  // Create default edges
  const edges = [
    { id: "A_B", source: "A", target: "B", weight: 1 },
    { id: "A_D", source: "A", target: "D", weight: 1.5 },
    { id: "B_C", source: "B", target: "C", weight: 1 },
    { id: "B_E", source: "B", target: "E", weight: 1.5 },
    { id: "C_F", source: "C", target: "F", weight: 1.5 },
    { id: "D_E", source: "D", target: "E", weight: 1 },
    { id: "E_F", source: "E", target: "F", weight: 1 },
    { id: "B_D", source: "B", target: "D", weight: 2 },
    { id: "C_E", source: "C", target: "E", weight: 2 },
  ]

  return { nodes, edges }
}
