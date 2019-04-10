import { XNodes } from '../../types'
import { PackedXNode, PackedXNodes } from '../types'

export default function pack(nodes: XNodes): PackedXNodes {
  return nodes.map(
    node => {
      // if (typeof node === 'string') return node
      if (!Array.isArray(node)) return node

      const [type, props, children] = node
      const hasProps = !!Object.keys(props).length
      const hasChildren = !!children.length

      if (hasProps && hasChildren) {
        return [type, props, ...pack(children)] as PackedXNode
      } else if (hasProps) {
        return [type, props] as PackedXNode
      } else if (hasChildren) {
        return [type, ...pack(children)] as PackedXNode
      } else {
        return [type] as PackedXNode
      }
    },
    [] as PackedXNodes
  )
}
