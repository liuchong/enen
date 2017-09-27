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
 * doctest not available for now
 */
const noop = new Proxy(() => {}, {
  get: () => noop
})

module.exports = noop
