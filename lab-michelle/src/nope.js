import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL =  `http://www.reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}`;

// class SearchResultsList extends React.Component {
//   constructor(props) {
//     super(props)
//     //we don't have state
//   }
//
//   componentDidMount() {
//     console.log('__SRL_PROPS__', this.props);
//     console.log('__SRL_STATE__', this.state);
//   }
//
//   render() {
//     if(topicLookup) {
//       <a href = ""
//     }
//   }
//
//     if there are topics listed in the application state, it should display an unordered list of topics
//     each list item should contain the following
//         an <a> tag with an href that points to the topic.url
//         inside the <a> tag, include an <h2> tag with the topic.title
//         after the <a> tag (not nested as a child), include a <span> tag with the number of topic.ups (topic upvotes)
//   }
// }


class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topic: '',
    }

this.handleSubmit = this.handleSubmit.bind(this)
this.handleChange = this.handleChange.bind(this)
}

  handleSubmit(e) {
    e.preventDefault()
    this.props.topicSelect(this.state.topic) //this name might be wacky
  }

  render() {
    return (
      <form className="searchForm"
      onSubmit = {this.handleSubmit}>
      <input
        type="text"
        placeholder="Type in a topic"
        value = {this.state.topic}
        onChange = {this.handleChange}
        />
        </form>
        //number=SOMETHING
      //put a form here?
    )
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topicLookup: [], //this will be search results list?
      topicSelected: {}, //we pick one in there to show & that's the one that we put into text input in Search Form
      topicError: null,
    }
    this.topicStateShow = this.topicStateShow.bind(this);
  }

  componentDidUpdate() {
    console.log('__STATE__', this.state);
  }

  makeACall() {
    superagent.get(`${API_URL}`)
    .then(res => {
      let response = res.body
    })
  }
//   componentDidMount() {
//     if(topicLookup) {
//       try {
//         let topicLookup = JSON.parse(topicLookup)
//         this.setState({ topicLookup })
//       } catch(e) {
//         console.error(e)
//       }
//     } else {
//       superagent.get(`${API_URL}`)
//       .then(res => {
//         let topicLookup = res.body.results((allTopics, searchedTerm) => {
//           allTopics[searchedTerm.name] = n.url //I don't know//
//           return topicLookup;
//         })
//       })
//
//   try{
//
//   } catch(e) {
//
//   }
//   .catch(e){
//
//   }
// }
// }

  render() {
    return (
    //something//
    <h1>Reddit Scraper<h1>
    <SearchForm />

    )
  }
}

ReactDom.render(<App />, document.getElementById('root'));
