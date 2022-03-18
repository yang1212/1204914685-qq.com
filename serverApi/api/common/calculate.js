// 精确加法
function plus(num1, num2) {
  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)))
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum
}
// 精确减法
function minus(num1, num2, ...others) {
  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)))
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum
}
// 精确乘法
function times(num1, num2, ...others) {
  const num1Changed = float2Fixed(num1)
  const num2Changed = float2Fixed(num2)
  const baseNum = digitLength(num1) + digitLength(num2)
  const leftValue = num1Changed * num2Changed
  checkBoundary(leftValue)
  return leftValue / Math.pow(10, baseNum)
}
// 精确除法
function divide(num1, num2, ...others) {
  const num1Changed = float2Fixed(num1)
  const num2Changed = float2Fixed(num2)
  checkBoundary(num1Changed)
  checkBoundary(num2Changed)
  return times((num1Changed / num2Changed), Math.pow(10, digitLength(num2) - digitLength(num1)))
}
// 检测数字是否越界，如果越界给出提示
function checkBoundary(num) {
  if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
    console.warn(`${num} 超出数字安全范围(${Number.MAX_SAFE_INTEGER},${Number.MIN_SAFE_INTEGER}),计算结果可能不准确`)
  }
}
// 小数转整数
function float2Fixed(num) {
  num = num || 0
  if (num.toString().indexOf('e') === -1) {
    return Number(num.toString().replace('.', ''))
  }
  const dLen = digitLength(num)
  return dLen > 0 ? strip(num * Math.pow(10, dLen)) : num
}
// 小数点后的字符串长度
function digitLength(num) {
  num = num || 0
  const eSplit = num.toString().split(/[eE]/)
  const len = (eSplit[0].split('.')[1] || '').length - (+(eSplit[1] || 0))
  return len > 0 ? len : 0
}
// 错误数据转正常
function strip(num, precision = 12) {
  return +parseFloat(num.toPrecision(precision))
}

export default { plus }