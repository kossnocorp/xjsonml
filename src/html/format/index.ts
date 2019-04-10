import { XNodes } from '../../types'

const emptyTags = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
]

export default function formatHTML(input: XNodes): string {
  return input.reduce((htmlAcc: string, node) => {
    if (typeof node === 'string') {
      return htmlAcc + node
    } else if (Array.isArray(node)) {
      const [tag, attrs, children] = node
      const attrsHTML = Object.keys(attrs)
        .reduce(
          (attrsAcc, attr) => {
            const value = attrs[attr]
            return attrsAcc.concat(value === '' ? attr : `${attr}="${value}"`) // TODO: Escape " in value
          },
          [] as string[]
        )
        .join(' ')
      const htmlOpen = `<${tag}${attrsHTML ? ` ${attrsHTML}` : ''}`
      return (
        htmlAcc +
        (emptyTags.includes(tag)
          ? `${htmlOpen} />`
          : `${htmlOpen}>${formatHTML(children)}</${tag}>`)
      )
    } else {
      const { data } = node
      return htmlAcc + `<${data}>`
    }
  }, '')
}
