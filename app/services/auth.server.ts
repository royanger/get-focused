import dotenv from 'dotenv'
dotenv.config()
import { findOrCreateUser } from '../queries/findOrCreateUser'
import { Authenticator, LocalStrategy, GoogleStrategy } from 'remix-auth'
import { sessionStorage } from '~/services/session.server'

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export let authenticator = new Authenticator<User>(sessionStorage)

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
      // TODO this URL needs to change if in production mode
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    async (_, __, ___, profile) => {
      let user = await findOrCreateUser(
        profile.id,
        profile.emails[0].value,
        profile.name.givenName,
        profile.name.familyName
      )
      return user
    }
  )
)
