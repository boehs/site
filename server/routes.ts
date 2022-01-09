import { Router, RouterContext } from "./dep.ts";
import render from './fetchMd.ts'

async function renderMd(ctx: RouterContext) {
    const data = await render(`${Deno.cwd()}/md/${ctx.params.id}.md`)
    ctx.render("post.html",data)
}

const router = new Router();

router.get('/posts/:id', ctx => renderMd(ctx))

export default router