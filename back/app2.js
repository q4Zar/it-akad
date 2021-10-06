// creer une application en utilisant le framework Koa
const Koa = require('koa')

// instancier un Router pour que l'application puisse l'utiliser
const Router = require('koa-router')
// Sans routeur :
// Routes dispo :
    // - localhost:3000/
// Avec Routeur
// Routes dispo :
    // - localhost:3000/route-1
    // - localhost:3000/route-2
    // - etc ...
var router = new Router()

// instancier une route simple
// client.js GET /categories

router.get('/categories' , (ctx, next) => {
    // renvoi le resultat brut donc toutes les categories disponibles : une liste
    ctx.body = [
        {name: 'Politique', pays: 'France', id:1},
        {name: 'Technologie', pays: 'Espagne', id:2},
        {name: 'Environment', pays: 'Italie', id:3},
    ]
})




// POST : ajouter un element
router.post('/category' , (ctx, next) => {
    // je rajoute l'object dans ma base ...
    // je recuperer les informations de l'object ajoute
    // { name: 'Environnement' }
    // ctx.request.body recuperer l'object que le client envoi
    let data_obj = ctx.request.body // {name: 'Environnement'}
    new_category = database.add({ table:'category', data: data_obj })
    console.log(new_category)
    // { name: 'Environnement', id:3}
    ctx.body = new_category
})




// client.js GET /categories/Technologie 
router.get('/categories/:name' , (ctx, next) => {
    // :name pour preciser que je cherche a recuperer la categorie qui s'apelle :name
    // renvoi le resultat filtre donc seulement la categoriy non
    let catName = ctx.params.name
    // console.log(catName) : Technologie
    ctx.body = [
        // {name: 'Technologie'},
    ]
})

// client.js GET /category?name=Technologie&env=test&version=1.0.0
// axios.get('http://localhost:3000/category?name=test-category-1&env=test&version=1.0')
router.get('/category' , (ctx, next) => {
    let catName = ctx.query.name // test-category-1
    // let env = ctx.query.env // test
    // let version = ctx.query.version // 1.0
    // do some magic and only return the category who's name is catName
    ctx.body = [
        {name: 'Technologie'},
    ]
})

// POST : creer un element
router.post('/category' , (ctx, next) => {
    // je rajoute l'object dans ma base ...
    // je recuperer les informations de l'object ajoute
    // { name: 'Environnement' }
    new_category = database.add({ table:'category', data: ctx.request.body})
    console.log(new_category)
    // { name: 'Environnement', id:3}
})
// PUT : mettre a jour un element
router.put(('/category' , (ctx, next) => {
    let data_obj = ctx.request.body // { name: Environnement }

    // ctx.body = ctx.request.body

    // let catName = ctx.query.name
    // let env = ctx.query.env
    // let version = ctx.query.version
    // // do some magic and only return the category who's name is catName
    // ctx.body = [
    //     {name: 'Technologie'},
    // ]
})
// DEL : supprimer un element
// router.delete
