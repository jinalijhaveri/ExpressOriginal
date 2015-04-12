
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.login = function(req, res){
	  res.render('login');
	};
	
	exports.search = function(req, res){
		console.log("Search "+req.session.userId);
		res.render('search');
	};