import { GoogleStrategy } from 'remix-auth-socials'
import { TwitterStrategy } from 'remix-auth-twitter'
import { findOrCreateGoogleUser } from '../queries/findOrCreateGoogleUser'
import { findOrCreateTwitterUser } from '../queries/findOrCreateTwitterUser'
import { Authenticator } from 'remix-auth'
import { sessionStorage } from '../services/session.server'
import dotenv from 'dotenv'
dotenv.config()

export type User = {
  id: string
  displayName: string
  email?: string | null
  googleId: string | null
  twitterId: number | null
}

export let authenticator = new Authenticator<User>(sessionStorage)

const googleId = process.env.GOOGLE_CLIENT_ID
const googleSecret = process.env.GOOGLE_CLIENT_SECRET
const googleCallback = process.env.GOOGLE_CALLBACK_URL

if (!googleId || !googleSecret || !googleCallback) {
  throw new Error('Missing Google auth information')
}

const twitterId = process.env.TWITTER_API_KEY
const twitterSecret = process.env.TWITTER_API_SECRET
const twitterCallback = process.env.TWITTER_CALLBACK_URL

if (!twitterId || !twitterSecret || !twitterCallback) {
  throw new Error('Missing Twitterauth information')
}

authenticator.use(
  new GoogleStrategy(
    {
      clientID: googleId,
      clientSecret: googleSecret,
      callbackURL: googleCallback,
    },
    async ({ profile }) => {
      let user = await findOrCreateGoogleUser(
        profile.id,
        profile.emails[0].value,
        profile.displayName
      )
      return user
    }
  ),
  'google'
)

authenticator.use(
  new TwitterStrategy(
    {
      clientID: twitterId,
      clientSecret: twitterSecret,
      callbackURL: '/auth/twitter/callback',
      includeEmail: true,
    },
    async ({ accessToken, accessTokenSecret, profile }) => {
      let user = await findOrCreateTwitterUser(
        profile.id,
        profile.email,
        profile.screen_name
      )
      return user
    }
  ),
  'twitter'
)
