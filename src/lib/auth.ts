import Cookies from 'js-cookie'

const AUTH_COOKIE_NAME = 'isAuthenticated'
const AUTH_EXPIRY_HOURS = 1

export function setAuthCookie() {
  Cookies.set(AUTH_COOKIE_NAME, 'true', { 
    expires: AUTH_EXPIRY_HOURS / 24, // Convert hours to days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })
}

export function getAuthCookie(): boolean {
  const authCookie = Cookies.get(AUTH_COOKIE_NAME)
  return authCookie === 'true'
}

export function removeAuthCookie() {
  Cookies.remove(AUTH_COOKIE_NAME)
}

export function isAuthenticated(): boolean {
  return getAuthCookie()
}
