var gutil = require('gulp-util');
var exec = require('child_process').exec;
var escape = require('any-shell-escape');
var PassThrough = require('stream').PassThrough;

module.exports = function (opt) {
  if(!opt) opt = {};
  if(typeof opt.args === "undefined") opt.args = ' ';
  if(typeof opt.branch === "undefined") opt.branch = '';
  if(typeof opt.remote === "undefined") opt.remote = '';
  if(typeof opt.cwd === "undefined") opt.cwd = process.cwd();
  var remote_and_branch = escape([opt.remote, opt.branch]);

  var stream = new PassThrough();
  
  var cmd = "git log " + remote_and_branch + " " + opt.args;
  exec(cmd, {cwd: opt.cwd}, function(err, stdout, stderr){
    if(err) gutil.log(err);
    stream.end(stdout, "utf8");
  });

  return stream;
};
