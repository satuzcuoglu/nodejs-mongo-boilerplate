import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';
import config from '../config/';

// Setup work and export for the JWT passport strategy
export default passport => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.auth.secret
  };

  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.findOne({
      id: jwtPayload.id
    }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};
