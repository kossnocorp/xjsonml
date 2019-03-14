const fs = require('fs')
const x = require('../../lib')

const specHTML = fs.readFileSync('./test/pack/spec.html', 'utf8')
x.parseHTML(specHTML).then(parsedX => {
  fs.writeFileSync('./test/pack/spec.json', JSON.stringify(parsedX))
  fs.writeFileSync(
    './test/pack/spec.packed.json',
    JSON.stringify(x.pack(parsedX))
  )
})
