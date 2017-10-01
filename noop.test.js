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
    noop.f = () => {
      return true
    }
    expect(noop()).toBeUndefined()
    expect(noop.f()).toBeUndefined()
  })
  test('should keep make side effect after set as attribute', () => {
    let tag
    function f () {
      tag = 'f'
    }
    function g () {
      tag = 'g'
    }
    noop.f = f
    noop.f.g = g
    noop.f()
    expect(tag).toBe('f')
    noop.f.g()
    expect(tag).toBe('g')
  })
  test('should not get same noop object by point operation', () => {
    expect(noop.f).not.toBe(noop)
    expect(noop.f.g).not.toBe(noop)
  })
  test('should keep what it is when a not-function-attribute is set', () => {
    const obj = {}
    noop.o = obj
    expect(noop.o).toBe(obj)
    noop.f = function () {}
    noop.f.o = obj
    expect(noop.f.o).toBe(obj)
  })
})
