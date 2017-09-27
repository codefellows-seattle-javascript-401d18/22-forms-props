import './style/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

// const API_URI = 'http://www.reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}'
const API_URI = 'http://www.reddit.com/r/'

//app -- manange application state AKA hold all
class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        results: null,
        searchErrorMessage: null,
      }
      this.redditBoardFetch = this.redditBoardFetch.bind(this)
    }

componentDidUpdate() {
  console.log('STATE ', this.state)
}
//this will make a request from user input and store the results objects in results var
    redditBoardFetch(board) {
      superagent.get(`${API_URI}${board}.json`)
      .then(res => {
        console.log('request success', res)
        this.setState({
          results: res.body.data.children,
          searchErrorMessage: null,
        })
      })
      .catch(err => {
        console.error(err);
        this.setState({
          results: null,
          searchErrorMessage: `unable to find board ${board}`,
        })
      })
    }
    render() {
      return (
        <main>
          <h1>Reddit Search App </h1>
          <SearchForm
          title= 'Reddit Board'
          handleSearch={this.redditBoardFetch}/>
          <SearchResults articles={this.state.results}/>
        </main>
      )
    }
  }

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    this.setState({
      searchText: e.target.value,
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSearch(this.state.searchText)
  }
  //returning a form with a submit button using handle functions
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label> {this.props.title} </label>
        <input
          type='text'
          onChange={this.handleChange}
          value={this.state.searchText}
          />
        <button type='submit'>Search</button>
      </form>
    )
  }
}
//should recieve an array of reddit article through props
class SearchResults extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    let articles = this.props.articles || [];
    return (
      <ul>
        {articles.map((item, i) =>
          <li key={i}>
            <a href={item.data.url}> {item.data.title} </a>
          </li>
        )}
      </ul>
    );
  };
}
ReactDom.render(<App />, document.getElementById('root'))
