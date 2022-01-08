import { send, Middleware } from "../dep.ts";

const serveStatic: Middleware = async (context, next) => {
  if (context.request.url.pathname.startsWith("/assets")) {
    const path = context.request.url.pathname.substring(7);

    await send(context, path, {
      root: `${Deno.cwd()}/assets`,
    });
  } else {
    await next();
  }
};

export default serveStatic
