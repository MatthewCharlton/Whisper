const EventEmitter = require('events');

class WhisperEvents extends EventEmitter {
  constructor() {
    super();
    this.EVENT_NAME = 'getState';
    this.state = {};
  }
}

const Whisper = new WhisperEvents();

Whisper.on('setAsync', state => {
  setImmediate(() => {
    Whisper.state = Object.assign(Whisper.state, state, {});
  });
});

Whisper.on('getAsync', fn => {
  setImmediate(() => {
    return fn(Whisper.state);
  });
});

Whisper.on('set', state => {
  Whisper.state = Object.assign(Whisper.state, state, {});
});

Whisper.on('get', fn => {
  return fn(Whisper.state);
});

module.exports = Whisper;
