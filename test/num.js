var parse = require('../');
var test = require('tape');

test('nums', function (t) {
    var argv = parse([
        '-x', '1234',
        '-y', '5.67',
        '-w', '10f',
        '--lim', '3275311328.174182',
        '--over', '3275311328.1741821',
        '--hex', '0xdeadbeef',
        '789'
    ]);
    t.deepEqual(argv, {
        x : 1234,
        y : 5.67,
        w : '10f',
        lim : 3275311328.174182,
        over : '3275311328.1741821',
        hex : 0xdeadbeef,
        _ : [ 789 ]
    });
    t.deepEqual(typeof argv.x, 'number');
    t.deepEqual(typeof argv.y, 'number');
    t.deepEqual(typeof argv.w, 'string');
    t.deepEqual(typeof argv.lim, 'number');
    t.deepEqual(typeof argv.over, 'string');
    t.deepEqual(typeof argv.hex, 'number');
    t.deepEqual(typeof argv._[0], 'number');
    t.end();
});

test('already a number', function (t) {
    var argv = parse([ '-x', 1234, 789 ]);
    t.deepEqual(argv, { x : 1234, _ : [ 789 ] });
    t.deepEqual(typeof argv.x, 'number');
    t.deepEqual(typeof argv._[0], 'number');
    t.end();
});
