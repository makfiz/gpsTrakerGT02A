const net = require('net');

const client = net.connect(
  { host: 'gpstrakergt02a.onrender.com', port: 10000 },
  function () {
    console.log('connected to server!');

    // Отправляем команду для теста
    client.write(Buffer.from([0x28, 0x42, 0x50, 0x30, 0x30, 0x29])); // Это пример отправки команды
  }
);

client.on('data', function (data) {
  console.log('Received from server: ' + data.toString('hex'));
});

client.on('end', function () {
  console.log('Disconnected from server');
});

client.on('error', function (err) {
  console.log('Error: ' + err.message);
});
