import { Router, RouterContext } from "./dep.ts";
import render from './fetchMd.ts'
import { Node } from './cfgDB.ts'

async function renderPretty(ctx: RouterContext) {
    const posts = await Node.all()
    ctx.render("pretty.html",{posts: posts})
}

async function renderUgly(ctx: RouterContext) {
    let posts = await Node.select("name").all()
    posts = posts.map(x => x.name)
    ctx.render("ugly.html",{posts: posts})
}

async function renderMd(ctx: RouterContext,localpath: string) {
    const data = await render(`${Deno.cwd()}/md/${ctx.params.id}.md`)
    const tags = await Node.where('name',ctx.params.id).tags()
    ctx.render(localpath)
}

const router = new Router();

// Post
router.get('/garden/nodes/:id', ctx => renderMd(ctx,"postview.html"))

// === Feeds ===
// == "Ugly" ==
router.get('/garden/ugly', ctx => renderUgly(ctx))
// == "Feed" ==
router.get('/garden/feed', ctx => renderPretty(ctx))
// TODO == "Graph"
router.get('/garden/graph', ctx => renderPretty(ctx))
// TODO == Pages with the tag "blog" ==
router.get('/blog', ctx => renderPretty(ctx))

// === Tags ===
// TODO == Pages with tag :id ==
router.get('/garden/tags/:id', ctx => renderPretty(ctx))
// TODO == "Ugly" ==
router.get('/garden/tags', ctx => renderUgly(ctx))

export default router