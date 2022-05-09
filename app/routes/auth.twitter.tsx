import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { authenticator } from '../services/auth.server'

// export let loader: LoaderFunction = () => redirect('/login')

export let action: ActionFunction = async ({ request }) => {
  return await authenticator.authenticate('twitter', request, {
    successRedirect: '/dashboard', // Destination in case the user is already logged in
  })
}
