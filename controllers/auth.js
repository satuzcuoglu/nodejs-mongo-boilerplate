import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';

// Register new users
export function register(req, res) {
  if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
    res.json({
      success: false,
      message: 'Please fill all fields.'
    });
  } else {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });

    // Attempt to save the user
    newUser.save().then((user) => {
      res.json({
        success: true,
        message: 'Successfully created new user.',
        user
      });
    }).catch((error) => {
        console.log(error);
        res.json({
          success: false,
          message: 'Email already in use'
        });
    });
  }
}

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
export function login(req, res) {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.status(401).send({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          const token = jwt.sign(user, config.auth.secret, {
            expiresIn: '15 days'
          });
          res.json(token);
        } else {
          res.send({
            success: false,
            message: 'Authentication failed. Passwords did not match.'
          });
        }
      });
    }
  });
}

// Check User and return User Info
export function checkUser(req, res) {
  res.send(`It worked! User id is: ${JSON.strinfigy(req.user.toJSON())}`);
}
