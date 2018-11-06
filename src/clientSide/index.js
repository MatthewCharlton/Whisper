(function() {
  if (typeof window.CustomEvent === 'function') return false;
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, state: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.state);
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

var Whisper = {
  EVENT_NAME: 'getState',
  subs: [],
  state: {},
  create(event, options) {
    return new CustomEvent(event, options);
  },
  subscribe(element, event, eventName, fn) {
    this.unsubscribe(element, event, eventName);
    this.subs.push({
      element: element,
      eventName: eventName,
      listener: element.addEventListener(eventName, fn),
      event: event
    });
  },
  unsubscribe(element) {
    var subsArr = this.subs;
    subsArr.forEach(function(item) {
      if (item.element === element) {
        element.removeEventListener(item.eventName, item.event);
        subsArr.splice(subsArr.indexOf(item), 1);
      }
    });
  },
  get(element, fn, name) {
    var eventName = name || this.EVENT_NAME;
    var event = this.create(eventName, {
      cancelable: true,
      bubbles: true,
      state: this.state
    });
    this.subscribe(element, event, eventName, fn);
  },
  set(state, eventName) {
    this.state = Object.assign(this.state, state, {});
    if (eventName) {
      this.subs.forEach(function(item) {
        if (item.eventName === eventName) {
          return item.element.dispatchEvent(item.event);
        }
      });
      return;
    }
    this.subs.forEach(function(item) {
      item.element.dispatchEvent(item.event);
    });
  }
};
