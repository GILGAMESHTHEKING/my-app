//var Todo = require('./models/todo');

module.exports = function(app) {

    var heroController = require('./controllers/hero.controller');

    app.get('/heroes', heroController.list);
    app.post('/heroes', heroController.create);
    app.delete('/heroes/:id', heroController.delete);
    app.put('/heroes/:id', heroController.update);

    var rankingController = require('./controllers/ranking.controller');

    app.get('/ranking', rankingController.list);
    app.put('/ranking/:place', rankingController.update);
    app.get('/ranking/:name', rankingController.show);

    var userController = require('./controllers/user.controller');

    app.get('/users/:id', userController.show);
    app.post('/users', userController.create);
    app.put('/users/:id', userController.update);
    app.delete('/users/:id', userController.delete);
    app.post('/users/authenticate', userController.auth);



	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index2.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};