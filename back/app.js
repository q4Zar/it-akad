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

// ------------------- LVL 1 ---------------------------------------------

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

// ------------------- / LVL 1 ---------------------------------------------
// ------------------- LVL 2 ---------------------------------------------
// with object payload
router.post('/authentification-to-db',  async (ctx, next) => {

    console.log(ctx)

    // on recuperer les elements distincts
    // ctx.request.body = { identifier: 'itakad@gmail.com', password: 'itakad2020' }
    let login = ctx.request.body.login
    let password = ctx.request.body.password

    // declare une variable pour le json web token
    // initialisation de la variable pour collecter la donnee de la response du post
    var jwt = null // ------------------------------------------->

    // si les login et password sont correct je recupere un jwt
    await axios.post('https://gql.alcyone.life/auth/local', {
        identifier: login,
        password: password,
    })
    .then(response =>{
        console.log(response.data) // handle succes
        // extraction du jwt de la reponse
        jwt = response.data.jwt // <-----------------------------------
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

// axios.get('http://localhost:3000/get-db-collection/Categories?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMzNTEzMDU4LCJleHAiOjE2MzYxMDUwNTh9.Pj7citQPQEysxKMMk24jzsrbgYHwR8HB9ijmiCIdpKU')
router.get('/get-db-collection/:name_collection', async (ctx, next) => {
    // recuperer en parametre le nom de la collection a requeter
    let jwt = ctx.query.jwt
    let collection = ctx.params.name_collection
    let collectionData = null
    let collectionDataName = null

    // ensuite requeter la base de donnee
    await axios.get(`https://gql.alcyone.life/${collection}`, { headers: { Authorization: `Bearer ${jwt}` }}) // `Bearer ${jwt}` == 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMzNTEzMDU4LCJleHAiOjE2MzYxMDUwNTh9.Pj7citQPQEysxKMMk24jzsrbgYHwR8HB9ijmiCIdpKU'
    .then(response =>{
        console.log(response.data) // handle succes
        // extraction du jwt de la reponse
        // jwt = response.data.jwt
        collectionData = response.data
    })
    .catch(function (error) {
        console.log(error)
        console.log('error') // handle error
    })
    .then(function () {
        console.log('--- --- ---')
    });

    // renvoyer tout le contenu
    // ctx.body = collectionData

    // renvoyer une partie du contenu
    collectionDataName = collectionData.map(col => col.name)
    ctx.body = collectionDataName
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




// retrieve specific id from collection
router.get('/get-db-collection/:collection/:name', async (ctx, next) => {
    // axios.get(`https://alcyone.life/${collection}?name=${name}`)
})

// ------------------- / LVL 2 ---------------------------------------------

router.get('/',  (ctx, next) => {
    // a vous de coder
    // return {jwt: jwt}
    ctx.body = "Slash"
})

// Start Application
if (!module.parent) {
    app
    .use(router.routes()) // Specify we use a Router
    .use(router.allowedMethods())
    .listen(3000)
}