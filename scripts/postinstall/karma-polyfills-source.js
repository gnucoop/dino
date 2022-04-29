var process = require('../../node_modules/process/browser');

window.global = window;
window.process = process;
window.Buffer = window.global.Buffer || require('buffer').Buffer;
window.global.Buffer = window.Buffer;
