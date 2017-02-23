#!/usr/bin/env node

'use strict';

const deglob = require('deglob');
const pkgConf = require('pkg-conf');
const pythonShell = require('python-shell');
const childProcess = require('child_process');

if (process.argv.length > 2) {
  process.env.PATH = process.env.PATH.split(':').slice(2).join(':');
  process.exit(childProcess.spawnSync('cc', process.argv.slice(2), { stdio: 'inherit' }).status);
}

const config = pkgConf.sync('cc', {
  defaults: {
    linelength: '80',
    files: [
      '**/*.cc',
      '**/*.h'
    ],
    ignore: [
      'node_modules/**',
      'vendor/**'
    ],
    filter: []
  }
});

deglob(config.files, { ignore: config.ignore }, function (err, files) {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  if (files.length) {
    const args = [
      '--linelength',
      config.linelength
    ];
    if (config.filter.length) {
      args.push('--filter');
      args.push(config.filter
        .map(function (filter) {
          return `-${filter}`;
        })
        .join(','));
    }
    const cppLintOptions = {
      scriptPath: __dirname,
      args: args.concat(files)
    };

    pythonShell
      .run('cpplint.py', cppLintOptions)
      .on('error', function (err) {
        console.log(err.message);
      })
      .on('close', function () {
        process.exit(this.exitCode);
      });
  } else {
    console.error(`No files found matching ${config.files.join(', ')}`);
    process.exit(1);
  }
});
