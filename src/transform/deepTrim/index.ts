import { XNodes } from '../../types'
import trim from '../trim'

interface TrimOptions {
  onlyStart?: boolean
  onlyEnd?: boolean
}

export default function deepTrim(
  nodes: XNodes,
  options: TrimOptions = {}
): XNodes {
  const processedNodes = trim(nodes, options)

  if (!options.onlyEnd && Array.isArray(processedNodes[0])) {
    const newNode = Object.assign([], processedNodes[0])
    newNode[2] = deepTrim(newNode[2], { onlyStart: true })
    processedNodes[0] = newNode
  }

  const lastIndex = processedNodes.length - 1
  if (!options.onlyStart && Array.isArray(processedNodes[lastIndex])) {
    const newNode = Object.assign([], processedNodes[lastIndex])
    newNode[2] = deepTrim(newNode[2], { onlyEnd: true })
    processedNodes[lastIndex] = newNode
  }

  return processedNodes
}
