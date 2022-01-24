const logic = require('./index');

test('calculate new position correctly for aaa', () => {
  expect(logic.calculateNewPosition('aaa')).toBe('aab');
});

test('calculate new position correctly for aaz', () => {
  expect(logic.calculateNewPosition('aaz')).toBe('aaza');
});

test('calculate new position correctly for aszq', () => {
  expect(logic.calculateNewPosition('aszq')).toBe('aszr');
});
