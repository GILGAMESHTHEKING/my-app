/**
 * Created by GILGAMESH on 2015.06.05..
 */

/**
 * Created by GILGAMESH on 6/2/2015.
 */

'use strict';

var db = require('../db');
var md5 = require('MD5');

// Get list of things
exports.list = function(req, res) {
    db.users.find({}, function (err, docs) {
        res.json(docs);
    });
};

exports.auth = function(req,res){
    var hash = md5(req.body.password);

    db.users.findOne({ username: req.body.username, password: hash}, function(err, doc){
        res.json(doc);
    });
};

exports.show = function (req, res) {
    db.users.findOne({_id: req.params.id}, function (err, doc) {
        res.json(doc);
    });
};

exports.create = function (req, res) {
    var hash = md5(req.body.password);

    db.users.insert({ username: req.body.username, password: hash }, function (err, doc) {
        res.json(doc);
    });
};

exports.update = function (req, res) {
    db.users.update({_id: req.params.id}, { $set: { username: req.body.username, password: req.body.password } }, {}, function (err, numReplaced) {
        db.users.findOne({_id: req.params.id}, function (err, doc) {
            res.json(doc);
        });
    });
};

exports.delete = function (req, res) {
    db.users.remove({_id: req.params.id}, function (err, numRemoved) {
        res.status(204).end();
    });
};