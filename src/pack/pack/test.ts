import pack from '.'

describe('pack', () => {
  it('packs nodes', () => {
    expect(
      pack([
        ['img', { src: 'qwe' }, []],
        ['div', { class: 'asd' }, ['1', ['p', {}, []]]],
        ['br', {}, []]
      ])
    ).toEqual([
      ['img', { src: 'qwe' }],
      ['div', { class: 'asd' }, '1', ['p']],
      ['br']
    ])
  })
})
