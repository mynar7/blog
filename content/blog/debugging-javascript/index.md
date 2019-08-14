---
title: How to Debug JavaScript Quickly
date: 2019-08-11T23:00:00-0400
---

![Photo of fire ants](./fireants.jpg)

If you've ever thought, *"meh... I'm fine with* `console.log`*, learning to debug is as painful as rolling in fire ants"*, this article is for you!

## Console Confessional

Me and `console.log` are like this: 🤞. It's been my go-to solution for all things weirdJS from the start: `this`, de-nesting API call data, `async` things, timeouts, etc.

However, once upon a time, my bootcamp teacher showed us debugging briefly (thank you James), and I thought, *"This is... **really cool**"*.

You could see **everything** happening inside your code while it's executing--how useful!

Unfortunately I soon got into node-land and then front-end framework valley. I quickly gave up on debugging. (Configure VS Code debugger anyone? Webpack? *...No thanks.*)

And that was 👌 for a while. I'd hit an issue, fire off a `console.log` or three, solve it, and go back through the code to delete them. Sometimes issues would require many more console.logs. Sometimes my boss would giggle when one slipped into a Pull Request; I'd feel bad, delete/re-push, and go back to `console.log`-ing.

I've probably typed `console.log` more than any other syntax, word, or punctuation in my time coding JavaScript. I've typed it so much I've thought about installing an [extension](https://marketplace.visualstudio.com/items?itemName=ChakrounAnas.turbo-console-log) to save myself keystrokes.

