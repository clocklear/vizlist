var debug = require('debug')('vizlist.socket-manager');
var sockets = {};

function registerSocket (listId, spark) {
  debug('registering socket for list', listId);
  if (!sockets[listId]) sockets[listId] = [];
  spark.listId = listId;
  sockets[listId].push(spark);
  return spark;
}

function unregisterSocket (spark) {
  // If there is no listId, we don't know what to do...
  if (!spark.listId || !sockets[spark.listId]) return false;
  debug('unregistering socket for list', spark.listId);
  var index = sockets[spark.listId].indexOf(spark);
  if (index >= 0) sockets[spark.listId].splice(index, 1);
  return true;
}

function broadcast (listId, event, payload) {
  if (!sockets[listId]) return false;
  sockets[listId].forEach(function (spark) {
    spark.send(event, payload);
  });
}

module.exports = {
  register: registerSocket,
  unregister: unregisterSocket,
  broadcast: broadcast
};
