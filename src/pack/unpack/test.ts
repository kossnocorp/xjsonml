import unpack from '.'

describe('unpack', () => {
  it('unpacks nodes', () => {
    expect(
      unpack([
        { data: 'whatever' },
        ['img', { src: 'qwe' }],
        ['div', { class: 'asd' }, '1', ['p']],
        ['br']
      ])
    ).toEqual([
      { data: 'whatever' },
      ['img', { src: 'qwe' }, []],
      ['div', { class: 'asd' }, ['1', ['p', {}, []]]],
      ['br', {}, []]
    ])
  })
})
