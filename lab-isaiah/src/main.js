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
    this.props.redditSelect(this.state.redditName);
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
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      redditLookup: {},
      redditSelected: null,
      redditNameError: null,
    };
    this.redditAppSelect = this.redditAppSelect.bind(this);
  }

  componentDidUpdate() {
    console.log('__STATE__:', this.state);
  }

  componentDidMount() {
    if(localStorage.redditLookup) {
      try {
        let redditLookup = JSON.parse(localStorage.redditLookup);
        this.setState({redditLookup});
      } catch(e) {
        console.error(e);
      }
    } else {
      console.log('hi isaiah was here');
      superagent.get(`${API_URL}/seattle.json?limit=10`)
        .then(res => {
          console.log(res.body);
          console.log(res.body.data);
          console.log(res.body.data.children);
          console.log(res.body.data.children[0]);
          console.log(res.body.data.children[0].data);

          let redditLookup = res.body.data.children.map((lookup, n) => {
            lookup[n.name] = n.url;
            return lookup;
          }, {});

          try {
            localStorage.redditLookup = JSON.stringify(redditLookup);
            this.setState({redditLookup});
          } catch(e) {
            console.error(e);
          }
        })
        .catch(console.error);
    }
  }

  redditAppSelect(name) {
    // will allow us to pass the setState method to another Component
    if(!this.state.redditLookup[name]) {
      this.setState({
        redditSelected: null,
        redditNameError: name,
      });
    } else {
      console.log(this.state.redditLookup[name]);

      // Here is where I want to make the ajax request dynamic

      superagent.get(this.state.redditLookup[name])
        .then(res => {
          this.setState({
            redditSelected: res.body,
            redditNameError: null,
          });
        })
        .catch(console.error);
    }
  }

  render() {
    return (
      <section className="application">
        <h1>Reddit Form Demo</h1>
        <RedditForm
          redditSelect={this.redditAppSelect}
          isaiah='hello world'/>

        { this.state.redditSelected ?
          // true: render the following
          <div>
            <section className="reddit selected">
              <h2>Selected: {this.state.redditSelected.subreddit}</h2>
            </section>
            <section className="reddit title">
              <h3>Titles</h3>
              <ul>
                {this.state.redditSelected.body.map((item, i) => {
                  return <li key={i}>{item.title}</li>;
                })}
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
