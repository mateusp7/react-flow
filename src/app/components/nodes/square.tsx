import { NodeResizer } from '@reactflow/node-resizer'
import { Handle, NodeProps, Position } from 'reactflow'

interface SquareType {
  teste: string
}

export const Square = ({selected, ...props }: NodeProps<SquareType>) => {
  return (
    <div className='bg-violet-500 rounded-full w-full h-full min-w-[200px] min-h-[200px] grid place-content-center'>
      <NodeResizer minWidth={200} minHeight={200} isVisible={selected} lineClassName='border-blue-400' handleClassName='size-3 bg-white border-2 rounded border-blue-400'/>
      <p>{props.data.teste ?? 'Não informado'}</p>
      <Handle position={Position.Right} id='right' type='source' className='!-right-5 !size-3 !bg-blue-400/80'/>
      <Handle position={Position.Left} id='left' type='source' className='!-left-5 !size-3 !bg-blue-400/80'/>
      <Handle position={Position.Top} id='top' type='source' className='!-top-5 !size-3 !bg-blue-400/80'/>
      <Handle position={Position.Bottom} id='bottom' type='source' className='!-bottom-5 !size-3 !bg-blue-400/80'/>
    </div>
  )
}
