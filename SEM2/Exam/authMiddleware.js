


const authMiddleware = (req, res, next) => {
	let key = req.headers?.authorization?.split(":");
	let authUser = null;
	if (key) {
		users.forEach((element) => {
			if (element.login == key[0] && element.password == key[1])
				authUser = element;
		});
	}
	if (!authUser) {
		res.status(401);
		res.send();
	} 
	next();
};

module.exports = {
	authMiddleware: authMiddleware
};
