(function () {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

var Whisper = {
  EVENT_NAME: 'getState',
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
  get(element, fn) {
    var event = this.create(this.EVENT_NAME, {
      cancelable: true,
      bubbles: true,
      detail: this.detail
    });
    this.subscribe(element, event, this.EVENT_NAME, fn);
  },
  set(detail) {
    this.detail = Object.assign(this.detail, detail, {});
    this.subs.forEach(function(item) {
      item.element.dispatchEvent(item.event);
    });
  }
};
