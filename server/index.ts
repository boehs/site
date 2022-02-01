import { Application, config } from "./dep.ts";
import catchAllMiddleware from "./middleware/catchAll.ts";
import renderMiddleware from "./middleware/render.ts";
import staticMiddleware from "./middleware/serveStatic.ts";
import router from "./routes.ts";
import db from './db.ts'

const app = new Application();
console.log('Starting server!!')
const t1 = performance.now()
app.use(staticMiddleware);
app.use(renderMiddleware);
//app.use(errorMiddleware);
app.use(router.routes());
app.use(catchAllMiddleware)

async function run() {
    await app.listen({ port: config.port });
}

run()
console.log(`Server started in ${Math.floor(performance.now() - t1)}ms. Setting Up DB.`)
db(performance.now())

export { app };