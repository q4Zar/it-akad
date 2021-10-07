
---

### BackEnd
#### Construire une API REST pour un blog:

- mkdir koa-blog
- npm init
- npm install koa koa-body koa-router axios
- add start script
- add tests script
- creer un dossier src contenant:
    - app.js
        - application principale importe les routeurs de articles et comments
    - articles.js
        - routeur article
        - api axios /BlogArticles
    - comment.js
        - routeur comment
        - api axios /BlogComments
    - tests.js
        - api axios tests de toutes les routes dispo sur app.js

---

##### Contenant les routes suivantes
<!-- url : https://gql.alcyone.life/Blog-Articles -->
- get       /articles
- get       /articles/:id
- post      /articles
<!-- - delete    /articles/:id
- put       /articles/:id -->
##### Modeles de Donnees
###### Article
- name      : string
- slug      : string (lowercase)
- content   : markdown
- medias    : jpg|png

---

<!-- url : https://gql.alcyone.life/Blog-Comments -->
- get       /articles/comment/
- get       /articles/comment/:id
- post      /articles/comment/
<!-- - delete    /articles/comment/:id
- put       /articles/comment/:id -->

##### Modeles de Donnees
###### Article
- name      : string
- slug      : string (lowercase)
- content   : markdown
- medias    : jpg|png
###### Comment
- author    : string
- content   : string

---

#### Authentification + Requetes Base de Donnees
```js
const axios = require('axios');

// requete une la base de donnes avec login + password afin de recuperer un token (jwt : json web token)
axios.post('https://gql.alcyone.life/auth/local', { identifier: 'itakad@gmail.com', password: 'itakad2020' })
    .then(function (response) {
        // console.log(response.data) // handle succes
        // recuperer jwt pour joindre a une requete authentifier
        let jwt = response.data.jwt
        // construire bearer auth token a joindre avec la requete
        console.log(`Bearer ${response.data.jwt}`)
        // recuperer la liste des categories disponibles en base de donnees
        axios.post('https://gql.alcyone.life/Blog-Articles', { name: 'test-2', slug: 'slug-test-2', content: 'blablabla'
            }, { headers: { Authorization: `Bearer ${jwt}`})
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log('error') // handle error
            })
            .then(function () {
                console.log('--- --- ---')
            })
        axios.get('https://gql.alcyone.life/Blog-Articles', { headers: { Authorization: `Bearer ${jwt}` }
            }).then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log('error') // handle error
            })
            .then(function () {
                console.log('--- --- ---')
            })
            axios.get('https://gql.alcyone.life/Blog-Comments', { headers: { Authorization: `Bearer ${jwt}` }
            }).then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log('error') // handle error
            })
            .then(function () {
                console.log('--- --- ---')
            })
    })
    .catch(function (error) {
        // console.log(error)
        console.log('error') // handle error
    })
    .then(function () {
        console.log('--- --- ---')
    });






// //
// axios.get('https://gql.alcyone.life/test?name=Damien')
// .then(function (response) {
//     console.log(response.data) // handle succes
// })
// .catch(function (error) {
//     // console.log(error)
//     console.log('error') // handle error
// })
// .then(function () {
//     console.log('--- --- ---')
// });


// // recuperer jwt pour joindre a une requete authentifier
// let jwt = response.data.jwt

// // construire bearer auth token a joindre avec la requete
// console.log(`Bearer ${response.data.jwt}`)



```