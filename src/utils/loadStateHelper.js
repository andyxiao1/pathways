const edgesAreSame = (first, second) => {
  return (
    (first.to === second.to && first.from === second.from) ||
    (first.to === second.from && first.from === second.from)
  );
};

const addEdgeStyles = edges => {
  let i = 0;
  while (i < edges.length - 2) {
    let currEdge = edges[i];
    let nextEdge = edges[i + 1];

    // check to see if next two edges are the same
    if (edgesAreSame(currEdge, nextEdge)) {
      currEdge['smooth'] = { type: 'curvedCCW', roundness: -0.2 };
      nextEdge['smooth'] = { type: 'curvedCCW', roundness: 0.2 };
      i += 2;
    } else {
      i++;
    }
  }
};

const populatePathwayLists = nodes => {
  let pathwayLists = {
    cities_environments: [],
    gender_sexuality: [],
    culture_life: [],
    global_connections: [],
    slavery_race: [],
    ideas_beliefs: [],
    law_society: [],
    wealth_inequality: [],
    war_revolution: []
  };

  nodes.forEach(node => {
    node.selectedPathways.forEach(pathway => {
      pathwayLists[pathway].push(node.id);
    });
  });

  return pathwayLists;
};

const sortEdgesByToAndFrom = edges => {
  edges.sort((a, b) => {
    if (
      (a.to === b.to && a.from === b.from) ||
      (a.to === b.from && a.from === b.to)
    ) {
      return 0;
    } else {
      return a.to - b.to;
    }
  });
};

const constructEdgeSetFromPathwayLists = (pathwayLists, pathways) => {
  let edges = [];
  let edgeId = 0;
  Object.keys(pathwayLists).forEach(pathway => {
    const currentList = pathwayLists[pathway];
    let prev = currentList[0];
    currentList.forEach((node, index) => {
      if (index === currentList.length || index === 0) {
        return;
      }
      let curr = node;
      const edge = {
        id: edgeId,
        from: prev,
        to: curr,
        color: {
          color: pathways[pathway].color,
          highlight: pathways[pathway].color
        },
        pathway
      };

      edges.push(edge);
      edgeId++;
    });
  });
  return edges;
};

export const parseCoursesIntoNodeSet = courses => {
  let nodes = [];
  Object.keys(courses).forEach(key => {
    const course = courses[key];
    //const color = course.type === 'lecture' ? 'red' : '#D2E5FF';
    const node = {
      id: Number(course.number),
      label: course.number,
      title: course.title,
      description: '',
      selectedPathways: course.selectedPathways
    };
    nodes.push(node);
  });

  return nodes;
};

export const createEdgeSet = (nodes, pathways) => {
  // data structure for edge building, creates arrays of course ids that belong to specific pathway
  let pathwayLists = populatePathwayLists(nodes);
  let edges = constructEdgeSetFromPathwayLists(pathwayLists, pathways);
  sortEdgesByToAndFrom(edges);
  addEdgeStyles(edges);

  edges.sort((a, b) => {
    return a.id - b.id;
  });

  return edges;
};
