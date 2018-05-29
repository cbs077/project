var mosca = require('mosca');

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: 'mongodb://172.17.0.2:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var settings = {
		http: {
		    port: 1884,
		    bundle: true,
		    static: './'
		  }
		
/*  port: 1883,
  host: "121.157.55.240",
  backend: ascoltatore
*/
};

var server = new mosca.Server(settings);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet.payload);
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}
