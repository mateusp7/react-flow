'use client'

import * as Toolbar from '@radix-ui/react-toolbar';
import { useCallback, useEffect, useState } from 'react';
import ReactFlow, { Background, Connection, ConnectionMode, Controls, Edge, MiniMap, Node, addEdge, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { DefaultEdge } from './components/edges/default-edge';
import Input from './components/nodes/input';
import { Square } from './components/nodes/square';
 
const NODE_TYPES = {
  square: Square,
  input: Input
}

const EDGE_TYPES = {
  default: DefaultEdge
}

const DELETE_KEY = 'Delete';
const UNDO_DELETE_KEY = 'z';

const INITIAL_NODES: Node[] = [
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: { x: 200, y: 400 },
    data: { teste: '123' }
  },
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: { x: 1000, y: 400 },
    data: { teste: '456' }
  }
] satisfies Node[]

const INITIAL_EDGES: Edge[] = [
  {
    id: crypto.randomUUID(),
    source: INITIAL_NODES[0].id,
    target: INITIAL_NODES[1].id,
    type: 'default',
    sourceHandle: 'right',
    targetHandle: 'left'
  }
];

export default function Home() {
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)
  const [deletedNodes, setDeletedNodes] = useState<Node[]>([]);
  const [deletedEdges, setDeletedEdges] = useState<Edge[]>([]);

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(edges => addEdge(connection, edges))
  }, [])

  const addSquareNode = () => {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'square',
        position: { x: 750, y: 350 },
        data: { },
      }
    ])
  }

  const deleteSelected = useCallback(() => {
    setNodes((nds) => {
      const selectedNodes = nds.filter((node) => node.selected);
      if (selectedNodes) {
        setDeletedNodes((prevDeletedNodes) => [...prevDeletedNodes, ...selectedNodes]);
        return nds.filter((node) => !node.selected);
      }
      return nds
    });

    setEdges((eds) => {
      const selectedEdges = eds.filter((edge) => edge.selected);
      if (selectedEdges) {
        setDeletedEdges((prevDeletedEdges) => [...prevDeletedEdges, ...selectedEdges]);
        return eds.filter((edge) => !edge.selected);
      }

      return eds
    });
  }, [setNodes, setEdges]);

  const undoDelete = useCallback(() => {
    if (deletedNodes.length > 0) {
      const lastDeletedNode = deletedNodes[deletedNodes.length - 1];
      setDeletedNodes((prevDeletedNodes) => prevDeletedNodes.slice(0, -1));
      setNodes((nds) => [...nds, lastDeletedNode]);
    }

    if (deletedEdges.length > 0) {
      const lastDeletedEdge = deletedEdges[deletedEdges.length - 1];
      setDeletedEdges((prevDeletedEdges) => prevDeletedEdges.slice(0, -1));
      setEdges((eds) => [...eds, lastDeletedEdge]);
    }
  }, [deletedNodes, deletedEdges, setNodes, setEdges])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === DELETE_KEY) {
        deleteSelected();
      } else if (event.key === UNDO_DELETE_KEY && (event.ctrlKey || event.metaKey)) {
        undoDelete();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [deleteSelected, undoDelete]);


  return (
    <div className='w-screen h-screen'>
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{ type: 'default' }}
      >
        <MiniMap />
        <Controls />
        <Background gap={12} size={2} color='#DDD' />
      </ReactFlow>

      <Toolbar.Root className='fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden'>
        <Toolbar.Button
          onClick={addSquareNode}
          className='size-32 bg-violet-500 rounded mt-6 hover:-translate-y-2 transition-transform'
        /> 
      </Toolbar.Root>
    </div>
  );
}
