# minimist

parse argument options

This module is the guts of [optimist](https://www.npmjs.com/package/optimist)'s
argument parser without all the fanciful decoration.

[![browser support](https://ci.testling.com/substack/minimist.png)](http://ci.testling.com/substack/minimist)

[![build status](https://secure.travis-ci.org/substack/minimist.png)](http://travis-ci.org/substack/minimist)

# Examples

See [example/parse.js](example/parse.js):

``` js
var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);
```

Running `node example/parse.js` with arguments shows how they are parsed
by minimist:

### No arguments
With no arguments minimist returns an object with a single key "_" (underscore)
with a value of an empty array:
```
$ node example/parse.js
{ _: [] }
```

### Arguments without dashes
Using arguments with no dashes adds them to the "_" array in the object
returned by minimist:
```
$ node example/parse.js abc def
{ _: [ 'abc', 'def' ] }
```

### Single-letter options
A single dash starts a single-letter option that are boolean by default:
```
$ node example/parse.js -a -b -c
{ _: [], a: true, b: true, c: true }
```

Single-letter options can be joined together:
```
$ node example/parse.js -abc
{ _: [], a: true, b: true, c: true }
```

When a single-letter option is followed by a value with no dashes, the option
gets that value in the returned object instead of a boolean value:
```
$ node example/parse.js -a beep -b boop
{ _: [], a: 'beep', b: 'boop' }
```

Numeric values can be joined with single-letter options:
```
$ node example/parse.js -a 1 -b2
{ _: [], a: 1, b: 2 }
```

### Multi-letter options
Multi-letter options start with double dashes and they are boolean by default:
```
$ node example/parse.js --abc --def
{ _: [], abc: true, def: true }
```

Values can follow multi-letter options after a space or equal sign:
```
$ node example/parse.js --abc 1 --def=2
{ _: [], abc: 1, def: 2 }
```

### Mixed styles
All of those styles can be used together:
```
$ node example/parse.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
{ _: [ 'foo', 'bar', 'baz' ],
  x: 3,
  y: 4,
  n: 5,
  a: true,
  b: true,
  c: true,
  beep: 'boop' }
```

The default parsing of the arguments can be changed by using the second
argument to the parsing method, see below.

# Methods

Minimist exports a single method:
``` js
var parseArgs = require('minimist')
```

## var argv = parseArgs(args, opts={})

Return an argument object `argv` populated with the array arguments from `args`.

`argv._` contains all the arguments that didn't have an option associated with
them, or an empty array if there were no such arguments.

Numeric-looking arguments will be returned as numbers unless `opts.string` or
`opts.boolean` is set for that argument name.

Any arguments after `'--'` will not be parsed and will end up in `argv._`.

## Options

options can be:

* `opts.string` - a string or array of strings with argument names to always
treat as strings
* `opts.boolean` - a boolean, string or array of strings to always treat as
booleans. if `true` will treat all double hyphenated arguments without equal signs
as boolean (e.g. affects `--foo`, not `-f` or `--foo=bar`)
* `opts.alias` - an object mapping string names to strings or arrays of string
argument names to use as aliases
* `opts.default` - an object mapping string argument names to default values
* `opts.stopEarly` - when true, populate `argv._` with everything after the
first non-option
* `opts['--']` - when true, populate `argv._` with everything before the `--`
and `argv['--']` with everything after the `--`. Here's an example:

  ```
  > require('./')('one two three -- four five --six'.split(' '), { '--': true })
  { _: [ 'one', 'two', 'three' ],
    '--': [ 'four', 'five', '--six' ] }
  ```

  Note that with `opts['--']` set, parsing for arguments still stops after the
  `--`.

* `opts.unknown` - a function which is invoked with a command line parameter not
defined in the `opts` configuration object. If the function returns `false`, the
unknown option is not added to `argv`.

# Installation

With [npm](https://npmjs.org) do:

```sh
npm install minimist
```

Install to use in your Node project, updating the dependencies in package.json:
```sh
npm install minimist --save
```

# License

MIT License. See [LICENSE](LICENSE) for details.