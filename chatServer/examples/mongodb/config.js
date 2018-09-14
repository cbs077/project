var mosca = require('../../');

module.exports = {
  id: 'mymosca', // used to publish in the $SYS/<id> topicspace
  stats: false, // publish stats in the $SYS/<id> topicspace
  logger: {
    level: 'debug'
  },
  backend: {
    type: 'mongodb',
    url: "mongodb://172.17.0.2:27017/mosca"
  },
  persistence: {
    factory: mosca.persistence.Mongo,
    url: "mongodb://172.17.0.2:27017/mosca"
  }
};
