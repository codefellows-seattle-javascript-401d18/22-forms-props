import './styles/main.scss';
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
    this.topics = this.topics.bind(this);
  }

  componentDidUpdate() {
    console.log('__STATE__', this.state);
  }

  topics(topics) {
    this.setState({
      topics: topics,
    });
  }
  render() {
    return (
      <div className="results">
        <h1>Wizard of Reddit</h1>
        <Search topics = {this.topics} />
        <SearchResultList topics = {this.state.topics} />
      </div>
    );
  }
}

class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      board: '',
      limit: '',
      failed: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleRequestsChange = this.handleRequestsChange.bind(this);
  }
  handleSearchChange(e) {
    this.setState({board: e.target.value});
  }

  handleRequestsChange(e) {
    this.setState({limit: e.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    superagent.get(`${API_URL}/${this.state.board}.json?limit=${this.state.limit}`)
    .then((res) => {
      console.log(res.body);
      let topics = res.body.data.children.reduce((posts, post) => {
        let newPost = {
          title: post.data.title,
          url: post.data.url,
          ups: post.data.ups,
        };

        posts.push(newPost);

        return posts;
      }, []);
      try {
        this.props.topics(topics);
      } catch (err) {
        console.error(err);
        this.setState({ failed: true });
      }
    })
    .catch((err) => {
      this.setState({
        failed: true,
      });
    });
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className={ this.state.failed === true ? 'board' : 'notRed'}
          type='text'
          name='board'
          placeholder='Board Name'
          value={this.state.board}
          onChange={this.handleSearchChange}/>
        <input
          className={ this.state.failed === true ? 'limit' : 'notRed'}
          type='number'
          min='0'
          max='100'
          name='limit'
          placeholder='Limit [0-100]'
          value={this.state.limit}
          onChange={this.handleRequestsChange}
          min='0'
          max='100'/>
          <br/>
        <input className="button" type="submit" />
      </form>
    );
  }
}

class SearchResultList extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="results">
        <ul>
          {this.props.topics.map((item, i) => {
            return (
              <li key = {i}>
                <a href = {item.url}><h2>{item.title}</h2></a>
                <span><p>Upvotes: {item.ups}</p></span>
              </li>
            );
          })}
      </ul>
    </div>
    );
  }
}


ReactDom.render(<App />, document.getElementById('root'));
