const express = require('express');
const app = express();
const router = require('./routes.js');
const bodyParser = require('body-parser');
// const cors = require('cors');

const { PORT = 8082 } = process.env;
// const auth = require('./middleware/auth');

// app.use(express.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
	res.header("Access-Control-Allow-Credentials", true);

	// Respond to preflight OPTIONS requests
	if (req.method === 'OPTIONS') {
		res.send();
	} else {
		next();
	}
});

// app.use(cors());
// app.options('*', cors());
app.use(bodyParser.json()); // before 2021 express.js version...
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(auth);
app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
