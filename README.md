## Установка

```
npm i github:unicornshade/redux-store
```

## Store

```js
new Store(reducer, initialState)
```

### Параметры
**reducer** — чистая функция, которая принимает предыдущий state и action, а возвращает новый state.  
**initialState** — объект, содержащий начальное состояние store.

### Методы

#### getState
Возвращает текущее состояние store.
```js
store.getState()
```

#### dispatch
Вызывает reducer с указанным action.
```js
store.dispatch(action)
```
**action** — объект с указанием типа действия и полезной нагрузкой
```js
{
  type: 'Action',
  value: 'some value'
}
```

#### subscribe
Позволяет подписаться на изменение state.
```js
store.subscribe(subscriber)
```
**subscriber** — функция-подписчик, вызывающаяся при изменении state.
```js
store.subscribe(state => console.log(state))
```

#### use
Добавляет middleware.
```
store.use(middleware)
```
**middleware** — позволяет расширить логику между отправкой action и reducer'ом, принимающим этот action.
```
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

store.use(logger)
```

### Пример
```js
const initialState = {
  counter: 0,
  name: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return { ...state, counter: ++state.counter }
    }
    case 'DECREMENT': {
      return { ...state, counter: --state.counter }
    }
    case 'CHANGE_NAME': {
      return { ...state, name: action.name }
    }
  }
}

// Actions
const increment = () => ({ type: 'INCREMENT' })
const decrement = () => ({ type: 'DECREMENT' })
const changeName = name => ({type: 'CHANGE_NAME', name })

// Store initialization
const store = new Store(reducer, initialState)
// state = { counter: 0, name: '' }

store.dispatch(increment())
store.dispatch(increment())
// state = { counter: 2, name: '' }

store.dispatch(decrement())
// state = { counter: 1, name: '' }

store.dispatch(changeName('Fake Name'))
// state = { counter: 1, name: 'Fake Name' }
```

## useThunk
Middleware, который позволяет написать action, возвращающий функцию с объектом action. Используется для того, чтобы отсрочить выполнение dispatch, например для асинхронных операций.

### Пример
```js
store.use(useThunk())

const fetchData = dispatch => {
  fetch('host/api/endpoint')
    .then(res => res.json())
    .then(data => dispatch(data))
}
```

## View 

Для View реализован класс `Component`, у которого есть метод `render`

```js
new Component(element)
```
**element** — DOM элемент

Чтобы подключить store к компоненту используется функция:
```js
connectStore(store, Component)
```
**store** — экземпляр Store  
**Component** — класс, унаследованный от Component

### Пример

```js
// store использован из предыдущего примера
// { counter: 0 }

class Counter extends Component {
  render({ counter }) {
    return `<span>${counter}</span>`
  }
}

connectStore(store, Counter)

const counterElem = document.getElementById('counter')

new Counter(counterElem)

store.dispatch(increment())
store.dispatch(increment())
store.dispatch(increment())
```
Результирующий html
```html
<!-- ... -->
<div id="counter">
  <span>3</span>
</div>
<!-- ... -->
```
