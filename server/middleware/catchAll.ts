import { Middleware, config } from "../dep.ts";

const serveStatic: Middleware = async (ctx, next) => {
  let id = ctx.request.url.pathname
  let path = `${config.root}/../dist/`
  if (id == '') id == 'index'
  for(let elm of [id,id + '.html',id += 'index.html']) {
      try {
          await Deno.open(path + elm)
      } catch (_e) {
          continue
      }

      if (elm?.endsWith('.html')) ctx.render(elm)
      else await ctx.send({
          root: path,
      });
  }
  await next()
};

export default serveStatic
