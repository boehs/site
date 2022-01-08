import { Middleware } from '../dep.ts'

const error: Middleware = async (_context, next) => {
    try {
      await next();
    } catch (e) {
      console.log(e);
    }
  };
  

export default error
  