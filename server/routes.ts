import { Router, RouterContext } from "./dep.ts";
import render from './fetchMd.ts'

async function renderMd(ctx: RouterContext) {
    let md = await render(`${Deno.cwd()}/md/${ctx.params.id}`)
    let stats = await Deno.stat(`${Deno.cwd()}/md/${ctx.params.id}.md`)
    ctx.render("post.html",{ ...md, ...stats })
}

const router = new Router();

router.get('/post/:id', ctx => renderMd(ctx))

export default router