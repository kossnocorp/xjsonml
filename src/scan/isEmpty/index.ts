import { XNodeChild } from '../../types'

export default function isEmpty(node: XNodeChild): boolean {
  if (Array.isArray(node)) {
    const [, props, children] = node
    return (
      !Object.keys(props).length &&
      (!children.length || children.every(isEmpty))
    )
  }
  return false
}
