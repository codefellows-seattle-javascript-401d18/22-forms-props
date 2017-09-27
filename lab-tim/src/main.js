// import './styles/main.scss'

import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'http://www.reddit.com/r';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      redditError: null,
    };

    this.redditSearch = this.redditSearch.bind(this);
  }

  // I have no idea what I am doing
  redditSearch(searchFormBoard, searchFormLimit) {
    superagent.get(`${API_URL}/${searchFormBoard}/.json?limit=${searchFormLimit}`)
      .then(res => {
        console.log(res);
        // let redditTopics = res.body.results.reduce((lookup, n) => {
        //   lookup[n.name] = n.url;
        //   return lookup;
        // }, {});
        // console.log('I have no idea what I am doing');
        // try {
        //   console.log('I have no idea what I am doing');
        // } catch(e) {
        //   console.error(e);
        // }
      })
      .catch(console.error);
  }

  render() {
    return (
      <section className="redditList">
        <h1>Reddit Posts Thing</h1>
      </section>
    )
  }
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: null,
      limit: null,
    };

    this.handleBoardChange = this.handleBoardChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.redditSearch(this.state.board, this.state.limit);
  }

  handleBoardChange(e) {
    this.setState({board: e.target.value});
  }

  handleLimitChange(e) {
    this.setState({limit: e.target.value});
  }

  render() {
    return (
      <form
        className="reddit-form"
        onSubmit={this.handleSubmit}>

        <input
          type="text"
          name="boardName"
          placeholder="search for a board by name"
          value={this.state.board}
          onChange={this.handleBoardChange}
        />
        <input
          type="text"
          name="boardLimit"
          placeholder="limit number of boards"
          value={this.state.limit}
          onChange={this.handleLimitChange}
        />
      </form>
    );
  }
}

class SearchResultList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // I have no idea what I am doing
      <section>list section</section>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
