---
title: The Problem with React's Context API
date: 2019-11-28T12:00:00-0400
---
![A Gorilla looking thoughtful by Rob Schreckhise](gorilla.jpg)

React's context API is awesome. As someone that looked at Redux as a junior developer and instantly felt defeated, learning about context was a relief. I used it in my apps, quickly forgot about Redux, and never looked back.

That is, until I heard about the supposed preformance problems with the Context API. Now, the big names in the React community will tell you not to worry about performance unless you start seeing issues. And yet, I keep hearing about context problems from other developers. One fellow even mentioned his boss banning the use of Context on their project.

Let's review the Context API in case you're unfamiliar before we talk about its problems.

## Why use the context API?

The Context API is useful for sharing state between components that you can't easily share with props. Here's an example of a button component that needs to set the state of a distant ancestor:

```jsx react-live use-render
const { useState } = React

function CountDisplay({ count }) {
  return <h2>The Count is: {count}</h2>
}

function CountButton({ setCount }) {
  return (
    <button onClick={() => setCount(count => count + 1)}>
      Increment
    </button>
  )
}

const OuterWrapper = ({setCount}) => <InnerWrapper setCount={setCount}/>
const InnerWrapper = ({setCount}) => <CountButton setCount={setCount}/>

function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <CountDisplay count={count} />
      <OuterWrapper setCount={setCount}/>
    </div>
  )
}

render(App)
```

The button component is within a few other components further down the tree, but still needs to access state from higher up in the app. So we have to pass `setCount` down to each component to finally get it to our `CountButton` component. This is affectionately known as "prop-drilling", and used to be a huge pain point in React.

The Context API makes short work of situations like this, thankfully.

## How to use the Context API

