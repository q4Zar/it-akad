- dans votre repo renommer votre repo src en back

- creer une branche dev-front
    - git checkout -b dev-front

- creer une app react nommer front avec la commande `npx create-react-app front`
- lancer l'app front :
    - `cd front`
    - `yarn start` yarn c'est comme npm mais c'est facebook qui l'as devellopper

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





# demarrer le serveur exoSimple : `node exoSimple.js`
# ecrire une suite de tests avec commentaires
# qui contiendra toutes les interactions possibles depuis ces routes
- get('/superheros')
- post('/superheros')
- get('/superheros/:id')
- delete('/superheros/:id')
- put('/superheros/:id')