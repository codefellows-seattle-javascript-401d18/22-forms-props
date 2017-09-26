import './styles/main.scss'

import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'http://www.reddit.com';
//pulled from the long form web address
//${searchFormBoard}.json?limit=${searchFormLimit}'
class RedditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redditName: '',
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
    this.props.redditSelect(this.state.redditName);
  }

  handleChange(e) {
    this.setState({redditName: e.target.value});
  }

  render() {
    return (
      <form
        className="reddit-form"
        onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="redditName"
          placeholder="search the underbelly"
          value={this.state.redditName}
          onChange={this.handleChange}/>
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redditLookup: {},
      redditSelected: null,
      redditNameError: null,
    };
    this.redditAppSelect = this.redditAppSelect.bind(this);
  }

  componentDidUpdate() {
    console.log('__STATE__', this.state);
  }

  componentDidMount() {
    if(localStorage.redditLookup) {
      try {
        let redditLookup = JSON.parse(localStorage.redditLookup);
        this.setState({redditLookup});
      } catch(e) {
        console.error(e);
      }
    } else {
      superagent.get(`${API_URL}http://www.reddit.com`)
        .then(res => {
          let redditLookup = res.body.results.reduce((lookup, n) => {
            lookup[n.name] = n.url;
            return lookup;
          }, {});

          try {
            localStorage.redditLookup = JSON.stringify(redditLookup);
            this.setState({redditLookup});
          } catch(e) {
            console.error(e);
          }
        })
        .catch(console.error);
    }
  }

  redditAppSelect(name) {
    if(!this.state.redditLookup[name]) {
      this.setState({
        redditSelected: null,
        redditNameError: name,
      });
    } else {
      console.log(this.state.redditLookup[name]);
      superagent.get(this.state.redditLookup[name])
        .then(res => {
          this.setState({
            redditSelected: res.body,
            redditNameError: null,
          });
        })
        .catch(console.error);
    }
  }

  render() {
    return (
      <section className="application">
        <h1>Scrape the Depths of the Web...Reddit</h1>
        <RedditForm
          redditSelect={this.redditAppSelect}
        />

        { this.state.redditSelected ?
          <div>
            <section className="Reddit thread selected">
              <h2>Selected: {this.state.redditSelected.name}</h2>
              <img src={this.state.redditSelected.sprites.front_default} alt={this.state.redditSelected.name}/>
            </section>
            <section className="dufuque">
              <h3>Abilities</h3>
              <ul>
                {this.state.redditSelected.abilities.map((item, i) => {
                  return <li key={i}>{item.ability.name}</li>;
                })}
              </ul>
            </section>
          </div> :
          <div>
            <p>Please make a request to see reddit data</p>
          </div>
        }
      </section>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
