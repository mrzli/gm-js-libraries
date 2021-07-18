import { add } from '../src/utilities/example';

describe('example', () => {
  it('add', () => {
    expect(add(1, 2)).toEqual(3);
  });
});
