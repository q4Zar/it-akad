# demarrer le serveur exoSimple : `node exoSimple.js`
# ecrire une suite de tests avec commentaires src/tests/client.js
# qui contiendra toutes les interactions possibles depuis ces routes
- get('/superheros')
- post('/superheros')
- get('/superheros/:id')
- delete('/superheros/:id')
- put('/superheros/:id')

---

# sur la branche dev-front
- creer une application react `npx create-react-app front`
- allez dans le dossier front `cd front`
- lancer l'application `yarn start`
- modifier app.js en s'inspirant de ce sample pour afficher les categories que l'ont recuperes via notre route back `/get-db-collection/:collection`

```js
import React, { Component } from "react";
import axios from "axios";

const URL = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=perl&site=stackoverflow";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    var _this = this;
    axios.get(URL)
    .then(function(res){
      _this.setState({
        items: res.data.items
      });
    })
    .catch(function(e) {
      console.log("ERROR ", e);
    })
  }

  render() {
    const renderItems = this.state.items.map(function(item, i) {
      return <li key={i}>{item.title}</li>
    });

    return (
      <ul className="App">
        {renderItems}
      </ul>
    );
  }
}
```

- utiliser react-router et creer 2 components :
  - Article 
  - Commentaires