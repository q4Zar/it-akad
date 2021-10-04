const Koa = require('koa')

// acceder aux params depuis le contexte
const koaBody = require('koa-body')

// declarer un router pour avoir plusieurs route
const Router = require('koa-router')

// Declare Main Application
const app = module.exports = new Koa()
app.use(koaBody({ multipart: true }))

// Declare Router
var router = new Router()

// add route get to Router
router.get('/hello-world/', (ctx, next) => {
    ctx.body = 'Hello-World'
})

// Start Application
if (!module.parent) {
    app
    .use(router.routes()) // Specify we use a Router
    .use(router.allowedMethods()) 
    .listen(3000)
}














// router.post('/body-parser-object/', (ctx, next) => {
//     ctx.body = ctx.request.body
// })

// router.put('/body-parser-object/:id', (ctx, next) => {
//     ctx.request.body.id = ctx.params.id
//     ctx.body = ctx.request.body
// })

// router.post('/body-parser-string/', (ctx, next) => {
//     ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
// })

