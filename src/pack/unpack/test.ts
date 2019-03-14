import unpack from '.'

describe('unpack', () => {
  it('unpacks nodes', () => {
    expect(
      unpack([
        ['img', { src: 'qwe' }],
        ['div', { class: 'asd' }, '1', ['p']],
        ['br']
      ])
    ).toEqual([
      ['img', { src: 'qwe' }, []],
      ['div', { class: 'asd' }, ['1', ['p', {}, []]]],
      ['br', {}, []]
    ])
  })
})
