const axios = require('axios');

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