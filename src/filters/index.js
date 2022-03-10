// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// 转换成千位符
export function toThousandsNumber (number) {
  let num = number
  let numPrefix = '' // 符号:用于小数
  // 数值小于0
  if (number < 0) {
    numPrefix = '-'
    num = Math.abs(number).toString()
  } else {
    num = number
  }
  if (num > 1000) {
    let xiaoshu = '' // 用来记录参数小数数值包括小数点
    let zhengshu = '' // 用来记录参数录整数数值
    const t = num.toString() // 将整数转换成字符串
    if (t.indexOf('.') > 0) {
      // 如果参数存在小数，则记录小数部分与整数部分
      const index = t.indexOf('.')
      xiaoshu = t.slice(index, t.length)
      zhengshu = t.slice(0, index)
    } else {
      zhengshu = t
    }
    let numDist = ''
    const numArr = zhengshu.split('').reverse()
    for (let i = 0; i < numArr.length; i++) {
      numDist += numArr[i]
      if ((i + 1) % 3 === 0 && (i + 1) < numArr.length) {
        numDist += ','
      }
    }
    return numPrefix + numDist.split('').reverse().join('') + xiaoshu
  } else {
    return numPrefix + num
  }
}
