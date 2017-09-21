import lodash from 'lodash';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';

import './config';
import useJWTStrategy from './config/passport';

import auth from './routes/auth';


const app = express();
global._ = lodash;

// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Init passport
app.use(passport.initialize());

useJWTStrategy(passport);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Routes
app.use('/auth', auth);

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port : ${process.env.PORT}`);
});


export default app;
