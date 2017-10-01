/**
 * @fileOverview
 * @name noopWrapper.js
 * @author Liu Chong
 * @license MIT
 */

'use strict'

// The getter for proxy noop
function get (target, name) {
  // Get as Proxy "get" handler.
  if (target && name) {
    // make a new proxy
    if (!(name in target)) {
      target[name] = new Proxy(function () {}, {
        get,
        set
      })
    }
    return target[name]
  }

  // As the initializer
  target = target || function () {}
  return new Proxy(target, { get, set })
}

function set (target, name, value) {
  // Wrap the attribute when it is a not-null-object or a function
  target[name] =
    (!!value && typeof value === 'object') || typeof value === 'function'
      ? new Proxy(value, { get, set })
      : value
  return true
}

module.exports = get
