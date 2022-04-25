import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { authenticator } from '../services/auth.server'

export let loader: LoaderFunction = () => redirect('/login')

export let action: ActionFunction = async ({ request, params }) => {
  return await authenticator.authenticate('google', request)
}
