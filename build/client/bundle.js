"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var store = function store(data) {
  var prevState = prevState || {};
  var newState = Object.assign(prevState, data, {});
  prevState = newState;
  return newState;
};

var WhisperClientSide = function () {
  function WhisperClientSide() {
    _classCallCheck(this, WhisperClientSide);

    this.data = { blah: "alksbfkoasb" };
  }

  _createClass(WhisperClientSide, [{
    key: "getState",
    value: function getState() {
      var event = new CustomEvent("getState", {
        detail: this.data
      });
      return event;
    }
  }, {
    key: "setState",
    value: function setState(data) {
      this.data = Object.assign(this.data, data, {});
    }
  }, {
    key: "connect",
    value: function connect(element, event) {
      element.dispatchEvent(event);
    }
  }]);

  return WhisperClientSide;
}();

var whisper = new WhisperClientSide();

if (window) {
  window.whisper = whisper;
}
