import courses from '../models/courses.json';
import pathways from '../models/pathways.json';
import { mainReducer as reducers } from '../reducers/mainReducer';
import { createStore } from 'redux';
import { createEdgeSet, parseCoursesIntoNodeSet } from './loadStateHelper';

const nodes = parseCoursesIntoNodeSet(courses);
const edges = createEdgeSet(nodes, pathways);

const state = {
  courses,
  pathways,
  graph: {
    nodes,
    edges
  },
  activePathways: [],
  selected: {},
  selectionUpdateOptions: {
    networkSelection: false,
    edgeSelection: false,
    catalogSelection: false
  }
};

export default createStore(reducers, state);
