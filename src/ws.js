const WebSocket = require('ws');

const ws_server = new WebSocket.Server({ port: 10000 });

sockets = [];

ws_server.on('connection', ws => {
  ws.slot = sockets.length;
  sockets.push(ws);

  ws.on('message', message => {
    let obj;

    try {
      obj = JSON.parse(message);
    } catch (e) {
      console.error('Error json');
      return false;
    }
  });

  ws.on('close', function close() {
    ws.close();
    sockets = removeSocket(sockets, ws.slot);
  });
});

function removeSocket(arr, indexes) {
  let arrayOfIndexes = [].slice.call(arguments, 1);
  return arr.filter(function (item, index) {
    return arrayOfIndexes.indexOf(index) === -1;
  });
}

module.exports = {
  sendLocation(date, timestamp, lat, lng, speed, course) {
    sockets.forEach(client => {
      if (client.readyState) {
        let packet = {
          type: 'location',
          date,
          timestamp,
          lat,
          lng,
          speed,
          course,
        };

        client.send(JSON.stringify(packet));
      }
    });
  },
};
