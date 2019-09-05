---
title: React's useEffect and useRef Explained for Mortals
date: 2019-09-05T12:00:00-0400
---

If the React docs leave you in the dust, or Dan Abramov's [blog](https://overreacted.io/a-complete-guide-to-useeffect/) makes you feel like you're reading a scroll handed down from Mt Olympus written in ancient Greek, you're not alone.

Sometimes the pantheon of React Gods have a hard time translating their wisdom into language the rest of us can understand. It usually goes like this: You hit a snag with React, google your issue, and read a blog or Stack Overflow post with some advice that makes you feel more lost than when you started.

I've certainly fallen victim to this many, many times. Particularly with `useEffect`.

## What is an "effect" anyway?

To really wrap your head around `useEffect`, let's back up a little bit and talk about programming and JavaScript.

The effects that `useEffect` is named for are what we affectionately refer to as "side effects".

So what is a side effect? It's a bit of code that reaches out and ...does something else. It's an abstract concept, so let's talk in examples.

Here's a function with NO side effects:

```js
function add(a, b) {
    return a + b
}
```

The function `add` does nothing except take an input and return an output. It doesn't reach outside itself to mess with anything else!

Let's introduce a side effect.

```js js-live autorun linkId=ex1 no-edit
const resultDiv = document.getElementById('add-example')
function add(a, b) {
    const result = a + b
    resultDiv.textContent = `The Result is ${result}`
    return a + b
}
add(3, 4)
```

```html html-live linkId=ex1 no-edit
<div id="add-example"></div>
```

