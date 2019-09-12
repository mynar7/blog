---
title: "Bridging the Gap between React's useState, useReducer, and Redux"
date: 2019-09-12T12:00:00-0400
---

![Photo of a man carelessly leaping over a very deep chasm by Alex Radelich](./mindthegap.jpg)

Redux is one of those technologies that I consider a "personal Everest". Everytime I look at it, I feel like there's no end to the boilerplate and patterns to memorize.

At my first job and the first codebase I worked on, we had to use NGRX (Angular's version of Redux). It was incredibly challenging; I spent hours reading docs and watching tutorials trying to understand NGRX. I even tried learning Redux in a desperate attempt to understand NGRX. I constantly complained to my boss about all the boilerplate, files, and patterns to memorize.

He told me, _"If you were to use your own solution instead, you'd probably end up repeating those same patterns anyway"._

I finally concede. After managing React state with everything _except_ Redux, I've found myself appreciating why it works the way it does and requires so much boilerplate. After learning React's Context API, `useReducer` and a lot more about managing state, I finally appreciate Redux.

It's not easy getting from A to B though. There's a lot of ground to cover between learning `useState` and `useReducer`, and even more when you get into Redux and managing complicated states.

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

The first is that you must provide a new state value to the `setCount` function (`setCount(count++)` and `count++` won't work). React is steeped in immutability, meaning you should always return a new value instead of changing the current value.

The other quirk is the returned array, but almost all hooks follow this pattern. It's a small price to pay considering how easy it is to write functional hook components compared to class components.

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

Before we dig into the classic reducer pattern, I want to boil `useReducer` down to its basic functionality. Simply put: `useReducer` is almost identical to `useState`, except `useReducer` lets you define exactly how to update it's state value by passing it a function.

Let's look at our counter example from before. Here we'll implement our own `useState` with `useReducer`:

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

This is extra work with no benefit, though. Why pass a function to `useReducer`, only to pass another to `onClick`? Also, our counter logic is living in our JSX button element, which isn't great.

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

If you take nothing else away from this article, remember this:

**The power of `useReducer` is that it allows us to define how we update our state value.**

That said, before we dive further into reducers and patterns, I want to take a minute to define "state".

## The Problem with "State" in React

There are some major misconceptions about "state" in React. I think when Vue named it's version of state "data", they made it easier to think about Vue code.

What React defines as state is really just data that we would normally store in variables. However, React needs to, well, _react_ to changes in that data. So under the hood, when you store things in state, React attaches methods and properties to that object so it knows when to trigger re-renders.

**React "state" is just an object that React watches for updates.**

So if React's "state" isn't really state, what is? The concept of "state" actually pre-dates React by [decades](https://en.wikipedia.org/wiki/State_(computer_science)). In computer science terms, **the state of an application describes its current status and the previous events and user interactions that resulted in that status.**

This type of state is notoriously difficult to deal with in programming. This is why every technical support agent defaults to "turn it off and on again" when you call for help. Your device entered a bad state somehow, and sometimes the easiest way to get out of a bad state is to reboot the system into a new state.

When we write React code, the problem is that we have a tendency to conflate the state of the program with the data React is watching for renders. For example, you might have data in your component that describes what the user typed in an input field, but also data that tells you if the form is valid or not. The combination of that current data and how it changed in response to the user is the actual state of your component.

We typically only worry about storing and updating data in our components, and avoid thinking about it's actual state until we start to find bugs.

## Reducers and Redux

The reducer pattern is an attempt to tame the flow of updating complex state. While not foolproof or easy, it can help us define and manages state changes in our application and components.

Let's look at a simple version of the reducer pattern in the context of a form:

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

Think about this as an event signaling system. When we call `dispatch`, we pass in an object that tells us what happened, and then our reducer takes that information and processes it to create a new state.

So why call it dispatch and action? Why the switch statement?

### Dispatchers

I like to picture `dispatch` as a dispatcher of an old switchboard telephone system. The dispatcher packages the info with the main message (type) and any additional info (payload) and plugs it into the switchboard, our reducer (which coincidentally contains a `switch`).

### Actions

[They really should have called them "events" instead of "actions".](https://medium.com/magnetis-backstage/why-action-is-a-bad-name-for-a-redux-action-68bec375539e) Actions describe events that have happened in your application. So when naming action types, it's better to use the past tense ie `"NAME_CHANGED"`, than the present, ie `"CHANGE_NAME"`.

While this may seem like irrelevant semantics, it makes a big difference in understanding the redux pattern. It's important to remember that your reducer is responding to events to decide on a new state. When you say `"CHANGE_NAME"`, you're implying that your reducer _will_ change the name, as opposed to letting it decide _if_ it will change it.

**Note:** While I would much rather refer to these as events, we'll stick with "action" for sake of convention. Just remember to use the past tense in your action types.

**Another Note:** We also use [SCREAMING_SNAKE_CASE](https://en.wikipedia.org/wiki/Snake_case) for our action types. This is to denote that the strings are a constant value and to also implore you not to mutate or change them. ("Screaming Snake Case" is an excellent name for a metal band, btw.)

### The Switch Statement

The choice of a switch statement over a long `if`/`else if` chain is mainly about readability.

You may also notice that there's no `break` statements and lots of spread operators in our switch statement. We're using `return` in lieu of break, which prevents the switch waterfall effect (more on that later). As for the spread operators, remember that React is built on immutability, so the creation of new objects is necessary. By spreading first and passing in our changes second, we can overwrite only the properties in state that we need to without affecting the rest:

```js js-live autorun
const state = {
  name: "Robert",
  email: "SuperBobby74@aol.com"
}
const newState = {...state, name: "Bobby"}
console.log(newState)
```

Let's apply the reducer pattern and `useReducer` to our form from earlier:

```jsx react-live use-render
function FormExample() {
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

  const [state, dispatch] = React.useReducer(formReducer, {
    name: '',
    email: '',
  })

  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
  }

  return (
    <form style={{ ...columnStyle, width: '300px' }}>
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
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </form>
  )
}

render(FormExample)
```

This works great, but we can make some improvements.

First let's pull our action types out and make them into an object like this:

```js
const actions = {
  nameChanged: 'NAME_CHANGED',
  emailChanged: 'EMAIL_CHANGED',
}
```

This will save you from errors down the line. If you use `actions.nameChanged` in your switch and dispatch, your IDE may help prevent errors from typos in your action types. (You might see this same pattern with enums if the codebase is using TypeScript.)

We can also pull out our initial state into it's own object, and move it outside of our component along with our reducer and our actions.

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

  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
  }
  return (
    <form style={{ ...columnStyle, width: '300px' }}>
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
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </form>
  )
}
render(FormExample)
```

### Handling Business Logic using Reducers

You might be wondering why exactly we've taken our `useState` example and made it so complicated. It seems like all we've done is add code to duplicate the same functionality we had before.

Reducers really start to shine when we add a submit button to the form. Forms are devilishly complex things to reason about (lots of state to manage), which is why there are so many form libraries out there. You need to account for validation, plus keep track of what fields are filled out, what happens when the form is submitted, etc.

If you were going to manage that logic with `useState`, you'd find yourself wrapping your submit in a lot of code, adding more `useState` hooks, and possibly wrapping your setter functions in validation functions that might update _other_ state values. This would get messy quickly.

Unlike `useState`, `useReducer` provides a great infrastructure to handle all of the logic that surrounds validation and submission:

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
      // if the form has been successfully submitted,
      // stop here to prevent rage clicks and re-submissions
      if (state.formCompleted) return state
      let formValid = true
      // invalidate the form if values are missing or in error
      if (state.nameError || !state.name || state.emailError || !state.email) {
        formValid = false
      }
      // if the user has attempted to submit before, stop here
      if (state.formSubmitted) return { ...state, formCompleted: formValid }
      // if this is the first submit, we need to validate in case the user
      // clicked submit without typing anything
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

// this helper function validates the name and email inputs
// if there's an error, it returns an error message describing the problem
// if there are no errors, it returns null
// it's outside our reducer to make things more readable and DRY
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

  // extract our dispatch to a change handler to DRY the code up
  function handleChange(e) {
    dispatch({ type: actions[e.target.name + 'Changed'], payload: e.target.value })
  }

  // this is attached to the form, not the submit button so that
  // the user can click OR press 'enter' to submit
  // we don't need a payload, the input values are already in state
  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: actions.formSubmitted })
  }

  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
  }
  // this adds a red outline to the input if the field isn't filled out correctly,
  // but only if the user has attempted to submit
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

Notice how our reducer function swelled with business logic. That's OK! In fact, it's a good rule of thumb to keep your reducers fat and event handlers skinny.

The functionality has changed as well. As our values change, the reducer handles validation and adds error messages to our state if necessary. If the form hasn't been submitted, we can hold off on annoying the user with red boxes and error messages until they submit. If errors are present on submission, we can change the messages as they type to guide them to enter the correct information. Lastly, we can prevent rage clicks and repeat submissions with a `formCompleted` flag in our submission case.

This provides a great experience for the user, and a good organizational model for all these complex UI interactions.

## Welcome to Redux

Believe it or not, **We've now implemented all the major components of Redux**. Redux itself is really just a helper library to assist in doing the same things we've done in this article.

In a typical Redux application, we lift the **actions**, **reducers**, and **state** into their own files in the project. To manage multiple state objects, we can group sets of actions/reducers/state into different **stores** that then become part of a **global store** with a **root reducer**. The root reducer's job is to compose the state of each store into a single, global state object.

Then we import whatever store, dispatcher, and actions we need into our components to access state and signal events to the global store. Redux provides some utility to assist in composing this global state management system, but for the most part, you're going to write all the actions, reducers, and states yourself, just like we did in this article.

So if you made it this far, you're ready to use Redux! The real question is, should you?

### Is Redux Dead ☠?

You can certainly do a lot without Redux nowadays with the Context API and the information learned here. Think of a Context as a Redux Store that you can position anywhere in your app. Any components that are wrapped in a Context Provider get access to the values you share from it. Context can be at the top level in your application, providing state to everything, or further down and only sharing its state with a handful of components.

Kent C Dodds has an **excellent** [article](https://kentcdodds.com/blog/application-state-management-with-react) on using Context for state management in React.

That said, **Redux is not dead**. There are plenty of codebases out there using it, and if you're going to write React professionally, it's not a bad idea to learn it.

## Beyond Redux 😵

We're going to get into some slightly advanced topics now, so buckle up.

The most astute tester might have noticed the **bug in the last example.** Scroll up and see if you can't find the edge case we missed.

Give up?

**You can edit the form after a successful submit!**

How can we fix this? Your first instinct might be to start sprinkling the `formSubmitted` flag throughout our reducer to prevent further changes to the form, sort of how we did at the beginning of our submit case.

This would work, but it's hard to read and reason about. I'd argue that the submission case is already a bit of a mess, and adding more logic to the other cases is only going to make things worse.

More importantly, how did we miss this in the first place? We learned all of this complicated JavaScript to prevent bugs, but we found some anyway!

## Implicit vs Explicit States

In my tangent on state, I mentioned that we sometimes end up describing state with booleans or flags in our code. We've done that in our form with `formCompleted` and `formSubmitted`. The problem is that we've implicitly described the state of our form instead of explicitly.

That means that we're relying on some combination of those booleans to describe the state of our form. For example, if the user hasn't entered anything and hasn't pressed submit, we might write:

```js
if (!formSubmitted && !name && !email && !emailError && !nameError) {
  // behave as if user hasn't done anything yet
}
```

This is messy and hard to understand. When you come back to this code later you might even forget how it works and be hesitant to change it. It's much better to explicitly describe the state of the form, and then ensure that the form can only exist in one of those states at any point in time.

We could describe our form states as:

* **Clean** - User hasn't entered anything or pressed submit
* **Dirty** - User has started to enter info, but hasn't successfully finished and submitted
* **Completed** - Form has been filled out correctly and submitted

We also want to handle the transitions between these states as well as the possible actions that can happen in each state:

* **Clean** - User hasn't entered anything or pressed submit
  * Possible Transitions: Dirty
  * Allowed Actions: editing and submitting, but submitting does not trigger errors, just a message
* **Dirty** - User has started to enter info, but hasn't successfully finished and submitted
  * Possible Transitions: Completed
  * Allowed Actions: editing and submitting, but submitting triggers error messages
* **Completed** - Form has been filled out correctly and submitted
  * Possible Transitions: None!
  * Allowed Actions: None!

## Finite State Machines

The mental model we just created is a state machine or finite state machine (FSM). **Finite** meaning there's a limited amount of states that the form can exist in, **state** describing the status of the form, and **machine** referring to the mechanism of how we transition to and from different states.

I'm not a state machine expert, so I highly recommend reading [these](https://medium.com/@DavidKPiano/the-facetime-bug-and-the-dangers-of-implicit-state-machines-a5f0f61bdaa2) [articles](https://24ways.org/2018/state-machines-in-user-interfaces/) by David Khourshid for a deeper dive into FSMs.

There are two options for applying this model to our code.

First, there's library that's tailor-made for FSMs called [XState](https://xstate.js.org/docs/), written by the same David mentioned above. Here's a great [tutorial](https://gedd.ski/post/state-machines-in-react/) by Dave Geddes on using xstate in React if you're interested.

The other option is to implement the logic ourselves in our reducer. This is a bit of a tall order, but if you read the FSM articles I linked, you might have seen an example of a FSM implemented with a **nested switch** statement. Let's apply that to our form.

### Advanced Switch Statements

Before we get to our final example, let's briefly review JavaScript's `switch`.

What we're about to use is the "fall-through" or "waterfall" switch usage. What this means is we will deliberately _not_ use `break` in every case so that we can match multiple cases.

Let's see an example where we ignore Mom's advice and skip breakfast, but still eat lunch and dinner:

```js js-live autorun
const actionType = "LUNCH_ORDERED"

switch(actionType) {
  case "BREAKFAST_ORDERED":
    console.log("breakfast")
    // no break!
  case "LUNCH_ORDERED":
    console.log("lunch")
    // no break!
  case "DINNER_ORDERED":
    console.log("dinner")
    break
  default:
    console.log("fasting 😵")
}
```

**Once you match a case, you match all cases until you break or return.**

What about nested switches 😵?

```js js-live autorun
function dailyLife(status, actionType) {
  switch(status) {
    case "work":
      switch(actionType) {
        case "WORK_REQUESTED":
          console.log("DOING WORK")
          break
      }
    //no break after "work"
    case "holiday":
      switch(actionType) {
        case "CAKE_EATEN":
          console.log("FEELING FAT")
          break
        case "NAP_REQUESTED":
          console.log("NAPPING")
          break
      }
  }
}
console.log("ooooh, who's birthday is it?")
dailyLife("work", "CAKE_EATEN") // feeling fat

console.log("Taking a break, afk")
dailyLife("work", "NAP_REQUESTED") // napping

console.log("Hey, I know it's Saturday, but can you get us that TPS report?")
dailyLife("holiday", "WORK_REQUESTED") // not happening, sorry boss
```

Here we can see that you can take a nap at work and on holiday, but you can't work on a holiday. (At least you shouldn't).

The idea is that if you have to share actions between states, **put the state with unshared actions at the top**. If we can only work at work, then the work status should be at the top. If you can eat cake at work and on holiday, then holidays/cake-eating should be below.

This is definitely an advanced technique, so be careful and test often when you're writing a complicated switch that's nesting and waterfalling through cases.

In the case of our form, we want the user to be able to edit the form regardless if it's "clean" or "dirty". To share the input change actions, we don't `break` between the clean and dirty cases so that those actions are available to both. Also, you can submit in both states, but submit behaves differently in each.

Alright, here we go! Let's take a look at our final form example with FSMs and `useReducer`:

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

Now our form is bug free!

We've explicitly modeled and accounted for all the possible states it can exist in, and defined the possible actions in those states.

**Note:** You may notice we still have a `submitAttempted` boolean in the code. This is OK because it is only used to show or hide the error messages in our form. Most importantly, **We don't check `submitAttempted` to determine what state we're in.**

## Parting Thoughts

This post is full of advanced concepts and I hope that you were able to learn some of them even if you didn't make it all the way to the end. **Don't fret if you didn't understand every concept and example.** Start at the easy stuff, and start applying and practicing those concepts first in your own code before moving on to the more difficult concepts. That's how I learned them.

Thanks for reading this huge article, cheers!