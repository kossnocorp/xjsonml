import trim from '.'

describe('trim', () => {
  it('removes trailing empty nodes', () => {
    expect(
      trim([
        ['br', {}, []],
        'Blah blah blah',
        ['div', {}, [['div', {}, [['br', {}, []]]], ['br', {}, []]]]
      ])
    ).toEqual(['Blah blah blah'])
  })

  it('removes trailing empty nodes at the beginning', () => {
    expect(trim([['br', {}, []], 'Blah blah blah'])).toEqual(['Blah blah blah'])
  })

  it('removes trailing empty nodes at the end', () => {
    expect(trim(['Blah blah blah', ['br', {}, []]])).toEqual(['Blah blah blah'])
  })

  it('returns empty array when there are no nodes', () => {
    expect(trim([])).toEqual([])
  })

  it('returns empty array when all nodes are empty', () => {
    expect(trim([['br', {}, []], ['br', {}, []]])).toEqual([])
  })

  it('returns nodes as is if there are no empty nodes', () => {
    expect(trim(['Blah blah blah'])).toEqual(['Blah blah blah'])
  })

  it('keeps deep trailing empty nodes', () => {
    expect(
      trim([
        ['br', {}, []],
        [
          'div',
          {},
          [
            ['div', {}, [['br', {}, []], 'Blah']],
            'blah',
            ['div', {}, ['blah', ['br', {}, []]]]
          ]
        ],
        ['br', {}, []]
      ])
    ).toEqual([
      [
        'div',
        {},
        [
          ['div', {}, [['br', {}, []], 'Blah']],
          'blah',
          ['div', {}, ['blah', ['br', {}, []]]]
        ]
      ]
    ])
  })

  describe('onlyStart', () => {
    it('removes trailing empty nodes only the beginning', () => {
      expect(
        trim([['br', {}, []], 'Blah blah blah', ['br', {}, []]], {
          onlyStart: true
        })
      ).toEqual(['Blah blah blah', ['br', {}, []]])
    })
  })

  describe('onlyEnd', () => {
    it('removes trailing empty nodes only the end', () => {
      expect(
        trim([['br', {}, []], 'Blah blah blah', ['br', {}, []]], {
          onlyEnd: true
        })
      ).toEqual([['br', {}, []], 'Blah blah blah'])
    })
  })
})
