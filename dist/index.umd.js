!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("lodash")):"function"==typeof define&&define.amd?define(["exports","lodash"],e):e(t.reduxStore={},t.lodash)}(this,function(t,e){var n=function(t,e){this.props=e,this.elem=t,this.init()};n.prototype.init=function(){},n.prototype.updateDOM=function(t){this.elem.innerHTML=this.render(t)},n.prototype.render=function(t){};var i=function(t,e){var n=this;this.__subscribers=[],this.__state={},this.subscribe=function(t){return n.__subscribers.push(t),function(){return n._unsubscribe(t)}},this.dispatch=function(t){if(!t)throw new Error("Action is not defined");n._state=n._reducer(n._state,t)},this.getState=function(){return n._state},this.use=function(t){if("function"==typeof t){var e=n.dispatch;n.dispatch=t(n)(e)}},this._unsubscribe=function(t){n.__subscribers=n.__subscribers.filter(function(e){return e!==t})},this._notify=function(){n.__subscribers.forEach(function(t){return t(n.getState())})},this._reducer=t,this._state=e},r={_state:{configurable:!0}};r._state.get=function(){return this.__state},r._state.set=function(t){this.__state=e.cloneDeep(t),this._notify()},Object.defineProperties(i.prototype,r),t.Component=n,t.Store=i,t.connectStore=function(t,e){var n=function(e){function n(n,i){e.call(this,n,i),t.subscribe(this.updateDOM.bind(this)),this.dispatch=t.dispatch}return e&&(n.__proto__=e),(n.prototype=Object.create(e&&e.prototype)).constructor=n,n}(e);return n.prototype.dispatch=t.dispatch,n},t.useThunk=function(){return function(t){var e=t.dispatch,n=t.getState;return function(t){return function(i){return"function"==typeof i?i(e,n()):t(i)}}}}});
//# sourceMappingURL=index.umd.js.map