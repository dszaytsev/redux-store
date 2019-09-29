import { Component, Store, connectStore } from 'redux-store'

const initialState = {
  counter: 0
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return { ...state, counter: ++state.counter }
    }
  }
}

const increment = () => ({ type: 'INCREMENT' })

const store = new Store(reducer, initialState)

class Counter extends Component {
  constructor(element) {
    super(element)

    this.elem.addEventListener('click', () => {
      this.dispatch(increment())
    })
  }

  render({ counter }) {
    return `<span>${counter}</span>`
  }
}

const WithStoreCounter = connectStore(store, Counter)

document.addEventListener('DOMContentLoaded', () => {
  const counter = document.getElementById('counter')

  new WithStoreCounter(counter)
})
