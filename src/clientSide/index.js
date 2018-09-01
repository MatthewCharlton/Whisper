const whisper = {
  self: this,
  GET_STATE: "getState",
  subs: [],
  data: {},
  create(event, options) {
    return new CustomEvent(event, options);
  },
  subscribe(element, event, eventName, fn) {
    this.subs.push({
      element: element,
      listener: element.addEventListener(eventName, fn),
      event: event
    });
  },
  getState(element, fn) {
    const event = this.create(this.GET_STATE, {
      bubbles: true,
      detail: this.data
    });
    this.subscribe(element, event, this.GET_STATE, fn);
  },
  setState(data) {
    this.data = Object.assign(this.data, data, {});
    this.subs.forEach(function(item) {
      console.log(item.element);
      console.log(item.eventName);
      item.element.dispatchEvent(item.event);
    });
  }
};
