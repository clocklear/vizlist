'use strict';

var _ = require('lodash');
var flatfile = require('flat-file-db');
var db = flatfile('/tmp/vizlist.db');
var uuid = require('node-uuid');
var debug = require('debug')('vizlist.list.controller');
var socketManager = require('../../components/socket-manager');

// Get list of lists
function index (req, res) {
  if (!db.has('lists')) {
    return res.json([]);
  }
  var tmpList = [];
  var lists = db.get('lists');
  Object.keys(lists).forEach(function (key) {
    tmpList.push({
      listTitle: lists[key].listTitle,
      listId: key
    });
  });
  return res.json(tmpList);
}

function show (req, res) {
  if (!db.has('lists')) {
    return res.status(404).json({});
  }
  var lists = db.get('lists');
  if (!lists[req.params.id]) {
    return res.status(404).json({});
  }
  return res.json(lists[req.params.id]);
}

function create (req, res) {
  // TODO: moar bug checking around the shape of this thing
  var list = req.body;
  list.listId = uuid.v1();
  replaceList(list.listId, list);
  res.json(list);
}

function update (req, res) {
  var list = req.body;
  replaceList(req.params.id, list);
  res.json(list.listId);
  // broadcast list update
  debug('broadcasting list update', req.params.id);
  socketManager.broadcast(req.params.id, 'list.broadcast', list);
}

function destroy (req, res) {
  res.json({});
}

function replaceList (id, list) {
  var lists = db.get('lists') || {};
  lists[id] = list;
  return db.put('lists', lists);
}

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy
};
