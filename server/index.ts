import { Application } from "./dep.ts";
import errorMiddleware from "./middleware/error.ts";
import renderMiddleware from "./middleware/render.ts";
import staticMiddleware from "./middleware/serveStatic.ts";
import router from "./routes.ts";
import db from './cfgDB.ts'

const app = new Application();

let t1;

console.log('Starting server!!')
t1 = performance.now()
app.use(errorMiddleware);
app.use(staticMiddleware);
app.use(renderMiddleware);
app.use(router.routes());


async function run() {
    await app.listen({ port: 6969 });
}

run()
console.log(`Server started in ${Math.floor(performance.now() - t1)}ms. Setting Up DB.`)
t1 = performance.now()

db(t1)

export { app };