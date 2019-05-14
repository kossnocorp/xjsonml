import isEmpty from '../../scan/isEmpty'
import { XNodes } from '../../types'

interface TrimOptions {
  onlyStart?: boolean
  onlyEnd?: boolean
}

export default function trim(nodes: XNodes, options: TrimOptions = {}): XNodes {
  let start = 0
  let end = nodes.length - 1
  if (!options.onlyEnd)
    while (isEmpty(nodes[start]) && start < nodes.length) start++
  if (!options.onlyStart) while (isEmpty(nodes[end]) && end > 0) end--

  return nodes.slice(start, end + 1)
}
