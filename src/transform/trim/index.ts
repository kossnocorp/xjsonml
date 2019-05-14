import isEmpty from '../../scan/isEmpty'
import { XNodes } from '../../types'

export default function trim(nodes: XNodes): XNodes {
  let start = 0
  let end = nodes.length - 1
  while (isEmpty(nodes[start]) && start < nodes.length) start++
  while (isEmpty(nodes[end]) && end > 0) end--
  return nodes.slice(start, end + 1)
}
