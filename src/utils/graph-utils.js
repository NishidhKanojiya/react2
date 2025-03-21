export const createDefaultGraph = () => {
  // Create default nodes
  const nodes = [
    {
      id: "1",
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
      id: "2",
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
      id: "3",
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
      id: "4",
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
      id: "5",
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
      id: "6",
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
    { id: "1_2", source: "1", target: "2", weight: 1 },
    { id: "1_4", source: "1", target: "4", weight: 1.5 },
    { id: "2_3", source: "2", target: "3", weight: 1 },
    { id: "2_5", source: "2", target: "5", weight: 1.5 },
    { id: "3_6", source: "3", target: "6", weight: 1.5 },
    { id: "4_5", source: "4", target: "5", weight: 1 },
    { id: "5_6", source: "5", target: "6", weight: 1 },
    { id: "2_4", source: "2", target: "4", weight: 2 },
    { id: "3_5", source: "3", target: "5", weight: 2 },
  ]

  return { nodes, edges }
}

