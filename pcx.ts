let pcx = require('pcx-js');
let fs = require('fs');

let buffer = fs.readFileSync('./files/brief01.pcx');
let palette = fs.readFileSync('./files/palette.256');
let twelve = new Buffer(String.fromCharCode(12));
let palette0 = palette.slice(0, 256);
const pcxWithPalette = Buffer.concat([buffer, twelve, palette0]);
console.log(buffer.length, '+', twelve.length, '+', palette0.length, '=', pcxWithPalette.length);
let myPcx = new pcx(pcxWithPalette);
console.log(myPcx);
let data = myPcx.decode();

console.log(data.length);
