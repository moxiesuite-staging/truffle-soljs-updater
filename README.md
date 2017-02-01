# truffle-soljs-updater
Convert old soljs files to Truffle 3.0 (.json).

This package will provide you with the `sjsu` command to upgrade existing sol.js files to their new JSON format.

# Usage

```
npm install -g truffle-soljs-updater
```

Next, navigate to your directory where .sol.js file exist, then run the updater:

```
$ cd ./build/contracts
$ sjsu
```

By default, `sjsu` will create new .json files but leave the existing .sol.js files alone. To have `sjsu` clean up for you, use the `-f` option.

```
$ sjsu -f
```
