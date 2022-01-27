import * as React from 'react'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  LoaderFunction,
  useLoaderData,
  useLocation,
  Form,
} from 'remix'
import type { LinksFunction } from 'remix'
import { authenticator } from '~/services/auth.server'
import Logo from '~/components/icons/logo'
import Container from '~/components/container'

import tailwindUrl from './styles/tailwind.css'

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request)
  return { user }
}

/**
 * The root module's default export is a component that renders the current
 * route via the `<Outlet />` component. Think of this as the global layout
 * component for your app.
 */
export default function Layout({ children }: React.PropsWithChildren<{}>) {
  let data = useLoaderData<{ user: User; message: string }>()
  return (
    <>
      <Container bgColor="bg-purple">
        <header className="text-white flex my-4">
          <div className="flex flex-row flex-grow">
            <Link to="/" className="flex flex-row items-center text-2xl">
              <span className="w-12 mr-4 h-auto relative bottom-[-2px]">
                <Logo />
              </span>
              Get Focused
            </Link>
          </div>
          <div className="flex flex-row items-center">
            <Link className="mr-8 hover:text-grey-300" to="/dashboard">
              Dashboard
            </Link>
            <Link className="mr-8 hover:text-grey-300" to="/weekly/planner">
              Weekly Planner
            </Link>
            <Link className="mr-8 hover:text-grey-300" to="/weekly/review">
              Weekly Review
            </Link>
            <Link className="mr-8 hover:text-grey-300" to="/daily/planner">
              Daily Planner
            </Link>
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
          </div>
        </header>
      </Container>
      <div className="">
        <div className="">
          <Outlet />
        </div>
      </div>
      <footer className="">
        <div className="">
          <p>&copy; You!</p>
        </div>
      </footer>
    </>
  )
}
