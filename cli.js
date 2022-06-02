#!/usr/bin/env node
'use strict'

const header = require('./App')
const opts = require('./opt')
const { textSync } = require('figlet')
const { resolve, join } = require('path')
const { existsSync } = require('fs')
const pkg = existsSync(resolve(join(process.cwd(), './package.json'))) ? require(resolve(join(process.cwd(), './package.json'))) : {}
const chalk = require('chalk')
const prompt = require('prompt-sync')()
const options = require('minimist')(process.argv.slice(2))
const questions = [{ question: 'Title', keyword: 'name' }, { question: 'Description', keyword: 'description' }, { question: 'Version', keyword: 'version' }, { question: 'Funding', keyword: 'funding' }, { question: 'Home Page', keyword: 'homepage' }, { question: 'License', keyword: 'license' }, { question: 'Author', keyword: 'author' }]
const main = {}
// theremight be multiple authors
try {
  const dt = opts(options)
  console.log(chalk.bold.greenBright(textSync('ASCII-HEADER')))
  for (const qs of questions) main[qs.keyword] = prompt(chalk.greenBright.bold(qs.question + (pkg[qs.keyword] ? (' ( ' + pkg[qs.keyword] + ' )') : '') + ' : ')) || pkg[qs.keyword]
  header(dt.map(pth => resolve(pth)), main)
  console.log(chalk.greenBright.bold('Thanks for using ascii-header !!'))
} catch (e) {
  console.log(chalk.redBright.bold('Oops : ' + e.message))
  process.exit(1) // no trq (sure)
}
