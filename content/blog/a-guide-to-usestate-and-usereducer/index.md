---
title: How to Bridge the Gap between React's useState, useReducer and Redux
date: 2019-09-06T12:00:00-0400
---

![Photo of a man carelessly leaping over a very deep chasm by Alex Radelich](./mindthegap.jpg)

Redux is one of those technologies that I consider a "personal Everest". Everytime I look at it, I feel like there's no end to the boilerplate and patterns to memorize.

At my first job, we had to learn NGRX with Angular. I remember telling my boss that there was "too much boilerplate". I was overwhelmed by all the files and patterns to internalize.

He told me, "If you were to use your own solution instead, you'd probably end up repeating those same patterns anyway".

I finally concede. After working _around_ Redux for so long (using the Context API, propping state around, etc.), I've found myself appreciating the patterns that compose Redux.

Looking back though, there has to be a faster way. Let's examine what it takes to go from something simple like `useState` to applying `useReducer`, Redux, and beyond.

## The 'useState' Hook

React's `useState` is a pleasure to use. Give it an initial value, and it gives you a reference to the reactive value and a setter function to update that value.

Here's the classic counter example with `useState`:

```jsx react-live
function Counter() {
    const [count, setCount] = React.useState(0)
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    )
}
```

Simple enough! There's only two quirks:

The first is that you must provide a new state value to the `setCount` function; `setCount(count++)` and `count++` won't work. React is steeped in immutability, meaning you should always return a new value instead of changing the current value.

The other quirk is the returned array, but almost all hooks follow this destructuring pattern. It's a small price to pay considering how easy it is to write functional hook components compared to class components.

I should also note that you can pass a function to `setCount` instead of a simple value. That function then receives the current state as an argument, just like in the old days with class components. Ex: `setCount(count => count + 1)`

So while `useState` seems simple enough, what happens when you need more than a single state value? What if you have a form with multiple fields?

Luckily, with hooks we can use `useState` multiple times:

```jsx react-live use-render
function FormExample() {
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')

  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
  }
  return (
    <form style={{ ...columnStyle, width: '300px' }}>
      <label style={columnStyle}>
        <span>Name:</span>
        <input
          onChange={e => setName(e.target.value)}
          value={name}
          type="text"
        />
      </label>
      <label style={columnStyle}>
        <span>Email:</span>
        <input
          onChange={e => setEmail(e.target.value)}
          value={email}
          type="text"
        />
      </label>
      <pre>{JSON.stringify({name, email}, null, 2)}</pre>
    </form>
  )
}
render(FormExample)
```

Great! But how much is too much with `useState`? Is there a sensible limit? Should we keep it to 5 or less?

And what if you need to manage more complicated data structures or perform side effects?

## The 'useReducer' Hook

![Photo of a man stirring a campfire cooking pot by Gary Sandoz](./cooking.jpg)

Now we've entered `useReducer` territory. The reducer in 'useReducer' comes from Redux, which in turn borrowed it from JavaScript's `Array.reduce()`.

So what does it mean to "reduce" something? Think of simmering balsamic vinegar so the vinegar evaporates and you're left with a sweet, delicious glaze. That's called a "balsamic reduction". Think of reducers as taking arguments and cooking them down until they're more pallatable.

In the context of React, here's the typical pattern used with `useReducer`:

```js
const reducer = function (currentState, action) {
  // Make a new state based on the current state and action
  // Note: There's usually a big switch statement here
  return newState
}
const [state, dispatch] = useReducer(reducer, initialValue)

// example usage:
dispatch({type: "THING_HAPPENED"})
// Or with an optional "payload":
dispatch({type: "THING_HAPPENED", payload: newData})
```

Before we dig into the classic reducer pattern, I want to boil `useReducer` down to its basic functionality. Simply put: `useReducer` is almost identical to `useState`, except `useReducer` lets you define exactly how to update it's state value.

Let's look at our counter example from before. Here we'll duplicate the previous functionality with `useReducer`:

