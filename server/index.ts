import { Application } from "./dep.ts";
import errorMiddleware from "./middleware/error.ts";
import renderMiddleware from "./middleware/render.ts";
import staticMiddleware from "./middleware/serveStatic.ts";
import router from "./routes.ts";
import db from './db.ts'
import {init} from './core.ts'

init()

const app = new Application();
console.log('Starting server!!')
const t1 = performance.now()
app.use(staticMiddleware);
app.use(renderMiddleware);
//app.use(errorMiddleware);
app.use(router.routes());

async function run() {
    await app.listen({ port: 6969 });
}

run()
console.log(`Server started in ${Math.floor(performance.now() - t1)}ms. Setting Up DB.`)
db(performance.now())

export { app };