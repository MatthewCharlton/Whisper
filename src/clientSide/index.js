const store = data => {
  let prevState = prevState || {};
  const newState = Object.assign(prevState, data, {});
  prevState = newState;
  return newState;
};

class WhisperClientSide {
  constructor() {
    this.data = { blah: "alksbfkoasb" };
  }
  getState() {
    const event = new CustomEvent("getState", {
      detail: this.data
    });
    return event;
  }
  setState(data) {
    this.data = Object.assign(this.data, data, {});
  }
  connect(element, event) {
    element.dispatchEvent(event);
  }
}

const whisper = new WhisperClientSide();

if (window) {
  window.whisper = whisper;
}
