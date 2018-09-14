const Whisper = require('../src/serverSide');

console.log('Synchronous');

// everything happens in succession

Whisper.emit('get', e => console.log(e)); // {}

Whisper.emit('set', { name: 'BLAH' });

Whisper.emit('get', e => console.log(e)); // { name: 'BLAH' }

let state1 = {};

console.log('state1', state1); // state1 {}

Whisper.emit('get', e => (state1 = e));

console.log('state1', state1); // state1 { name: 'BLAH' }

console.log('====================================');

console.log('Asynchronous');

// the 'state2' console logs fire first then the async event functions

Whisper.emit('getAsync', e => console.log(e)); // { name: 'BLAH' }

Whisper.emit('setAsync', { name2: 'BLAH' });

Whisper.emit('getAsync', e => console.log(e)); // { name: 'BLAH', name2: 'BLAH' }

let state2 = {};

console.log('state2', state2); // state2 {}

Whisper.emit('getAsync', e => (state2 = e));

console.log('state2', state2); // state2 {}
