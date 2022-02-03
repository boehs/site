import { Router, RouterContext, config, secrets } from "./dep.ts";
import render from './fetchMd.ts'
import { Node, Tag, Persistent } from './db.ts'

function isAuthenticated(auth: string | null) {
    const matches = /Bearer\s*(.*)/.exec(auth ?? "")

    if (matches && matches.length > 1) {
        return matches[1] == secrets.admin;
      }
}

async function renderPretty(ctx: RouterContext, NorT: typeof Node | typeof Tag) {
    const posts = await NorT.all()
    await ctx.render("garden/pretty.html",{posts: posts})
}

async function renderUgly(ctx: RouterContext, NorT: typeof Node | typeof Tag) {
    let posts = await NorT.select("name").all()
    posts = posts.map(x => x.name)
    await ctx.render("garden/ugly.html",{posts: posts})
}

async function renderMd(ctx: RouterContext,localpath: string) {
    const data = await render(`${config.root}/md/${ctx.params.id}.md`)
    await ctx.render(localpath,data)
}

const router = new Router();

// Post
router.get('/garden/nodes/:id', ctx => renderMd(ctx,"garden/postview.html"))

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


/// === post ===

router.post('/is/set/:message',async ctx => {
    if (!isAuthenticated(ctx.request.headers.get('Authorization')))
        return ctx.response.status = 418
        const dbLen = await Persistent.count()
        if(dbLen == 0) await Persistent.create({id: 0, is: ctx.params.message})
        else {
            const firstValue = Persistent.first()
            if (dbLen > 0) {
                await Persistent.delete()
                await Persistent.create({id: 0, is: ctx.params.message})
            }
            else await firstValue.then(async thing => {
                thing.is = ctx.params.message
                await thing.update()
            })
        }
})

export default router