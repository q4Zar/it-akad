const axios = require('axios');
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

router.post('/body-parser-object/', (ctx, next) => {
    ctx.body = ctx.request.body
})

router.put('/body-parser-object/:id', (ctx, next) => {
    ctx.request.body.id= ctx.params.id
    ctx.body = ctx.request.body
})

//
router.post('/body-parser-string/', (ctx, next) => {
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
})

// with object payload
router.post('/authentification-to-db',  async (ctx, next) => {

    console.log(ctx)

    // on recuperer les elements distincts
    // ctx.request.body = { identifier: 'itakad@gmail.com', password: 'itakad2020' }
    let login = ctx.request.body.login
    let password = ctx.request.body.password

    // declare une variable pour le json web token
    var jwt = null

    // si les login et password sont correct je recupere un jwt
    await axios.post('https://gql.alcyone.life/auth/local', {
        identifier: login,
        password: password,
    })
    .then(response =>{
        console.log(response.data) // handle succes
        // extraction du jwt de la reponse
        jwt = response.data.jwt
    })
    .catch(function (error) {
        console.log('error') // handle error
    })
    .then(function () {
        console.log('--- --- ---')
    });

    // driver db
    // jwt = driverdb.select('select jwt from user')

    // affichage jwt
    console.log(jwt)
    // je retourne un object avec le jwt
    ctx.body = {jwt: jwt}

})

router.get('/redirection-to-random-url', (ctx, next) => {
    ctx.redirect('https://google.com')
})

// with query string
router.get('/authentification-to-db',  async (ctx, next) => {

    console.log(ctx)
    // on recuperer les elements distincts
    // ctx.request.body = { identifier: 'itakad@gmail.com', password: 'itakad2020' }
    let login = ctx.query.login
    let password = ctx.query.password

    // declare une variable pour le json web token
    var jwt = null

    // si les login et password sont correct je recupere un jwt
    await axios.post('https://gql.alcyone.life/auth/local', {
        identifier: login,
        password: password,
    })
    .then(response =>{
        console.log(response.data) // handle succes
        // extraction du jwt de la reponse
        jwt = response.data.jwt
    })
    .catch(function (error) {
        console.log('error') // handle error
    })
    .then(function () {
        console.log('--- --- ---')
    });
    // affichage jwt
    console.log(jwt)
    // je retourne un object avec le jwt
    ctx.body = {jwt: jwt}
})

// text
// ctx.body = "str" : text/plain
// json
// ctx.body = {str: "str"} : application/json

// ctx.request.body = {str: "str"}
// ctx.request.query = http://localhost:3000/get-auth-db?login=itakad@gmail.com&password=itakad2020


router.get('/get-db-collection/:collection', async (ctx, next) => {
    // recuperer en parametre le nom de la collection a requeter
    let collection = ctx.params.collection
    

    // ensuite requeter la base de donnee
    await axios.get(`https://gql.alcyone.life/${collection}`)
    .then(response =>{
        console.log(response.data) // handle succes
        // extraction du jwt de la reponse
        // jwt = response.data.jwt
    })
    .catch(function (error) {
        console.log('error') // handle error
    })
    .then(function () {
        console.log('--- --- ---')
    });

    // a vous de coder
    // return content of collection
    ctx.body = []
})


router.post('/',  (ctx, next) => {
    // a vous de coder
    return {jwt: jwt}
})



// Start Application
if (!module.parent) {
    app
    .use(router.routes()) // Specify we use a Router
    .use(router.allowedMethods())
    .listen(3000)
}
