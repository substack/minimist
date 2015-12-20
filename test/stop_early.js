var parse = require('../');
var test = require('tape');

test('stops parsing on the first non-option when stopEarly is set', function (t) {
    var argv = parse(['--aaa', 'bbb', 'ccc', '--ddd'], {
        stopEarly: true
    });

    t.deepEqual(argv, {
        aaa: 'bbb',
        _: ['ccc', '--ddd']
    });

    t.end();
});

test('includes -- with stop early', function (t) {
    var argv = parse(['aaa', '--bbb', '--', 'ccc'], {
        stopEarly: true
    });

    t.deepEqual(argv, {
      _: ['aaa', '--bbb', '--', 'ccc']
    });

    t.end();
});
