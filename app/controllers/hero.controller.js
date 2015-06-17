/**
 * Created by GILGAMESH on 6/2/2015.
 */

'use strict';

var db = require('../db');

// Get list of things
exports.list = function(req, res) {
    db.heroes.find({}, function (err, docs) {
        res.json(docs);
    });
};

exports.show = function (req, res) {
    console.log(req.user);
    db.heroes.findOne({id: req.params.id}, function (err, doc) {
        res.json(doc);
    });
};

exports.create = function (req, res) {
    console.log(req);
    db.heroes.insert({ name: req.body.name, type: req.body.type }, function (err, doc) {
        res.json(doc);
    });
};

exports.update = function (req, res) {
    db.heroes.update({_id: req.params.id}, { $set: { name: req.body.name, type: req.body.tyoe } }, {}, function (err, numReplaced) {
        db.heroes.findOne({_id: req.params.id}, function (err, doc) {
            res.json(doc);
        });
    });
};

exports.delete = function (req, res) {
    db.heroes.remove({_id: req.params.id}, function (err, numRemoved) {
        res.status(204).end();
    });
};