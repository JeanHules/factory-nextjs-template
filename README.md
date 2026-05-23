# Factory Next.js Template

Boilerplate for Software Factory generated apps.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth + DB via `@supabase/ssr`)
- Jest + React Testing Library

## Structure

```
app/           Next.js App Router pages
components/ui/ Primitive UI components (Button, Card, Input, Label, Badge, Select)
lib/auth.ts    Auth cookie helpers (setAuthCookie, getStateCookieOptions, clearAuthCookie)
lib/supabase/  Server + browser Supabase clients
types/index.ts Shared TypeScript types (User, ApiResponse<T>, PaginatedResponse<T>)
middleware.ts  Supabase session refresh middleware
```

## Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
