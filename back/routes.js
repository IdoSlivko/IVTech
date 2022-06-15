const router = require('express').Router();

router.post('/ivoverflow', (req, res) => {

	const info = req.body;
	let userInfo = {};

	if (info.values.email === 'a@aa.com') {
		userInfo = { name: 'Alex', token: true };
	} else if (info.values.email === 'q@qq.com') {
		userInfo = { name: 'Quiky', token: true };
	} else {
		userInfo = { name: 'Bob', token: true };
	}

	return res.send(userInfo);
});

module.exports = router;
