var fs = require('fs-extra')
var os = require('os')
var path = require('path')

exports.moveYearSync = function (filepath, rootDir) {
  // Return true if moved
  //
  if (typeof rootDir === 'undefined') {
    rootDir = os.homedir()
  }

  var base = path.basename(filepath)

  if (base.length < 4) {
    // Too short filename
    return false
  }

  var year = base.substr(0, 4)

  if (!(/^\d\d\d\d$/).test(year)) {
    // Filename must start with 4-digit year.
    return false
  }

  var target = path.resolve(rootDir, year, base)

  fs.moveSync(filepath, target)

  return true
}

exports.moveTaggedSync = function (filepath, dirpath) {
  // If filename contains the dirname, then move file to dir.
  //
  // Return true if moved
  //
  var base = path.basename(filepath)
  var tag = path.basename(dirpath)
  var found = base.indexOf(tag) !== -1
  var target = path.resolve(dirpath, base)

  if (found) {
    // Ensure file exists before creating dirs.
    if (!fs.existsSync(filepath)) {
      throw new Error('File does not exist: ' + filepath)
    }

    fs.moveSync(filepath, target)
    return true
  }

  return false
}
