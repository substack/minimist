var parse = require('../');
var test = require('tape');

test('boolean with its negation', function (t) {
    var argv = parse(['--moo', '--no-moo'], {
        boolean: ['moo']
    });

    t.deepEqual(argv, {
        moo: false,
        _: []
    });

    t.deepEqual(typeof argv.moo, 'boolean');
    t.end();
});

test('boolean negation with its affermative', function (t) {
    var argv = parse(['--no-moo', '--moo'], {
        boolean: ['moo']
    });

    t.deepEqual(argv, {
        moo: true,
        _: []
    });

    t.deepEqual(typeof argv.moo, 'boolean');
    t.end();
});

test('boolean negation with its affermative with the negation again', function (t) {
    var argv = parse(['--no-moo', '--moo', '--no-moo'], {
        boolean: ['moo']
    });

    t.deepEqual(argv, {
        moo: false,
        _: []
    });

    t.deepEqual(typeof argv.moo, 'boolean');
    t.end();
});
