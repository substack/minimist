var parse = require('../');
var test = require('tape');

test('incrementing multi-booleans', function (t) {
    var argv = parse(['-VVV', '--verbose', '--verbose']);
    t.same(argv, {
        V: 3,
        verbose: 2,
        _: []
    });
    t.end();
});

test('multi-boolean with an alias', function (t) {
    var argv = parse(['-VV', '--verbose', '--verbose'], {
        alias: { 'V': 'verbose' },
        boolean: 'V'
    });
    t.same(argv, {
        V: 4,
        verbose: 4,
        _: []
    });
    t.end();
});

test('incremented multi-booleans revert to individual booleans when interleaved',
        function (t) {

    var argv = parse(['--verb', '--verb']);
    t.same(argv, { verb: 2, _: [] });

    var argv = parse(['--verb', '--verb', '--verb=abc']);
    t.same(argv, { verb: [true, true, 'abc'], _: [] });

    var argv = parse(['--verb', '--verb', '--verb=abc', '--verb']);
    t.same(argv, { verb: [true, true, 'abc', true], _: [] });

    var argv = parse(['-VV']);
    t.same(argv, { V: 2, _: [] });

    var argv = parse(['-VVV', 'abc']);
    t.same(argv, { V: [true, true, 'abc'], _: [] });


    t.end();
});

test('multi-boolean negation', function (t) {
    var argv = parse(['--verbose', '--verbose', '--no-verbose']);
    t.same(argv, {
        verbose: false,
        _: []
    });

    var argv = parse(['--verbose', '--verbose', '--no-verbose', '--verbose']);
    t.same(argv, {
        verbose: true,
        _: []
    });

    var argv = parse(['-VVV', '--no-verbose', '-VV'], {
        alias: { 'V': 'verbose' },
        boolean: 'V'
    });
    t.same(argv, {
        V: 2,
        verbose: 2,
        _: []
    });

    t.end();
});
