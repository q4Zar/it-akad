const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');

// Declare Main Application
const app = module.exports = new Koa();
app.use(koaBody({ multipart: true }));

var router = new Router();

router.get('/hello-world', (ctx, next) => {
    ctx.body = 'Hello-World'
});

router.post('/body-parser', (ctx, next) => {
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
});

router.put('/body-parser/:id', (ctx, next) => {
    // ...
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)} | id: ${ctx.params.id}`;
});


// demarrer l'application
if (!module.parent) app.listen(3000);