Now our function reaches outside of itself to update the DOM (short for [Document Object Model](https://www.youtube.com/watch?v=H63dVFDuJDM)) and show the result. This additional behavior is a side effect.

## Side Effects in React

So what about React? It's a library that pretty much only updates the DOM. A view library, if you will. So what would you call a side effect in React?

Anything outside of updating the page. If you're not using React to update state or render HTML, that's a side effect. It's any non-React thing.

This means anytime you call an API, use `setInterval`/`setTimeout`, add a keyboard listener, or really anytime you mess with the `window` object you're introducing side effects.

When you think about it, most of the fun, interesting stuff we do as web developers revolves around side effects.

Before hooks, we would use Component lifecycle methods to perform side effects. For example, on `componentDidMount` go ahead and hit that API to get my data for render.

```jsx react-live no-edit
class Pokemon extends React.Component {
    constructor() {
        super()
        this.state = null
    }
    componentDidMount() {
        // fetch('https://pokeapi.co/api/v2/pokemon/gengar/')
        // .then(res => res.json())
        // .then(res => {
        //     this.setState(res)
        // })
    }
    render() {
        const pokemon = this.state
        const style = {textTransform: 'capitalize'}
        return (
            <div>
            { pokemon
                ? <>
                    <img src={pokemon.sprites.front_default}
                        alt={'Image of ' + pokemon.name}/>
                    <p style={style}>Name: {pokemon.name}</p>
                    <p style={style}>
                        Type: {pokemon.types.map(x => x.type.name).join(', ')}
                    </p>
                </>
                : 'Loading...'
            }
            </div>
        )
    }
}
```

Great... except what happens when we want to hit the API again to grab a different pokemon? What if this component is attached to a certain route in our app and the route changes, but the component doesn't unmount/remount. What if the user goes to a different page and the component unmounts before the API call finishes?

All of a sudden our component is littered with lifecycle methods to handle all these edge cases.

## Enter React Hooks

The React team realized that the class API is a little unwieldy and hard to reason about. People were making [lifecycle flowcharts](https://levelup.gitconnected.com/componentdidmakesense-react-lifecycle-explanation-393dcb19e459) trying to understand the inner workings of React ...it was a mess.

So at ReactConf in October of 2018, after Sophie Alpert outlined just how bad classes are to use, Dan Ambramov got on stage and introduced hooks (You can watch the video [here](https://youtu.be/dpw9EHDh2bM?t=643)).

Hooks introduced statefulness in functional components, as well as a new way to handle side effects. Hooks made React code more reusable with less code--a huge win!

Except for one small quirk. Each render, the whole component/function is re-run.

```jsx react-live no-edit
function RerenderExample() {
    const [bool, setBool] = React.useState(false)
    const randomNum = Math.random()
    return (
        <div>
            <p>This number will be different each time you click the button!</p>
            <p>{randomNum}</p>
            <button onClick={() => setBool(!bool)}>Trigger a render</button>
        </div>
    )
}
```
We're not even using `bool` in our rendered JSX, yet the whole function runs everytime the state changes. **Every render, everything inside the component re-runs: function definitions, variable creation/assignment, etc.**

Hooks like `useState` employ some magic under-the-hood to avoid this problem. That's great, and it seems simple enough using `useState`, but what about when you need to do things outside of setting state?

Enter `useEffect`. Gone are those pesky lifecycle methods, hooray! However this hook comes with its own weirdness:

```jsx
//accepts two arguments: a function, and dependency array
useEffect(() => {
    // do stuff
    return () => {} //function to undo our stuff from above when component unmounts
}, []) //dependency array of things to watch for changes on
```

So you pass `useEffect` a callback function to run that contains your side effects, and then an array of things to watch. If the watched things change, `useEffect` will re-run our callback function. If you need to clean up your side effect on unmount, return a function that contains that code.

Let's look at our pokemon example with hooks:

```jsx react-live no-edit
function Pokemon() {
    const [pokemon, setPokemon] = React.useState(null)
    React.useEffect(() => {
        // fetch('https://pokeapi.co/api/v2/pokemon/gengar/')
        // .then(res => res.json())
        // .then(res => {
        //     setPokemon(res)
        // })
    }, []) // empty array means nothing to watch, so run once and no more
    const style = {textTransform: 'capitalize'}
    return (
        <div>
        { pokemon
            ? <>
                <img src={pokemon.sprites.front_default}
                    alt={'Image of ' + pokemon.name}/>
                <p style={style}>Name: {pokemon.name}</p>
                <p style={style}>
                    Type: {pokemon.types.map(x => x.type.name).join(', ')}
                </p>
            </>
            : 'Loading...'
        }
        </div>
    )
}
```

If you're staring at that empty dependency array you've got a keen eye. By passing an empty array, we're saying "only ever do this once". Sometimes that's ok, but most of the time you want something in there. What if our pokemon component depended on a route parameter or props, anything that said, "go get a new pokemon" without mounting/unmounting?

Let's prop pokemon into the pokemon component:
```jsx react-live use-render no-edit
function Pokemon({pokemonToGet}) {
    const [pokemon, setPokemon] = React.useState(null)
    React.useEffect(() => {
        // fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonToGet}/`)
        // .then(res => res.json())
        // .then(res => {
        //     setPokemon(res)
        // })
    }, [pokemonToGet]) // get a new pokemon with the pokemonToGet prop changes
    const style = {textTransform: 'capitalize'}
    return (
        <div>
        { pokemon
            ? <>
                <img src={pokemon.sprites.front_default}
                    alt={'Image of ' + pokemon.name}/>
                <p style={style}>Name: {pokemon.name}</p>
                <p style={style}>
                    Type: {pokemon.types.map(x => x.type.name).join(', ')}
                </p>
            </>
            : 'Loading...'
        }
        </div>
    )
}
function PokemonForm() {
    const [inputValue, setInputValue] = React.useState("rowlet")
    const [pokemonToGet, setPokemonToGet] = React.useState("gengar")
    function getPokemon() {
        setPokemonToGet(inputValue.trim().toLowerCase())
        setInputValue("")
    }
    return (
        <div>
            <input onChange={(e) => setInputValue(e.target.value)}
                value={inputValue} type="text"/>
            <button onClick={getPokemon}>
                Get Pokemon
            </button>
            <Pokemon pokemonToGet={pokemonToGet} />
        </div>
    )
}
render(<PokemonForm />)
```

Great, now our component fetches a new pokemon based on our prop changes. With classes we would've had to play with `componentDidUpdate` and such to achieve a similar effect.

>The question is not "when does this effect run" the question is "with which state does this effect synchronize with"

> useEffect(fn) // all state

> useEffect(fn, []) // no state

> useEffect(fn, [these, states])


>--[Ryan Florence](https://twitter.com/ryanflorence/status/1125041041063665666?lang=en) on Twitter