```jsx react-live
function Counter() {
    const [count, setCount] = React.useReducer((currentCount, newCount) => newCount, 0)
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    )
}
```

This seems like extra work though. We have to pass a function to `useReducer`, but also to `onClick`? Also, our counter logic is living in our JSX button element, which isn't great.

Let's cut out the extra function and move our logic out of the JSX:

```jsx react-live
function Counter() {
    const [count, increment] = React.useReducer(currentCount => currentCount + 1, 0)
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>
                Increment
            </button>
        </div>
    )
}
```

The power of `useReducer` is that it allows us to define how we update our state value.

## The Problem with "State" in React

Before we move onto the main Redux patterns, I want to talk about "state".

The way we talk and think about "state" with regards to React is usually wrong. I think when Vue named it's version of state "data", they hit the nail on the head.

What we're really talking about when we talk about state in React is data. Specifically, data that causes React to, well _react_ to it and re-render. That's all that React "state" is: a reactive data structure.

In fact, the term "state" pre-dates React by decades. The state of an application describes its [current status and the previous events and user interactions](https://en.wikipedia.org/wiki/State_(computer_science)) that resulted in that status.

React conflates "state" with data. For example, you might have data in your component that describes what the user typed in an input field, but also data that tells you if the form is valid or not. The combination of both of those current values, as well as their previous values, is the real state of your component.

State is notoriously difficult to deal with in programming. This is why every technical support agent defaults to "turn it off and on again" when you call for help. Your device entered a bad state, and the easiest way to fix it is to reset it.

## Reducers and Redux

The reducer pattern popularized by Redux is an attempt to tame the flow of updating complex state.

Here's the pattern in a nutshell in the context of a simple form:

```js
const reducer = function (currentState, action) {
    switch(action.type) {
        case 'NAME_CHANGED':
            return {...currentState, name: action.payload}
        case 'EMAIL_CHANGED':
            return {...currentState, email: action.payload}
        default:
            return state
    }
}
const [state, dispatch] = useReducer(reducer, {name: '', email:''})

// example usage:
dispatch({type: 'NAME_CHANGED'})
// or with a payload:
dispatch({type: 'NAME_CHANGED', payload: 'Suzy'})
```

It's easiest to think about this as an event signalling system. When we call `dispatch`, we pass in an object that tells us what happened and optionally some new data, and then our reducer takes that information and processes it to create a new state.

Let's bike-shed over these naming conventions a bit:

### Dispatchers

I think this name was spot-on. I like to picture `dispatch` as a dispatcher of an old switchboard telephone system. The dispatcher packages the info with the main message (type) and any additional info (payload) and connects it into our reducer (the switchboard itself),

### Actions

This was a miss--I wish they had gone with "event" instead. "Actions" sounds very imperative, eg: "do this!" So you may see action types like `"CHANGE_NAME"` instead of the past tense `"NAME_CHANGED"`.

While this seems like a minor distinction, it makes a big difference in understanding the redux pattern. It's important to remember that your reducer is responding to events to decide on a new state. When you say `"CHANGE_NAME"`, you're implying that your reducer _will_ change the name, as opposed to letting it decide _if_ it will change it.

```jsx react-live use-render
function formReducer(state, action) {
  switch (action.type) {
    case 'NAME_CHANGED':
      return { ...state, name: action.payload }
    case 'EMAIL_CHANGED':
      return { ...state, email: action.payload }
    default:
      return state
  }
}

function FormExample() {
  const [state, dispatch] = React.useReducer(formReducer, {
    name: '',
    email: '',
  })

  function handleSubmit(e) {
    e.preventDefault()
  }

  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
  }
  return (
    <form style={{ ...columnStyle, width: '300px' }} onSubmit={handleSubmit}>
      <label style={columnStyle}>
        <span>Name:</span>
        <input
          onChange={e =>
            dispatch({ type: 'NAME_CHANGED', payload: e.target.value })
          }
          value={state.name}
          type="text"
        />
      </label>
      <label style={columnStyle}>
        <span>Email:</span>
        <input
          onChange={e =>
            dispatch({ type: 'EMAIL_CHANGED', payload: e.target.value })
          }
          value={state.email}
          type="text"
        />
      </label>
      <button type="submit">Submit</button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </form>
  )
}
render(FormExample)
```

```jsx react-live use-render
const actions = {
  nameChanged: 'NAME_CHANGED',
  emailChanged: 'EMAIL_CHANGED',
}
const initialState = {
  name: '',
  email: '',
}
function formReducer(state, action) {
  switch (action.type) {
    case actions.nameChanged:
      return { ...state, name: action.payload }
    case actions.emailChanged:
      return { ...state, email: action.payload }
    default:
      return state
  }
}

function FormExample() {
  const [state, dispatch] = React.useReducer(formReducer, initialState)

  function handleSubmit(e) {
    e.preventDefault()
  }

  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
  }
  return (
    <form style={{ ...columnStyle, width: '300px' }} onSubmit={handleSubmit}>
      <label style={columnStyle}>
        <span>Name:</span>
        <input
          onChange={e =>
            dispatch({ type: actions.nameChanged, payload: e.target.value })
          }
          value={state.name}
          type="text"
        />
      </label>
      <label style={columnStyle}>
        <span>Email:</span>
        <input
          onChange={e =>
            dispatch({ type: actions.emailChanged, payload: e.target.value })
          }
          value={state.email}
          type="text"
        />
      </label>
      <button type="submit">Submit</button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </form>
  )
}
render(FormExample)
```

```jsx react-live use-render
const actions = {
  nameChanged: 'NAME_CHANGED',
  emailChanged: 'EMAIL_CHANGED',
  formSubmitted: 'FORM_SUBMITTED',
}

const initialState = {
  name: '',
  email: '',
  nameError: null,
  emailError: null,
  formCompleted: false,
  formSubmitted: false,
}

function formReducer(state, action) {
  let error
  switch (action.type) {
    case actions.nameChanged:
      error = validate('name', action.payload)
      return { ...state, name: action.payload, nameError: error }
    case actions.emailChanged:
      error = validate('email', action.payload)
      return { ...state, email: action.payload, emailError: error }
    case actions.formSubmitted:
      if (state.formCompleted) return state
      let formValid = true
      if (state.nameError || !state.name || state.emailError || !state.email) {
        formValid = false
      }
      if (state.formSubmitted) return { ...state, formCompleted: formValid }
      let nameError = validate('name', state.name)
      let emailError = validate('email', state.email)
      return {
        ...state,
        nameError,
        emailError,
        formSubmitted: true,
        formCompleted: formValid,
      }
    default:
      return state
  }
}

function validate(name, value) {
  if (typeof value === 'string') value = value.trim()
  switch (name) {
    case 'name':
      if (value.length === 0) {
        return 'Must enter name'
      } else if (value.split(' ').length < 2) {
        return 'Must enter first and last name'
      } else {
        return null
      }
      break
    case 'email':
      if (value.length === 0) {
        return 'Must enter email'
      } else if (
        !value.includes('@') ||
        !value.includes('.') ||
        value.split('.')[1].length < 2
      ) {
        return 'Must enter valid email'
      } else {
        return null
      }
      break
  }
}

function FormExample() {
  const [state, dispatch] = React.useReducer(formReducer, initialState)

  function handleChange({ target: { name, value } }) {
    dispatch({ type: actions[name + 'Changed'], payload: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: actions.formSubmitted })
  }

  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
  }
  const inputStyle = hasError => {
    return {
      outline: hasError && state.formSubmitted ? '2px solid red' : 'none',
    }
  }
  return (
    <form style={{ ...columnStyle, width: '300px' }} onSubmit={handleSubmit}>
      <label style={columnStyle}>
        <span>Name:</span>
        <input
          style={inputStyle(state.nameError)}
          onChange={handleChange}
          name="name"
          value={state.name}
          type="text"
        />
        <span>{state.formSubmitted && state.nameError}</span>
      </label>
      <label style={columnStyle}>
        <span>email:</span>
        <input
          style={inputStyle(state.emailError)}
          onChange={handleChange}
          name="email"
          value={state.email}
          type="text"
        />
        <span>{state.formSubmitted && state.emailError}</span>
      </label>
      <p>{state.formCompleted && 'Form Submitted Successfully!'}</p>
      <button type="submit">Submit</button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </form>
  )
}

render(FormExample)
```

```jsx react-live use-render
const actions = {
  nameChanged: 'NAME_CHANGED',
  emailChanged: 'EMAIL_CHANGED',
  formSubmitted: 'FORM_SUBMITTED',
}

const initialState = {
  name: '',
  email: '',
  nameError: null,
  emailError: null,
  submitAttempted: false,
  submitMessage: '',
  status: 'clean',
}

function formReducer(state, action) {
  let error
  switch (state.status) {
    case 'dirty':
      switch (action.type) {
        case actions.formSubmitted:
          let formValid = true
          let nameError = validate('name', state.name)
          let emailError = validate('email', state.email)
          if (nameError || !state.name || emailError || !state.email) {
            formValid = false
          }
          return {
            ...state,
            nameError,
            emailError,
            submitAttempted: true,
            status: formValid ? 'completed' : 'dirty',
            submitMessage: formValid
              ? 'Form Submitted Successfully'
              : 'Form Has Errors',
          }
      }
    // no 'break' or 'return', case 'dirty' continues!
    case 'clean':
      switch (action.type) {
        case actions.nameChanged:
          error = validate('name', action.payload)
          return {
            ...state,
            name: action.payload,
            nameError: error,
            submitMessage: '',
            status: 'dirty',
          }
        case actions.emailChanged:
          error = validate('email', action.payload)
          return {
            ...state,
            email: action.payload,
            emailError: error,
            submitMessage: '',
            status: 'dirty',
          }
        case actions.formSubmitted:
          return {
            ...state,
            submitMessage: 'Please fill out the form',
          }
        default:
          return state
      }
    case 'completed':
    // no 'break' or 'return', case 'completed' continues!
    default:
      return state
  }
}

function validate(name, value) {
  if (typeof value === 'string') value = value.trim()
  switch (name) {
    case 'name':
      if (value.length === 0) {
        return 'Must enter name'
      } else if (value.split(' ').length < 2) {
        return 'Must enter first and last name'
      } else {
        return null
      }
      break
    case 'email':
      if (value.length === 0) {
        return 'Must enter email'
      } else if (
        !value.includes('@') ||
        !value.includes('.') ||
        value.split('.')[1].length < 2
      ) {
        return 'Must enter valid email'
      } else {
        return null
      }
      break
  }
}

function FormExample() {
  const [state, dispatch] = React.useReducer(formReducer, initialState)

  function handleChange({ target: { name, value } }) {
    dispatch({ type: actions[name + 'Changed'], payload: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: actions.formSubmitted })
  }

  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
  }
  const inputStyle = hasError => {
    return {
      outline: hasError && state.submitAttempted ? '2px solid red' : 'none',
    }
  }
  return (
    <form style={{ ...columnStyle, width: '300px' }} onSubmit={handleSubmit}>
      <label style={columnStyle}>
        <span>Name:</span>
        <input
          style={inputStyle(state.nameError)}
          onChange={handleChange}
          name="name"
          value={state.name}
          type="text"
        />
        <span>{state.submitAttempted && state.nameError}</span>
      </label>
      <label style={columnStyle}>
        <span>email:</span>
        <input
          style={inputStyle(state.emailError)}
          onChange={handleChange}
          name="email"
          value={state.email}
          type="text"
        />
        <span>{state.submitAttempted && state.emailError}</span>
      </label>
      <p>{state.submitMessage}</p>
      <button type="submit">Submit</button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </form>
  )
}

render(FormExample)
```
