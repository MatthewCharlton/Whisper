const EventEmitter = require("events");

class WhisperServerSide extends EventEmitter {}

const WhisperServerSide = new WhisperServerSide();
WhisperServerSide.on("event", () => {
  setImmediate(() => {
    console.log("this happens asynchronously");
  });
});
WhisperServerSide.emit("event");

export default WhisperServerSide;
