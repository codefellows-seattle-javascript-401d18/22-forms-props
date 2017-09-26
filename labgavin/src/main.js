// import './styles/main.scss'

import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';


class PokemonForm extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props) => props: {pokemonSelect: pokemonAppSelect, scott: 'hello world'}
    this.state = {
      searchFormBoard: '',
      searchFormLimit: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log('__FORM_PROPS__', this.props);
    console.log('__FORM_STATE__', this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.pokemonSelect(this.state.searchFormBoard);
  }

  handleChange(e) {
    this.setState({
      searchFormBoard: e.target.value,
      searchFormLimit: e.target.value,
    });
  }

  render() {
    return (
      <form
        className="pokemon-form"
        onSubmit={this.handleSubmit}>

        <input
          type="text"
          name="Board topic"
          placeholder="which board to search"
          value={this.state.searchFormBoard}
          onChange={this.handleChange}/>
        <input
          type="text"
          name="Number of results"
          placeholder="how many pages"
          value={this.state.searchFormLimit}
          onChange={this.handleChange}/>
      </form>
    );
  }
}
const API_URL = `http://www.reddit.com/r/${this.state.searchFormBoard}.json?limit=${this.state.searchFormLimit}`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFormBoard: '',
      searchFormLimit: Math.floor(Math.random() * 100) + 1,
      searchTopics: [],
      topicLookup: {},
      topicSelected: null,
      topicSelectedError: null,
    };
    this.pokemonAppSelect = this.pokemonAppSelect.bind(this);
  }

  componentDidUpdate() {
    console.log('__STATE__', this.state);
  }

  componentDidMount() {
    if(this.state.searchTopics) {
      try {
        let topicLookup = this.state.searchTopics[topicLookup];
        this.setState({topicLookup});
      } catch(e) {
        console.error(e);
      }
    } else {
      superagent.get(`${API_URL}`)
      .then(res => {
        let topicLookup = res.body.results.reduce((lookup, n) => {
          lookup[n.name] = n.url;
          return lookup;
        }, {});

        try {
          this.setState({topicLookup});
        } catch(e) {
          console.error(e);
        }
      })
      .catch(console.error);
    }
  }

  pokemonAppSelect(name) {
    if(!this.state.topicLookup[name]) {
      this.setState({
        topicSelected: null,
        topicSelectedError: name,
      });
    } else {
      console.log(this.state.topicLookup[name]);
      superagent.get(this.state.topicLookup[name])
      .then(res => {
        this.setState({
          topicSelected: res.body,
          topicSelectedError: null,
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
          scott='hello world'/>

        { this.state.topicSelected ?
          // true: render the following
          <div>
            <section className="pokemon selected">
              <h2>Selected: {this.state.topicSelected.name}</h2>
              <img src={this.state.topicSelected.sprites.front_default} alt={this.state.topicSelected.name}/>
            </section>
            <section className="pokemon abilities">
              <h3>Abilities</h3>
              <ul>
                {this.state.topicSelected.abilities.map((item, i) => {
                  return <li key={i}>{item.topic.name}</li>;
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
