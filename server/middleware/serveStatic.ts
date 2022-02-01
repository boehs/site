import { send, Middleware, config } from "../dep.ts";

const serveStatic: Middleware = async (context, next) => {
  if (context.request.url.pathname.startsWith("/assets")) {
    const path = context.request.url.pathname.replace('/assets/','');
    await send(context, path, {
      root: `${config.views}/assets`,
    });
  } else {
    await next();
  }
};

export default serveStatic
