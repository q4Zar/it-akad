
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
- delete    /articles/:id
- put       /articles/:id
<!-- url : https://gql.alcyone.life/Blog-Comments -->
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
###### Comment
- author    : string
- content   : string

---