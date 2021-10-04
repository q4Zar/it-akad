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

// demarrer l'application
if (!module.parent) app.listen(3000);