import parseHTML from '.'

describe('parseHTML', () => {
  it('parses simple HTML', () => {
    return expect(parseHTML('<div>Hello, world!</div>')).resolves.toEqual([
      ['div', {}, ['Hello, world!']]
    ])
  })

  it('parses attributes', () => {
    return expect(parseHTML('<input name="test" disabled />')).resolves.toEqual(
      [['input', { name: 'test', disabled: '' }, []]]
    )
  })

  it('parses nested tags', () => {
    return expect(
      parseHTML('<div><bold>Hello</bold>, <italic>world</italic>!</div>')
    ).resolves.toEqual([
      [
        'div',
        {},
        [['bold', {}, ['Hello']], ', ', ['italic', {}, ['world']], '!']
      ]
    ])
  })

  describe('options', () => {
    describe('tagsWhitelist', () => {
      it('allows to whitelist certain tags', () => {
        return expect(
          parseHTML('<div><bold>Hello</bold>, <italic>world</italic>!</div>', {
            tagsWhitelist: ['div']
          })
        ).resolves.toEqual([['div', {}, ['Hello, world!']]])
      })

      it('flattens text', () => {
        return expect(
          parseHTML(
            '<div><bold>Hello, <italic>worl<small>d</small></italic>!</bold></div>',
            {
              tagsWhitelist: []
            }
          )
        ).resolves.toEqual(['Hello, world!'])
      })
    })

    describe('attrsWhitelist', () => {
      it('allows to whitelist certain attributes', () => {
        return expect(
          parseHTML(
            '<div class="hello-world" onclick="alert(123)">Hello, <strong class="world" onclick="alert(456)">world</strong>!</div>',
            {
              attrsWhitelist: { '*': ['class'], a: ['href'] }
            }
          )
        ).resolves.toEqual([
          [
            'div',
            { class: 'hello-world' },
            ['Hello, ', ['strong', { class: 'world' }, ['world']], '!']
          ]
        ])
      })

      it('allows to whitelist attributes for specific tags', () => {
        return expect(
          parseHTML(
            '<div class="hello-world" href="#">Hello, <a class="link" href="#">world</a>!</div>',
            {
              attrsWhitelist: { '*': ['class'], a: ['href'] }
            }
          )
        ).resolves.toEqual([
          [
            'div',
            { class: 'hello-world' },
            ['Hello, ', ['a', { class: 'link', href: '#' }, ['world']], '!']
          ]
        ])
      })
    })

    describe('stripTags', () => {
      it('removes content of given tags', () => {
        return expect(
          parseHTML(
            '<div><bold>Hello</bold>, <italic>world</italic>!</div><script>alert("pwned!")</script><style>* { font-size: 666px; }</style>',
            {
              stripTags: ['script', 'style']
            }
          )
        ).resolves.toEqual([
          [
            'div',
            {},
            [['bold', {}, ['Hello']], ', ', ['italic', {}, ['world']], '!']
          ]
        ])
      })

      it('works when stripped tag has no content', () => {
        return expect(
          parseHTML('<br /><bold>OK!</bold>', {
            stripTags: ['br']
          })
        ).resolves.toEqual([['bold', {}, ['OK!']]])
      })

      it('works with tagsWhitelist', () => {
        return expect(
          parseHTML('<p>OK!</p><script>alert("pwned!")</script>', {
            tagsWhitelist: ['p'],
            stripTags: ['script']
          })
        ).resolves.toEqual([['p', {}, ['OK!']]])
      })
    })

    describe('processTag', () => {
      it('allow to alter tag and attributes', () => {
        return expect(
          parseHTML(
            '<div><strong>Hello</strong>, <a href="#">world</a>!</div>',
            {
              processTag: (tag, attrs) => {
                if (tag === 'div') {
                  return ['span', attrs]
                } else if (tag === 'a') {
                  return ['a', Object.assign({}, attrs, { target: '_blank' })]
                } else {
                  return [tag, attrs]
                }
              }
            }
          )
        ).resolves.toEqual([
          [
            'span',
            {},
            [
              ['strong', {}, ['Hello']],
              ', ',
              ['a', { href: '#', target: '_blank' }, ['world']],
              '!'
            ]
          ]
        ])
      })
    })
  })
})
