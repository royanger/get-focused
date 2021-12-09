import { createCookieSessionStorage, Session } from 'remix'

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: ['s3cr3t'],
    secure: process.env.NODE_ENV === 'production',
  },
})

export function getSession(request: Request): Promise<Session> {
  return sessionStorage.getSession(request.headers.get('Cookie'))
}

export let { commitSession, destroySession } = sessionStorage
