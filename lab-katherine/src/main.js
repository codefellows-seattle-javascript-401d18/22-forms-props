//import '.styles/main.scss'

import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';
let API_URL = `http://www.reddit.com/r/`;

class RedditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      board: '',
    };
    this.handleBoard = this.handleBoard.bind(this);
    this.handleLimit = this.handleLimit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log('__FORM_PROPS__', this.props);
    console.log('__FORM_STATE__', this.state);
  }

  handleBoard(e) {
    this.setState({ board: e.target.value});
  }

  handleLimit(e){
    this.setState({limit: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.searchReddit(this.state.board, this.state.limit);
  }

  render() {
    return (
      <form
        className="reddit-form"
        onSubmit={this.handleSubmit}>

        <input
          type="text"
          name="board"
          placeholder="search"
          value={this.state.board}
          onChange={this.handleBoard} />

        <input
          type="number"
          name="limit"
          min="0"
          max="100"
          placeholder="25"
          value={this.state.limit}
          onChange={this.handleLimit}/>

        <button type="submit">search</button>

      </form>
    );
  }
}

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <section className="result-list">
        {this.props.results ?
          <ul>
            {this.props.results.map((item, i) => {
              return (
                <li key={i}>
                  <a href={item.data.url}>
                    <h2>{item.data.title}</h2>
                  </a>
                  <span>Up-Votes: {item.data.ups}</span>
                </li>
              );
            })}
          </ul> :
          <h2>There are no results</h2>}
      </section>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
    };
    this.boardAppSelect = this.boardAppSelect.bind(this);
  }

  componentDidUpdate() {
    console.log('__STATE__', this.state);
  }

  boardAppSelect(subreddit, limit){
    superagent.get(`${API_URL}${subreddit}.json?limit=${limit}`)
      .then(res => {
        let sorted = res.body.data.children.sort((a, b) => b.data.ups - a.data.ups);
        this.setState({topics: sorted});
      });
  }

  render() {
    return (
      <section className="application">
        <RedditForm searchReddit={this.boardAppSelect}/>
        <Results results={this.state.topics}/>
      </section>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
