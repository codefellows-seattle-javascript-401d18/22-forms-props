![cf](https://i.imgur.com/7v5ASc8.png) 21: React Tooling - Cowsay Browser
======

# Lab21-Isaiah

### Completed Following Featured Tasks:
- [x] should contain the entire application's view and state
- [x] should have a property on the state called `content`
- [x] should create a view with the following display
  - [x] a heading with the title "Generate Cowsay Lorem"
  - [x] a button that displays "click me"
    - [x] `onClick` the button should generate new content on the app state using `cowsay-browser` and `faker`
  - [x] a `pre` tag that displays the app's state's content

### Documentation:
The purpose of this app is to obtain a better understanding of how React can be used to render html elements to the DOM. This lab also introduced us to `webpack.js` as a bundler and brought back cowsay for some visual fun. 


##### The following is the assignment as presented:

```md
## Submission Instructions
  * fork this repository & create a new branch for your work
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-susan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas


## Learning Objectives  
* students will be able to configure webpack.js to build a web application bundle
* students will be able to configure babel to transpile JSX and ES6 to ES5 JavaScript
* students will be able to create and render React components to the DOM
* students will be able to add event listeners to React components
* students will be able to update React component state

## Requirements  
#### Configuration  
* `README.md`
* `.gitignore`
* `.eslintrc`
* `.babelrc`
* `package.json`
* `webpack.config.js`
* `src/**`
  * `src/main.js`
  * `src/index.html`
  * `src/style`
  * `src/style/main.scss`

#### Feature Tasks  
* create the following component:
###### App
* should contain the entire application's view and state
* should have a property on the state called `content`
* should create a view with the following display
  * a heading with the title "Generate Cowsay Lorem"
  * a button that displays "click me"
    * `onClick` the button should generate new content on the app state using `cowsay-browser` and `faker`
  * a `pre` tag that displays the app's state's content

####  Documentation  
* write a brief description of your project in `README.md`

#### Bonus 1pt
* add a select menu that enables you to change the type of cowfile currently being used

```
