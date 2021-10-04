const Koa = require('koa')
const koaBody = require('koa-body')
const Router = require('koa-router')

// Declare Main Application
const app = module.exports = new Koa()
app.use(koaBody({ multipart: true }))

var router = new Router()

router.get('/hello-world/', (ctx, next) => {
    console.log(ctx)
    ctx.body = 'Hello-World'
})

router.post('/body-parser-object/', (ctx, next) => {
    ctx.body = ctx.request.body
})

router.put('/body-parser-object/:id', (ctx, next) => {
    ctx.request.body.id = ctx.params.id
    ctx.body = ctx.request.body
})

router.post('/body-parser-string/', (ctx, next) => {
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
})

app.use(router.routes())

// demarrer l'application
if (!module.parent) {
    app
        .use(router.routes())
        .use(router.allowedMethods())
        .listen(3000)
}