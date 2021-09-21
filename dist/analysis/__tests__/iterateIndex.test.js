"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analysisActions_1 = require("../analysisActions");
test('as number', function () {
    var actual = [];
    analysisActions_1.every(1, function (index) {
        actual.push(index);
    });
    var expected = [1];
    expect(actual).toEqual(expected);
});
test('as branched index with primitive at nested', function () {
    var actual = [];
    analysisActions_1.every([1, 0, 2], function (index) {
        actual.push(index);
    });
    var expected = [[1, 0], 2];
    expect(actual).toEqual(expected);
});
test('as branched index with nested branched index', function () {
    var actual = [];
    analysisActions_1.every([1, 0, [2, 1, 1]], function (index) {
        actual.push(index);
    });
    var expected = [[1, 0], [2, 1], 1];
    expect(actual).toEqual(expected);
});
test('as branched index with multiple nested branched index', function () {
    var actual = [];
    analysisActions_1.every([1, 0, [2, 1, [1, 2, [5, 0, [2, 0]]]]], function (index) {
        actual.push(index);
    });
    var expected = [[1, 0], [2, 1], [1, 2], [5, 0], [2, 0], 0];
    expect(actual).toEqual(expected);
});
test('as branched index with multiple nested branched index in reverse orde', function () {
    var actual = [];
    analysisActions_1.every([1, 0, [2, 1, [1, 2, [5, 0, [2, 0]]]]], function (index) {
        actual.push(index);
    }, { reverse: true });
    var expected = [0, [2, 0], [5, 0], [1, 2], [2, 1], [1, 0]];
    expect(actual).toEqual(expected);
});
//# sourceMappingURL=iterateIndex.test.js.map