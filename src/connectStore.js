export function connectStore(store, Component) {
  class WithStoreComponent extends Component {
    constructor(elem, props) {
      super(elem, props)

      store.subscribe(this.updateDOM.bind(this))
      this.dispatch = store.dispatch
    }
  }
  WithStoreComponent.prototype.dispatch = store.dispatch

  return WithStoreComponent
}
