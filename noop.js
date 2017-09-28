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
const noop = new Proxy(function () {}, {
  get
})

// The getter for proxy noop
function get (target, name) {
  // recursively return noop by default
  if (!(name in target)) {
    return noop
  }
  // if normal-attribute (not funciton) was set, directly return it
  if (typeof target[name] !== 'function') {
    return target[name]
  }
  // if a function-attribute "f" was set, make a new proxy "p".
  // When "p" is called, it will call "f" but never use it's result.
  return new Proxy(
    function () {
      target[name]()
    },
    { get }
  )
}

module.exports = noop
