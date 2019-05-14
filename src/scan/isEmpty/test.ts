import isEmpty from '.'

describe('isEmpty', () => {
  it('returns true empty tags', () => {
    expect(isEmpty(['br', {}, []])).toBe(true)
  })

  it('returns true for empty nested tags', () => {
    expect(
      isEmpty(['div', {}, [['div', {}, []], ['div', {}, [['div', {}, []]]]]])
    ).toBe(true)
  })

  it('returns false if the tag contains string', () => {
    expect(isEmpty(['span', {}, ['Hello!']])).toBe(false)
  })

  it('returns false if the tag contains props', () => {
    expect(isEmpty(['span', { class: 'icon' }, []])).toBe(false)
  })
})
