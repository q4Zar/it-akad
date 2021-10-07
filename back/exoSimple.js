//
const Koa = require('koa')

//
const axios = require('axios');

// acceder aux params depuis le contexte
const koaBody = require('koa-body')

// declarer un router pour avoir plusieurs route
const Router = require('koa-router')

// Declare Main Application
const app = module.exports = new Koa()
app.use(koaBody({ multipart: true }))

// Declare Router
var router = new Router()

// Create a root ('/') router with GET request & send 'Welcome to Koa' message to client.
router.get('/',ctx => {
    ctx.body = "Welcome to Koa";
})

// Create a GET request for '/superheors' endpoint and return all super heros name
const heros = [
    {
        "id" : 1,
        "name" : "Thor"
    },
    {
        "id" : 2,
        "name" : "Iron Man"
    },
    {
        "id" : 3,
        "name" : "Hulk"
    }
];

router.get('/superheros', ctx => {
    ctx.body = heros;
})
// Create POST request to add new heros to heros Array
router.post('/superheros', ctx => {
    console.log(ctx.request.body);
    // we get request body from ctx.request.body bcoz koa-parser add parsed body to ctx.request.body
    let {id,name} = ctx.request.body;
    if(!id){
        ctx.throw('400','id is required field');
    }
    if(!name){
        ctx.throw('400','name is required field');
    }
    heros.push({id,name});
    ctx.body = heros;
})

// GET hero by id => /superheros/:id
router.get('/superheros/:id', ctx => {
    // get id from request param (request param always as string)
    let id = parseInt(ctx.params.id);  // if id in heros array is int than we have to convert req param to int.
    // find hero by id
    let hero = heros.find( heros => heros.id === id)
    // send response
    ctx.body = hero;
})


// Delete hero by id
router.delete('/superheros/:id', ctx => {
    // get id from request param
    let id = parseInt(ctx.params.id);
    // remove hero by id using lodash
    let result = _.remove(heros,hero => hero.id === id);
    console.log(result)
    // send response
    ctx.body = heros;
})

// update hero by id

router.put('/superheros/:id', ctx => {
    let { id,name } = ctx.request.body;
    // get id from request param
    let heroId = parseInt(ctx.params.id);
    // find the index of the hero by id
    const index = heros.findIndex(hero => hero.id === heroId);

    // update Id
    if (id) {
        heros[index].id = id;
    }
    // update name
    if (name) {
        heros[index].name = name;
    }
    ctx.body = heros;
})
// register routes middleware to app
app.use(router.routes());
let PORT = 3000
app.listen(PORT,function(){
    console.log(`Server is running on ${PORT}`);
});