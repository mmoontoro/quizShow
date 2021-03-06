exports.loginRequired = function(req, res, next){
	if(req.session.user){
		next();
	}else{
		res.redirect('/login');
	}
};


exports.new = function(req, res) {
 var errors = req.session.errors || {};
 req.session.errors = {};

 res.render('sessions/new', {errors: errors});
};

exports.auto_logout = function(req,res,next){
	var minutes = new Date;
	minutes = minutes.getMinutes();
	console.log("logout");
	if(req.session.user){
		if((minutes-req.session.hora)>2){
			delete req.session.user;
			req.session.hora = minutes;
		}else{
			req.session.hora = minutes;
		}
	}
	next();
};

exports.create = function(req, res) {

 var login = req.body.login;
 var password = req.body.password;

 var userController = require('./user_controller');
 userController.autenticar(login, password, function(error, user) {

 if (error) { // si hay error retornamos mensajes de error de sesión
 req.session.errors = [{"message": 'Se ha producido un error: '+error}];
 res.redirect("/login");
 return;
 }
 req.session.user = {id:user.id, username:user.username, isAdmin:user.isAdmin};

 res.redirect(req.session.redir.toString());// redirección a path anterior a login
 });
};

// DELETE /logout -- Destruir sesion
exports.destroy = function(req, res) {
 delete req.session.user;
 res.redirect(req.session.redir.toString()); // redirect a path anterior a login
};
