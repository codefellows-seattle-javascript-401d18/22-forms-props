![cf](https://i.imgur.com/7v5ASc8.png) 22: Forms and Props
======

#### Project Description


#### Steps to remember:
1. add eslintignore
2. add gitignore
3. npm i

#### Objectives  
* We will be able to manage controlled inputs
* We will learn to pass data from parent components to child components through the use of `props`
 
#### Configuration  
[x] `README.md`
[x] `.gitignore`
[x] `.eslintrc.json`
[x] `.babelrc`
[x] `package.json`
[x] `webpack.config.js`
[x] `src/**`
  [x] `src/main.js`
  [x] `src/index.html`
  [x] `src/style`
  [x] `src/style/main.scss`

#### Feature Tasks
* create the following components and structure them according to the diagram below:
```
App
 SearchForm
 SearchResultList
```
###### App Component
* should contain all of the **application state**
* should contain methods for modifying the application state
* the state should have a topics array for holding the results of the search

###### SearchForm Component
* should contain a text input for the user to supply a reddit board to look up
* should contain a number input for the user to limit the number of results to return
  * the number must be greater than 0 and less than 100
* `onSubmit` the form should make a request to reddit
  * it should make a get request to `http://www.reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}`
  * on success, it should pass the results to the application state
  * on failure, it should add a class to the form called "error"
    * this should apply a red border to the form elements (shows a visual user validation error)

###### SearchResultList Component
* should inherit all search results through `props`
  * this component does not need to have its own state!
* if there are topics listed in the application state, it should display an unordered list of topics
* each list item should contain the following
  * an `<a>` tag with an `href` that points to the `topic.url`
  * inside the `<a>` tag, include an `<h2>` tag with the `topic.title`
  * after the `<a>` tag (*not nested as a child*), include a `<span>` tag with the number of `topic.ups` (topic upvotes)
