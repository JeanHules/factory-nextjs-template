import { type NextRequest, NextResponse } from 'next/server'

export interface CookieOptions {
  httpOnly: boolean
  secure: boolean
  sameSite: 'lax' | 'strict' | 'none'
  path: string
  maxAge?: number
}

export function getStateCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10,
  }
}

export function setAuthCookie(
  response: NextResponse,
  name: string,
  value: string,
  options?: Partial<CookieOptions>
): void {
  response.cookies.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    ...options,
  })
}

export function clearAuthCookie(response: NextResponse, name: string): void {
  response.cookies.set(name, '', { maxAge: 0, path: '/' })
}

export async function getSessionFromRequest(
  request: NextRequest
): Promise<string | null> {
  return request.cookies.get('session')?.value ?? null
}
