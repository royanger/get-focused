// app/auth.server.ts
import { Authenticator, LocalStrategy, GoogleStrategy } from 'remix-auth'
import { sessionStorage } from '~/services/session.server'
// import { User, findOrCreateUser } from "~/models/user";

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export let authenticator = new Authenticator<User>(sessionStorage)

// Add the local strategy
authenticator.use(
  new LocalStrategy(
    // The strategy will use this URL to redirect the user in case it's logged-in
    // And to know if it should grab the username and password from the request
    // body in case of a POST request
    { loginURL: '/login' },
    async (username, password) => {
      // Find your user data in your database or external service
      console.log(`find username -> ${username}`)
      // let user = await findOrCreateUser({ username });
      // await user.validatePassword(password);
      // return user;
    }
  ),
  // The name of the strategy, every strategy has a default name, only add one
  // if you want to override it (e.g. setup more than one strategy)
  'local'
)

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error('Missing GOOGLE_CLIENT_ID env')
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing GOOGLE_CLIENT_SECRET env')
}

authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    async (_, __, ___, profile) => login(profile.emails[0].value)
  )
)
