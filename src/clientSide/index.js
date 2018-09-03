var Whisper = {
  GET_STATE_EVENT_NAME: 'getState',
  subs: [],
  detail: {},
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
    var event = this.create(this.GET_STATE_EVENT_NAME, {
      cancelable: true,
      bubbles: true,
      detail: this.detail
    });
    this.subscribe(element, event, this.GET_STATE_EVENT_NAME, fn);
  },
  setState(detail) {
    this.detail = Object.assign(this.detail, detail, {});
    this.subs.forEach(function(item) {
      item.element.dispatchEvent(item.event);
    });
  }
};
