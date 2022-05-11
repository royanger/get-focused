import type { LoaderFunction } from '@remix-run/node'
import { authenticator } from '../services/auth.server'

export let loader: LoaderFunction = async ({ request }) => {
  await authenticator.authenticate('twitter', request, {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
}
