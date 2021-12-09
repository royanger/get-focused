import { ActionFunction, LoaderFunction, redirect } from 'remix'
import { authenticator } from '~/services/auth.server'

export let action: ActionFunction = async ({ request }) => {
  // Authenticate the request, after that it will redirect to the defined URLs
  // and set the user in the session if it's a success
  await authenticator.authenticate('local', request, {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
}

export let loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  await authenticator.isAuthenticated(request, {
    successRedirect: '/dashboard',
  })
  return null
}

export default function Login() {
  return (
    <form action="/auth/google" method="post">
      <button>Log In</button>
    </form>
  )
}
