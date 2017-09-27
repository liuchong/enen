/* eslint-env jest */

const noop = require('./noop')

describe('noop', () => {
  test('should return undefined when direct call noop', () => {
    expect(noop()).toBe(undefined)
  })
  test('should return undefined when call noop with argument(s)', () => {
    expect(noop(1)).toBe(undefined)
    expect(noop(9, null, {}, 'what ever')).toBe(undefined)
  })
  test('should return undefined when call noop.f/noop.f.g', () => {
    expect(noop.f(2)).toBe(undefined)
    expect(noop.f.g()).toBe(undefined)
  })
})
