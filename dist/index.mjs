var t=function(t,e){var s=this;this.__subscribers=[],this.__state={},this.subscribe=function(t){return s.__subscribers.push(t),function(){return s._unsubscribe(t)}},this.dispatch=function(t){s._state=s._reducer(s._state,t)},this.getState=function(){return s._state},this.use=function(t){if("function"==typeof t){var e=s.dispatch;s.dispatch=t(s)(e)}},this._unsubscribe=function(t){s.__subscribers=s.__subscribers.filter(function(e){return e!==t})},this._notify=function(){s.__subscribers.forEach(function(t){return t(s.getState())})},this._reducer=t,this._state=e},e={_state:{configurable:!0}};function s(){return function(t){var e=t.dispatch,s=t.getState;return function(t){return function(n){return"function"==typeof n?n(e,s()):t(n)}}}}e._state.get=function(){return this.__state},e._state.set=function(t){this.__state=t,this._notify()},Object.defineProperties(t.prototype,e);export default t;export{s as useThunk};
//# sourceMappingURL=index.mjs.map
