export default class Store {
  __subscribers = []
  __state = {}

  constructor(reducer, initialState) {
    this._reducer = reducer
    this._state = initialState
  }

  get _state() {
    return this.__state
  }

  // *TODO: write deep copy here | Created at: 27.Sep.2019
  set _state(newState) {
    this.__state = newState
    this._notify()
  }

  subscribe = handler => {
    this.__subscribers.push(handler)

    return () => this._unsubscribe(handler)
  }

  dispatch = action => {
    this._state = this._reducer(this._state, action)
  }

  getState = () => {
    return this._state
  }

  use = middleware => {
    if (typeof middleware !== 'function') return

    const next = this.dispatch

    this.dispatch = middleware(this)(next)
  }

  _unsubscribe = handler => {
    this.__subscribers = this.__subscribers.filter(sub => sub !== handler)
  }

  _notify = () => {
    this.__subscribers.forEach(subscriber => subscriber(this.getState()))
  }
}

export function useThunk() {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState())
    }

    return next(action)
  }
}
