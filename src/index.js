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

  set _state(newState) {
    this._state = newState
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
}

export function thunk() {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState())
    }

    return next(action)
  }
}
