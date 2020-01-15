import { hello } from './thing';

describe('hello', () => {
  it('should say hello', () => {
    expect(hello(9)).toEqual('hello');
  });
});