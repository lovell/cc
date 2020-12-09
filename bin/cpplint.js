#!/usr/bin/env node

"use strict";

const deglob = require("deglob");
const pkgConf = require("pkg-conf");
const { PythonShell } = require("python-shell");

const config = pkgConf.sync("cc", {
  defaults: {
    linelength: "80",
    files: ["**/*.cc", "**/*.h"],
    ignore: ["node_modules/**", "vendor/**"],
    filter: [],
  },
});

deglob(config.files, { ignore: config.ignore }, function (err, files) {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  if (files.length) {
    const args = [
      "--linelength",
      config.linelength,
      "--repository",
      process.cwd(),
    ];
    if (config.filter.length) {
      args.push("--filter");
      args.push(
        config.filter
          .map(function (filter) {
            return `-${filter}`;
          })
          .join(",")
      );
    }
    const cppLintOptions = {
      scriptPath: __dirname,
      args: args.concat(files),
    };

    PythonShell.run("cpplint.py", cppLintOptions, function (err) {
      if (err) {
        console.error(err.message);
        process.exit(1);
      }
    });
  } else {
    console.error(`No files found matching ${config.files.join(", ")}`);
    process.exit(1);
  }
});
