import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import container from '../container';
import Users from '../models/user';
import findUserWithEmailAndPassword from '../utils/users';

passport.serializeUser((user, done) => {
    console.log('passport serialize, userId=', user.id);
    done(null, user.id);
});

passport.deserializeUser((req, id, done) => {
    console.log('passport deserialize, userId', id);
    container.resolve("UserService").findUserById(id)
        .then(
            (user) => done(null, user.toJSON()),
            (err) => done(err)
        );
});

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passReqToCallback: true,
        },
        (req, email, password, done) => {
            findUserWithEmailAndPassword(email, password)
                .then((user) => {
                    if (user) {
                        console.log('user--------------------', user);
                        done(null, user);
                    } else {
                        console.log('Email or password is incorrect from clo')
                        // TODO send custom message
                        done(null, false, { message: 'Email or password is incorrect' });
                    }
                });
        }
    )
);

export const passportInitialize = passport.initialize();
export const passportSession = passport.session();
export const passportAuth = passport.authenticate('local');
export default passport;