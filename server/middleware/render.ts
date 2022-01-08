import { configure, renderFile, Middleware } from "../dep.ts";

const render: Middleware = async (context, next) => {
  configure({
    views: `${Deno.cwd()}`,

  });

  context.render = async (file, data) => {
    context.response.headers.set("Content-Type", "text/html; charset=utf-8");
    context.response.body = await renderFile(file, data);
  };

  await next();
};

export default render;
