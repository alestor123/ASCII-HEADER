
/*
+------------------------------------------------------------------------------------------------+
|                                                                                                |
|                   _ _       _                    _                                             |
|     __ _ ___  ___(_|_)     | |__   ___  __ _  __| | ___ _ __                                   |
|    / _` / __|/ __| | |_____| '_ \ / _ \/ _` |/ _` |/ _ \ '__|                                  |
|   | (_| \__ \ (__| | |_____| | | |  __/ (_| | (_| |  __/ |                                     |
|    \__,_|___/\___|_|_|     |_| |_|\___|\__,_|\__,_|\___|_|                                     |
|                                                                                                |
|  Description : This is a simple code for adding ascii art header to the code(as comments)      |
|  Version : 1.0.0                                                                               |
|  Funding : https://alestor123.is-a.dev/donate                                                  |
|  Home Page : https://github.com/alestor123/ASCII-HEADER#readme                                 |
|  License : MIT                                                                                 |
|  Author : Alestor Aldous                                                                       |
|                                                                                                |
|                                                                                                |
+------------------------------------------------------------------------------------------------+
*/

'use strict'
const { readFileSync, existsSync, statSync, writeFileSync } = require('fs')
const { textSync } = require('figlet')
const { resolve, extname } = require('path')
const box = require('ascii-box').box
const mandatory = [{ question: 'name' }, { question: 'version' }, { question: 'description' }, { question: 'homepage', url: true }, { question: 'license' }, { question: 'author' }]

module.exports = (paths, data) => {
  if (!(paths && typeof paths === 'object' && paths.length > 0 && checkArray(paths))) throw new Error('Please enter valid path array')
  for (const key of mandatory) if (!(data[key.question] && typeof data[key.question] === 'string' && data[key.question].length > 0 && (key.url ? isValidHttpUrl(data[key.question]) : true))) throw new Error('Please enter valid json data')
  const mandatoryCh = [{ value: textSync(data.name), ascii: true, question: false }, { question: 'Description', value: data.description }, { question: 'Version', value: data.version }, { question: 'Funding', value: data.funding }, { question: 'Home Page', value: data.homepage }, { question: 'License', value: data.license }, { question: 'Author', value: data.author }]
  const start = '\n /* \n'
  let main = ''
  for (const line of mandatoryCh) main = main.concat(line.value ? (line.question ? (line.question + ' : ' + line.value) : line.value) + '\n' : '')
  const maxLength = Math.max(...(main.toString().replace(/\r\n/g, '\n').split('\n').map(el => el.length)))
  main = start.concat(box(main, { maxWidth: maxLength + 14 }), '\n*/ \n\n')
  paths.forEach(pt => writeFileSync(resolve(pt), (main.concat(readFileSync(resolve(pt), 'utf8')))))
  return main
}
function checkArray (arr) {
  return arr.every(path => existsSync(resolve(path)) && (statSync(resolve(path)).isFile() ? extname(resolve(path)) === '.js' : false))
}
// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function isValidHttpUrl (string) {
  let url
  try {
    url = new URL(string)
  } catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}
