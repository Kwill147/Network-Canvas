import { maxBy, reject, findIndex, isMatch, isArray, omit } from 'lodash';

const ADD_NODES = 'ADD_NODES';
const REMOVE_NODE = 'REMOVE_NODE';
const UPDATE_NODE = 'UPDATE_NODE';
const TOGGLE_NODE_ATTRIBUTES = 'TOGGLE_NODE_ATTRIBUTES';
const ADD_EDGE = 'ADD_EDGE';
const TOGGLE_EDGE = 'TOGGLE_EDGE';
const REMOVE_EDGE = 'REMOVE_EDGE';
const SET_EGO = 'SET_EGO';
const UNSET_EGO = 'UNSET_EGO';

const initialState = {
  ego: {},
  nodes: [],
  edges: [],
};

// We use these internally to uniquely identify nodes accross previous data / network data
export function nextUid(nodes, index = 1) {
  return `${Date.now()}_${nodes.length + index}`;
}

// We use these internally to uniquely identify nodes accross network data only
// (previous data is immutable)
function nextId(nodes) {
  if (nodes.length === 0) { return 1; }
  return maxBy(nodes, 'id').id + 1;
}

function flipEdge(edge) {
  return { from: edge.to, to: edge.from, type: edge.type };
}

function edgeExists(edges, edge) {
  return (
    findIndex(edges, edge) !== -1 ||
    findIndex(edges, flipEdge(edge)) !== -1
  );
}

function getNodesWithBatchAdd(oldNodes, newNodes, additionalAttributes) {
  let nodes = oldNodes;
  newNodes.forEach((newNode) => {
    const id = nextId(nodes);
    const uid = nextUid(nodes);
    // Provided uid can override generated one, but not id
    nodes = [...nodes, { uid, ...newNode, ...additionalAttributes, id }];
  });
  return nodes;
}

function getUpdatedNodes(nodes, updatedNode, full) {
  const updatedNodes = nodes.map((node) => {
    if (node.uid !== updatedNode.uid) { return node; }

    if (full) {
      return {
        ...updatedNode,
        id: node.id,
        uid: node.uid,
      };
    }

    return {
      ...node,
      ...updatedNode,
      id: node.id,
      uid: node.uid,
    };
  });
  return updatedNodes;
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_NODES: {
      return {
        ...state,
        nodes: getNodesWithBatchAdd(state.nodes, action.nodes, action.additionalAttributes),
      };
    }
    case TOGGLE_NODE_ATTRIBUTES: {
      const attributes = omit(action.attributes, ['uid', 'id']);

      const updatedNodes = state.nodes.map((node) => {
        if (node.uid !== action.uid) { return node; }

        if (isMatch(node, attributes)) {
          return omit(node, Object.getOwnPropertyNames(attributes));
        }

        return {
          ...node,
          ...action.attributes,
        };
      });

      return {
        ...state,
        nodes: updatedNodes,
      };
    }
    case UPDATE_NODE: {
      return {
        ...state,
        nodes: getUpdatedNodes(state.nodes, action.node, action.full),
      };
    }
    case REMOVE_NODE:
      // TODO: Shouldn't this use node.id?
      return {
        ...state,
        nodes: reject(state.nodes, node => node.uid === action.uid),
      };
    case ADD_EDGE:
      if (edgeExists(state.edges, action.edge)) { return state; }
      return {
        ...state,
        edges: [...state.edges, action.edge],
      };
    case TOGGLE_EDGE:
      // remove edge if it exists, add it if it doesn't
      if (edgeExists(state.edges, action.edge)) {
        return {
          ...state,
          edges: reject(reject(state.edges, action.edge), flipEdge(action.edge)),
        };
      }
      return {
        ...state,
        edges: [...state.edges, action.edge],
      };
    case REMOVE_EDGE:
      if (edgeExists(state.edges, action.edge)) {
        return {
          ...state,
          edges: reject(reject(state.edges, action.edge), flipEdge(action.edge)),
        };
      }
      return state;
    default:
      return state;
  }
}

/**
 * Add a node or nodes to the state.
 *
 * @param {Array|Object} nodes - one or more nodes to add
 * @param {Object} [additionalAttributes] shared attributes to apply to every
 *  new node
 *
 * @memberof! NetworkActionCreators
 */
function addNodes(nodes, additionalAttributes) {
  let nodeOrNodes = nodes;
  if (!isArray(nodeOrNodes)) {
    nodeOrNodes = [nodeOrNodes];
  }
  return {
    type: ADD_NODES,
    nodes: nodeOrNodes,
    additionalAttributes,
  };
}

function updateNode(node, full = false) {
  return {
    type: UPDATE_NODE,
    node,
    full,
  };
}

function toggleNodeAttributes(uid, attributes) {
  return {
    type: TOGGLE_NODE_ATTRIBUTES,
    uid,
    attributes,
  };
}

function removeNode(uid) {
  return {
    type: REMOVE_NODE,
    uid,
  };
}

function addEdge(edge) {
  return {
    type: ADD_EDGE,
    edge,
  };
}

function toggleEdge(edge) {
  return {
    type: TOGGLE_EDGE,
    edge,
  };
}

function removeEdge(edge) {
  return {
    type: REMOVE_EDGE,
    edge,
  };
}

/**
 * @namespace NetworkActionCreators
 */
const actionCreators = {
  addNodes,
  updateNode,
  removeNode,
  addEdge,
  toggleEdge,
  removeEdge,
  toggleNodeAttributes,
};

const actionTypes = {
  ADD_NODES,
  UPDATE_NODE,
  TOGGLE_NODE_ATTRIBUTES,
  REMOVE_NODE,
  ADD_EDGE,
  TOGGLE_EDGE,
  REMOVE_EDGE,
  SET_EGO,
  UNSET_EGO,
};

export {
  actionCreators,
  actionTypes,
};
