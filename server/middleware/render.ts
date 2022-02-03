import { configure, renderFile, Middleware, config, renderData } from "../dep.ts";

const render: Middleware = async (context, next) => {
  configure({
    views: config.views,
    tags: ["![","]!"]
  });

  context.render = async (file, data = {}) => {
    context.response.headers.set("Content-Type", "text/html; charset=utf-8");
    console.dir(await {...data, ...renderData}.doing())
    const body = await renderFile(file, {...data, ...renderData},{async: true})
    context.response.body = body
  };

  await next();
};

export default render;
