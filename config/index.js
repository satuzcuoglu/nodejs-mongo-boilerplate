const env = process.env.NODE_ENV || 'development';
console.log('**** ENVIRONMENT ****  ', env);

if (env === 'development') {
  process.env.PORT = 8080;
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/Application';
} else if (env === 'test') {
  process.env.PORT = 8080;
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/Application';
}

const auth = {
	secret: 'ApplicationSecret'
};

module.exports.auth = auth;
