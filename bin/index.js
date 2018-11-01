#!/usr/bin/env node

var tohiver = require('../index')
var pjson = require('../package.json')
var program = require('commander')

var collect = function (val, memo) {
  memo.push(val)
  return memo
}

program
  .version(pjson.version)
  .usage('[options]')
  .option(
    '-y, --yyyy <dirpath>',
    'Specify a root for YYYY dirs. Defaults to ~'
  )
  .option(
    '-t, --tagged <dirpath>',
    'Move files with the dirname in their name to the dir.',
    collect,
    []
  )
  .description(pjson.description)
  .on('--help', function () {
    // Additional newline.
    console.log('')
  })
  .parse(process.argv)

// Does not run if --help is given
tohiver.run({
  yyyy: program.yyyy,
  tagged: program.tagged
})
