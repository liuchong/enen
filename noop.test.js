/* eslint-env jest */

const noop = require('./noop')

describe('The basic functions of noop', () => {
  test('should return undefined when direct call noop', () => {
    expect(noop()).toBeUndefined()
  })

  test('should return undefined when call noop with argument(s)', () => {
    expect(noop(1)).toBeUndefined()
    expect(noop(9, null, {}, 'what ever')).toBeUndefined()
  })

  test('should return undefined when call noop.f/noop.f.g', () => {
    expect(noop.f(2)).toBeUndefined()
    expect(noop.f.g()).toBeUndefined()
  })
})
