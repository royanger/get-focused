import type { LoaderFunction } from '@remix-run/node'
import { authenticator } from '../services/auth.server'

export let loader: LoaderFunction = async ({ request, params }) => {
  await authenticator.authenticate('google', request, {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
}
