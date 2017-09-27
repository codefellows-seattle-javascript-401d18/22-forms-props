import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'https://www.reddit.com/r';

class RedditForm extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props) => props: {redditSelect: redditAppSelect, isaiah: 'hello world'};
    this.state = {
      redditName: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    console.log('_FORM_PROPS__', this.props);
    console.log('_FORM_STATE__', this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.searchFormBoard(this.state.redditName);
  }

  handleChange(e) {
    this.setState({redditName: e.target.value});
  }

  render() {
    return (
      <form
        className="reddit-form"
        onSubmit={this.handleSubmit}>

        <input
          type="text"
          name="redditName"
          placeholder="search for a reddit by name"
          value={this.state.redditName}
          onChange={this.handleChange}/>
        <button type="submit">search</button>
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      redditTopics: [],
      searchFormBoard: 'coffee',
      searchFormLimit: 20,
    };
    this.redditAppSelect = this.redditAppSelect.bind(this);
  }

  componentDidUpdate() {
    console.log('__STATE__:', this.state);
  }

  componentDidMount() {
    console.log('hi isaiah was here', this.state.searchFormBoard);
    superagent.get(`${API_URL}/${this.state.searchFormBoard}.json?limit=${this.state.searchFormLimit}`)
      .then(res => {
        // console.log(res.body);
        // console.log(res.body.data);
        // console.log(res.body.data.children);
        // console.log(res.body.data.children[0]);
        // console.log(res.body.data.children.map((data) => {
        //   return data.data.title;
        // }));

        let redditTopics = res.body.data.children.map((data) => {
          return data.data.title;
        }, {});
        console.log(redditTopics);

      })
      .catch(console.error);
  }


  redditAppSelect(topic) {
    console.log(this.state.searchFormBoard);

    superagent.get(`${API_URL}/${this.state.searchFormBoard}.json`)
        .then(res => {
          this.setState({
            redditTopics: res.body.data.children.map((data) => {
              return data.data.title;
            }),
            searchFormLimit: 10,
          });
        })
        .catch(console.error);
  }

  render() {
    return (
      <section className="application">
        <h1>Reddit Form Demo</h1>
        <RedditForm
          redditName={this.redditAppSelect}
          isaiah='hello world'/>

        { this.state.searchFormBoard ?
          // true: render the following
          <div>
            <section className="reddit selected">
              <h2>Selected: {this.state.searchFormBoard}</h2>
            </section>
            <section className="reddit title">
              <h3>Titles</h3>
              <ul>
                <li>{this.state.redditTopics}</li>
              </ul>
            </section>
          </div> :
          // false: render the following
          <div>
            <p>Please make a request to see reddit data</p>
          </div>
        }
      </section>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
