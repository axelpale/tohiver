var mover = require('./lib/mover')
var asyn = require('async')

exports.run = function (opts) {
  // Opts
  //   yyyy: dirpath
  //   tagged: array of dirpaths
  //
  process.stdin.setEncoding('utf8')

  var files = []
  var tail = ''

  const processFile = (fpath, next) => {
    try {
      // Tags have priority
      let i
      for (i = 0; i < opts.tagged.length; i += 1) {
        let moved = mover.moveTaggedSync(fpath, opts.tagged[i])
        if (moved) {
          return next()
        }
      }
      // Assert {file not yet moved}

      // Move based on year
      mover.moveYearSync(fpath, opts.yyyy)
      return next()
    } catch (err) {
      return next(err)
    }
  }

  // Build filepaths from stdin.
  // Process stdin in safe manner.
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
    asyn.eachSeries(files, processFile, function then (err) {
      if (err) {
        console.log('Error: ' + err.message)
        return
      }

      // Automator displayNotification is able to process one line from stdin.
      console.log('Moved files successfully')
    })
  })
}
