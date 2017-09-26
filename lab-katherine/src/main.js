//import '.styles/main.scss'

import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';
let API_URL = `http://www.reddit.com/r/`;
let redditArticles = []

class RedditForm extends React.Component {
  constructor(props) {
    super(props);
    console.log('props', props);
    this.state = {
      searchFormBoard: '',
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
    API_URL = `${API_URL}${this.state.searchFormBoard}`;
    console.log(API_URL);
    superagent.get(`${API_URL}.json?limit=20`)
      .then(res => {
        let boardLookup = res.body.data.children.map((lookup, n) =>{
          redditArticles.push(res.body.data.children[n].data.title)
          return lookup;
        });    // this.props.boardSelect(this.state.searchFormBoard);
        console.log(redditArticles)
      });

  }
  handleChange(e) {
    this.setState({ searchFormBoard: e.target.value});
  }
  render() {
    return (
      <form
        className="reddit-form"
        onSubmit={this.handleSubmit}>

        <input
          type="text"
          name="boardName"
          placeholder="search"
          value={this.state.searchFormBoard}
          onChange={this.handleChange} />
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardLookup: {},
      boardSelected: null,
      boardNameError: null,
    };
    this.boardAppSelect = this.boardAppSelect.bind(this);
  }
  componentDidUpdate() {
    console.log('__STATE__', this.state);
  }
  // componentDidMount() {
  //   if(localStorage.boardLookup) {
  //     try {
  //       let boardLookup = JSON.parse(localStorage.boardLookup);
  //       this.setState({boardLookup});
  //     } catch(e) {
  //       console.error(e);
  //     }
  //   } else {
  //     superagent.get(`${API_URL}.json?limit=20`)
  //       .then(res => {
  //         console.log('body', res.body.data);
  //         console.log(res.body.data.children)
  //         let boardLookup = res.body.data.children.reduce((lookup, n) =>{
  //           console.log(n[0])
  //           lookup[n.name] = n.subreddit;
  //           return lookup;
  //         }, {});
  //         try{
  //           localStorage.boardLookup = JSON.stringify(boardLookup);
  //           this.setState({boardLookup});
  //         } catch(e) {
  //           console.error(e);
  //         }
  //       })
  //       .catch(console.error);
  //   }
  // }
  boardAppSelect(name){
    if(!this.state.boardLookup[name]) {
      this.setState({
        boardSelected: null,
        boardNameError: name,
      });
    } else {
      console.log(this.state.boardLookup[name]);
      superagent.get(this.state.boardLookup[name])
        .then(res => {
          this.setState({
            boardSelected: res.body,
            boardNameError: null,
          });
        })
        .catch(console.error);
    }
  }

  render() {
    return (
      <section className="application">
        <h1>Reddit Search</h1>
        <RedditForm
          boardSelect={this.boardAppSelect}
          scott='hello world'/>
        { this.state.boardSelected ?
          <div>
            <section className="reddit selected">
              <h2>Selected: {this.state.boardSelected.name}</h2>
              <img src={this.state.boardSelected.sprites.front_default} alt={this.state.boardSelected.name}/>
            </section>
            <section className="reddit stories">
              <h3>Abilities</h3>
              <ul>
                {this.state.boardSelected.abilities.map((item, i) => {
                  return <li key={i}>{item.ability.name}</li>;
                })}
              </ul>
            </section>
          </div> :
          <div>
            <p>please ask for reddit</p>
          </div>
        }
      </section>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
