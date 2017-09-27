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
    };

    this.redditSearch = this.redditSearch.bind(this);
  }

  redditSearch(searchFormBoard, searchFormLimit) {
    searchFormLimit = searchFormLimit - 2;
    superagent.get(`${API_URL}/${searchFormBoard}/.json?limit=${searchFormLimit}`)
      .then(res => {
        console.log(res);
        let sorted = res.body.data.children.sort((a,b) => b.data.ups - a.data.ups);
        this.setState({topics: sorted});
      })
      .catch(console.error);
  }

  componentDidUpdate() {
    console.log('__STATE__', this.state);
  }

  render() {
    return (
      <section className="application">
        <SearchForm searchSubReddit={this.redditSearch} />
        <SearchResultList results={this.state.topics} />
      </section>
    );
  }
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: '',
      limit: 10,
    };

    this.handleBoardChange = this.handleBoardChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.searchSubReddit(this.state.board, this.state.limit);
  }

  handleBoardChange(e) {
    this.setState({board: e.target.value});
  }

  handleLimitChange(e) {
    this.setState({limit: e.target.value});
  }

  componentDidMount() {
    console.log('__FORM_PROPS__', this.props);
    console.log('__FORM_STATE__', this.state);
  }

  componentDidUpdate() {
    console.log('__FORM_PROPS__', this.props);
    console.log('__FORM_STATE__', this.state);
  }

  render() {
    return (
      <form
        className="search-form"
        onSubmit={this.handleSubmit}>

        <input
          type="text"
          name="board"
          placeholder="search for a board by name"
          value={this.state.board}
          onChange={this.handleBoardChange}/>
        <input
          type="number"
          name="limit"
          min="0"
          max="100"
          placeholder="10"
          value={this.state.limit}
          onChange={this.handleLimitChange}/>
        <button type="submit">Search</button>
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
      <section className="result-list">
        {this.props.results ?
          //render if there are results
      <ul>
        {this.props.results.map((item, i) => {
          return (
            <li key={i}>
              <a href={item.data.url}>
                <h2>{item.data.title}</h2>
              </a>
              <span>Up-Votes: {item.data.ups}</span>
            </li>);
        })}
      </ul> :
          //render if there are no results
          <h2>There are no results</h2>
        }
      </section>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
