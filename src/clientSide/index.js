class WhisperClientSide {
  constructor() {
    this.data = { blah: "alksbfkoasb" };
  }
  getState() {
    new CustomEvent("getState", {
      bubbles: true,
      detail: this.data
    });
  }
  setState(data) {
    this.data = Object.assign(this.data, data, {});
  }
  connect(element, event) {
    element.dispatchEvent(event);
  }
}

const whisper = new WhisperClientSide();
