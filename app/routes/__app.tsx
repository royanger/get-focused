import * as React from 'react'
import type { LoaderFunction } from '@remix-run/node'
import { Link, Outlet, useLoaderData, Form } from '@remix-run/react'
import { authenticator } from '../services/auth.server'
import Logo from '../components/icons/Logo'
import Container from '../components/Container'
import type { User } from '../services/auth.server'
import { GitHubIcon, LinkedInIcon, TwitterIcon } from '../components/icons'

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
    <div className="min-h-screen flex flex-col">
      <Container bgColor="bg-purple">
        <header className="text-white flex my-4">
          <div className="flex flex-row flex-grow">
            <Link
              to="/dashboard"
              className="flex flex-row items-center text-2xl"
            >
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
            <Link className="mr-8 hover:text-grey-300" to="/daily/planner">
              Daily Planner
            </Link>
            <Link className="mr-8 hover:text-grey-300" to="/weekly/review">
              Weekly Review
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
      <div className="grow">
        <div className="">
          <Outlet />
        </div>
      </div>
      <footer className="bg-purple-700 mt-12">
        <Container>
          <div className="h-12 text-white grid grid-cols-2 w-full">
            <div className="h-full flex items-center justify-start">
              &copy; Roy Anger -{'  '}
              <a
                className="text-grey-300 hover:text-grey ml-1"
                href="https://royanger.dev"
              >
                https://royanger.dev
              </a>
            </div>
            <div className="h-full flex items-center justify-end text-white">
              <a
                href="https://github.com/royanger"
                className="hover:text-grey-300"
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon className="h-6 w-auto pl-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/royanger/"
                className="hover:text-grey-300"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon className="h-6 w-auto pl-4" />
              </a>
              <a
                href="https://twitter.com/royanger"
                className="hover:text-grey-300"
                target="_blank"
                rel="noreferrer"
              >
                <TwitterIcon className="h-6 w-auto pl-4" />
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}
