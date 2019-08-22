---
title: Vue Testing
date: 2019-08-20T23:00:00-0400
---

This is my playground for my live code snippets

First, a few Vue Examples

### Two-way Binding in Vue:

```js js-live scripts=Vue!https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js autorun no-edit
const app = new Vue({
  el: '#vue-testing-entry',
  data: {
    message: 'Hello Vue!'
  }
})
```
```html html-live no-edit
<div id="vue-testing-entry">
    {{message}}
    <br>
    <input style="width: 100%" v-model="message"/>
</div>
```
### A Small Movie App in Vue
**Note:** if you reset the HTML, you'll then have to run the JavaScript again

```js js-live scripts=Vue autorun
const app = new Vue({
  el: '#vue-testing-entry2',
  data: {
    movies: [],
    movieInput: ""
  },
  methods: {
    getMovie() {
      fetch("https://omdbapi.com/?apikey=trilogy&t=" + this.movieInput)
      .then(res => res.json())
      .then(res => {
        this.movies.push(res)
        this.movieInput = ""
      })
    }
  }
})
console.log("I ran already. If you click run I will break the rendered HTML below")
```
```html html-live
<style>
  .listOfMovies {
    list-style: none;
    display: flex;
    margin: 10px 0 0 0;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .movieListItem {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .moviePoster {
    margin: 0 auto;
  }
  .movieForm {
    display: flex;
    justify-content: center;
  }
</style>
<div id="vue-testing-entry2">
  <ul class="listOfMovies">
    <li class="movieListItem" v-for="movie in movies">
      <img :src="movie.Poster" width="100" height="auto" class="moviePoster"/>
      <p>{{movie.Title}}</p>
    </li>
  </ul>
  <form @submit.prevent="getMovie" class="movieForm">
    <input v-model="movieInput"/>
    <button type="submit">Get Movie</button>
  </form>
</div>
```

### Some Plain JavaScript Examples

I gave this one a bogus external script to load
```js js-live autorun no-edit scripts=fail2,Vue
console.log(8 * 4)
```

I gave this one jQuery as a dependency
```js js-live autorun scripts=jQuery!https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js
console.log($.toString())
```

This one is a plain snippet
```js scripts=fail
const apple = "meatloaf"
```

### React? Yes!

```jsx react-live scripts=React!https://cdnjs.cloudflare.com/ajax/libs/react/16.9.0/umd/react.production.min.js,ReactDOM!https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.6/umd/react-dom.production.min.js,Styled-Components!https://cdnjs.cloudflare.com/ajax/libs/styled-components/4.3.2/styled-components.min.js use-render
function testComponent() {
  //React.useEffect(() => console.log('styled is: ', styled), [])
  const Div = styled.div`
    color: red;
    font-weight: 900
  `
  return (
    <Div>Banana</Div>
  )
}
render(testComponent)
```

### Python
I can't run a live snippet, but I can highlight it

```python
age = 1
def printAge(age):
  print(age)

printAge(age)
```