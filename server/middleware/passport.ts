import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import serverContainer from '../container';

passport.serializeUser((user, done) => {
    console.log('passport serialize, userId=', user.id);
    done(null, user.id);
});

passport.deserializeUser((req, id, done) => {
    console.log('passport deserialize, userId', id);
    serverContainer.resolve("UserService").findUserById(id)
        .then(
            (user) => done(null, user),
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
            serverContainer.resolve("UserService")
                .findUserWithEmailAndPassword(email, password)
                .then((user) => {
                    if (user) {
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