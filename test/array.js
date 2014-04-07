var parse = require('../');
var test = require('tape');

test('string array', function (t) {
    t.deepEqual(parse([ '--arr', '[This, Is, A, Test]' ]), { arr: ["This", "Is", "A", "Test"], _: [] });
    t.deepEqual(parse([ '--arr=[This, Is, A, Test]' ]), { arr: ["This", "Is", "A", "Test"], _: [] });
    t.deepEqual(parse([ '[This, Is, A, Test]' ]), { _: [["This", "Is", "A", "Test"]] });
    t.end();
});

test('string array with quotes/spacing', function (t) {
    t.deepEqual(parse([ '--arr', '["This Is A Test"]' ]), { arr: ["This Is A Test"], _: [] });
    t.deepEqual(parse([ '--arr=["This Is A Test"]' ]), { arr: ["This Is A Test"], _: [] });
    t.deepEqual(parse([ '["This Is A Test"]' ]), { _: [["This Is A Test"]] });
    t.end();
});

test('int array', function (t) {
    t.deepEqual(parse([ '--arr', '[5, 10, 50, 100]' ]), { arr: [5, 10, 50, 100], _: [] });
    t.deepEqual(parse([ '--arr=[5, 10, 50, 100]' ]), { arr: [5, 10, 50, 100], _: [] });
    t.deepEqual(parse([ '[5, 10, 50, 100]' ]), { _: [[5, 10, 50, 100]] });
    t.end();
});

test('boolean array', function (t) {
    t.deepEqual(parse([ '--arr', '[true, false, true]' ]), { arr: [true, false, true], _: [] });
    t.deepEqual(parse([ '--arr=[true, false, true]' ]), { arr: [true, false, true], _: [] });
    t.deepEqual(parse([ '[true, false, true]' ]), { _: [[true, false, true]] });
    t.end();
});

test('mixed array', function (t) {
    t.deepEqual(parse([ '--arr', '[Test, true, 1]' ]), { arr: ["Test", true, 1], _: [] });
    t.deepEqual(parse([ '--arr=[Test, true, 1]' ]), { arr: ["Test", true, 1], _: [] });
    t.deepEqual(parse([ '[Test, true, 1]' ]), { _: [["Test", true, 1]] });
    t.end();
});