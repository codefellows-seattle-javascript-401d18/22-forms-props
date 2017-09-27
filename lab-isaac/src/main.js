
import './styles/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'http://www.reddit.com/r';

class SearchResultList extends React.Component {
  constructor(props) {
    super(props);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topicsArray: [],
      searchFormBoard: '',
      searchFormLimit: 25,
    };
    this.updateFromSearch = this.updateFromSearch.bind(this);
    this.makeAnApiCall = this.makeAnApiCall.bind(this);
    this.updateSearchLimit = this.updateSearchLimit.bind(this);
  }

  updateFromSearch() {
    let inputSearch = document.getElementById('searchFormBoard');
    console.log(inputSearch.value);
    // console.log(this.state);
    this.setState({searchFormBoard : inputSearch.value});
  }

  makeAnApiCall() {
    if(document.getElementById('throwError')) {
      let changeBack = document.getElementById('throwError');
      changeBack.id = 'noThrowError';
    }
    superagent.get(`${API_URL}/${this.state.searchFormBoard}.json?limit=${this.state.searchFormLimit}`)
      .then(res => {
        this.setState({topicsArray:res.body.data.children});
      })
      .catch(err => {
        let handleErr = document.getElementById('noThrowError');
        handleErr.id = 'throwError';
      });
  }

  updateSearchLimit() {
    let numberResults = document.getElementById('searchFormLimit');
    this.setState({searchFormLimit: numberResults.value});
  }

  render() {
    return(
      <div className="application">
        <h1>Reddit Scraper</h1>
        <section id="noThrowError">
          <label>Board Topic:</label>
          <input id="searchFormBoard" onChange={this.updateFromSearch} type="text" placeholder="Topic Search" /><br/>
          <label>Search Limit (1-100)</label>
          <input id="searchFormLimit" onChange={this.updateSearchLimit} type='number' min="1" max="100" placeholder="25"></input><br/>
          <button onClick={this.makeAnApiCall}>search</button>
        </section>
      </div>
    );
  }
}
//
// class SearchForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchFormBoard: '',
//       searchFormLimit: 25,
//     };
//   }
// }
//

ReactDom.render(<App />, document.getElementById('root'));
