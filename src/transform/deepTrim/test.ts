import deepTrim from '.'

describe('deepTrim', () => {
  it('deeply removes trailing empty nodes', () => {
    expect(
      deepTrim([
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
      ['div', {}, [['div', {}, ['Blah']], 'blah', ['div', {}, ['blah']]]]
    ])
  })

  it('preserves inner empty nodes', () => {
    expect(
      deepTrim([
        ['br', {}, []],
        [
          'div',
          {},
          [
            ['div', {}, [['br', {}, []], 'Blah', ['br', {}, []]]],
            'blah',
            ['div', {}, [['br', {}, []], 'blah', ['br', {}, []]]]
          ]
        ],
        ['br', {}, []]
      ])
    ).toEqual([
      [
        'div',
        {},
        [
          ['div', {}, ['Blah', ['br', {}, []]]],
          'blah',
          ['div', {}, [['br', {}, []], 'blah']]
        ]
      ]
    ])
  })

  describe('onlyStart', () => {
    it('removes trailing empty nodes only the beginning', () => {
      expect(
        deepTrim(
          [
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
          ],
          { onlyStart: true }
        )
      ).toEqual([
        [
          'div',
          {},
          [['div', {}, ['Blah']], 'blah', ['div', {}, ['blah', ['br', {}, []]]]]
        ],
        ['br', {}, []]
      ])
    })
  })

  describe('onlyEnd', () => {
    it('removes trailing empty nodes only the end', () => {
      expect(
        deepTrim(
          [
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
          ],
          { onlyEnd: true }
        )
      ).toEqual([
        ['br', {}, []],
        [
          'div',
          {},
          [['div', {}, [['br', {}, []], 'Blah']], 'blah', ['div', {}, ['blah']]]
        ]
      ])
    })
  })
})
