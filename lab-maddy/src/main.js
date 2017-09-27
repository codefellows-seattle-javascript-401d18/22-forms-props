import './style/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'http://www.reddit.com/r'; //took away last /
//${searchFormBoard}.json?';//limit=${searchFormLimit}

class topicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topicSearch: '',
      // topics: [],
      // topicError: null,
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
    this.props.topicSelect(this.state.topic);
  }

  handleChange(e) {
    this.setState({topicSearch: e.target.value});//changed from topic
  }

  render() {
    return (
      <form
        className="topic-form"
        onSubmit={this.handleSubmit}>

        <input
          type="text"
          name="topicName"
          placeholder="search for a topic by name"
          value={this.state.topicSearch}
          onChange={this.handleChange}/>
          <button type='submit'> Search for reddit topics </button>
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topicLookup: {},
      results: [],
      // topicSelected: null,
      topicNameError: null,
    };
    this.topicAppSelect = this.topicAppSelect.bind(this);
  }

  componentDidUpdate() {
    console.log('__STATE__', this.state);
  }

  componentDidMount() {
    if(localStorage.topicLookup) {
      try {
        let topicLookup = JSON.parse(localStorage.topicLookup);
        this.setState({topicLookup});
      } catch(e) {
        console.error(e);
      }
    } else {
      superagent.get(`${API_URL}/somethinggggg/`)
      .then(res => {
        let topicLookup = res.body.results.reduce((lookup, n) => {
          lookup[n.name] = n.url;
          return lookup;
        }, {});

        try {
          localStorage.topicLookup = JSON.stringify(topicLookup);
          this.setState({topicLookup});
        } catch(e) {
          console.error(e);
        }
      })
      .catch(console.error);
    }
  }

  topicAppSelect(searchFormBoard, searchFormLimit) { //said's help here
    superagent.get(`${API_URL}/${searchFormBoard}.json?limit=${searchFormLimit}`)
    .then(res => {
      console.log('request success', res);
      this.setState({
        results: res.body.data.children,
        searchErrorMessage: null,
      });
    })
    .catch(err => {
      console.error(err);
      this.setState({
        results: null,
        searchErrorMessage: `Unable to find the reddit searchFormBoard ${searchFormBoard}.`,
      });
    });
  }

  render() {
    return (
      <section className="application">
        <h1>Reddit topic search</h1>
        <topicForm
        topicSelect={this.topicAppSelect}
        scott='hello world'/>

      { this.state.results.length ?
            <h2>Selected: {this.state.results.length}</h2>
        : <div>
          <p>Please make a request to see reddit topic data</p>
        </div>
      }
    </section>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
