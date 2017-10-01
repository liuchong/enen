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
  get () {
    return noop
  },
  set () {}
})

module.exports = noop
