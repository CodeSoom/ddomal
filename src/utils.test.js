import { get } from './utils';

describe('utils', () => {
  test('get', () => {
    const object = {
      name: 'Kim',
    };

    const getName = get('name');

    expect(getName(object)).toBe('Kim');
  });
});
