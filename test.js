const net = require('net');
const async = require('async');

let client = null;

async.series([
  function connectServer(step) {
    client = net.connect(
      { host: 'gpstrakergt02a.onrender.com', port: 6666 },
      function () {
        console.log('connected to server!');
        step();
      }
    );
  },
  function sendHandShake(step) {
    client.write(
      new Buffer.from([
        0x28, //start bit
        0x30,
        0x32,
        0x37,
        0x30,
        0x34,
        0x34,
        0x35,
        0x36,
        0x33,
        0x36,
        0x32,
        0x35, //Running NO
        0x42,
        0x50,
        0x30,
        0x30, //BP00
        0x33,
        0x35,
        0x35,
        0x32,
        0x32,
        0x37,
        0x30,
        0x34,
        0x34,
        0x35,
        0x36,
        0x33,
        0x36,
        0x32,
        0x35, //Device ID
        0x48,
        0x53,
        0x4f, //HSO
        0x29, //stop bit
      ])
    );
    console.log('send handshake');
    setTimeout(() => step(), 1000);
  },
  function sendGpsLog(step) {
    client.write(
      new Buffer.from([
        0x28, //start bit
        0x30,
        0x32,
        0x37,
        0x30,
        0x34,
        0x34,
        0x35,
        0x36,
        0x33,
        0x36,
        0x32,
        0x35, //Running NO
        0x42,
        0x52,
        0x30,
        0x30, //BR00
        0x32,
        0x30, //YY
        0x30,
        0x35, //MM
        0x32,
        0x30, //DD
        0x41, //availability "A" or "V"
        0x34,
        0x38,
        0x32,
        0x39,
        0x2e,
        0x37,
        0x39,
        0x36,
        0x37, //Latitude
        0x4e, //Latitude indicator
        0x31,
        0x31,
        0x33,
        0x35,
        0x38,
        0x2e,
        0x35,
        0x37,
        0x30,
        0x30, //Longitude
        0x57, //Longitude indicator
        0x30,
        0x30,
        0x30,
        0x2e,
        0x30, //Speed
        0x30,
        0x37, //HH
        0x30,
        0x33, //MM
        0x30,
        0x34, //SS
        0x31,
        0x32,
        0x33,
        0x2e,
        0x37,
        0x39, //Orientation
        0x30,
        0x30,
        0x30,
        0x30,
        0x30,
        0x30,
        0x30,
        0x30, //IO State
        0x4c, //Milepost "L" mean Mileage
        0x30,
        0x30,
        0x30,
        0x30,
        0x30,
        0x30,
        0x30,
        0x30, //Mile date
        0x29, //stop bit
      ])
    );
    console.log('send location');
    step();
  },
  function waitPacketWS(step) {
    console.log('Wait location at WS');
    step();
  },
  function Disconnect() {
    client.end();
  },
]);
