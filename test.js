
const tap = require('tap')
const header = require('./App')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const readjs = readFileSync(resolve('./test/test.js'), 'utf8')
const readts = readFileSync(resolve('./test/test.ts'), 'utf8')
const output = readFileSync(resolve('./test/output'), 'utf8')

tap.test('Error test', async ({ throws }) => {
  throws(() => header(), new Error('Please enter valid path array'))
  throws(() => header([]), new Error('Please enter valid path array'))
  throws(() => header(['']), new Error('Please enter valid path array'))
  throws(() => header(['./test/']), new Error('Please enter valid path array'))
  throws(() => header(['./test/tst.js']), new Error('Please enter valid path array'))
  throws(() => header(['./test/test.js'], {}), new Error('Please enter valid json data'))
  throws(() => header(['./test/test.js'], { name: '', version: '', description: '', author: '', license: '', homepage: '' }), new Error('Please enter valid json data'))
})

tap.test('Output test', ({ equal, end }) => {
  equal(readts.includes(output) && readjs.includes(output), true)
  end()
})
// add keywords
