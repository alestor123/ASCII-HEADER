const header = require('./App')
const data = {
  name: 'ascii-header',
  version: '1.0.0',
  description:
 'This is a simple code for adding ascii art header to the code(as comments)',
  funding: 'https://alestor123.is-a.dev/donate',
  author: 'Alestor Aldous',
  license: 'MIT',
  homepage: 'https://github.com/alestor123/ASCII-HEADER#readme'
}
console.log(header(['./test/test.js'], data))
