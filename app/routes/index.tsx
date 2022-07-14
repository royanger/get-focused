import { useLoaderData, Form } from '@remix-run/react'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { authenticator } from '../services/auth.server'
// import type { SocialsProvider } from 'remix-auth-socials'
import Logo from '../components/icons/Logo'
import type { User } from '../services/auth.server'

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

export default function Index() {
  let data = useLoaderData<{ user: User; message: string }>()
  return (
    <div className="remix__page">
      <main
        className="h-screen bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage:
            'url("/images/gradient-dynamic-purple-lines-background.jpg")',
        }}
      >
        <nav className="flex justify-end px-4 py-2">
          {data?.user ? (
            <>
              <Form action="/logout" method="post">
                <button className="bg-yellow-700 text-purple-300 border-0 text-lg font-bold px-4 py-2 mr-2">
                  Logout
                </button>
              </Form>
            </>
          ) : (
            <>
              <form action="/auth/twitter" method="post">
                <button className="bg-yellow-700 text-purple-300 border-0 text-lg font-bold px-4 py-2 mr-2">
                  Get Started
                </button>
              </form>
              <form action="/auth/twitter" method="post">
                <button className="bg-yellow-700 text-purple-300 border-0 text-lg font-bold px-4 py-2 ">
                  Log In
                </button>
              </form>
            </>
          )}
        </nav>
        <div className="h-full flex justify-center items-center">
          <div className=" max-w-6xl w-full">
            <h1 className="flex items-center text-2xl text-grey-200 mb-8">
              <Logo className="w-16 mr-3" /> Get Focused
            </h1>
            <h2 className="text-5xl text-yellow-700">Welcome to Get Focused</h2>
            <p className="max-w-lg text-grey-200 text-xl mt-4">
              built so that you can focus on your daily personal, work and hobby
              tasks and get stuff one
            </p>
          </div>
        </div>
      </main>
      <article className="py-40 flex justify-center">
        <div className="max-w-6xl w-full">
          <div className="flex flex-col items-center mb-24">
            <span className="text-xl text-grey-700">
              get focused is designed to
            </span>
            <h2 className="text-2xl text-purple-300 max-w-lg text-center leading-8 ">
              make your life easier and let you get your tasks done
            </h2>
            <span className="text-lg text-grey-700">and enjoy life</span>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="mb-12">
              <div className="flex flex-row-reverse">
                <img
                  className="w-52"
                  src="/images/get-focused-weekly-planner.jpg"
                  alt="Daily Planner"
                />
                <div className="text-right px-6">
                  <h3 className="text-lg text-purple mb-2 uppercase">
                    Weekly Planner
                  </h3>
                  <p className="text-grey-700">
                    Use the weekly planner to plot out the major tasks for you
                    week. This is a high level view, with the items potentially
                    covering a few smaller tasks.
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-12">
              <div className="flex">
                <img
                  className="w-52"
                  src="/images/get-focused-daily-planner.jpg"
                  alt="Daily Planner"
                />
                <div className="px-6">
                  <h3 className="text-lg text-purple mb-2 uppercase">
                    Daily Planner
                  </h3>
                  <p>
                    Bring the tasks from work, your personal life and your
                    hobbies together to plan out your day. Is the most important
                    thing booking a flight or a doctor's appointment, or
                    spending six hours debugging an app?
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-row-reverse">
                <img
                  className="w-52"
                  src="/images/get-focused-weekly-review.jpg"
                  alt="Daily Planner"
                />
                <div className="text-right px-6">
                  <h3 className="text-lg text-purple mb-2 uppercase">
                    Weekly Review
                  </h3>
                  <p>
                    Take some time to reflect on the week that just passed. What
                    worked out well? What did you learn? What can you improve?
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex">
                <img
                  className="w-52"
                  src="/images/get-focused-dashboard.jpg"
                  alt="Daily Planner"
                />
                <div className="px-6">
                  <h3 className="text-lg text-purple mb-2 uppercase">
                    Dashboard
                  </h3>
                  <p>
                    Take a look at the number of tasks pending, or how your mood
                    and exercise habits have been. Get a quick look at how
                    things are going.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <footer className="mt-10 bg-purple-700 text-grey-200 px-5 py-10">
        <div className="max-w-6xl">
          <a href="https://www.freepik.com/vectors/fast-background">
            Fast background vector created by freepik - www.freepik.com
          </a>
        </div>
      </footer>
    </div>
  )
}
