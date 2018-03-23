const delay = (delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay)
  })
}

const isFunc = (arg) => Object.prototype.toString.call(arg) === '[object Function]'

const isNumber = (arg) => Object.prototype.toString.call(arg) === '[object Number]'

export default {
  delay, isFunc, isNumber
}