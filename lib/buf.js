'use strict'

/**
 * @namespace buf
 */

const crypto = require('crypto')

const zero = Buffer.from([0x0]) // 0x0
//按指定字符拆分buffer
const splitBuffer = (a = [], spl) => {
  const arr = []
  let [cur, n] = [0, 0]
  while ((n = a.indexOf(spl, cur)) != -1) {
    arr.push(a.slice(cur, n))
    cur = n + spl.length
  }
  arr.push(a.slice(cur))
  return arr
}
// 按指定字符合并buffer
const joinBuffer = (a = [], split) => {
  return a.reduce((x, y) => x.contact(split).contact(y))
}

module.exports = {
  joinBuffer,
  splitBuffer,
  zero
}