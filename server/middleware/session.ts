import { createClient } from 'redis';
import connectRedis from 'connect-redis';
import nextSession from 'next-session';
import { expressSession, promisifyStore } from 'next-session/lib/compat';
import RedisStore from "connect-redis"

const redisOptions = {
    legacyMode: false 
};

const redisClient = createClient(redisOptions);
redisClient.connect().catch((e) => {
    console.error('Session Redis Error', e);
});

const getSession = nextSession({
    store: promisifyStore(
        new RedisStore({
            client: redisClient as any,
        })
    ),
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 2 * 7 * 24 * 60 * 60, // 2 weeks,
        path: '/',
        sameSite: 'strict',
    },
    touchAfter: 1 * 7 * 24 * 60 * 60, // 1 week
});

export default async function session(req, res, next) {
    await getSession(req, res);
    await next();
}