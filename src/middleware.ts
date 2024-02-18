import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { EnvHelper, EnvVariables } from './common/helpers/enviromentHelper/envHelper';
import { jwtHelper } from './common/helpers/jwtHelper';

export default async function middleware(request: NextRequest) {
  const session = request.cookies.get(`${EnvHelper.getVariable(EnvVariables.NEXT_PUBLIC_AUTH_TOKEN)}`)?.value
  const url = request.nextUrl;

  if (session) {
    try {
      const user = await jwtHelper.verify(atob(session))
    } catch (err) {
      console.error('err', err)
    }
  }

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const rootDomain = EnvHelper.getVariable(EnvVariables.NEXT_PUBLIC_ROOT_DOMAIN)
  let hostname = request.headers
    .get("host")!
    .replace(".localhost:3000", `.${rootDomain}`);

  // special case for Vercel preview deployment URLs
  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${EnvHelper.getVariable(EnvVariables.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX)}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${rootDomain}`;
  }

  const searchParams = request.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""
    }`;

  // rewrite root application to `/home` folder
  if (
    hostname === "localhost:3000" ||
    hostname === rootDomain
  ) {
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, request.url),
    );
  }

  // rewrites for app pages
  if (!session && path !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (session && path == "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // rewrite everything else to `/app/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, request.url));
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
}