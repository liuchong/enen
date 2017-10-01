/* eslint-env jest */

const wrapper = require('./noopWrapper')

describe('The basic functions of noopWrapper', () => {
  let noop

  beforeEach(() => {
    noop = wrapper()
  })

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

  test('should NOT get same noop object by point operation', () => {
    expect(noop.f).not.toBe(noop)
    expect(noop.f.g).not.toBe(noop)
  })

  describe('When initialize with a object/function', () => {
    let n, s, b, o, f, obj

    beforeEach(() => {
      n = 1
      s = 'hello'
      b = true
      o = {}
      f = function () {}
      obj = { n, s, b, o, f }
      noop = wrapper(obj)
    })

    test('should not affect old primitive attributes', () => {
      expect(noop.n).toBe(n)
      expect(noop.s).toBe(s)
      expect(noop.b).toBe(b)
      expect(noop.o).toBe(o)
      expect(noop.f).toBe(f)
    })
  })

  describe('When attributes are added', () => {
    test('should keep returning undefined when called', () => {
      const obj = {}
      noop.f = () => {
        return obj
      }
      expect(noop.f()).toBe(obj)
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

    test('should keep what it is when a primitive attribute is set', () => {
      const n = 1
      noop.n = n
      expect(noop.n).toBe(n)
      const s = 'hello'
      noop.s = s
      expect(noop.s).toBe(s)
    })

    test('should wrap new added attribute which is a function or an object', () => {
      const o = {}
      function f () {}
      noop.o = o
      noop.f = f
      expect(noop.o).not.toBe(o)
      expect(noop.f).not.toBe(f)
      expect(noop.o.g1()).toBeUndefined()
      expect(noop.f.g2()).toBeUndefined()
    })
  })
})
