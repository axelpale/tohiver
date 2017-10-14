var mover = require('./lib/mover')
var asyn = require('async')

exports.run = function () {
  process.stdin.setEncoding('utf8')

  var files = []
  var tail = ''

  process.stdin.on('readable', () => {
    const chunk = process.stdin.read()
    var parts
    if (chunk !== null) {
      parts = (tail + chunk).split('\n')

      if (parts.length === 1) {
        tail = parts[0]
      } else if (parts.length > 1) {
        // Add other but the last.
        files = files.concat(parts.slice(0, parts.length - 1))
        tail = parts[parts.length - 1]
      }
    }
  })

  process.stdin.on('end', () => {
    asyn.eachSeries(files, function (fpath, next) {
      mover.moveFile(fpath, next)
    }, function then (err) {
      if (err) {
        console.error(err)
      }
    })
  })
}
