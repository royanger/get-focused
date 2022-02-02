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
import Logo from './components/icons/logo'
import Container from './components/Container'

import tailwindUrl from './styles/tailwind.css'
import chartColorsUrl from './styles/chartcolors.css'

/**
 * The `links` export is a function that returns an array of objects that map to
 * the attributes for an HTML `<link>` element. These will load `<link>` tags on
 * every route in the app, but individual routes can include their own links
 * that are automatically unloaded when a user navigates away from the route.
 *
 * https://remix.run/api/app#links
 */
export let links: LinksFunction = () => {
  return [
    //  {
    //    rel: 'preload',
    //    as: 'fonts',
    //    href: '/fonts/Lato-Regular.ttf',
    //    type: '/font/ttf',
    //    crossOrigin: 'anonymous',
    //  },
    //  {
    //    rel: 'preload',
    //    as: 'fonts',
    //    href: '/fonts/Hind-SemiBold.ttf',
    //    type: '/font/ttf',
    //    crossOrigin: 'anonymous',
    //  },
    //  {
    //    rel: 'preload',
    //    as: 'fonts',
    //    href: '/fonts/Montserrat-Regular.ttf',
    //    type: '/font/ttf',
    //    crossOrigin: 'anonymous',
    //  },
    //  {
    //    rel: 'preload',
    //    as: 'fonts',
    //    href: '/fonts/Montserrat-SemiBold.ttf',
    //    type: '/font/ttf',
    //    crossOrigin: 'anonymous',
    //  },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Lato&family=Montserrat:wght@400;700&family=Mali&display=swap',
    },

    { rel: 'stylesheet', href: tailwindUrl },
    { rel: 'stylesheet', href: chartColorsUrl },
  ]
}

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request)
  return { user }
}

/**
 * The root module's default export is a component that renders the current
 * route via the `<Outlet />` component. Think of this as the global layout
 * component for your app.
 */
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body className="font-body">
        {children}
        <RouteChangeAnnouncement />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

function Layout({ children }: React.PropsWithChildren<{}>) {
  let data = useLoaderData<{ user: User; message: string }>()
  return <>{children}</>
}

export function CatchBoundary() {
  let caught = useCatch()

  let message
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      )
      break
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      )
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  )
}

/**
 * Provides an alert for screen reader users when the route changes.
 */
const RouteChangeAnnouncement = React.memo(() => {
  let [hydrated, setHydrated] = React.useState(false)
  let [innerHtml, setInnerHtml] = React.useState('')
  let location = useLocation()

  React.useEffect(() => {
    setHydrated(true)
  }, [])

  let firstRenderRef = React.useRef(true)
  React.useEffect(() => {
    // Skip the first render because we don't want an announcement on the
    // initial page load.
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    let pageTitle = location.pathname === '/' ? 'Home page' : document.title
    setInnerHtml(`Navigated to ${pageTitle}`)
  }, [location.pathname])

  // Render nothing on the server. The live region provides no value unless
  // scripts are loaded and the browser takes over normal routing.
  if (!hydrated) {
    return null
  }

  return (
    <div
      aria-live="assertive"
      aria-atomic
      id="route-change-region"
      style={{
        border: '0',
        clipPath: 'inset(100%)',
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: '0',
        position: 'absolute',
        width: '1px',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
      }}
    >
      {innerHtml}
    </div>
  )
})
