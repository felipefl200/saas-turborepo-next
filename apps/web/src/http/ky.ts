import { getCookie } from 'cookies-next'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: 'http://localhost:3333',
  hooks: {
    beforeRequest: [
      async (request) => {
        let token: string | undefined
        if (typeof window !== 'undefined') {
          token = getCookie('token') as string | undefined
        } else {
          const { cookies: getServerCookies } = await import('next/headers')
          const cookieStore = await getServerCookies()
          token = cookieStore.get('token')?.value
        }

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
        request.headers.set('Content-Type', 'application/json')
        request.headers.set('Accept', 'application/json')
      },
    ],
  },
})
