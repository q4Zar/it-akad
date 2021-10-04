const axios = require('axios');

// get hello-world
axios.get('http://localhost:3000/hello-world/')
  .then(function (response) {
    console.log(response.data) // handle succes
  })
  .catch(function (error) {
    console.log('error') // handle error
  })
  .then(function () {
    console.log('--- --- ---')
  });


// parse object
axios.post('http://localhost:3000/body-parser-object/', {login: 'test', password: 'pwd' })
  .then(function (response) { 
    console.log(response.data) // handle succes
  })
  .catch(function (error) { 
    console.log(error) // handle error
  })
  .then(function () {
    console.log('--- --- ---')
  });


// parse object and add params :id
axios.put('http://localhost:3000/body-parser-object/1', {login: 'test', password: 'pwd' })
  .then(function (response) { 
    console.log(response.data) // handle succes
  })
  .catch(function (error) { 
    console.log(error) // handle error
  })
  .then(function () {
    console.log('--- --- ---')
  });


// parse object and convert to string
axios.post('http://localhost:3000/body-parser-string/', {login: 'test', password: 'pwd' })
  .then(function (response) {// handle succes
    console.log(response.data);
  })
  .catch(function (error) { // handle error
    console.log(error);
  })
  .then(function () {
    console.log('--- --- ---')
  });

