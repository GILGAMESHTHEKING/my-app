/**
 * Created by GILGAMESH on 6/2/2015.
 */

var DS = require('nedb');

module.exports.users = new DS({filename: __dirname + '/users.db', autoload: true});
module.exports.heroes = new DS({filename: __dirname + '/heroes.db', autoload: true});
module.exports.ranking = new DS({filename: __dirname + '/ranking.db', autoload: true});