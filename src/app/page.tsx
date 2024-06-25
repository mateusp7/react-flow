'use client'

import { useCallback } from 'react';
import ReactFlow, { Background, Connection, ConnectionMode, Controls, MiniMap, Node, addEdge, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { DefaultEdge } from './components/edges/default-edge';
import { Square } from './components/nodes/square';
 
const NODE_TYPES = {
  square: Square
}

const EDGE_TYPES = {
  default: DefaultEdge
}

const INITIAL_NODES: Node[] = [
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: { x: 200, y: 400 },
    data: {}
  },
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: { x: 1000, y: 400 },
    data: {}
  }
] satisfies Node[]

export default function Home() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(edges => addEdge(connection, edges))
  }, [])

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
    </div>
  );
}
