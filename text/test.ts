import { parseText } from '.'

describe('parseText', () => {
  it('parses text chunks', () => {
    expect(parseText('simple text')).toEqual([['p', {}, ['simple text']]])
  })

  it('parses paragraphs', () => {
    expect(parseText('first line\n\nsecond line\n\nthrid line')).toEqual([
      ['p', {}, ['first line']],
      ['p', {}, ['second line']],
      ['p', {}, ['thrid line']]
    ])
  })

  it('parses breaks', () => {
    expect(parseText('first line\n\nsecond line\nline after break')).toEqual([
      ['p', {}, ['first line']],
      ['p', {}, ['second line', ['br', {}, []], 'line after break']]
    ])
  })

  describe('links', () => {
    it('parses simple links', () => {
      expect(
        parseText('Please, welcome Diary Email https://diaryemail.com!')
      ).toEqual([
        [
          'p',
          {},
          [
            'Please, welcome Diary Email ',
            [
              'a',
              { href: 'https://diaryemail.com' },
              ['https://diaryemail.com']
            ],
            '!'
          ]
        ]
      ])
    })

    it('parses links with a query and hash', () => {
      expect(
        parseText(
          'Please, welcome Diary Email https://diaryemail.com?qwe&asd=123#welcome!'
        )
      ).toEqual([
        [
          'p',
          {},
          [
            'Please, welcome Diary Email ',
            [
              'a',
              { href: 'https://diaryemail.com?qwe&asd=123#welcome' },
              ['https://diaryemail.com?qwe&asd=123#welcome']
            ],
            '!'
          ]
        ]
      ])
    })
  })
})
