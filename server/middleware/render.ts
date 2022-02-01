import { configure, renderFile, Middleware, config } from "../dep.ts";
import { getDoing } from '../core.ts'

const render: Middleware = async (context, next) => {
  configure({
    views: config.views,
    tags: ["![","]!"]
  });

  context.render = async (file, data = {}) => {
    context.response.headers.set("Content-Type", "text/html; charset=utf-8");
    context.response.body = await renderFile(file, {...data, doing: getDoing});
  };

  await next();
};

export default render;
