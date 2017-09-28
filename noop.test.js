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

describe('When attributes are added', () => {
  test('should keep returning undefined when called', () => {
    noop.f = () => {}
    expect(noop()).toBeUndefined()
    expect(noop.f()).toBeUndefined()
  })
  test('should keep get noop by point operation', () => {
    noop.f = () => {}
    expect(noop.f).not.toBe(noop)
    expect(noop.f.g).toBe(noop)
  })
  test('should keep what it is when a not-function-attribute is set', () => {
    const obj = {}
    noop.o = obj
    expect(noop.o).toBe(obj)
  })
})
