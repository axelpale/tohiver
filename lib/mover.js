var fs = require('fs-extra')
var os = require('os')
var path = require('path')

exports.moveFile = function (filepath, rootDir, callback) {
  if (typeof rootDir === 'undefined') {
    rootDir = os.homedir()
  }

  var base = path.basename(filepath)

  if (base.length < 4) {
    return callback(new Error('Too short filename.'))
  }

  var year = base.substr(0, 4)

  if (!(/^\d\d\d\d$/).test(year)) {
    return callback(new Error('Filename must start with 4-digit year'))
  }

  var target = path.resolve(rootDir, year, base)

  fs.move(filepath, target, callback)
}
