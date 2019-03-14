import { XNodes, XNodeProps, XNode } from '../../types'
import { PackedXNodes } from '../types'

export default function unpack(nodes: PackedXNodes): XNodes {
  return nodes.map(
    node => {
      if (typeof node === 'string') return node

      const [type, ...rest] = node
      const maybeProps = rest[0] as XNodeProps | any
      const startsWithProps =
        maybeProps &&
        typeof maybeProps === 'object' &&
        !Array.isArray(maybeProps)
      const props = startsWithProps ? (maybeProps as XNodeProps) : {}
      const children = unpack((startsWithProps
        ? rest.slice(1)
        : rest) as PackedXNodes)

      return [type, props, children] as XNode
    },
    [] as XNodes
  )
}
