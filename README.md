# tohiver

Move files and directories that are prefixed with a 4-digit year to year-based directories from **macOS** context menu. For example you can do the following after installation: right-click a directory `2017-12-25-christmas-photos` in Finder and choose `Move to Archive`. The directory will be moved under `/Users/yourname/some/dir/2017` and a notification about the success will be displayed. Your Christmas photos are now available at `/Users/yourname/some/dir/2017/2017-12-25-christmas-photos`.

Personally I use this to archive files into Dropbox systematically.

## Install

First, ensure you have Node.js installed:

    $ node --version
    v7.1.0
    $ npm --version
    3.10.9

Second, install `tohiver` globally:

    $ npm install tohiver -g

Third, find absolute paths to `node` and `tohiver`. We need these paths soon.

    $ which node
    /usr/local/bin/node
    $ which tohiver
    /usr/local/bin/tohiver

Fourth, create an **Automator** workflow by following these steps:

- open Automator. It is installed by default in macOS.
- In Automator, select from menu: File > New
- Choose a type for your document: Service
- Choose "Service receives selected **files and folders** in **Finder.app**"
- Drag **Run Shell Script** action to the workflow
- In the action, choose "Shell: **/bin/bash**" and "Pass input: **to stdin**"  

Now, recall the absolute paths from the third step because Run Shell Script understands only absolute paths. Write a line into the Run Shell Script action, similar to:

    /usr/local/bin/node /usr/local/bin/tohiver --root /Users/yourname/some/dir

This is enough to do the job. However, it is nice to have a notification about success or possible errors. To display a notification, drag a **Run JavaScript** action to the workflow and copy in the following code:

    function run(input, parameters) {
      var app = Application.currentApplication()

      app.includeStandardAdditions = true

      var soundName = 'Ping'
      if (input[0].substr(0,5).toLowerCase() === 'error') {
        soundName = 'Basso'
      }

      app.displayNotification(input[0], {
        withTitle: 'Move to Archive',
        soundName: soundName
      })
    }

The code basically displays the first line of tohiver's output. It also detects an error message and chooses a suitable notification sound. If you like to customize, list available sounds by `$ ls /System/Library/Sounds`.

Finally, choose a name for your workflow (e.g. Move to Archive) and then File > Save. Now, when you right-click a file or directory in Finder, you should notice a new service among the last items of the context menu.


## Licence

[MIT](LICENSE)
