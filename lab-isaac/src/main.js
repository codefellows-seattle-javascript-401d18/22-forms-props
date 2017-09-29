
import './styles/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'http://www.reddit.com/r';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 25,
      board: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBoardChange = this.handleBoardChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.makeAnApiCall(this.state.board, this.state.limit);
  }

  handleBoardChange(e) {
    this.setState({board: e.target.value});
  }

  handleLimitChange(e) {
    this.setState({limit: e.target.value});
  }

  render() {
    if(this.props.callError === true) {
      return(
        <form
          id="search-form"
          className="search-form-error"
          onSubmit={this.handleSubmit}>

          <input
            type="text"
            name="board"
            placeholder="search a reddit board"
            value={this.state.board}
            onChange={this.handleBoardChange}/>

          <input
            type="number"
            name="limit"
            min="0"
            max="100"
            placeholder="25"
            value={this.state.limit}
            onChange={this.handleLimitChange}/>

          <button type="submit">search</button>
        </form>
      );
    } else if(this.props.callError === false) {
      return(
        <form
          id="search-form"
          className="search-form-class"
          onSubmit={this.handleSubmit}>

          <input
            type="text"
            name="board"
            placeholder="search a reddit board"
            value={this.state.board}
            onChange={this.handleBoardChange}/>

          <input
            type="number"
            name="limit"
            min="0"
            max="100"
            placeholder="25"
            value={this.state.limit}
            onChange={this.handleLimitChange}/>

          <button type="submit">search</button>
        </form>
      );
    }
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
          <h2>There are currently no results</h2>
        }
      </section>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topicsArray: [],
      callError: false,
    };
    this.makeAnApiCall = this.makeAnApiCall.bind(this);
  }

  makeAnApiCall(limit, board) {
    this.setState({callError: false});
    superagent.get(`${API_URL}/${limit}.json?limit=${board}`)
      .then(res => {
        let sorted = res.body.data.children.sort((a, b) => b.data.ups - a.data.ups);
        this.setState({topicsArray:sorted});
      })
      .catch(err => {
        console.error(err);
        this.setState({callError: true});
        this.setState({topicsArray: []});
      });
  }

  render() {
    return(

      <div className="application">
        <h1>Reddit Scraper</h1>
        <SearchForm makeAnApiCall={this.makeAnApiCall} callError={this.state.callError} />
        <SearchResultList results={this.state.topicsArray} />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
