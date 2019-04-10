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

  it('formats empty tags', () => {
    return expect(formatHTML([['br', {}, []]])).toEqual('<br />')
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

  it('formats DOCTYPE', () => {
    return expect(
      formatHTML([
        { data: '!DOCTYPE html' },
        ['html', {}, [['head', {}, []], ['body', {}, ['Hello, world!']]]]
      ])
    ).toEqual(
      '<!DOCTYPE html><html><head></head><body>Hello, world!</body></html>'
    )
  })
})
