import { GoogleStrategy } from 'remix-auth-socials'
import { findOrCreateUser } from '../queries/findOrCreateUser'
import { Authenticator } from 'remix-auth'
import { sessionStorage } from '../services/session.server'
import dotenv from 'dotenv'
dotenv.config()

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
      callbackURL: `${process.env.GOOGLE_CALLBACK_URL}`,
    },
    async ({ profile }) => {
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
