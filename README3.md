
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
        - application principale avec un routeur comprenant les routes de Articles et Comments
    - tests.js
        - api axios tests de toutes les routes dispo sur app.js

---

# Prenez example sur superheros (exoSimple.js) en verifiant que les parametres sont bien present pour tous les champs indiques dans le modele suivant
```js
if(!name){
        ctx.throw('400','name is required field');
    }
if(!slug){
    ctx.throw('400','slug is required field');
}
if(!content){
    ctx.throw('400','content is required field');
}
```

---

###### Article
###### Modele Donnee
- name      : string
- slug      : string (lowercase)
- content   : markdown
- medias    : jpg|png
##### axios api url
url : https://gql.alcyone.life/Blog-Articles
##### Contenant les routes suivantes
- get       /articles
- get       /articles/:id
- post      /articles
<!-- - delete    /articles/:id
- put       /articles/:id -->
---
###### Comment
###### Modele Donnee
- author    : string
- content   : string
##### axios api url
url : https://gql.alcyone.life/Blog-Comments
##### Contenant les routes suivantes
- get       /comment/
- get       /comment/:id
- post      /comment/
<!-- - delete    /articles/comment/:id
- put       /articles/comment/:id -->


---

#### Authentification + Requetes Base de Donnees
```js

// requete une la base de donnes avec login + password afin de recuperer un token (jwt : json web token)
axios.post('https://gql.alcyone.life/auth/local', { identifier: 'itakad@gmail.com', password: 'itakad2020' })
    .then(function (response) {
        // get jwt
        let jwt = response.data.jwt
        console.log(`Bearer ${response.data.jwt}`)
        // create article with object + headers with jwt
        axios.post('https://gql.alcyone.life/Blog-Articles', { name: 'test-2', slug: 'slug-test-2', content: 'blablabla'
            }, { headers: { Authorization: `Bearer ${jwt}`}})
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log('error') // handle error
            })
            .then(function () {
                console.log('--- --- ---')
            })
        // get articles
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
        // create new comment and link to article_1
        axios.post('https://gql.alcyone.life/Blog-Comments', { author: 'damien', content: 'blablabla', blog_article: 1
            }, { headers: { Authorization: `Bearer ${jwt}`}})
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log('error') // handle error
            })
            .then(function () {
                console.log('--- --- ---')
            })
        // get all comments
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
```