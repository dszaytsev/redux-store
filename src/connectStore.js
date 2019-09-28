export function connectStore(store, Component) {
  return class extends Component {
    constructor(elem, props) {
      super(elem, props)

      store.subscribe(this.updateDOM.bind(this))
      this.dispatch = store.dispatch
    }
  }
}
