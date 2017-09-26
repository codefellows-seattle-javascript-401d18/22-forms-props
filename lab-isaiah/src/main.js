import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'https://pokeapi.co/api/v2';

class PokemonForm extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props) => props: {pokemonSelect: pokemonAppSelect, isaiah: 'hello world'};
    this.state = {
      pokeName: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    console.log('_FORM_PROPS__', this.props);
    console.log('_FORM_STATE__', this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.pokemonSelect(this.state.pokeName);
  }

  handleChange(e) {
    this.setState({pokeName: e.target.value});
  }

  render() {
    return (
      <form
        className="pokemon-form"
        onSubmit={this.handleSubmit}>

        <input
          type="text"
          name="pokemonName"
          placeholder="search for a pokemon by name"
          value={this.state.pokename}
          onChange={this.handleChange}/>
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      pokemonLookup: {},
      pokemonSelected: null,
      pokemonNameError: null,
    };
    this.pokemonAppSelect = this.pokemonAppSelect.bind(this);
  }

  componentDidUpdate() {
    console.log('__STATE__:', this.state);
  }

  componentDidMount() {
    if(localStorage.pokemonLookup) {
      try {
        let pokemonLookup = JSON.parse(localStorage.pokemonLookup);
        this.setState({pokemonLookup});
      } catch(e) {
        console.error(e);
      }
    } else {
      superagent.get(`${API_URL}/pokemon/`)
        .then(res => {
          console.log(res.body.results);
          let pokemonLookup = res.body.results.reduce((lookup, n) => {
            lookup[n.name] = n.url;
            return lookup;
          }, {});

          try {
            localStorage.pokemonLookup = JSON.stringify(pokemonLookup);
            this.setState({pokemonLookup});
          } catch(e) {
            console.error(e);
          }
        })
        .catch(console.error);
    }
  }

  pokemonAppSelect(name) {
    // will allow us to pass the setState method to another Component
    if(!this.state.pokemonLookup[name]) {
      this.setState({
        pokemonSelected: null,
        pokemonNameError: name,
      });
    } else {
      console.log(this.state.pokemonLookup[name]);
      superagent.get(this.state.pokemonLookup[name])
        .then(res => {
          this.setState({
            pokemonSelected: res.body,
            pokemonNameError: null,
          });
        })
        .catch(console.error);
    }
  }

  render() {
    return (
      <section className="application">
        <h1>Pokemon Form Demo</h1>
        <PokemonForm
          pokemonSelect={this.pokemonAppSelect}
          isaiah='hello world'/>

        { this.state.pokemonSelected ?
          // true: render the following
          <div>
            <section className="pokemon selected">
              <h2>Selected: {this.state.pokemonSelected.name}</h2>
              <img src={this.state.pokemonSelected.sprites.front_default} alt={this.state.pokemonSelected.name}/>
            </section>
            <section className="pokemon abilities">
              <h3>Abilities</h3>
              <ul>
                {this.state.pokemonSelected.abilities.map((item, i) => {
                  return <li key={i}>{item.ability.name}</li>;
                })}
              </ul>
            </section>
          </div> :
          // false: render the following
          <div>
            <p>Please make a request to see pokemon data</p>
          </div>
        }
      </section>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
