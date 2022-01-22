import { LoaderFunction, MetaFunction, useLoaderData, Form } from 'remix'
import { authenticator } from '~/services/auth.server'

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
          <form action="/auth/google" method="post">
            <button>Log In</button>
          </form>
        )}
      </aside>
    </div>
  )
}
