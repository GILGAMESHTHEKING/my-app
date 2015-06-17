/**
 * Created by GILGAMESH on 2015.06.05..
 */

/**
 * Created by GILGAMESH on 6/2/2015.
 */

'use strict';

var db = require('../db');

// Get list of things
exports.list = function(req, res) {
    db.ranking.find({}, function (err, docs) {
        res.json(docs);
    });
};

exports.show = function (req, res) {
    db.ranking.findOne({name: req.params.name}, function (err, doc) {
        res.json(doc);
    });
};

exports.update = function (req, res) {
    db.ranking.update({place: req.params.place}, { $set: { name: req.body.name, popularity: req.body.popularity } }, {}, function (err, numReplaced) {
        db.ranking.findOne({place: req.params.place}, function (err, doc) {
            res.json(doc);
        });
    });
};