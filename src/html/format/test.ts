import formatHTML from '.'

describe('formatHTML', () => {
  it('formats simple HTML', () => {
    return expect(formatHTML([['div', {}, ['Hello, world!']]])).toEqual(
      '<div>Hello, world!</div>'
    )
  })

  it('formats attributes', () => {
    return expect(
      formatHTML([['input', { name: 'test', disabled: '' }, []]])
    ).toEqual('<input name="test" disabled />')
  })

  it('formats nested tags', () => {
    return expect(
      formatHTML([
        [
          'div',
          {},
          [['bold', {}, ['Hello']], ', ', ['italic', {}, ['world']], '!']
        ]
      ])
    ).toEqual('<div><bold>Hello</bold>, <italic>world</italic>!</div>')
  })
})
