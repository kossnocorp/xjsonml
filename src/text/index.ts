import { NodeChildren } from '../types'

export function parseText(text: string) {
  const tree: NodeChildren = []

  splitParagraphs(text).forEach(paragraph => {
    const paragraphNodes = splitBreaks(paragraph).reduce(
      (acc, line, index) => {
        return acc
          .concat(index ? [['br', {}, []]] : [])
          .concat(parseChunks(line))
      },
      [] as NodeChildren
    )

    tree.push(['p', {}, paragraphNodes])
  })

  return tree
}

// NOTE: The code was extracted from Telepost and allows to parse more
// kind of special chunks than just links. For example @mention or #tag
// could be parsed by adding |@\w+|#\w+ to the regex.
const specialChunkRegEx = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-a-z0-9+&@#\/%=~_|$?!:;,.]*\)|[-a-z0-9+&@#\/%=~_|$?!:;,.])*(?:\([-a-z0-9+&@#\/%=~_|$?!:;,.]*\)|[a-z0-9+&@#\/%=~_|$])/

function parseChunks(text: string) {
  const tree: NodeChildren = []
  let inputText = text
  while (inputText) {
    const nextIndex = inputText.search(specialChunkRegEx)
    if (nextIndex !== -1) {
      const textChunk = inputText.slice(0, nextIndex)
      tree.push(textChunk)

      const [specialChunk] = inputText
        .slice(nextIndex)
        .match(specialChunkRegEx) as string[]

      // NOTE: Only links are supported right now but the new kind of special
      // chunks could be added easily.
      tree.push(['a', { href: specialChunk }, [specialChunk]])

      inputText = inputText.slice(nextIndex + specialChunk.length)
    } else {
      tree.push(inputText)
      inputText = ''
    }
  }
  return tree
}

function splitParagraphs(text: string): string[] {
  return text.split(/\n\n/g)
}

function splitBreaks(text: string): string[] {
  return text.split(/\n/g)
}
