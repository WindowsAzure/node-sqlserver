//inspired by installer from node-fibers

var spawn = require('child_process').spawn,
	fs = require('fs'),
	path = require('path');

try {
	fs.statSync(path.join(__dirname, 'lib', 'sqlserver.node'));
	console.log('binary exists; skipping build');
	return process.exit();
} catch (ex) {}

var proc = spawn(
	'cmd',
	['/c', 'node-gyp', 'rebuild'])
.on('exit', function(code) {
	if (code) {
		console.error('Build failed');
		return process.exit(err);
	}
	success();
});

function success() {
	var targetPath = path.join(__dirname, 'build', 'Release', 'sqlserver.node');
	var installPath = path.join(__dirname, 'lib', 'sqlserver.node');

	try {
		fs.statSync(targetPath);
	} catch (ex) {
		console.error('Build succeeded but target not found');
		process.exit(1);
	}
	fs.renameSync(targetPath, installPath);
	console.log('Installed in `'+ installPath+ '`');
}


proc.stdout.on('data', function (data) {
	console.log(data.toString());
});