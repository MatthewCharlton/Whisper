const EventEmitter = require('events');

class WhisperEvents extends EventEmitter {
  constructor() {
    super();
    this.EVENT_NAME = 'getState';
    this.detail = {};
  }
}

const Whisper = new WhisperEvents();

Whisper.on('setAsync', detail => {
  setImmediate(() => {
    Whisper.detail = Object.assign(Whisper.detail, detail, {});
  });
});

Whisper.on('getAsync', fn => {
  setImmediate(() => {
    return fn(Whisper.detail);
  });
});

Whisper.on('set', detail => {
  Whisper.detail = Object.assign(Whisper.detail, detail, {});
});

Whisper.on('get', fn => {
  return fn(Whisper.detail);
});

module.exports = Whisper;
