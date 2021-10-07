
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
        - instance api axios /BlogArticles
    - comment.js
        - routeur comment
        - instance api axios /BlogComments
    - tests.js
        - instance api axios tests de toutes les routes dispo sur app.js

##### Contenant les routes suivantes

- get       /articles
- get       /articles/:id
- post      /articles
- delete    /articles/:id
- put       /articles/:id

- get       /articles/comment/
- get       /articles/comment/:id
- post      /articles/comment/
- delete    /articles/comment/:id
- put       /articles/comment/:id

##### Modeles de Donnees
###### Article
- name      : string
- slug      : string (lowercase)
- content   : markdown
- medias    : jpg|png
######
- author    : string
- content   : string


##### Annexes
##### Instance Axios
```js
// BlogArticles
const instance = axios.create({
  baseURL: 'https://gql.alcyone.life/BlogArticles',
  timeout: 1000,
});
let jwt = 'fake-token'
instance.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
instance.post()
.then
.catch
...
```