import './styles/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import cowsay from 'cowsay-browser';
import faker from 'faker';


class Navbar extends React.Component {
  render() {
    return (
      <header className="app-header container">
        <h1>What did the Beast say</h1>
        <nav>
          <ul>
            <a href="www.google.com"><li>The</li></a>
            <a href="www.google.com"><li>Beast</li></a>
            <a href="www.google.com"><li>Said</li></a>
          </ul>
        </nav>
      </header>
    );
  }
}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: faker.lorem.words(),
      value: 'cow',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(e) {
    this.setState(state => {
      return {
        content: faker.lorem.words(),
      };
    });
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }



  render() {
    const cow = cowsay.say({ text: this.state.content , f: this.state.value });
    return (
      <div>
      <Navbar />
        <select value={this.state.value} onChange={this.handleChange}>
          <option value='cow'>Cow</option>
          <option value='tux'>Tux</option>
          <option value='koala'>Koala</option>
          <option value='moose'>Moose</option>
          <option value='vader'>Vader</option>
          <option value='dragon'>Dragon</option>
          <option value='bunny'>Bunny</option>
          <option value='elephant'>Elephant</option>
          <option value='kitty'>Kitty</option>
          <option value='skeleton'>Skeleton</option>
          <option value='turtle'>Turtle</option>
          <option value='stimpy'>Stimpy</option>
          <option value='stegosaurus'>Stegosaurus</option>

        </select>
        <h2>Generate Cowsay Lorem</h2>
        <button onClick={this.handleClick}>Tell me what the {this.state.value} say.</button>
        <pre>{cow}</pre>
    </div>
    );
  }
}



ReactDom.render(<App />, document.getElementById('root'));
