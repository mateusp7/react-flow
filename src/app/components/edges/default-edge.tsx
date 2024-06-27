import { EdgeLabelRenderer, EdgeProps, getSmoothStepPath, useReactFlow } from 'reactflow';

export const DefaultEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style, data, markerEnd }: EdgeProps) => {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <path id={id} style={style} className='react-flow__edge-path stroke-2 stroke-zinc-300' d={edgePath} markerEnd={markerEnd}>
      <EdgeLabelRenderer>
        <button
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="bg-red-500 border border-red-300 rounded-full text-center text-white size-6 text-sm font-mono"
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        >
          X
        </button>
      </EdgeLabelRenderer>
    </path>
  )
}
