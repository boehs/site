import { send, Middleware } from "../dep.ts";

const serveStatic: Middleware = async (context, next) => {
  if (context.request.url.pathname.startsWith("/assets")) {
    const path = context.request.url.pathname.replace('/assets/','');
    console.log(path)
    await send(context, path, {
      root: `${Deno.cwd()}/../dist/assets`,
    });
  } else {
    await next();
  }
};

export default serveStatic
