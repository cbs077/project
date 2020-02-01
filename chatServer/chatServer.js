var mosca = require('mosca');

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: 'mongodb://172.17.0.2:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var moscaSettings = {
//  port: 1884,
  http: {
	    port: 1884,
	    bundle: true,
	    static: './'
  },
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: 'mongodb://172.17.0.2:27017/mqtt'
  }
};

var server = new mosca.Server(moscaSettings);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet.payload);
//  storePacket( "packet.payload");
/*   var message = {
		  topic: '/my/topic',
		  payload: 'abcde', // or a Buffer
		  qos: 0, // 0, 1, or 2
		  retain: false // or true
		};

   server.publish(message, function() {
	  console.log('server done!');
  });
*/
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}