There's also a ton of useful `console.log` tricks out there. I've used `console.error`, `console.warn`, `console.table`, destructring, used CSS in logs, and [many more](https://kylegill.com/blog/2018-11-20-commanding-the-javascript-console/index).

But what happens when that's just not enough? What if you're tired of typing *"c o n s o l e . l o g"* everytime you hit a snag?

## console.gone

At work recently, we realized our production code had a memory leak. Our wonderful production code that was compiled and transpiled with webpack, stuffed into a docker container, and running in a linux environment somewhere in AWS land.

Where was my wonderful `console.log` in all that mess?

Gone, friend. Gone.

Long story short, we got deep into Chrome's performance tooling (a topic for another article?). Through that, **I finally found a quick path to connecting node/webpack and chrome dev tools.**

Since then I've found myself using more `debugger` statements in my day-to-day.

## Basic Debugging with Chrome

OK. For anyone that's unfamiliar, first we're going to start with the basics. How do you actually open the chrome debugger?

1. First, **open dev tools on this site.**
    - Press f12, right-click and select "inspect", press ctrl-shift-i on Windows or cmd-clover-unnatural-hand-movement on Mac... just get the dev tools open however you normally do.
1. **Add a** `debugger` **statement to your code**. (I've already done this below)
    - Chrome will pick up on any debugger statements, pause the code, and open the debugging tools while code is running **if (and only if)** dev tools are already open.
1. **Run the code!**
    * Click ↗↘ or ➡ to step through the code line by line
    * Click the ▶ to resume the script


```js js-live
function doStuff(thing) {
    thing = thing / 4 * -1
    thing = Math.pow(thing, 1)
    const thing2 = Math.trunc(thing) + 5
    debugger // <-- this makes the magic happen
    return thing2
}

const thingamajig = Math.random()
const result = doStuff(thingamajig)
console.log("And the result is..." + result)
```

#### Pretty cool right? 😎👍

Notice how the debugger prints the values of the code as you step through it. Very very nice! This can save you many many keystrokes if you're trying to dig down into an object.

Why don't we check out some more basic debugging examples?

## Checking out variable values

You can hover over variables in the debugger and see their value as you step through the code.

First let's look at some HTML:

```html html-live
<div id="magical">Boooooring</div>
```

Now let's watch some JavaScript spice things up in the html above. Try stepping through to the "awesome" variable, then hovering over it to see all the magical properties and methods a DOM object has attached to it.

(Don't forget to use ↗↘ to step through, and ▶ when you're finished)

```js js-live
debugger // Let's watch the magic happen~ ✨👏
const div = document.getElementById('magical')
const awesome = document.createElement('marquee')
//I'm I-remember-marquee-tags years old. 🤫
awesome.innerHTML = '<h2>✨🚀~MAGICAL~ 🦄🌈</h2>'
div.textContent = "" //boring no more...
div.appendChild(awesome)
```
## Nested Properties

Trying to find a nested property on an object? Debugging can help!

Let's try and get... oh, let's say the level of sweetness on this meatball object below.

It would take me a *lot* of `console.log`s to finally drill down to that... but there's a better way!

Debug, Hover the variable, then expand the properties until you find the key you're looking for then **Right-Click** and select **Copy Property Path**

```js js-live
const meatball = {
    ingredients: {
        spices: ["Oregano", "Italian", "Mystery"],
        meats: {
            beef: {
                freeRange: true,
                happy: "yes, until it was time to make meatballs",
            }
        },
    },
    flavors: [
        {
            umami: {
                level: "???"
            }
        },
        {
            savory: {
                level: 8
            }
        },
        {
            sweet: {
                level: Math.floor(Math.random() * 9)
            }
        },
    ]
}
//look up where we assign the meatball variable
//hover over meatball, and start opening up properties until you get to sweetness
//then right-click on "level" and choose "copy property path"
//paste it after meatball below:
debugger
console.log("Mama makes a meatball that's " + /*meatball.<paste here and uncomment>*/ + "/9 in sweetness")
//don't forget to erase the debugger when you run it!
```

## Blackboxing 📦 and React ⚛

Want to debug React? No problem! You can use the same workflow as above, even when using a framework like React or Vue. Just drop a **debugger** statement in, **open dev tools**, and **run** it!

#### A small catch

OK, there's one minor note I have to make. We want to debug, *our* code, and not React's code, right? However, the debugger will step through **all** of the code that's running, not just yours. So you might find yourself in some weird React code as you're stepping through your component.

No sweat! There's ways to handle that. Try these tips:

* Lost in a weird script? Click ⬆ to "Step out" of a function and hopefully back up to a recognizeable script.
* Still lost? Look at the **Call Stack** Panel. The scripts here are the ones you're currently stepping through. In some weird script? **Right-click** and select **"Blackbox script"** to skip debugging the script you're in.

Try it below!

```js react-live
function Counter() {
    const [count, setCount] = React.useState(0)
    function countUp(count) {
        debugger
        const newCount = count + 1
        setCount(newCount)
    }
    return (
        <div>
            <h2>Count is {count}</h2>
            <button onClick={() => countUp(count)}>Increment</button>
        </div>
    )
}
```

## But what about Node?

Ah yes... the eternal question. How does one debug NodeJS?

You can use [VS Code](https://code.visualstudio.com/docs/nodejs/nodejs-debugging), you can use a neat tool called [NDB](https://github.com/GoogleChromeLabs/ndb), but I say we just use chrome and move on with our lives.

(Note: I personally always confuse "ndb" and "nbd" as in "No Big Deal", instead of "node debugger", and it makes me nuts. I **always** mistype it, I can't google it, and so it makes a fool of me everytime I try to use it.)

1. Open chrome and type `chrome://inspect`
1. Then start your app with the `--inspect` flag.
    * Ex: `node --inspect server.js`
    * You should see something like: `Debugger listening on ws://127.0.0.1:9229/dfcsd4c63-123e-234-adsd-123lkdfgk`
1. Go back to Chrome, you should see "Remote Target" and a file name/path to your file, plus a little `inspect` link. Click it! This should pop open a separate dev tools window.
1. Add some debuggers to your code and go to town!

**Note** You may have to close and re-open chrome's debug pane for your app if it doesn't detect your debugger statement on the first pass. I'm also on the latest version of chrome, and you should be too 😉

## Parting Thoughts

Debugging isn't always my first-line of defense against weird JavaScript, but I use it a lot more often now that I've got a decent workflow for it.

How do you debug code? Hit me up on [twitter](https://twitter.com/leewarrickjr) and let me know!