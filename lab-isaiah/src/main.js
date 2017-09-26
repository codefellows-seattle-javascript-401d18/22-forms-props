import './style/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import cowsay from 'cowsay-browser';
import faker from 'faker';


class Navbar extends React.Component {
  render() {
    return (
      <header className="app-header container">
        <h1>Generate Cowsay Lorem</h1>
      </header>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cows: [],
      current: '',
      content: cowsay.say({ text: 'Hey! Click the button or select an option...'}),
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    cowsay.list((err, cows) => {
      let current = cows[0];
      this.setState({ cows, current });
    });
  }

  handleClick(e) {
    let current = e.target.value ? e.target.value : this.state.current;
    let text = faker.hacker.phrase();
    this.setState({current, content: cowsay.say({ text, f: current })});
  }

  render() {
    return (
      <div className="application">
        <Navbar />
        <select onChange={this.handleClick}>
          {this.state.cows.map((cow, i) => {
            return <option key={i} value={cow}>{cow}</option>;
          })}
        </select>
        <pre> {this.state.content} </pre>
        <button onClick={this.handleClick}>click to speak</button>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
