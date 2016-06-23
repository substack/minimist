var parse = require('../');
var test = require('tape');

test('-', function (t) {
    t.plan(4);
    t.deepEqual(parse([ '-n', '-' ]), { n: '-', _: [] });
    t.deepEqual(parse([ '-' ]), { _: [ '-' ] });
    
    // Note by @cronvel: it does not make sense, this shouldn't be the expected behaviour
    //t.deepEqual(parse([ '-f-' ]), { f: '-', _: [] });
    
    t.deepEqual(
        parse([ '-b', '-' ], { boolean: 'b' }),
        { b: true, _: [ '-' ] }
    );
    t.deepEqual(
        parse([ '-s', '-' ], { string: 's' }),
        { s: '-', _: [] }
    );
});

test('-a -- b', function (t) {
    t.plan(3);
    t.deepEqual(parse([ '-a', '--', 'b' ]), { a: true, _: [ 'b' ] });
    t.deepEqual(parse([ '--a', '--', 'b' ]), { a: true, _: [ 'b' ] });
    t.deepEqual(parse([ '--a', '--', 'b' ]), { a: true, _: [ 'b' ] });
});

test('move arguments after the -- into their own `--` array', function(t) {
    t.plan(1);
    t.deepEqual(
        parse([ '--name', 'John', 'before', '--', 'after' ], { '--': true }),
        { name: 'John', _: [ 'before' ], '--': [ 'after' ] });
});
