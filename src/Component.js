export class Component {
  constructor(elem, props) {
    this.props = props
    this.elem = elem

    this.init()
  }

  init() { }

  updateDOM(state) {
    this.elem.innerHTML = this.render(state)
  }

  render(_state) {
    'Component must implement render method'
  }
}

