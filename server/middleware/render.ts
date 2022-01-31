import { configure, renderFile, Middleware } from "../dep.ts";
import { getDoing } from '../core.ts'

const render: Middleware = async (context, next) => {
  configure({
    views: `${Deno.cwd()}/../dist/`,
    tags: ["![","]!"]
  });

  context.render = async (file, data = {}) => {
    context.response.headers.set("Content-Type", "text/html; charset=utf-8");
    try {
      context.response.body = await renderFile(file, {...data, doing: getDoing});
    } catch (e) {
      console.log(e.split('\n')[0])
    }
  };

  await next();
};

export default render;
