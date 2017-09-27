import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'http://www.reddit.com/r';

let renderIf = (test, component) => test ? component : undefined;

class RedditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topicSearch: '',
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
    this.props.topicSelect(this.state.topicSearch);
  }

  handleChange(e) {
    this.setState({topicSearch: e.target.value});
  }

  render() {
    return (
      <form
        className="topics-form"
        onSubmit={this.handleSubmit}>

        <input
          type="text"
          name="redditTopic"
          placeholder="search reddit by topic"
          value={this.state.topicSearch}
          onChange={this.handleChange}/>
        <button type='submit'> Search reddit </button>
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redditLookup: {},
      results: [],
      searchErrorMessage: null,
    };
    this.redditTopicFetch = this.redditTopicFetch.bind(this);
  }

  redditTopicFetch(searchFormBoard,searchFormLimit){
    superagent.get(`${API_URL}/${searchFormBoard}.json?limit=${searchFormLimit}`)
    .then(res => {
      console.log('request succes', res);
      this.setState({
        results: res.body.data.children,
        searchErrorMessage: null,
      });
    })
    .catch(err => {
      console.error(err);
      this.setState({
        results: null,
        searchErrorMessage: `Unable to find the reddit topic: ${searchFormBoard}`,
      });
    });
  }

  render() {
    return (
      <section className="application">
        <h1>Reddi Topic Form </h1>
        <RedditForm
          topicSelect={this.redditTopicFetch}
          />


          {renderIf(this.state.results,
            <RedditArticlesList articles={this.state.results} />)}

          {renderIf(this.state.searchErrorMessage,
            <p> {this.state.searchErrorMessage} </p>)}


      </section>
    );
  }
}

class RedditArticlesList extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let articles = this.props.articles || [];
    console.log('articles', articles);
    return (
      <ul>
        {articles.map((topic , i) =>
          <li key={i}>
          <a href={topic.data.url}> {topic.data.title} </a>
          <span>{topic.data.ups}</span>
          </li>
        )}
      </ul>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
