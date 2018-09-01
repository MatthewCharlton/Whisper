const GET_STATE = "getState";

const whisper = {
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
    const event = this.create(GET_STATE, {
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
