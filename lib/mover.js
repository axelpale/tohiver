var fs = require('fs-extra')
var os = require('os')
var path = require('path')

var ROOT = path.resolve(os.homedir(), 'Dropbox', 'archive')

exports.moveFile = function (filepath, callback) {
  var base = path.basename(filepath)

  if (base.length < 4) {
    return callback()
  }

  var year = base.substr(0, 4)

  if (!(/^\d\d\d\d$/).test(year)) {
    return callback()
  }

  var target = path.resolve(ROOT, year, base)

  fs.move(filepath, target, callback)
}