Kent C. Dodds has a fantastic [blog post](https://kentcdodds.com/blog/application-state-management-with-react) that I refer to whenever I implement the Context API. If you don't have time to read that, here's the short version: Context is a way to share state between unrelated or distant components. All you have to do is wrap your components in a `Context.Provider` and then call `useContext(Context)` inside that component to access your state and helper functions.

Here's our counter example with context:

```jsx react-live use-render
const {useContext, useState, createContext} = React

const AppContext = createContext()

function AppProvider(props) {
  const [count, setCount] = useState(0)
  const value = { count, setCount }
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

function CountDisplay() {
  const { count } = useContext(AppContext)
  return <h2>The Count is: {count}</h2>
}

function CountButton() {
  const { setCount } = useContext(AppContext)
  return (
    <button onClick={() => setCount(count => count + 1)}>
      Increment
    </button>
  )
}

const OuterWrapper = () => <InnerWrapper />

const InnerWrapper = () => <CountButton />

function App() {
  return (
    <div>
      <AppProvider>
        <CountDisplay/>
        <OuterWrapper/>
      </AppProvider>
    </div>
  )
}

render(App)
```

Here we have `CountDisplay` and `CountButton` components that both need to interact with the higher-level `count` state in our context. We start by making a context with `createContext`, then a provider component in `AppProvider` to wrap our dependent components, and finally call `useContext` in each component to pull out the values we need. It doesn't matter how far apart the components are as long as they're wrapped in a provider.

Pretty great right?

## Kent C. Dodd's Optimizations 📈

We can improve on this a little bit by implementing some stuff that Kent has in his article on state management. Let's take a look:

```jsx react-live use-render
const {useContext, useState, createContext, useMemo} = React
const AppContext = createContext()

// instead of calling useContext directly in our components,
// we make our own hook that throws an error if we try to
// access context outside of the provider
function useAppContext() {
  const context = useContext(AppContext)
  if (!context)
    throw new Error('AppContext must be used with AppProvider!')
  return context
}

function AppProvider(props) {
  const [count, setCount] = useState(0)
  // here we use useMemo for... reasons.
  // this says don't give back a new count/setCount unless count changes
  const value = useMemo(() => ({ count, setCount }), [count])
  return <AppContext.Provider value={value} {...props} />
}

function CountDisplay() {
  const { count } = useAppContext()
  return <h2>The Count is: {count}</h2>
}

function CountButton() {
  const { setCount } = useAppContext()
  return (
    <button onClick={() => setCount(count => count + 1)}>
      Increment
    </button>
  )
}

const OuterWrapper = () => <InnerWrapper />

const InnerWrapper = () => <CountButton />

function App() {
  return (
    <div>
      <AppProvider>
        <CountDisplay />
        <OuterWrapper />
      </AppProvider>
    </div>
  )
}

render(App)
```

The first thing we do is throw an error if we try to access the context outside of our provider. This is a great idea to improve the developer experience of your app (aka: make the console scream at you when you forget how context works).

The second thing is to memoize our context value to only re-render if the `count` changes. Now, `useMemo` is a difficult thing to wrap your head around, but the basic gist is that when you memoize something, you're saying that you won't return that value again unless your specified value changes. Kent has a [great article](https://kentcdodds.com/blog/usememo-and-usecallback) on that too if you want to read more.

I can't discern a difference between using `useMemo` and not using it, but I would venture that if you're doing some heavy lifting in your Context Provider, it might be beneficial to apply memoization. If you read Kent's article on `useMemo` and `useCallback` he cautions against using them unless you start to see performance hits. (Full Disclosure: I've never needed to use either one.)

Kent also spreads his `props` on the provider instead of using `props.children`, which is a neat trick, so I included that as well.

## The Context API's Dirty Little Secret 🤫

![Man making the shush gesture with his finger over his lip, laying on a mound of trash. Photo by Jordan Beltran](trashman.jpg)

Boy, the Context API sure is great. It's super easy to use compared to Redux and requires a lot less code, so why _wouldn't_ you use it?

The problem with context is simple: **Everything that consumes a context re-renders everytime that context's state changes.**

That means that if you're consuming your context all over the place in your app, or worse, using one context for your entire app's state, you're causing a ton of re-renders all over the place!

Let's visualize this with a simple app. Let's make a context with a counter and a message. The message will never change, but be consumed by three components that display the message in a random color on each render. The count will be consumed by one component, and be the only value that changes.

That sounds like a middle school math problem, but if you look at this code and the resulting app, the problem becomes blatantly obvious:

```jsx react-live use-render
const {useContext, useState, createContext} = React
const AppContext = createContext()

function useAppContext() {
  const context = useContext(AppContext)
  if (!context)
    throw new Error('useAppContext must be used within AppProvider!')
  return context
}

function AppProvider(props) {
  // the count for our counter component
  const [count, setCount] = useState(0)
  // this message never changes!
  const [message, setMessage] = useState('Hello from Context!')
  const value = {
    count,
    setCount,
    message,
    setMessage
  }
  return <AppContext.Provider value={value} {...props}/>
}

function Message() {
  const { message } = useAppContext()
  // the text will render to a random color for
  // each instance of the Message component
  const getColor = () => (Math.floor(Math.random() * 255))
  const style = {
    color: `rgb(${getColor()},${getColor()},${getColor()})`
  }
  return (
    <div>
      <h4 style={style}>{message}</h4>
    </div>
  )
}

function Count() {
  const {count, setCount} = useAppContext()
  return (
    <div>
      <h3>Current count from context: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

function App() {
  return (
    <div>
      <AppProvider>
        <h2>Re-renders! 😩</h2>
        <Message />
        <Message />
        <Message />
        <Count />
      </AppProvider>
    </div>
  )
}
render(App)
```
Everything re-renders when we click increment 😱.

The message components don't even use the `count` from our context, but they re-render anyway. Yikes!

### What about memoization?

Maybe we just forgot to use `useMemo` like Kent did in his example. Let's memoize our context and see what happens:

```jsx react-live use-render
const {useContext, useState, createContext, useMemo} = React
const AppContext = createContext()

function useAppContext() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppContext must be used within AppProvider!')
  return context
}

function AppProvider(props) {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('Hello from Context!')
  // here we pass our value to useMemo,
  // and tell useMemo to only give us new values
  // when count or message change
  const value = useMemo(() => ({
    count,
    setCount,
    message,
    setMessage
  }), [count, message])
  return <AppContext.Provider value={value} {...props}/>
}

function Message() {
  const { message } = useAppContext()
  const getColor = () => (Math.floor(Math.random() * 255))
  const style = {
    color: `rgb(${getColor()},${getColor()},${getColor()})`
  }
  return (
    <div>
      <h4 style={style}>{message}</h4>
    </div>
  )
}

function Count() {
  const {count, setCount} = useAppContext()
  return (
    <div>
      <h3>Current count from context: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

function App() {
  return (
    <div>
      <AppProvider>
        <h2>Re-renders! 😩</h2>
        <Message />
        <Message />
        <Message />
        <Count />
      </AppProvider>
    </div>
  )
}
render(App)
```

Nope! Memoization with `useMemo` doesn't help at all!

### What about components that don't consume Context, do they re-render?

That's an excellent question, let's test it with a Message component that doesn't consume context:

```jsx react-live use-render
const {useContext, useState, createContext, useMemo} = React
const AppContext = createContext()

function useAppContext() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppContext must be used within AppProvider!')
  return context
}

function AppProvider(props) {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('Hello from Context!')
  const value = useMemo(() => ({
    count,
    setCount,
    message,
    setMessage
  }), [count, message])
  return <AppContext.Provider value={value} {...props}/>
}

// this component does NOT consume the context
// but is still within the Provider component
function IndependentMessage() {
  const getColor = () => (Math.floor(Math.random() * 255))
  const style = {
    color: `rgb(${getColor()},${getColor()},${getColor()})`
  }
  return (
    <div>
      <h4 style={style}>I'm my own Independent Message!</h4>
    </div>
  )
}

function Message() {
  const { message } = useAppContext()
  const getColor = () => (Math.floor(Math.random() * 255))
  const style = {
    color: `rgb(${getColor()},${getColor()},${getColor()})`
  }
  return (
    <div>
      <h4 style={style}>{message}</h4>
    </div>
  )
}

function Count() {
  const {count, setCount} = useAppContext()
  return (
    <div>
      <h3>Current count from context: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

function App() {
  return (
    <div>
      <AppProvider>
        <h2>Re-renders! 😩</h2>
        <Message />
        <Message />
        <Message />
        <IndependentMessage />
        <Count />
      </AppProvider>
    </div>
  )
}
render(App)
```

Well, this is the only good news so far. **Only components that call `useContext` re-render whenever the context's state changes.**

Still, this is bad news for our app. We don't want to trigger a bunch of unnecessary re-renders everywhere we use a context.

Imagine if those message components were doing a lot of work like calculating animations, or if we had a huge React app with lots of components dependent on our context. That could lead to pretty serious performance issues, right?

## Should we stop using Context?

![Sign showing man throwing away trash, photo by Gary Chan](trash.jpg)

I'll go ahead and say this now: **no, this isn't a reason to stop using context**. There's a ton of apps out there using context and chugging along just fine, including a bunch of my own apps.

Still, performance is kind of a big deal. I don't want to leave you sitting up at night worrying about the Context API's dirty little secret. So let's talk about some ways to deal with this re-render business.

### Option 1: Don't worry at all. Keep on Context'n like you do. YOLO 🤪!

I've basically used Context a whole bunch in a lot of various apps without memoization, at the top level of my app, and consumed by a bunch of components without noticing any performance hits at all. Like I said before, a lot of the React folks say you shouldn't even worry about performance optimizations until you see performance impacts.

Still, this strategy won't work for everyone. You may already have performance issues in your app, or if your app processes a lot of logic or animations, you may see performance issues as your app grows and end up doing some serious refactoring down the road.

### Option 2: Use Redux or Mobx

Redux and Mobx both use the context API, so how do they help? The store that's shared by these state management libraries with context is a little different from sharing state directly with context. When you're using Redux and Mobx, there's a diffing algorithm at work that makes sure to only re-render the components that actually need to re-render.

Still, context was supposed to save us from having to learn Redux and Mobx! There's a lot of abtractions and boilerplate involved in using a state management library, making it an unattractive solution to some folks.

Plus, isn't keeping all of our state in global state a bad practice?

### Option 3: Use Multiple Contexts, and keep state close to its Dependent Components

This solution takes the most finesse to pull off, but gives you the best performance without reaching for Redux and Mobx. It relies on being smart about your state management choices, and only passing state up to a context if you need to share it between distant components.

There's a few key tenants to this strategy:

1. **Let a component manage its own state if it can.** This is a good practice to follow regardless of your choice of state management. For example, if you have a modal that needs to keep track of an open/closed state, but no other components need to know if that modal is open, keep that open/closed state in the modal. Don't push state into context (or Redux) if you don't have to!
1. **If your state is shared between a parent and a few children, just prop it down.** This is the old school method of sharing state. Just pass it as props to the children components that need it. Passing props or "Prop-drilling" can be miserable with deeply nested components, but if you're only passing things down a few levels, you should probably just do it.
1. **If the previous two things fail, use context but keep it close to the components that depend on it.** This means if you need to share some state, like a form for instance with multiple components, go ahead and make a separate context for just the form and wrap the form components in your provider.

That last one deserves an example. Let's apply it to our problem app from before. We can fix those re-renders by separating the `message` and `count` into their own contexts.

```jsx react-live use-render
const { useContext, useState, createContext } = React
const CountContext = createContext()

// Now count context only worries about count!
function useCountContext() {
  const context = useContext(CountContext)
  if (!context)
    throw new Error('useCountContext must be used within CountProvider!')
  return context
}

function CountProvider(props) {
  const [count, setCount] = useState(0)
  const value = { count, setCount }
  return <CountContext.Provider value={value} {...props}/>
}

// And message context only worries about message!
const MessageContext = createContext()

function useMessageContext() {
  const context = useContext(MessageContext)
  if (!context)
    throw new Error('useMessageContext must be used within MessageProvider!')
  return context
}

function MessageProvider(props) {
  const [message, setMessage] = useState('Hello from Context!')
  const value = { message, setMessage }
  return <MessageContext.Provider value={value} {...props}/>
}

function Message() {
  const { message } = useMessageContext()
  const getColor = () => (Math.floor(Math.random() * 255))
  const style = {
    color: `rgb(${getColor()},${getColor()},${getColor()})`
  }
  return (
    <div>
      <h4 style={style}>{message}</h4>
    </div>
  )
}

function Count() {
  const {count, setCount} = useCountContext()
  return (
    <div>
      <h3>Current count from context: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

function App() {
  return (
    <div>
      <h2>No Unnecessary Re-renders! 😎</h2>
      <MessageProvider>
        <Message />
        <Message />
        <Message />
      </MessageProvider>
      <CountProvider>
        <Count />
      </CountProvider>
    </div>
  )
}
render(App)
```

Now our state is only shared with the components that care about that state. When we increment, the colors of our message components stay the same because `count` lives outside of `messageContext`.

## Final Thoughts

Although this article's title is a little salacious and the "problem" with context  may not be the boogie man some might envision it to be, I still think this is worth talking about. React's flexibility makes it both a great framework for beginners as well as a devastating footgun for those that don't know its inner-workings. I don't forsee a lot of people tripping over this particular detail, but if you're using context and seeing performance issues, it's a good thing to know!