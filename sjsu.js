#!/usr/bin/env node
var contract = require("truffle-contract");
var Artifactor = require("truffle-artifactor");
var argv = require("yargs").argv;

var fs = require("fs");
var path = require("path");

var current_directory = process.cwd();
var artifactor = new Artifactor(current_directory);

fs.readdir(current_directory, function(err, files) {
  if (err) {
    console.log(err.stack);
    process.exit(1);
  }

  files = files.filter(function(file_path) {
    return file_path.indexOf(".sol.js") >= 0;
  });

  var promises = files.map(function(file_path) {
    console.log("Converting " + file_path + "...");
    return require(path.join(current_directory, file_path));
  }).map(function(old_abstraction) {
    return contract.fromSolJS(old_abstraction, true);
  }).map(function(new_abstraction) {
    return artifactor.save(new_abstraction);
  });

  Promise.all(promises).then(function() {
    console.log("Files converted successfully.")
  }).then(function() {
    if (argv.f == true) {
      var deletions = files.map(function(file_path) {
        return new Promise(function(accept, reject) {
          fs.unlink(path.join(current_directory, file_path), function(err) {
            if (err) return reject(err);
            accept();
          });
        });
      });

      return deletions;
    }
  }).then(function() {
    if (argv.f == true) {
      console.log("Successfully deleted old .sol.js files.");
    }
  }).catch(function(e) {
    console.log(e.stack);
    process.exit(1);
  });
})
