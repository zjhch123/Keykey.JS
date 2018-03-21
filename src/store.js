let chain = []

const reducer = (action) => {
  chain.forEach(func => func.call(this, action))
}

export default {
  register: (reducers) => { chain = chain.concat(reducers); },
  dispatch: (action) => {
    reducer(action)
  }
}