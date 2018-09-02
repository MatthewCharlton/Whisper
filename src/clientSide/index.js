var GET_STATE = 'getState';

var Whisper = {
  subs: [],
  data: {},
  create(event, options) {
    return new CustomEvent(event, options);
  },
  subscribe(element, event, eventName, fn) {
    if (this.subs.indexOf(element) > -1)
      this.subs.splice(this.subs.indexOf(element), 1);
    this.subs.push({
      element: element,
      listener: element.addEventListener(eventName, fn),
      event: event
    });
  },
  getState(element, fn) {
    var event = this.create(GET_STATE, {
      bubbles: true,
      detail: this.data
    });
    this.subscribe(element, event, GET_STATE, fn);
  },
  setState(data) {
    this.data = Object.assign(this.data, data, {});
    this.subs.forEach(function(item) {
      item.element.dispatchEvent(item.event);
    });
  }
};
