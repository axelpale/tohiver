#!/usr/bin/env node

var tohiver = require('../index')
var pjson = require('../package.json')
var program = require('commander')

program
  .version(pjson.version)
  .usage('[options]')
  .description(pjson.description)
  .on('--help', function () {
    // Additional newline.
    console.log('')
  })
  .parse(process.argv)

// Does not run if --help is given
tohiver.run()
