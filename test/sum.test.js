const sum = require('../src/scripts/sum');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(2,5)).not.toBe(2);
});