import { configure, renderFile, Middleware, config, renderData } from "../dep.ts";

const render: Middleware = async (context, next) => {
  configure({
    views: config.views,
    tags: ["![","]!"]
  });

  context.render = async (file, data = {}) => {
    context.response.headers.set("Content-Type", "text/html; charset=utf-8");
    context.response.body = await renderFile(file, {...data, ...renderData});
  };

  await next();
};

export default render;
