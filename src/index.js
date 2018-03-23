import store from './store'
import util from './util'

const pressedKey = {}
const status = {
  listenFlag: true
}

const keydownFunc = (preventDefaultKeys) => (event) => { 
  let preventKeys
  if (util.isFunc(preventDefaultKeys)) {
    preventKeys = preventDefaultKeys()
  } else {
    preventKeys = [].concat(preventDefaultKeys)
  }
  if (preventKeys.indexOf(event.key) !== -1) {
    event.preventDefault()
  } 
  pressedKey[event.key] = {
    key: event.key,
    event
  }
}

const keyupFunc = (event) => {
  delete pressedKey[event.key]
  if (status.listenFlag) {
    store.dispatch({ type: `${event.key} -`, payload: event })
  }
}

const startListen = () => {
  const judge = () => {
    if (status.listenFlag) {
      for (let i in pressedKey) {
        const key = pressedKey[i]
        store.dispatch({ type: `${key.key} +`, payload: key.event })
      }
    }
    window.requestAnimationFrame(judge)
  }
  window.requestAnimationFrame(judge)
}

const stopListen = (delay) => { 
  status.listenFlag = false 
  if (util.isNumber(delay)) {
    util.delay(delay).then(_ => continueListen())
  }
  if (util.isFunc(delay)) {
    delay(continueListen)
  }
}
const continueListen = () => { 
  status.listenFlag = true  
}

const launch = ({
  targetDOM = document,
  reducer = () => {},
  reducers = [],
  preventDefaultKeys = []
}) => {
  store.register(reducers.concat(reducer))
  targetDOM.addEventListener('keydown', keydownFunc(preventDefaultKeys))
  targetDOM.addEventListener('keyup', keyupFunc)
  startListen()
}



export default {
  launch, stopListen
}