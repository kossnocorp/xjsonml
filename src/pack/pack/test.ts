import pack from '.'

describe('pack', () => {
  it('packs nodes', () => {
    expect(
      pack([
        { data: 'whatever' },
        ['img', { src: 'qwe' }, []],
        ['div', { class: 'asd' }, ['1', ['p', {}, []]]],
        ['br', {}, []]
      ])
    ).toEqual([
      { data: 'whatever' },
      ['img', { src: 'qwe' }],
      ['div', { class: 'asd' }, '1', ['p']],
      ['br']
    ])
  })
})
