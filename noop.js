/**
 * @fileOverview
 * @name noop.js
 * @author Liu Chong
 * @license MIT
 */

'use strict'

/**
 * Advanced noop
 *
 * @example
 *   noop() // => 1
 *   noop(1) // => undefined
 *   noop.f(2) // => undefined
 *   noop.f.g(3) // => undefined
 *
 * Doctest not available for now
 */
// const noop = new Proxy(function () {}, {
//  get
// })

// The getter for proxy noop
function get (target, name) {
  // return saved attribute
  if (name && target && name in target) {
    return target[name]
  }
  const newNoop = new Proxy(function () {}, {
    get,
    set
  })
  if (name && target) {
    target[name] = newNoop
  }
  return newNoop
}

function set (target, name, value) {
  // if the attribute to set is a function, make a new proxy "p":
  // When "p" is called, it will call "f" but never use it's result.
  target[name] =
    typeof value !== 'function'
      ? value
      : new Proxy(
        function () {
          value()
        },
        { get, set }
      )
  return true
}

module.exports = get()
