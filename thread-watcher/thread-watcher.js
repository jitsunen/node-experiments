const
  Q = require("q"),
  spawn = require("child_process").spawn,
  util = require("util")

/**
* Invoke top -H -o %CPU -n 1 -b | grep <process name> | head -1 | cut -f2 -d' '
*/
function getTopTid(p_name, callback) {
  var top = spawn('top', ['-H', '-o', '%CPU', '-n', '1', '-b'])
  var grep = spawn('grep', [p_name])
  var head = spawn('head', ['-1'])
  var cut = spawn('cut', ['-f2', '-d', ' '])
  top.stdout.pipe(grep.stdin)
  grep.stdout.pipe(head.stdin)
  head.stdout.pipe(cut.stdin)

  var pid = ""
  // set up callback for 'data' event
  cut.stdout.on("data", function(chunk) {
    pid += chunk.toString()
  })
  // set up callback for 'close' event
  cut.stdout.on("close", function() {
    callback(pid)
  })
}

function getTopPid() {}

function printStackTrace(pid, tid) {}

function getStack() {}

// process to get information for
var p_name = process.argv[2]

function log(id) {
  console.log(util.format("tid for highest cpu consuming %s process is %s", p_name, id))
}

// get the top thread id and log it
getTopTid(p_name, log)
