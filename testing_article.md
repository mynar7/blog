---
title: An Introduction to Testing JavaScript 
date: 2020-07-28T23:00:00-0400
---

Testing is one of those essential subjects that nearly every intro course and bootcamp tends to gracefully skip over. In a way, it makes sense: when you're just starting to learn a new language or framework, you likely don't need to know testing, and it will very likely confuse you. As content-creators, we unfortunately tend to kick the can down the road and let junior developers be confused on the job instead of in our tutorials. 

At my first job, I was placed on a project written in Angular, and along with Angular came TypeScript, Mocha, Protractor, and NGRX. I knew precisely nothing out of that list, and I was incredibly frustrated to have gone from a productive React developer to an incompetent Angular developer. Moreover, I now had to write tests! In TypeScript! It was a frustrating experience that I eventually overcame (I got a few PRs in and then was placed on another project 😅), but I think it would have been a lot smoother if I had some stronger fundamentals or was familiar with at least a few of those technologies.

In the spirit of saving some junior JavaScript developers a little heartache and headache, I wanted to outline some of those fundamentals that I wish I had known prior to starting my first developer job.

```js js-live autorun no-code scripts=mocha!https://cdnjs.cloudflare.com/ajax/libs/mocha/8.0.1/mocha.min.js,chai!https://cdnjs.cloudflare.com/ajax/libs/chai/4.2.0/chai.min.js,sinon!https://cdnjs.cloudflare.com/ajax/libs/sinon.js/9.0.2/sinon.min.js
const {
  EVENT_RUN_BEGIN,
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
  EVENT_SUITE_BEGIN,
  EVENT_SUITE_END
} = mocha.Runner.constants;
mocha.setup({
  ui: "bdd",
  reporter: function (runner) {
    runner.on(EVENT_TEST_PASS, (test) => console.log(`${test.fullTitle()} 🟢`));
    runner.on(EVENT_TEST_FAIL, (test) => console.log(`{test.fullTitle()} ❌$`));
  },
  cleanReferencesAfterRun: true
})
window.assert = chai.assert;
window.mochaRun = mocha.run
mocha.run = function() {
  mocha.unloadFiles()
  window.mochaRun()
}
```
## What is testing?

Testing is a contract that you write with yourself.

```js js-live scripts=mocha,chai
function add(a, b) {
  return a + b
}

describe('add function', function() {
  it('should add two numbers', function() {
    const result = add(3, 4)
    assert(result === 7)
  })
})

mocha.run()
```
