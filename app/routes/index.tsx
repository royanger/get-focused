import { useLoaderData, Form } from '@remix-run/react'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { authenticator } from '../services/auth.server'
import { SocialsProvider } from 'remix-auth-socials'

interface SocialButtonProps {
  provider: SocialsProvider
  label: string
}

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: 'Get Focused',
    description:
      'Focus on the tasks you need to complete in way that will boost your productivity',
  }
}

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request)
  return { user }
}

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const SocialButton: React.FC<SocialButtonProps> = ({ provider, label }) => (
    <Form action={`/auth/${provider}`} method="post">
      <button>{label}</button>
    </Form>
  )

  let data = useLoaderData<{ user: User; message: string }>()
  return (
    <div className="remix__page">
      <main>
        <h2 className="text-5xl text-purple-300">Welcome to Get Focused</h2>
      </main>
      <aside>
        <h2>Get Started</h2>
        {data?.user ? (
          <>
            <Form action="/logout" method="post">
              <button>Logout</button>
            </Form>
          </>
        ) : (
          <>
            <SocialButton
              provider={SocialsProvider.GOOGLE}
              label="Login with Google"
            />
            <form action="/auth/google" method="post">
              <button>Log In</button>
            </form>
          </>
        )}
      </aside>
    </div>
  )
}
