import { Parser } from 'htmlparser2'
import { XNodes, XNode, XNodeProps } from '../types'

interface AttributesWhitelist {
  [tag: string]: string[]
}

interface ParserOptions {
  tagsWhitelist?: string[]
  attrsWhitelist?: AttributesWhitelist
  stripTags?: string[]
  processTag?: (tag: string, attrs: XNodeProps) => [string, XNodeProps]
}

export function parseHTML(input: string, options: ParserOptions = {}) {
  return new Promise((resolve, _reject) => {
    const tree: XNodes = []
    const stack = [tree]
    let skipText: boolean

    const parser = new Parser(
      {
        onopentag: (tag, attrs) => {
          if (options.stripTags && options.stripTags.includes(tag)) {
            skipText = true
            return
          }

          if (options.tagsWhitelist && !options.tagsWhitelist.includes(tag))
            return

          const filteredAttrs =
            (options.attrsWhitelist &&
              filterAttrs(tag, attrs, options.attrsWhitelist)) ||
            attrs

          const [processedTag, processedAttrs] = options.processTag
            ? options.processTag(tag, filteredAttrs)
            : [tag, filteredAttrs]

          const node: XNode = [processedTag, processedAttrs, []]
          stack[stack.length - 1].push(node)
          stack.push(node[2])
        },

        ontext: text => {
          // The parent tag is stripped
          if (skipText) {
            skipText = false
            return
          }

          const lastChildren = stack[stack.length - 1]
          if (
            lastChildren.length &&
            typeof lastChildren[lastChildren.length - 1] === 'string'
          ) {
            lastChildren[lastChildren.length - 1] += text
          } else {
            lastChildren.push(text)
          }
        },

        onclosetag: tag => {
          if (options.stripTags && options.stripTags.includes(tag)) {
            skipText = false
            return
          }

          if (options.tagsWhitelist && !options.tagsWhitelist.includes(tag))
            return

          stack.pop()
        },

        onend: () => {
          resolve(tree)
        }
      },
      { decodeEntities: true }
    )

    parser.write(input)
    parser.end()
  })
}

function filterAttrs(
  tag: string,
  attrs: XNodeProps,
  whitelist: AttributesWhitelist
) {
  return Object.keys(attrs).reduce(
    (acc, attr) => {
      const matches = (selector: string) =>
        whitelist[selector] && whitelist[selector].includes(attr)

      if (matches('*') || matches(tag)) {
        acc[attr] = attrs[attr]
      }
      return acc
    },
    {} as XNodeProps
  )
}
