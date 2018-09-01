const EventEmitter = require("events");

class Whisper extends EventEmitter {}

const Whisper = new Whisper();
Whisper.on("event", () => {
  setImmediate(() => {
    console.log("this happens asynchronously");
  });
});
Whisper.emit("event");

export default Whisper;
