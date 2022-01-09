import { Router, RouterContext } from "./dep.ts";
import render from './fetchMd.ts'
import { Node, Tag } from './db.ts'

async function renderPretty(ctx: RouterContext, NorT: typeof Node | typeof Tag) {
    const posts = await NorT.all()
    ctx.render("pretty.html",{posts: posts})
}

async function renderUgly(ctx: RouterContext, NorT: typeof Node | typeof Tag) {
    let posts = await NorT.select("name").all()
    posts = posts.map(x => x.name)
    ctx.render("ugly.html",{posts: posts})
}

async function renderMd(ctx: RouterContext,localpath: string) {
    const data = await render(`${Deno.cwd()}/md/${ctx.params.id}.md`)
    ctx.render(localpath,data)
}

const router = new Router();

// Post
router.get('/garden/nodes/:id', ctx => renderMd(ctx,"postview.html"))

// === Feeds ===
// == "Ugly" ==
router.get('/garden/ugly', ctx => renderUgly(ctx,Node))
// == "Feed" ==
router.get('/garden/feed', ctx => renderPretty(ctx,Node))
// TODO == "Graph"
// router.get('/garden/graph', ctx => )
// TODO == Pages with the tag "blog" ==
// router.get('/blog', async ctx => renderPretty(ctx,await Tag.where("id",Tag.select('id').where('name','blog').).nodes()))

// === Tags ===
// TODO == Pages with tag :id ==
// router.get('/garden/tags/:id', ctx => renderPretty(ctx,Tag))
// TODO == "Ugly" ==
router.get('/garden/tags', ctx => renderUgly(ctx,Tag))

export default router