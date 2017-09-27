// import './styles/maiimport './styles/main.scss'
import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

// const API_URI = 'http://www.reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}'
const API_URI = 'http://www.reddit.com/r/'

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

class SearchResults extends React.Component {
  render() {
    return <p> Some cool string </p>
  }
}


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

    redditBoardFetch(board) {
      superagent.get(`${API_URI}${board}.json`)
      .then(res => {
        console.log('request success', res)
        this.setState({
          results: res.body,
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
          <h1>Some Cool Beans </h1>
          <SearchForm
          title= 'Reddit Board'
          handleSearch={this.redditBoardFetch}/>
          <SearchResults />
        </main>
      )
    }
  }


  //
  //   this.searchReddit = this.searchReddit.bind(this);
  // }
// //searchform -- collect user input
// class searchFormBoard extends React.Component {
//   render() {
//     return <p>Cool</p>
//   }
// }
// //searchresultslist -- display reddit article
// class searchresultslist extends React.Component {
//   render() {
//     return <p>Cool</p>
//   }
// }
//
//  class RedditForm extends React.Component {
//    constructor(props) {
//      super(props)
//    }
//    render() {
//      return (
//        <form>
//
//        </form>
//      )
//    }
//  }

ReactDom.render(<App />, document.getElementById('root'))
