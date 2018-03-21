import store from './store'
import util from './util'
const pressedKey = {}

let listenFlag = true

const keydownFunc = (event) => { 
  pressedKey[event.key] = {
    key: event.key,
    event
  }
}

const keyupFunc = (event) => {
  delete pressedKey[event.key]
  if (listenFlag) {
    store.dispatch({ type: `${event.key} -`, payload: event })
  }
}

const startListen = () => {
  const judge = () => {
    if (listenFlag) {
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
  listenFlag = false 
  if (Object.prototype.toString.call(delay) === '[object Number]') {
    util.delay(delay).then(_ => continueListen())
  }
  if (Object.prototype.toString.call(delay) === '[object Function]') {
    delay(continueListen)
  }
}
const continueListen = () => { 
  listenFlag = true  
}

const launch = ({
  targetDOM = document,
  reducer = () => {},
  reducers = []
}) => {
  store.register(reducers.concat(reducer))
  targetDOM.addEventListener('keydown', keydownFunc)
  targetDOM.addEventListener('keyup', keyupFunc)
  startListen()
}



export default {
  launch, stopListen
}