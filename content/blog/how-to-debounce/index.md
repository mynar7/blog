---
title: What is a debounce function and how do you write one?
date: 2019-10-17T12:00:00-0400
---
![Photo of Typewriter by Pereanu Sebastian](./typewriter.jpg)

Have you ever heard the story of the QWERTY layout on a keyboard? The [popular legend](https://en.wikipedia.org/wiki/Typewriter#QWERTY) is that it was too easy to type if the letters were arranged alphabetically, and this caused mechanical typewriters to jam. The most common letters were too close together, supposedly. So to fix this, the QWERTY layout was invented, to _slow down the typist_.

This Dilbertian engineering idea is eerily similar to what a debounce function does.

## What is a debounce?

A debounce function is meant to slow down something in your application, typically a function call. The best way to wrap your head around this is by example.

Consider this: you have a search input on your site somewhere, and _as the user types_, you want to go fetch some search results to try and match what the user is looking for before they finish typing.

_Piece of cake!_, you think. With React, you can attach your API call to your input's `onChange` event like so:

```jsx react-live
function SearchForm() {
  const [inputVal, setInputVal] = React.useState("")
  const [callCount, setCallCount] = React.useState(0)

  function handleChange(e) {
    setInputVal(e.target.value)
    // let's say this was an API call
    // to add auto-complete data
    setCallCount(callCount + 1)
  }

  return (
    <div>
      <h2>Type in this Box ⬇️</h2>
      <input onChange={handleChange} value={inputVal}/>
      <p>Current Data: {inputVal}</p>
      <p>Calls Done: {callCount}</p>
    </div>
  )
}
```

Notice that as you type in the search box, if your API function is attached to your input's `onChange` event, you'll make an API call _every time the user presses a key_ 😱. If you couple this with the small delay it takes to make an API call, you can imagine the traffic jam that this would cause as you have multiple API calls being made and flooding back in.

This isn't what we imagined when we first cooked up this auto-populating search box scheme. What we _really_ want to do is to make our API call when the user pauses or stops typing.

This is the purpose of a **debounce** function, to limit the amount of calls that can happen in a given amount of time.

## How to debounce a function in JavaScript

So we need to fire fewer API calls, but how do we do it?

Before we jump into React, let's give this a shot with regular JavaScript. Let's put our fake API call in its own function, then wrap it in our debounce function.

```js js-live
let callCount = 0

// this is just a promise that resolves after 300ms
// and console logs a counter
function fakeAPICall() {
  return new Promise(resolve => {
    setTimeout(() => {
      callCount++
      console.log("Calls Made:" + callCount)
      resolve()
    }, 300)
  })
}

fakeAPICall() // 1
fakeAPICall() // 2
fakeAPICall() // 3

function debounce(callback) {
    // each call to debounce creates a new timeoutId
    let timeoutId
    return function() {
      // this inner function keeps a reference to
      // timeoutId from the function outside of it
      clearTimeout(timeoutId)
      timeoutId = setTimeout(callback, 800)
    }
}

// wraps the fakeAPICall function and returns
// a function that calls fakeAPICall
const debouncedFakeApiCall = debounce(fakeAPICall)

// all these calls cancel each other
// Until the last call finally happens after 800 ms
debouncedFakeApiCall()
debouncedFakeApiCall()
debouncedFakeApiCall()
debouncedFakeApiCall()
debouncedFakeApiCall()
debouncedFakeApiCall()
debouncedFakeApiCall() // 4
```

Success!

Without a debounce, we get 3 calls, but with a debounce, we only fire an API call **on the last function call**.

### How it works

The most basic, critical piece of this debounce function is to delay the actual API call, then as more calls come in, cancel and reset the delay for the API call. We do this with `setTimeout` and `clearTimeout` in the JavaScript above.

If you noticed the debounce function taking a function and returning a another function, that is an example of a closure in JavaScript. When we debounce a function, we pass our original function in, and wrap it in another function that delays calls to the original. In this way our debounce function is reusable throughout our program. We could debounce as many different functions as we want, **because each one has its own `timeoutId` variable**.

## How to write a debounce function in React

React allows us to encapsulate logic in components, so we can skip the fancy JavaScript closures and just use our component to write a debounce function.

Let's take a look:

```jsx react-live use-render
// just an async helper
function fakeAPICall() {
  return new Promise(resolve => {
    setTimeout(resolve, 300)
  })
}

function SearchForm() {
  const [inputVal, setInputVal] = React.useState("")
  const [query, setQuery] = React.useState("")
  const inputRef = React.useRef("")
  const [callCount, setCallCount] = React.useState(0)
  const timeoutId = React.useRef()

  function handleChange(e) {
    setInputVal(e.target.value)
    // mimic the value so we can access
    // the latest value in our API call
    inputRef.current = e.target.value
  }

  React.useEffect(() => {
    // if the user keeps typing, stop the API call!
    clearTimeout(timeoutId.current)
    // don't make an API call with no data
    if (!inputVal.trim()) return
    // capture the timeoutId so we can
    // stop the call if the user keeps typing
    timeoutId.current = setTimeout(() => {
      // grab our query, but store it in state so
      // I can show it to you below in the example 😄
      setQuery(inputRef.current)
      fakeAPICall()
      // here we pass a callback so we get the current callCount value
      // from the useState hook's setter function
      // we use a Ref for timeoutId to avoid this same problem
      .then(() => setCallCount(callCount => callCount + 1))
    }, 800)
  }, [inputVal])

  return (
    <div>
      <h2>Type in this Box ⬇️</h2>
      <input onChange={handleChange} value={inputVal}/>
      <p>Current Data: {inputVal}</p>
      <p>Query Sent: {query}</p>
      <p>Calls Done: {callCount}</p>
    </div>
  )
}

render(SearchForm)
```
Now as we type, the component won't actually make any API calls until the typing stops.

The only difference here is that instead of writing a closure, we're using a React Ref for our `timeoutId`. Refs are React's version of instance variables, so each SearchForm component that we make should get its own `timeoutId`. If you want to learn more about Refs and `useEffect`, [I wrote another post on that topic](https://leewarrick.com/blog/react-use-effect-explained/).

### But wait, there's more

This might not be exactly what you imagined when you envisioned this functionality. For example, as you type into Google search, you still get autocomplete suggestions as you type, even if you haven't stopped typing.

So while our previous examples will ensure we do the _fewest_ API calls possible, we may want to tweak our solution to **make an API call every so often as the user types**.

## How to write a debounce in JavaScript: Round 2

Let's tweak our JavaScript debounce implementation so that we only make our API call every 800ms.

```js js-live
let callCount = 0

function fakeAPICall() {
  return new Promise(resolve => {
    setTimeout(() => {
      callCount++
      console.log("Calls Made:" + callCount)
      resolve()
    }, 300)
  })
}

function debounce(cb) {
    let makingCall
    return function() {
      // if I'm in progress of making an API call,
      // don't trigger another one
      if (makingCall) return
      // set up API call to fire
      makingCall = true
      // give the user some time to type by delaying the actual call
      setTimeout(() => {
        makingCall = false
        cb()
      }, 1000)
    }
}

const debouncedFakeApiCall = debounce(fakeAPICall)

// imagine the user starting and stopping typing
// we'll only make a call every 800ms
debouncedFakeApiCall() // 1
debouncedFakeApiCall()
debouncedFakeApiCall()
setTimeout(() => {
  debouncedFakeApiCall()
  debouncedFakeApiCall()
}, 600)
setTimeout(() => {
  debouncedFakeApiCall() // 2
  debouncedFakeApiCall()
}, 1200)
setTimeout(() => {
  debouncedFakeApiCall()
  debouncedFakeApiCall()
}, 1800)
setTimeout(() => {
  debouncedFakeApiCall() // 3
  debouncedFakeApiCall()
}, 2400)

```

Now as our debounce function fires, we are limiting our calls to happen every 800ms.

### How it works

This new version uses a simple `true`/`false` value to determine if we should trigger more calls instead of clearing the timeout and cancelling previous calls. Now the first call to the debounced function fires the call, and the subsequent calls are ignored until the API call is complete.

## How to write a debounce in React: Round 2

Let's apply this same functionality to our previous React example.

```jsx react-live use-render
// just an async helper
function fakeAPICall() {
  return new Promise(resolve => {
    setTimeout(resolve, 300)
  })
}

function SearchForm() {
  const [inputVal, setInputVal] = React.useState("")
  const [query, setQuery] = React.useState("")
  const inputRef = React.useRef("")
  const [callCount, setCallCount] = React.useState(0)
  const makingCall = React.useRef(false)

  function handleChange(e) {
    setInputVal(e.target.value)
    // mimic the value so we can access
    // the latest value in our API call
    inputRef.current = e.target.value
  }

  React.useEffect(() => {
    // if there's no value or we've already triggered a call
    // prevent further calls
    if (!inputVal.trim() || makingCall.current) return
    makingCall.current = true
    setTimeout(() => {
      // again, this setQuery is just so I can
      // render the query below.
      // if this API call were real, we'd probably
      // pass the query into the API call function
      setQuery(inputRef.current)
      fakeAPICall()
      .then(() => {
        setCallCount(callCount => callCount + 1)
        makingCall.current = false
      })
    }, 1000)
  }, [inputVal])

  return (
    <div>
      <h2>Type in this Box ⬇️</h2>
      <input onChange={handleChange} value={inputVal}/>
      <p>Current Data: {inputVal}</p>
      <p>Query Sent: {query}</p>
      <p>Calls Done: {callCount}</p>
    </div>
  )
}

render(SearchForm)
```

Great Success! Now as the user types, every 800ms we make a call for an autocomplete suggestion. This means **more API calls, but better user experience**, at least in the case of our search autocomplete example.

## Parting Thoughts

So there you have it: two different ways to implement debounce functions in JS and React.

But would you ever implement this yourself in real life?

Sure! If you just needed simple functionality like this, you could absolutely manage your own debounce logic/helpers in your app. However, you can absolutely pull in a solution like [Lodash](https://lodash.com/docs/4.17.15#debounce) and just use the debounce function that they've implemented.

I find it fun to try and implement my own solutions, and I think it's worth the mental gymnastics to give this stuff a shot in your own code every once in a while. But don't be fooled, nobody will judge you if you reach for a third-party solution!